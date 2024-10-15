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

		const runnable = model.withStructuredOutput(
			z.object({
				setup: z.string().describe('Premisa o setup'),
				punch: z.string().describe('Puchline o remate '),
				description: z
					.string()
					.describe('Una explicación de la gracia del chiste'),
			}),
		)

		console.log(runnable)

		const result = await runnable.invoke(
			'Cuentame un chiste sobre algún tema controversial siguiendo la estructura setup-puchline o premisa-remate que es lo mismo',
		)

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
