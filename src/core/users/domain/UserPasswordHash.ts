export function isUserPasswordHashValid(passwordHash: string): boolean {
	return !!passwordHash
}

export function UserPasswordHashNotValidError(passwordHash: string): Error {
	return new Error(`Email ${passwordHash} is not valid`)
}
