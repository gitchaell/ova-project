export const LESSON_TITLE_MIN_LENGTH = 5
export const LESSON_TITLE_MAX_LENGTH = 700

export function isLessonTitleValid(title: string): boolean {
	return (
		title.length >= LESSON_TITLE_MIN_LENGTH &&
		title.length <= LESSON_TITLE_MAX_LENGTH
	)
}

export function LessonTitleNotValidError(title: string): Error {
	return new Error(
		`Title ${title} must be between ${LESSON_TITLE_MIN_LENGTH} and ${LESSON_TITLE_MAX_LENGTH} characters`,
	)
}
