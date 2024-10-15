export function isCourseIdValid(id: string): boolean {
	const regexExp =
		/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi

	return regexExp.test(id)
}

export function CourseIdNotValidError(id: string): Error {
	return new Error(`Course ID ${id} is not valid`)
}
