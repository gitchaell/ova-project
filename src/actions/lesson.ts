import { ActionError, defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { Lesson } from '@/core/lessons/domain/Lesson'
import { lessonService } from '@/services/LessonService'

export const lesson = {
	find: defineAction({
		input: z.object({
			id: z.string().uuid(),
		}),
		handler: async ({ id }): Promise<Lesson> => {
			let lesson: Lesson

			try {
				lesson = await lessonService.findLesson({ id })
			} catch (error) {
				if (error instanceof Error) {
					throw new ActionError({
						code: 'INTERNAL_SERVER_ERROR',
						message: error.message,
						stack: error.stack,
					})
				}
			}

			return lesson!
		},
	}),
	search: defineAction({
		input: z.object({
			title: z.string().optional(),
			courseId: z.string().uuid(),
		}),
		handler: async ({ title, courseId }): Promise<Lesson[]> => {
			let lessons: Lesson[] = []

			try {
				lessons = await lessonService.searchLessons({ title, courseId })
			} catch (error) {
				if (error instanceof Error) {
					throw new ActionError({
						code: 'INTERNAL_SERVER_ERROR',
						message: error.message,
						stack: error.stack,
					})
				}
			}

			return lessons
		},
	}),
}
