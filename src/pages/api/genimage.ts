import type { APIContext, APIRoute } from 'astro'
import { ImageService, Provider } from '@/services/ImageService'

export const POST: APIRoute = async (context: APIContext) => {
	try {
		const { prompt } = await context.request.json()

		const imageUrl = await ImageService.generate(prompt, Provider.Nexra, {
			model: 'prodia',
			data: {
				model: 'ICantBelieveItsNotPhotography_seco.safetensors [4e7a3dfd]',
			},
		})

		return new Response(JSON.stringify({ imageUrl, message: 'success' }), {
			status: 200,
		})
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
