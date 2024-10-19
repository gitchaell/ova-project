import { UserIdNotValidError, isUserIdValid } from '@/core/users/domain/UserId'
import {
	CourseConceptsNotValidError,
	isCourseConceptsValid,
} from './CourseConcepts'
import { CourseDateNotValidError, isCourseDateValid } from './CourseDate'
import { CourseIdNotValidError, isCourseIdValid } from './CourseId'
import { CourseLevelNotValidError, isCourseLevelValid } from './CourseLevel'
import { CourseTitleNotValidError, isCourseTitleValid } from './CourseTitle'
import {
	COURSE_SCHEDULE_DEFAULT,
	CourseScheduleNotValidError,
	isCourseScheduleValid,
} from './CourseSchedule'

export class Course {
	id!: string
	title!: string
	level!: string
	concepts!: string
	start!: Date
	end!: Date
	schedules?: string | null | undefined
	userId!: string

	static createCourse({
		id,
		title,
		level,
		concepts,
		start,
		end,
		userId,
	}: {
		id: string
		title?: string | null | undefined
		level?: string | null | undefined
		concepts?: string | null | undefined
		start?: Date | null | undefined
		end?: Date | null | undefined
		schedules?: string | null | undefined
		userId: string
	}) {
		const course = new Course()
		course.id = id
		course.title = title || ''
		course.concepts = concepts || ''
		course.level = level || ''
		course.start = start!
		course.end = end!
		course.schedules = COURSE_SCHEDULE_DEFAULT
		course.userId = userId
		return course
	}

	constructor() {}
}

export function ensureCourseIsValid({
	id,
	title,
	concepts,
	level,
	start,
	end,
	schedules,
	userId,
}: Course): void {
	if (!isCourseIdValid(id)) {
		throw CourseIdNotValidError(id)
	}
	if (!isCourseTitleValid(title)) {
		throw CourseTitleNotValidError(title)
	}
	if (!isCourseConceptsValid(concepts)) {
		throw CourseConceptsNotValidError(concepts)
	}
	if (!isCourseLevelValid(level)) {
		throw CourseLevelNotValidError(level)
	}
	if (!isCourseDateValid(start)) {
		throw CourseDateNotValidError(start)
	}
	if (!isCourseDateValid(end)) {
		throw CourseDateNotValidError(end)
	}
	if (schedules && !isCourseScheduleValid(schedules)) {
		throw CourseScheduleNotValidError(schedules)
	}
	if (!isUserIdValid(userId)) {
		throw UserIdNotValidError(userId)
	}
}
