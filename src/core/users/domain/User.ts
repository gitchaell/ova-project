import { UserIdNotValidError, isUserIdValid } from './UserId.ts'
import { UserNamesNotValidError, isUserNamesValid } from './UserNames.ts'
import {
	USER_PHOTO_URL_DEFAULT,
	UserPhotoUrlNotValidError,
	isUserPhotoUrlValid,
} from './UserPhotoUrl.ts'
import { UserEmailNotValidError, isUserEmailValid } from './UserEmail.ts'
import {
	UserPasswordHashNotValidError,
	isUserPasswordHashValid,
} from './UserPasswordHash.ts'

export class User {
	id!: string
	photoUrl?: string | undefined | null
	names!: string
	email!: string
	passwordHash!: string
	school?: string | undefined | null
	skills?: string | undefined | null

	static createUser({
		id,
		names,
		email,
		passwordHash,
	}: {
		id: string
		names: string
		email: string
		passwordHash: string
	}) {
		const user = new User()
		user.id = id
		user.photoUrl = USER_PHOTO_URL_DEFAULT
		user.names = names
		user.email = email
		user.passwordHash = passwordHash
		return user
	}

	constructor() {}
}

export function ensureUserIsValid({
	id,
	photoUrl,
	names,
	email,
	passwordHash,
}: User): void {
	if (!isUserIdValid(id)) {
		throw UserIdNotValidError(id)
	}
	if (photoUrl && !isUserPhotoUrlValid(photoUrl)) {
		throw UserPhotoUrlNotValidError(photoUrl)
	}
	if (!isUserNamesValid(names)) {
		throw UserNamesNotValidError(names)
	}
	if (!isUserEmailValid(email)) {
		throw UserEmailNotValidError(email)
	}
	if (!isUserPasswordHashValid(passwordHash)) {
		throw UserPasswordHashNotValidError(passwordHash)
	}
}
