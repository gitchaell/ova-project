import type { APIContext, APIRoute } from 'astro'
import { verify } from '@node-rs/argon2'
import { createAstroDBUserRepository } from '@/core/users/infrastructure/AstroDBUserRepository'
import { lucia } from '@/lib/auth'
import { getUser } from '@/core/users/application/get/getUser'
import { UserCredentialsNotValidException } from '@/core/users/domain/UserCredentialsNotValidException'

const repository = createAstroDBUserRepository()

export const POST: APIRoute = async (context: APIContext) => {
	try {
		const { email, password } = await context.request.json()

		const user = await getUser(repository, { email })

		if (user) {
			const validPassword = await verify(user.passwordHash, password, {
				memoryCost: 19456,
				timeCost: 2,
				outputLen: 32,
				parallelism: 1,
			})

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
				throw new UserCredentialsNotValidException()
			}

			const session = await lucia.createSession(user.id, {})
			const sessionCookie = lucia.createSessionCookie(session.id)

			context.cookies.set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			)
		}
	} catch (error) {
		if (error instanceof Error) {
			return new Response(
				JSON.stringify({
					code: 'INTERNAL_SERVER_ERROR',
					message: error.message,
					stack: error.stack,
				}),
				{ status: 400 },
			)
		}
	}

	return new Response(JSON.stringify({ message: 'success' }), { status: 200 })
}
