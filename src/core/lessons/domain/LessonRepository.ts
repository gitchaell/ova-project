import { type Lesson } from './Lesson.ts'

export interface LessonRepository {
	save: (user: Lesson) => Promise<void>
	find: (criteria: Partial<Lesson>) => Promise<Lesson>
	search: (criteria: Partial<Lesson>) => Promise<Lesson[]>
	remove: (id: string) => Promise<void>
}
