export class LessonAlreadyExistsException extends Error {
	constructor() {
		super(`Ya existe una lección registrada con este título`)
	}
}
