export function isLessonDateValid(date: Date): boolean {
	return !!date
}

export function LessonDateNotValidError(date: Date): Error {
	return new Error(`Date ${date} is not valid`)
}

export const lessonDateFormatter = new Intl.DateTimeFormat('es', {
	month: 'long',
	day: 'numeric',
	weekday: 'long',
	timeZone: 'UTC',
})
