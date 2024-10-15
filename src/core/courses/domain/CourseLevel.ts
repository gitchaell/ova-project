export const COURSE_LEVEL_MIN_LENGTH = 5
export const COURSE_LEVEL_MAX_LENGTH = 700

export function isCourseLevelValid(level: string): boolean {
	return (
		level.length >= COURSE_LEVEL_MIN_LENGTH &&
		level.length <= COURSE_LEVEL_MAX_LENGTH
	)
}

export function CourseLevelNotValidError(level: string): Error {
	return new Error(`Level ${level} is not valid`)
}
