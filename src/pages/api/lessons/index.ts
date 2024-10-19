import type { Lesson } from '@/core/lessons/domain/Lesson'
import { lessonService } from '@/services/LessonService'
import type { APIContext, APIRoute } from 'astro'
import { getWeek, getWeekYear } from 'date-fns'

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

	return new Response(
		JSON.stringify({
			message: 'success',
			count: {
				all: lessons.length,
				done: lessons.filter((lesson) => lesson.done).length,
				undone: lessons.filter((lesson) => !lesson.done).length,
			},
			lessons: {
				all: groupLessons(lessons),
				done: groupLessons(lessons.filter((lesson) => lesson.done)),
				undone: groupLessons(lessons.filter((lesson) => !lesson.done)),
			},
		}),
		{
			status: 200,
		},
	)
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

interface LessonGroup {
	key: string
	year: number
	week: number
	lessons: Lesson[]
}

const groupLessons = (lessons: Lesson[]): LessonGroup[] => {
	const lessonMap = new Map<string, Lesson[]>()

	lessons.forEach((lesson) => {
		const startDate = new Date(lesson.start)
		const week = getWeek(startDate)
		const year = getWeekYear(startDate)

		const key = `${year}-${week}`

		if (!lessonMap.has(key)) {
			lessonMap.set(key, [])
		}

		lessonMap.get(key)!.push(lesson)
	})

	const groups: LessonGroup[] = Array.from(lessonMap, ([key, lessons]) => {
		const [year, week] = key.split('-').map(Number)
		return {
			key,
			year,
			week,
			lessons,
		}
	})

	groups.sort((a, b) => (a.year === b.year ? a.week - b.week : a.year - b.year))

	return groups
}
