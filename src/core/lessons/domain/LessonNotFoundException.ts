export class LessonNotFoundException extends Error {
	constructor() {
		super(`Lección no encontrada`)
	}
}
