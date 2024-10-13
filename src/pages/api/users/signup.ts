import type { APIContext, APIRoute } from 'astro'
import { randomUUID } from 'node:crypto'
import { hash } from '@node-rs/argon2'
import { signupUser } from '@/core/users/application/signup/signupUser'
import { createAstroDBUserRepository } from '@/core/users/infrastructure/AstroDBUserRepository'
import { User } from '@/core/users/domain/User'
import { lucia } from '@/lib/auth'

const repository = createAstroDBUserRepository()

export const POST: APIRoute = async (context: APIContext) => {
	try {
		const { firstname, lastname, email, password } =
			await context.request.json()

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
