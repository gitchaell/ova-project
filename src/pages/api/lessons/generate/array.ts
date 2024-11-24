import * as dotenv from 'dotenv'
import { randomUUID } from 'node:crypto'
import type { APIContext, APIRoute } from 'astro'
import { RunnableSequence } from '@langchain/core/runnables'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { z } from 'zod'
import type { User } from '@/core/users/domain/User'
import type { Course } from '@/core/courses/domain/Course'
import { PromptTemplate } from '@langchain/core/prompts'
import { courseDateFormatter } from '@/core/courses/domain/CourseDate'
import { lessonService } from '@/services/LessonService'

dotenv.config()

export const POST: APIRoute = async (context: APIContext) => {
	try {
		const { user, course } = (await context.request.json()) as {
			user: User
			course: Course
		}

		const model = new ChatGoogleGenerativeAI({
			modelName: 'gemini-1.5-flash', // 'gemini-1.5-pro',
		})

		const promptTemplate = PromptTemplate.fromTemplate(
			'Rol:\n{role}\nContexto:\n{user}\n{course}\nInstrucciones:\n{instructions}\nFormato:\n{format}',
		)

		const parser = StructuredOutputParser.fromZodSchema(
			z.array(
				z.object({
					title: z
						.string()
						.describe(
							'Título de la lección o tema relacionado con el contenido de la lección',
						),
					caption: z
						.string()
						.describe(
							'Descripción resumida de la lección o tema relacionado con el contenido de la lección',
						),
					start: z
						.string()
						.describe('Fecha de inicio de la lección en formato ISO 8601'),
					end: z
						.string()
						.describe('Fecha de fin de la lección en formato ISO 8601'),
				}),
			),
		)

		const prompt = {
			role: `Eres un diseñador experto en Objetos Virtuales de Aprendizaje (OVAs) y recursos didácticos enfocados en facilitar clases para profesores. Tu objetivo es diseñar contenido educativo altamente personalizado y adaptado a las necesidades del curso y el nivel de los estudiantes.`,
			user: `Información del profesor:
		- Nombre: ${user.names}
		- Institución: ${user.school}
		- Especialidades: ${user.skills}`,
			course: `Detalles del curso:
		- Título: ${course.title}
		- Conceptos clave: ${course.concepts}
		- Nivel de los estudiantes: ${course.level}
		- Fechas del curso: Inicio - ${courseDateFormatter.format(new Date(course.start))}, Fin - ${courseDateFormatter.format(new Date(course.end))}
		- Días de clases: ${course.schedules}`,
			instructions: [
				'1. Diseña una lección (OVA) para cada sesión programada del curso.',
				'2. Cada lección debe ser específica, relevante y alineada con los conceptos clave y el nivel de los estudiantes.',
				'3. Proporciona un título y una descripción resumida que evidencien claramente el propósito de la lección.',
				'4. Incluye las fechas de inicio y fin de cada lección en formato ISO 8601.',
				'5. Asegúrate de que el contenido generado sea directo y no incluya texto adicional como "```json" o cualquier elemento de formato innecesario.',
			].join('\n'),
			format: parser.getFormatInstructions(),
		}

		const lessons = await RunnableSequence.from([
			promptTemplate,
			model,
			parser,
		]).invoke(prompt)

		await Promise.all(
			lessons.map((lesson) =>
				lessonService.saveLesson({
					id: randomUUID(),
					title: lesson.title,
					caption: lesson.caption,
					start: new Date(lesson.start),
					end: new Date(lesson.end),
					done: false,
					courseId: course.id,
				}),
			),
		)

		return new Response(JSON.stringify({ message: 'success' }), { status: 200 })
	} catch (error) {
		console.log(error)
		if (error instanceof Error) {
			return new Response(JSON.stringify({ message: error.message }), {
				status: 500,
			})
		}
	}

	return new Response(JSON.stringify({ message: 'success' }), { status: 200 })
}
