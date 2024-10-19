import type { Lesson } from '@/core/lessons/domain/Lesson'
import { lessonService } from '@/services/LessonService'
import type { APIContext, APIRoute } from 'astro'

export const GET: APIRoute = async (context: APIContext) => {
	let lessons: Lesson[] = []

	try {
		const { courseId } =
			context.request.url.includes('?') ?
				Object.fromEntries(
					new URLSearchParams(context.request.url.split('?')[1]),
				)
			:	{ courseId: null }

		if (!courseId) {
			return new Response(
				JSON.stringify({ message: 'El Id del curso es requerido.' }),
				{
					status: 400,
				},
			)
		}

		lessons = await lessonService.searchLessons({ courseId })
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

	return new Response(JSON.stringify({ message: 'success', lessons }), {
		status: 200,
	})
}

export const POST: APIRoute = async (context: APIContext) => {
	try {
		const lesson = await context.request.json()
		await lessonService.saveLesson(lesson)
	} catch (error) {
		if (error instanceof Error) {
			console.log(error)
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

export const DELETE: APIRoute = async (context: APIContext) => {
	try {
		const params = await context.request.json()
		await lessonService.removeLesson(params.lessonId)
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
