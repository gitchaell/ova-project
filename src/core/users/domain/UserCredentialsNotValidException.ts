export class UserCredentialsNotValidException extends Error {
	constructor() {
		super('Credenciales no válidas')
	}
}
