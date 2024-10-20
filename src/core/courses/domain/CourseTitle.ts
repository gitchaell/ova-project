export const COURSE_TITLE_MIN_LENGTH = 5
export const COURSE_TITLE_MAX_LENGTH = 400

export function isCourseTitleValid(title: string): boolean {
	return (
		title.length >= COURSE_TITLE_MIN_LENGTH &&
		title.length <= COURSE_TITLE_MAX_LENGTH
	)
}

export function CourseTitleNotValidError(title: string): Error {
	return new Error(
		`Title ${title} must be between ${COURSE_TITLE_MIN_LENGTH} and ${COURSE_TITLE_MAX_LENGTH} characters`,
	)
}
