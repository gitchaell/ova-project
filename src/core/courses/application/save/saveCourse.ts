import {
	type Course,
	ensureCourseIsValid,
} from '@/core/courses/domain/Course.ts'
import { type CourseRepository } from '@/core/courses/domain/CourseRepository.ts'
import { CourseAlreadyExistsException } from '@/core/courses/domain/CourseAlreadyExistsException'

export async function saveCourse(
	courseRepository: CourseRepository,
	course: Course,
): Promise<void> {
	ensureCourseIsValid(course)

	await courseRepository.save(course)
}
