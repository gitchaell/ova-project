import { type LessonRepository } from '@/core/lessons/domain/LessonRepository.ts'

export async function removeLesson(
	lessonRepository: LessonRepository,
	lessonId: string,
): Promise<void> {
	return await lessonRepository.remove(lessonId)
}
