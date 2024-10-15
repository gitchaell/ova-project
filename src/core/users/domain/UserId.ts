export function isUserIdValid(id: string): boolean {
	const regexExp =
		/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi

	return regexExp.test(id)
}

export function UserIdNotValidError(id: string): Error {
	return new Error(`User ID ${id} is not valid`)
}
