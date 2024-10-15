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
	'https://m.media-amazon.com/images/I/41+jrimaRpL._UXNaN_FMjpg_QL85_.jpg'
