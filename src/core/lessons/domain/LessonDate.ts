export function isLessonDateValid(date: Date): boolean {
	return !!date
}

export function LessonDateNotValidError(date: Date): Error {
	return new Error(`Date ${date} is not valid`)
}
