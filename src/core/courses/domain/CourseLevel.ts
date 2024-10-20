export const COURSE_LEVEL_MIN_LENGTH = 5
export const COURSE_LEVEL_MAX_LENGTH = 700

export function isCourseLevelValid(level: string): boolean {
	return (
		level.length >= COURSE_LEVEL_MIN_LENGTH &&
		level.length <= COURSE_LEVEL_MAX_LENGTH
	)
}

export function CourseLevelNotValidError(level: string): Error {
	return new Error(
		`Level ${level} must be between ${COURSE_LEVEL_MIN_LENGTH} and ${COURSE_LEVEL_MAX_LENGTH} characters`,
	)
}
