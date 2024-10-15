export function isCourseDateValid(date: Date): boolean {
	return !!date
}

export function CourseDateNotValidError(date: Date): Error {
	return new Error(`Date ${date} is not valid`)
}
