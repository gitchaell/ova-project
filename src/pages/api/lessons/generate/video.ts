import type { APIContext, APIRoute } from 'astro'
import * as dotenv from 'dotenv'
import type { Lesson } from '@/core/lessons/domain/Lesson'
import { lessonService } from '@/services/LessonService'
import { VideoProvider, VideoService } from '@/services/VideoService'

dotenv.config()

export const POST: APIRoute = async (context: APIContext) => {
	try {
		const { lesson } = (await context.request.json()) as {
			lesson: Lesson
		}

		if (!lesson?.image?.length) {
			throw new Error('No se ha encontrado la imágen parámetro.')
		}

		const videoId = await VideoService.generate(
			lesson.image,
			VideoProvider.Stability,
			{},
		)

		if (!videoId?.length) {
			throw new Error(
				'El servicio de generación de vídeos no ha respondido con éxito.',
			)
		}

		await lessonService.saveLesson({
			...lesson,
			id: lesson.id,
			videoId,
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
