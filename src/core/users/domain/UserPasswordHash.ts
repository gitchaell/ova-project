export const USER_PASSWORD_MAX_LENGTH = 100
export const USER_PASSWORD_MIN_LENGTH = 8

export function isUserPasswordHashValid(passwordHash: string): boolean {
	return !!passwordHash
}

export function UserPasswordHashNotValidError(passwordHash: string): Error {
	return new Error(`Password hash ${passwordHash} not found`)
}
