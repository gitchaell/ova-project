import type { APIContext, APIRoute } from 'astro'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import * as dotenv from 'dotenv'
import { z } from 'zod'
import type { User } from '@/core/users/domain/User'
import type { Course } from '@/core/courses/domain/Course'

dotenv.config()

export const POST: APIRoute = async (context: APIContext) => {
	try {
		const { user, course } = (await context.request.json()) as {
			user: User
			course: Course
		}

		const formatter = new Intl.DateTimeFormat('es', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})

		const model = new ChatGoogleGenerativeAI({
			modelName: 'gemini-1.5-flash',
			// modelName: 'gemini-1.5-pro',
		})

		const prompt = [
			`Eres un experto planificador de Objetos Virtuales de Aprendizaje (OVAs) y resursos didácticos que son de utilidad para las clases de profesores.`,
			`Mi nombre es ${user.names}, y soy profesor en ${user.school}. Mis especialidades son: ${user.skills}.`,
			`Genera un plan de OVAs para el curso de ${course.title}. Los temas o conceptos clave de este curso son: ${course.concepts}. El nivel de mis estudiantes es: ${course.level}. El curso inicia en ${formatter.format(new Date(course.start))} y termina en ${formatter.format(new Date(course.end))}. Los días de la semana en las que imparto el curso son: ${course.schedules}.`,
			'Las instrucciones son:',
			'1. Debes generar una lista de OVAs por cada sesión diaria que tendré mientras dure el curso.',
			'2. La OVA debe ser muy bien pensada y adecuada para el nivel de mis estudiantes.',
			'3. El título y descripción debes ser precisas y deben envidenciar el propósito de la lección.',
			'4. Tu respuesta debe respetar el siguiente esquema en formato JSON:',
			'[',
			'  {',
			'    "title": "Título de la lección/OVA o tema relacionado con el contenido de la lección/OVA. El total de caracteres debe ser entre 200 y 300 caracteres',
			'    "caption": "Descripción resumida de la lección/OVA o tema relacionado con el contenido de la lección/OVA. El total de caracteres debe ser entre 200 y 400 caracteres',
			'    "start": "Fecha de inicio de la lección en formato ISO 8601",',
			'    "end": "Fecha de fin de la lección en formato ISO 8601",',
			'  }',
			']',
			'5. No agregues ```json al inicio ni ``` al final de tu respuesta.',
		].join('\n')

		const responseSchema = z.array(
			z.object({
				title: z
					.string()
					.min(200)
					.max(300)
					.describe(
						'Título de la lección/OVA o tema relacionado con el contenido de la lección/OVA',
					),
				caption: z
					.string()
					.min(200)
					.max(400)
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
		)

		const output = await model.invoke(prompt)

		console.log(JSON.parse(output.content.toString()))

		return new Response(
			JSON.stringify({
				message: 'success',
				lessons: JSON.parse(output.content.toString()),
			}),
			{
				status: 200,
			},
		)
	} catch (error) {
		console.log(error)
		if (error instanceof Error) {
			return new Response(JSON.stringify({ message: error.message }), {
				status: 500,
			})
		}
	}

	return new Response(JSON.stringify({ message: 'success', lessons: [] }), {
		status: 200,
	})
}
