export function isUserPhotoUrlValid(photoUrl: string): boolean {
	try {
		new URL(photoUrl)
		return true
	} catch (err) {
		return false
	}
}

export function UserPhotoUrlNotValidError(photoUrl: string): Error {
	return new Error(`Photo url ${photoUrl} is not valid`)
}

export const USER_PHOTO_URL_DEFAULT =
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqWGZTXqSnfiSHoCSGhh8vT2mr04RKgSeoTw&s'
