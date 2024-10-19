export function isCourseScheduleValid(schedule: string): boolean {
	// const regexExp = new RegExp(
	// 	/^(\*|([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])|\*\/([0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])) (\*|([0-9]|1[0-9]|2[0-3])|\*\/([0-9]|1[0-9]|2[0-3])) (\*|([1-9]|1[0-9]|2[0-9]|3[0-1])|\*\/([1-9]|1[0-9]|2[0-9]|3[0-1])) (\*|([1-9]|1[0-2])|\*\/([1-9]|1[0-2])) (\*|([0-6])|\*\/([0-6]))$/,
	// )
	// return regexExp.test(schedule)
	return !!schedule
}

export function CourseScheduleNotValidError(schedule: string): Error {
	return new Error(`Course schedule ${schedule} is required`)
}

export const COURSE_SCHEDULE_DEFAULT = 'De lunes a viernes, 3 horas cada día'
