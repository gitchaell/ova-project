export const LESSON_CONTENT_MIN_LENGTH = 500
export const LESSON_CONTENT_MAX_LENGTH = 2000

export function isLessonContentValid(content: string): boolean {
	return (
		content.length >= LESSON_CONTENT_MIN_LENGTH &&
		content.length <= LESSON_CONTENT_MAX_LENGTH
	)
}

export function LessonContentNotValidError(content: string): Error {
	return new Error(`Content ${content} is not valid`)
}
