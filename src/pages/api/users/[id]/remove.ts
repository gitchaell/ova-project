import type { APIContext, APIRoute } from 'astro'
import { createAstroDBUserRepository } from '@/core/users/infrastructure/AstroDBUserRepository'
import { removeUser } from '@/core/users/application/remove/removeUser'
import { lucia } from '@/lib/auth'

const repository = createAstroDBUserRepository()

export const POST: APIRoute = async (context: APIContext) => {
	try {
		const id = context.params.id

		await removeUser(repository, id!)

		await lucia.invalidateSession(context.locals.session!.id)

		const sessionCookie = lucia.createBlankSessionCookie()

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
