export const COURSE_NAMES_MIN_LENGTH = 5
export const COURSE_NAMES_MAX_LENGTH = 300

export function isCourseTitleValid(title: string): boolean {
	return (
		title.length >= COURSE_NAMES_MIN_LENGTH &&
		title.length <= COURSE_NAMES_MAX_LENGTH
	)
}

export function CourseTitleNotValidError(title: string): Error {
	return new Error(`Title ${title} is not valid`)
}
