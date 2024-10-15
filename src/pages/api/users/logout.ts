import type { APIContext, APIRoute } from 'astro'
import { userService } from '@/services/UserService'

export const POST: APIRoute = async (context: APIContext) => {
	if (!context.locals.session) {
		return new Response(JSON.stringify({ message: 'Sesión expirada' }), {
			status: 401,
		})
	}

	const sessionCookie = await userService.logout(context.locals.session.id)

	context.cookies.set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	)

	return new Response(JSON.stringify({ message: 'success' }), { status: 200 })
}
