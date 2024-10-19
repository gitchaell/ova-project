import {
	type Lesson,
	ensureLessonIsValid,
} from '@/core/lessons/domain/Lesson.ts'
import { type LessonRepository } from '@/core/lessons/domain/LessonRepository.ts'

export async function saveLesson(
	lessonRepository: LessonRepository,
	lesson: Lesson,
): Promise<void> {
	ensureLessonIsValid(lesson)

	await lessonRepository.save(lesson)
}
