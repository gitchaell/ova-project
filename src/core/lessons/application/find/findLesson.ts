import { type LessonRepository } from '@/core/lessons/domain/LessonRepository.ts'
import type { Lesson } from '@/core/lessons/domain/Lesson'

export async function findLesson(
	lessonRepository: LessonRepository,
	criteria: Partial<Lesson>,
): Promise<Lesson> {
	return await lessonRepository.find(criteria)
}
