import type { APIRoute } from 'astro'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import * as dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

export const POST: APIRoute = async ({ request }) => {
	try {
		// const { emojis } = await request.json()

		let model = new ChatGoogleGenerativeAI({
			modelName: 'gemini-1.5-flash',
		})

		const result = await model
			.withStructuredOutput(
				z.object({
					setup: z.string().describe('La premisa del chiste'),
					punch: z.string().describe('El punchline del chiste'),
				}),
			)
			.invoke('Cuentame un chiste sobre algún tema controversial de la vida')

		console.log(result)

		return new Response(JSON.stringify({ result }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		})
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: 'No fue posible comunicarse con Gemini',
				error,
			}),
			{ status: 500 },
		)
	}
}
