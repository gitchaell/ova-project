import { d as db, U as User$1, S as Session } from './_astro_db_DqqSvL7D.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';
import { randomUUID } from 'node:crypto';
import { hash, verify } from '@node-rs/argon2';
import { i as isUserIdValid, U as UserIdNotValidError } from './UserId_DRQ5u2Ki.mjs';
import { i as isUserNamesValid, b as UserNamesNotValidError } from './UserNames_Bc3wNygV.mjs';
import { i as isUserPasswordHashValid, b as UserPasswordHashNotValidError } from './UserPasswordHash_DZw5iRFw.mjs';
import { l as lucia } from './auth_D0WEpT_W.mjs';

function isUserPhotoUrlValid(photoUrl) {
  try {
    new URL(photoUrl);
    return true;
  } catch (err) {
    return false;
  }
}
function UserPhotoUrlNotValidError(photoUrl) {
  return new Error(`Photo url ${photoUrl} is not valid`);
}
const USER_PHOTO_URL_DEFAULT = "https://m.media-amazon.com/images/I/41+jrimaRpL._UXNaN_FMjpg_QL85_.jpg";

function isUserEmailValid(email) {
  const regexExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regexExp.test(email);
}
function UserEmailNotValidError(email) {
  return new Error(`Email ${email} is not valid`);
}

class User {
  id;
  photoUrl;
  names;
  email;
  passwordHash;
  school;
  skills;
  static createUser({
    id,
    names,
    email,
    passwordHash
  }) {
    const user = new User();
    user.id = id;
    user.photoUrl = USER_PHOTO_URL_DEFAULT;
    user.names = names;
    user.email = email;
    user.passwordHash = passwordHash;
    return user;
  }
  constructor() {
  }
}
function ensureUserIsValid({
  id,
  photoUrl,
  names,
  email,
  passwordHash
}) {
  if (!isUserIdValid(id)) {
    throw UserIdNotValidError(id);
  }
  if (photoUrl && !isUserPhotoUrlValid(photoUrl)) {
    throw UserPhotoUrlNotValidError(photoUrl);
  }
  if (!isUserNamesValid(names)) {
    throw UserNamesNotValidError(names);
  }
  if (!isUserEmailValid(email)) {
    throw UserEmailNotValidError(email);
  }
  if (!isUserPasswordHashValid(passwordHash)) {
    throw UserPasswordHashNotValidError(passwordHash);
  }
}

class UserNotFoundException extends Error {
  constructor() {
    super(`Usuario no encontrado`);
  }
}

function createAstroUserRepository() {
  return {
    save,
    find,
    search,
    remove
  };
}
async function save(user) {
  const usersMatching = await search({ id: user.id });
  if (usersMatching?.length > 0) {
    await db.update(User$1).set({
      names: user.names,
      school: user.school,
      skills: user.skills
    }).where(eq(User$1.id, user.id)).execute();
  } else {
    await db.insert(User$1).values({
      id: user.id,
      names: user.names,
      email: user.email,
      passwordHash: user.passwordHash
    }).execute();
  }
}
async function find({ id, email }) {
  let users = [];
  const query = db.select().from(User$1);
  if (id) {
    users = await query.where(eq(User$1.id, id)).execute();
  }
  if (email) {
    users = await query.where(eq(User$1.email, email)).execute();
  }
  const user = users?.[0] || null;
  if (!user) {
    throw new UserNotFoundException();
  }
  return user;
}
async function search({ id, names, email }) {
  let users = [];
  const query = db.select().from(User$1);
  if (id) {
    users = await query.where(eq(User$1.id, id)).execute();
  }
  if (names) {
    users = await query.where(eq(User$1.names, names)).execute();
  }
  if (email) {
    users = await query.where(eq(User$1.email, email)).execute();
  }
  return users;
}
async function remove(id) {
  await db.delete(Session).where(eq(Session.userId, id)).execute();
  await db.delete(User$1).where(eq(User$1.id, id)).execute();
}

class UserAlreadyExistsException extends Error {
  constructor() {
    super(`Ya existe un usuario registrado con este correo electrónico`);
  }
}

async function signupUser(userRepository, user) {
  ensureUserIsValid(user);
  const usersMatching = await userRepository.search({
    email: user.email
  });
  if (usersMatching?.length > 0) {
    throw new UserAlreadyExistsException();
  }
  await userRepository.save(user);
}

async function findUser(userRepository, criteria) {
  return await userRepository.find(criteria);
}

class UserCredentialsNotValidException extends Error {
  constructor() {
    super("Credenciales no válidas");
  }
}

async function saveUser(userRepository, user) {
  return await userRepository.save(user);
}

async function removeUser(userRepository, userId) {
  return await userRepository.remove(userId);
}

class UserService {
  repository;
  constructor() {
    this.repository = createAstroUserRepository();
  }
  async singUp({
    firstname,
    lastname,
    email,
    password
  }) {
    const id = randomUUID();
    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1
    });
    const newUser = User.createUser({
      id,
      names: "".concat(firstname.trim(), " ", lastname.trim()),
      email,
      passwordHash
    });
    await signupUser(this.repository, newUser);
    const session = await lucia.createSession(id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    return sessionCookie;
  }
  async login({ email, password }) {
    const user = await findUser(this.repository, { email });
    const validPassword = await verify(user.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1
    });
    if (!validPassword) {
      throw new UserCredentialsNotValidException();
    }
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    return sessionCookie;
  }
  async logout(sessionId) {
    await lucia.invalidateSession(sessionId);
    const sessionCookie = lucia.createBlankSessionCookie();
    return sessionCookie;
  }
  async findUser({ id, email }) {
    return await findUser(this.repository, { id, email });
  }
  async updateUser(user) {
    await saveUser(this.repository, user);
  }
  async removeUser(userId, sessionId) {
    await removeUser(this.repository, userId);
    return this.logout(sessionId);
  }
}
const userService = new UserService();

export { userService as u };
