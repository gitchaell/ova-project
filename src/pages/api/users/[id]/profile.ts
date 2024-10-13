import type { APIContext, APIRoute } from 'astro'
import { createAstroDBUserRepository } from '@/core/users/infrastructure/AstroDBUserRepository'
import { saveUser } from '@/core/users/application/save/saveUser'

const repository = createAstroDBUserRepository()

export const POST: APIRoute = async (context: APIContext) => {
	try {
		const id = context.params.id
		const { names, school, skills } = await context.request.json()

		await saveUser(repository, { id, names, school, skills })
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
