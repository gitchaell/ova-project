import { type CourseRepository } from '@/core/courses/domain/CourseRepository.ts'
import type { Course } from '@/core/courses/domain/Course'

export async function searchCourses(
	courseRepository: CourseRepository,
	criteria: Partial<Course>,
): Promise<Course[]> {
	return await courseRepository.search(criteria)
}
