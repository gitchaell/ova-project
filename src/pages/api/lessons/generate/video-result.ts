import type { APIContext, APIRoute } from 'astro'
import type { Lesson } from '@/core/lessons/domain/Lesson'
import { lessonService } from '@/services/LessonService'
import { StorageService } from '@/services/StorageService'
import { VideoProvider, VideoService } from '@/services/VideoService'

export const POST: APIRoute = async (context: APIContext) => {
	try {
		const { lesson } = (await context.request.json()) as {
			lesson: Lesson
		}

		if (!lesson?.videoId?.length) {
			throw new Error('Hubo un error al generar el video.')
		}

		const file = await VideoService.getVideo(
			lesson.videoId,
			VideoProvider.Stability,
		)

		const url = await StorageService.upload(file)

		await lessonService.saveLesson({
			...lesson,
			id: lesson.id,
			video: url,
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
