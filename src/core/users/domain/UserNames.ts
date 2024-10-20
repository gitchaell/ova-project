export const USER_NAMES_MIN_LENGTH = 5
export const USER_NAMES_MAX_LENGTH = 200

export function isUserNamesValid(names: string): boolean {
	return (
		names.length >= USER_NAMES_MIN_LENGTH &&
		names.length <= USER_NAMES_MAX_LENGTH
	)
}

export function UserNamesNotValidError(names: string): Error {
	return new Error(
		`Names ${names} must be between ${USER_NAMES_MIN_LENGTH} and ${USER_NAMES_MAX_LENGTH} characters`,
	)
}
