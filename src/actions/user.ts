import { createAstroDBUserRepository } from '@/core/users/infrastructure/AstroDBUserRepository'
import { ActionError, defineAction, type ActionAPIContext } from 'astro:actions'
import { z } from 'astro:schema'
import { signupUser } from '@/core/users/application/signup/signupUser'
import { lucia } from '@/lib/auth'
import { randomUUID } from 'node:crypto'
import { hash } from '@node-rs/argon2'
import { User } from '@/core/users/domain/User'
import { getUser } from '@/core/users/application/get/getUser'

const repository = createAstroDBUserRepository()

export const user = {
	signup: defineAction({
		accept: 'form',
		input: z.object({
			names: z.string(),
			email: z.string().email(),
			password: z.string(),
		}),
		handler: async ({ names, email, password }, context: ActionAPIContext) => {
			try {
				const id = randomUUID()

				const passwordHash = await hash(password, {
					memoryCost: 19456,
					timeCost: 2,
					outputLen: 32,
					parallelism: 1,
				})

				await signupUser(
					repository,
					User.createUser({ id, names, email, passwordHash }),
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
				user = await getUser(repository, id)
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
