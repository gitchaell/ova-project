import type { Course } from '@/core/courses/domain/Course'
import { courseService } from '@/services/CourseService'
import type { APIContext, APIRoute } from 'astro'

export const GET: APIRoute = async (context: APIContext) => {
	let courses: Course[] = []

	try {
		const { userId } =
			context.request.url.includes('?') ?
				Object.fromEntries(
					new URLSearchParams(context.request.url.split('?')[1]),
				)
			:	{ userId: null }

		if (!userId) {
			return new Response(
				JSON.stringify({ message: 'El Id del usuario es requerido.' }),
				{
					status: 400,
				},
			)
		}

		courses = await courseService.searchCourses({ userId })
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

	return new Response(JSON.stringify({ message: 'success', courses }), {
		status: 200,
	})
}

export const POST: APIRoute = async (context: APIContext) => {
	try {
		const course = await context.request.json()
		await courseService.saveCourse(course)
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
		await courseService.removeCourse(params.courseId)
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

export const PUT: APIRoute = ({ request }) => {
	return new Response(
		JSON.stringify({
			message: 'This was a PUT!',
		}),
	)
}
