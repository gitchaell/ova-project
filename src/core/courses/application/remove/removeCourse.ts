import { type CourseRepository } from '@/core/courses/domain/CourseRepository.ts'

export async function removeCourse(
	courseRepository: CourseRepository,
	courseId: string,
): Promise<void> {
	return await courseRepository.remove(courseId)
}
