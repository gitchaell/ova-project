import { type Course } from './Course.ts'

export interface CourseRepository {
	save: (user: Course) => Promise<void>
	find: (criteria: Partial<Course>) => Promise<Course>
	search: (criteria: Partial<Course>) => Promise<Course[]>
	remove: (id: string) => Promise<void>
}
