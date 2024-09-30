export const USER_NAMES_MIN_LENGTH = 5
export const USER_NAMES_MAX_LENGTH = 100

export function isUserNamesValid(names: string): boolean {
	return (
		names.length >= USER_NAMES_MIN_LENGTH &&
		names.length <= USER_NAMES_MAX_LENGTH
	)
}

export function UserNamesNotValidError(names: string): Error {
	return new Error(`Names ${names} is not valid`)
}
