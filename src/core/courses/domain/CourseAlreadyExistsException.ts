export class CourseAlreadyExistsException extends Error {
	constructor() {
		super(`Ya existe un curso registrado con este título`)
	}
}
