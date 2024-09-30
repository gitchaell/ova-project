export function isUserEmailValid(email: string): boolean {
	const regexExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

	return regexExp.test(email)
}

export function UserEmailNotValidError(email: string): Error {
	return new Error(`Email ${email} is not valid`)
}
