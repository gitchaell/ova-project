export class CourseNotFoundException extends Error {
	constructor() {
		super(`Curso no encontrado`)
	}
}
