import type { UserRepository } from '@/core/users/domain/UserRepository'
import { createAstroUserRepository } from '@/core/users/infrastructure/AstroUserRepository'
import { randomUUID } from 'node:crypto'
import { hash, verify } from '@node-rs/argon2'
import { User } from '@/core/users/domain/User'
import { signupUser } from '@/core/users/application/signup/signupUser'
import { lucia } from '@/lib/auth'
import type { Cookie } from 'lucia'
import { findUser } from '@/core/users/application/find/findUser'
import { UserCredentialsNotValidException } from '@/core/users/domain/UserCredentialsNotValidException'
import { saveUser } from '@/core/users/application/save/saveUser'
import { removeUser } from '@/core/users/application/remove/removeUser'

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
		// this.repository = createPostgreSQLUserRepository()
	}

	async singUp({
		firstname,
		lastname,
		email,
		password,
	}: SignUpDTO): Promise<Cookie> {
		const id = randomUUID()

		const passwordHash = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		})

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

		const validPassword = await verify(user.passwordHash, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		})

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
