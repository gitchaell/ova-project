import type { CourseRepository } from '@/core/courses/domain/CourseRepository'
import { createAstroCourseRepository } from '@/core/courses/infrastructure/AstroCourseRepository'
import { Course } from '@/core/courses/domain/Course'
import { findCourse } from '@/core/courses/application/find/findCourse'
import { saveCourse } from '@/core/courses/application/save/saveCourse'
import { removeCourse } from '@/core/courses/application/remove/removeCourse'
import { searchCourses } from '@/core/courses/application/search/searchCourses'

type FindCourseDTO = Partial<Pick<Course, 'id' | 'title' | 'userId'>>
type SearchCoursesDTO = Partial<Pick<Course, 'title'>> & Pick<Course, 'userId'>

class CourseService {
	private readonly repository: CourseRepository

	constructor() {
		this.repository = createAstroCourseRepository()
		// this.repository = createPostgreSQLCourseRepository()
	}

	async saveCourse(course: Course): Promise<void> {
		await saveCourse(this.repository, course)
	}

	async searchCourses({ title, userId }: SearchCoursesDTO): Promise<Course[]> {
		return await searchCourses(this.repository, { title, userId })
	}

	async findCourse({ id, title }: FindCourseDTO): Promise<Course> {
		return await findCourse(this.repository, { id, title })
	}

	async removeCourse(courseId: string): Promise<void> {
		await removeCourse(this.repository, courseId)
	}
}

export const courseService = new CourseService()
