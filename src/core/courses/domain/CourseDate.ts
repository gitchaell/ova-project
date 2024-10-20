export function isCourseDateValid(date: Date): boolean {
	return !!date
}

export function CourseDateNotValidError(date: Date): Error {
	return new Error(`Date ${date} is required`)
}

export const courseDateFormatter = new Intl.DateTimeFormat('es', {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	timeZone: 'UTC',
})
