import { ActionError, defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { Course } from '@/core/courses/domain/Course'
import { courseService } from '@/services/CourseService'

export const course = {
	search: defineAction({
		input: z.object({
			title: z.string().optional(),
			userId: z.string().uuid(),
		}),
		handler: async ({ title, userId }): Promise<Course[]> => {
			let courses: Course[] = []

			try {
				courses = await courseService.searchCourses({ title, userId })
			} catch (error) {
				if (error instanceof Error) {
					throw new ActionError({
						code: 'INTERNAL_SERVER_ERROR',
						message: error.message,
						stack: error.stack,
					})
				}
			}

			return courses
		},
	}),
}
