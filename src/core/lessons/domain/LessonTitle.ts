export const LESSON_NAMES_MIN_LENGTH = 5
export const LESSON_NAMES_MAX_LENGTH = 300

export function isLessonTitleValid(title: string): boolean {
	return (
		title.length >= LESSON_NAMES_MIN_LENGTH &&
		title.length <= LESSON_NAMES_MAX_LENGTH
	)
}

export function LessonTitleNotValidError(title: string): Error {
	return new Error(`Title ${title} is not valid`)
}
