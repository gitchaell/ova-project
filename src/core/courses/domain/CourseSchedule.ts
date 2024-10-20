export const COURSE_SCHEDULES_MAX_LENGTH = 700

export function isCourseScheduleValid(schedule: string): boolean {
	if (!schedule) {
		return false
	}

	if (schedule.length > COURSE_SCHEDULES_MAX_LENGTH) {
		return false
	}

	return true
}

export function CourseScheduleNotValidError(schedule: string): Error {
	return new Error(
		`Course schedule ${schedule} is required and must be less than ${COURSE_SCHEDULES_MAX_LENGTH} characters`,
	)
}

export const COURSE_SCHEDULE_DEFAULT = 'De lunes a viernes, 3 horas cada día'
