import type { Course } from '@/core/courses/domain/Course'
import { courseService } from '@/services/CourseService'
import type { APIContext, APIRoute } from 'astro'
import { User, db } from 'astro:db'

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
			return new Response(JSON.stringify({ message: 'userId es requerido.' }), {
				status: 400,
			})
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

export const POST: APIRoute = async ({ request }) => {
	const user = await request.json()
	await db.insert(User).values(user)

	return new Response(
		JSON.stringify({
			message: 'User created!',
		}),
	)
}

export const PUT: APIRoute = ({ request }) => {
	return new Response(
		JSON.stringify({
			message: 'This was a PUT!',
		}),
	)
}

export const DELETE: APIRoute = ({ request }) => {
	return new Response(
		JSON.stringify({
			message: 'This was a DELETE!',
		}),
	)
}
