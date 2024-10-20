export const COURSE_CONCEPTS_MIN_LENGTH = 5
export const COURSE_CONCEPTS_MAX_LENGTH = 700

export function isCourseConceptsValid(concepts: string): boolean {
	return (
		concepts.length >= COURSE_CONCEPTS_MIN_LENGTH &&
		concepts.length <= COURSE_CONCEPTS_MAX_LENGTH
	)
}

export function CourseConceptsNotValidError(concepts: string): Error {
	return new Error(
		`Concepts ${concepts} must be between ${COURSE_CONCEPTS_MIN_LENGTH} and ${COURSE_CONCEPTS_MAX_LENGTH} characters`,
	)
}
