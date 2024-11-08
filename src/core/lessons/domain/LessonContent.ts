export const LESSON_CONTENT_MIN_LENGTH = 3000
export const LESSON_CONTENT_MAX_LENGTH = 50000

export function isLessonContentValid(content: string): boolean {
	return (
		content.length >= LESSON_CONTENT_MIN_LENGTH &&
		content.length <= LESSON_CONTENT_MAX_LENGTH
	)
}

export function LessonContentNotValidError(content: string): Error {
	return new Error(
		`Content ${content} must be between ${LESSON_CONTENT_MIN_LENGTH} and ${LESSON_CONTENT_MAX_LENGTH} characters`,
	)
}
