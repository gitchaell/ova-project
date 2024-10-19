import type { LessonRepository } from '@/core/lessons/domain/LessonRepository'
import { createAstroLessonRepository } from '@/core/lessons/infrastructure/AstroLessonRepository'
import { Lesson } from '@/core/lessons/domain/Lesson'
import { findLesson } from '@/core/lessons/application/find/findLesson'
import { saveLesson } from '@/core/lessons/application/save/saveLesson'
import { removeLesson } from '@/core/lessons/application/remove/removeLesson'
import { searchLessons } from '@/core/lessons/application/search/searchLessons'

type FindLessonDTO = Partial<Pick<Lesson, 'id' | 'title' | 'courseId'>>
type SearchLessonsDTO = Partial<Pick<Lesson, 'title'>> &
	Pick<Lesson, 'courseId'>

class LessonService {
	private readonly repository: LessonRepository

	constructor() {
		this.repository = createAstroLessonRepository()
		// this.repository = createPostgreSQLLessonRepository()
	}

	async saveLesson(lesson: Lesson): Promise<void> {
		await saveLesson(this.repository, lesson)
	}

	async searchLessons({
		title,
		courseId,
	}: SearchLessonsDTO): Promise<Lesson[]> {
		return await searchLessons(this.repository, { title, courseId })
	}

	async findLesson({ id, title }: FindLessonDTO): Promise<Lesson> {
		return await findLesson(this.repository, { id, title })
	}

	async removeLesson(lessonId: string): Promise<void> {
		await removeLesson(this.repository, lessonId)
	}
}

export const lessonService = new LessonService()
