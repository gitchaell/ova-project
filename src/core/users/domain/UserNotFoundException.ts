export class UserNotFoundException extends Error {
	constructor() {
		super(`Usuario no encontrado`)
	}
}
