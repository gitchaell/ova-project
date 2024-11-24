import type { APIContext, APIRoute } from 'astro'
import * as dotenv from 'dotenv'
import type { Lesson } from '@/core/lessons/domain/Lesson'
import { lessonService } from '@/services/LessonService'
import { ImageService, ImageProvider } from '@/services/ImageService'
import { StorageService } from '@/services/StorageService'

dotenv.config()

export const POST: APIRoute = async (context: APIContext) => {
	try {
		const { lesson, imagePrompt } = (await context.request.json()) as {
			lesson: Lesson
			imagePrompt: string
		}

		const file = (await ImageService.generate(
			imagePrompt,
			ImageProvider.Stability,
			{
				aspect_ratio: '1:1',
				output_format: 'png',
			},
		)) as File

		const url = await StorageService.upload(file)

		await lessonService.saveLesson({
			...lesson,
			id: lesson.id,
			image: url,
		})

		return new Response(JSON.stringify({ message: 'success' }), { status: 200 })
	} catch (error) {
		console.log(error)
		if (error instanceof Error) {
			return new Response(JSON.stringify({ message: error.message }), {
				status: 500,
			})
		}
	}

	return new Response(JSON.stringify({ message: 'success' }), { status: 200 })
}
