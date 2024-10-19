export const LESSON_CAPTION_MIN_LENGTH = 5
export const LESSON_CAPTION_MAX_LENGTH = 300

export function isLessonCaptionValid(caption: string): boolean {
	return (
		caption.length >= LESSON_CAPTION_MIN_LENGTH &&
		caption.length <= LESSON_CAPTION_MAX_LENGTH
	)
}

export function LessonCaptionNotValidError(caption: string): Error {
	return new Error(`Caption ${caption} is not valid`)
}
