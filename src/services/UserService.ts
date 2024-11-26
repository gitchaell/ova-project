import type { UserRepository } from '@/core/users/domain/UserRepository'
import { createAstroUserRepository } from '@/core/users/infrastructure/AstroUserRepository'
import { promisify } from 'node:util'
import {
	randomUUID,
	scrypt as _scrypt,
	randomBytes,
	timingSafeEqual,
} from 'node:crypto'
import { User } from '@/core/users/domain/User'
import { signupUser } from '@/core/users/application/signup/signupUser'
import { lucia } from '@/lib/auth'
import type { Cookie } from 'lucia'
import { findUser } from '@/core/users/application/find/findUser'
import { UserCredentialsNotValidException } from '@/core/users/domain/UserCredentialsNotValidException'
import { saveUser } from '@/core/users/application/save/saveUser'
import { removeUser } from '@/core/users/application/remove/removeUser'

const scrypt = promisify(_scrypt)

interface SignUpDTO {
	firstname: string
	lastname: string
	email: string
	password: string
}

interface LoginDTO {
	email: string
	password: string
}

type UpdateUserDTO = Pick<User, 'id' | 'names' | 'school' | 'skills'>

type FindUserDTO = Partial<Pick<User, 'id' | 'email'>>

class UserService {
	private readonly repository: UserRepository

	constructor() {
		this.repository = createAstroUserRepository()
	}

	private async hashPassword(password: string): Promise<string> {
		const salt = randomBytes(16).toString('hex') // Generate a random salt
		const derivedKey = (await scrypt(password, salt, 64)) as Buffer // Hash the password with salt
		return `${salt}:${derivedKey.toString('hex')}` // Store salt and hash together
	}

	private async verifyPassword(
		password: string,
		storedHash: string,
	): Promise<boolean> {
		const [salt, key] = storedHash.split(':')
		const derivedKey = (await scrypt(password, salt, 64)) as Buffer
		const originalKey = Buffer.from(key, 'hex')
		return timingSafeEqual(derivedKey, originalKey) // Compare securely
	}

	async signUp({
		firstname,
		lastname,
		email,
		password,
	}: SignUpDTO): Promise<Cookie> {
		const id = randomUUID()

		const passwordHash = await this.hashPassword(password)

		const newUser = User.createUser({
			id,
			names: ''.concat(firstname.trim(), ' ', lastname.trim()),
			email,
			passwordHash,
		})

		await signupUser(this.repository, newUser)

		const session = await lucia.createSession(id, {})
		const sessionCookie = lucia.createSessionCookie(session.id)

		return sessionCookie
	}

	async login({ email, password }: LoginDTO): Promise<Cookie> {
		const user = await findUser(this.repository, { email })

		const validPassword = await this.verifyPassword(password, user.passwordHash)

		if (!validPassword) {
			throw new UserCredentialsNotValidException()
		}

		const session = await lucia.createSession(user.id, {})
		const sessionCookie = lucia.createSessionCookie(session.id)

		return sessionCookie
	}

	async logout(sessionId: string): Promise<Cookie> {
		await lucia.invalidateSession(sessionId)

		const sessionCookie = lucia.createBlankSessionCookie()

		return sessionCookie
	}

	async findUser({ id, email }: FindUserDTO): Promise<User> {
		return await findUser(this.repository, { id, email })
	}

	async updateUser(user: UpdateUserDTO): Promise<void> {
		await saveUser(this.repository, user as User)
	}

	async removeUser(userId: string, sessionId: string): Promise<Cookie> {
		await removeUser(this.repository, userId)

		return this.logout(sessionId)
	}
}

export const userService = new UserService()
