import type { APIContext, APIRoute } from 'astro'
import { lucia } from '@/lib/auth'

export const POST: APIRoute = async (context: APIContext) => {
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
