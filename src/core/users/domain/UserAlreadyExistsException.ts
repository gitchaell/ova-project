export class UserAlreadyExistsException extends Error {
	constructor() {
		super(`Ya existe un usuario registrado con este correo electrónico`)
	}
}
