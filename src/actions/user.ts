import { createAstroDBUserRepository } from '@/core/users/infrastructure/AstroDBUserRepository'
import { ActionError, defineAction, type ActionAPIContext } from 'astro:actions'
import { z } from 'astro:schema'
import { signupUser } from '@/core/users/application/signup/signupUser'
import { lucia } from '@/lib/auth'
import { randomUUID } from 'node:crypto'
import { hash, verify } from '@node-rs/argon2'
import { User } from '@/core/users/domain/User'
import { getUser } from '@/core/users/application/get/getUser'

const repository = createAstroDBUserRepository()

export const user = {
	signup: defineAction({
		accept: 'form',
		input: z.object({
			firstname: z.string().min(2).max(50),
			lastname: z.string().min(2).max(50),
			email: z.string().email(),
			password: z.string(),
		}),
		handler: async (input, context: ActionAPIContext) => {
			try {
				console.log(input)
				const { firstname, lastname, email, password } = input

				const id = randomUUID()

				const passwordHash = await hash(password, {
					memoryCost: 19456,
					timeCost: 2,
					outputLen: 32,
					parallelism: 1,
				})

				await signupUser(
					repository,
					User.createUser({
						id,
						names: ''.concat(firstname.trim(), ' ', lastname.trim()),
						email,
						passwordHash,
					}),
				)

				const session = await lucia.createSession(id, {})
				const sessionCookie = lucia.createSessionCookie(session.id)

				context.cookies.set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes,
				)
			} catch (error) {
				if (error instanceof Error) {
					throw new ActionError({
						code: 'INTERNAL_SERVER_ERROR',
						message: error.message,
						stack: error.stack,
					})
				}
			}
		},
	}),
	login: defineAction({
		accept: 'form',
		input: z.object({
			email: z.string().email(),
			password: z.string(),
		}),
		handler: async ({ email, password }, context: ActionAPIContext) => {
			try {
				const existingUser = await getUser(repository, { email })

				if (!existingUser) {
					throw new Error('Incorrect email or password')
				}

				const validPassword = await verify(
					existingUser.passwordHash,
					password,
					{
						memoryCost: 19456,
						timeCost: 2,
						outputLen: 32,
						parallelism: 1,
					},
				)

				if (!validPassword) {
					// NOTE:
					// Returning immediately allows malicious actors to figure out valid usernames from response times,
					// allowing them to only focus on guessing passwords in brute-force attacks.
					// As a preventive measure, you may want to hash passwords even for invalid usernames.
					// However, valid usernames can be already be revealed with the signup page among other methods.
					// It will also be much more resource intensive.
					// Since protecting against this is non-trivial,
					// it is crucial your implementation is protected against brute-force attacks with login throttling, 2FA, etc.
					// If usernames are public, you can outright tell the user that the username is invalid.
					throw new Error('Incorrect email or password')
				}

				const session = await lucia.createSession(existingUser.id, {})
				const sessionCookie = lucia.createSessionCookie(session.id)

				context.cookies.set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes,
				)
			} catch (error) {
				if (error instanceof Error) {
					throw new ActionError({
						code: 'INTERNAL_SERVER_ERROR',
						message: error.message,
						stack: error.stack,
					})
				}
			}
		},
	}),
	logout: defineAction({
		accept: 'form',
		handler: async (_, context: ActionAPIContext): Promise<void> => {
			try {
				await lucia.invalidateSession(context.locals.session!.id)

				const sessionCookie = lucia.createBlankSessionCookie()

				context.cookies.set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes,
				)
			} catch (error) {
				if (error instanceof Error) {
					throw new ActionError({
						code: 'INTERNAL_SERVER_ERROR',
						message: error.message,
						stack: error.stack,
					})
				}
			}
		},
	}),
	get: defineAction({
		input: z.object({
			id: z.string().uuid(),
		}),
		handler: async ({ id }): Promise<User | null> => {
			let user = null
			try {
				user = await getUser(repository, { id })
			} catch (error) {
				if (error instanceof Error) {
					throw new ActionError({
						code: 'INTERNAL_SERVER_ERROR',
						message: error.message,
						stack: error.stack,
					})
				}
			} finally {
				return user
			}
		},
	}),
}
