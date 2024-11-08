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
			'Rol:\n{role}\nContexto:\n{user}\n{course}\nIndicaciones:\n{indications}\nFormat:\n{format}',
		)

		const parser = StructuredOutputParser.fromZodSchema(
			z.array(
				z.object({
					title: z
						.string()
						.describe(
							'Título de la lección/OVA o tema relacionado con el contenido de la lección/OVA',
						),
					caption: z
						.string()
						.describe(
							'Descripción resumida de la lección/OVA o tema relacionado con el contenido de la lección/OVA',
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
			role: `Eres un experto planificador de Objetos Virtuales de Aprendizaje (OVAs) y resursos didácticos que son de utilidad para las clases de profesores.`,
			user: `Mi nombre es ${user.names}, y soy profesor en ${user.school}. Mis especialidades son: ${user.skills}.`,
			course: `El curso que imparto se titula: ${course.title}. Los temas o conceptos clave de este curso son: ${course.concepts}. El nivel de mis estudiantes es: ${course.level}. El curso inicia en ${courseDateFormatter.format(new Date(course.start))} y termina en ${courseDateFormatter.format(new Date(course.end))}. Los días de la semana en las que imparto el curso son: ${course.schedules}.`,
			indications: [
				'1. Genera una lista de OVAs por cada sesión diaria que tendré mientras dure el curso.',
				'2. La OVA debe ser muy bien pensada y adecuada para el nivel de mis estudiantes.',
				'3. El título y descripción debes ser precisas y deben envidenciar el propósito de la lección.',
				'4. NO agregues ```json al inicio ni ``` al final.',
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
