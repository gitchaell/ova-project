export function isUserPasswordHashValid(passwordHash: string): boolean {
	return !!passwordHash
}

export function UserPasswordHashNotValidError(passwordHash: string): Error {
	return new Error(`Password hash ${passwordHash} not found`)
}
