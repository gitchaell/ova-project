import type { APIContext, APIRoute } from 'astro'
import { userService } from '@/services/UserService'

export const POST: APIRoute = async (context: APIContext) => {
	try {
		const params = await context.request.json()

		const sessionCookie = await userService.login(params)

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
