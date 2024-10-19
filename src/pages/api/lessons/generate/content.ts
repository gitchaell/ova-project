import type { APIContext, APIRoute } from 'astro'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import * as dotenv from 'dotenv'
import { z } from 'zod'
import type { User } from '@/core/users/domain/User'
import type { Course } from '@/core/courses/domain/Course'
import { courseDateFormatter } from '@/core/courses/domain/CourseDate'

dotenv.config()

export const POST: APIRoute = async (context: APIContext) => {
	try {
		const { user, course } = (await context.request.json()) as {
			user: User
			course: Course
		}

		const model = new ChatGoogleGenerativeAI({
			modelName: 'gemini-1.5-flash',
			// modelName: 'gemini-1.5-pro',
		})

		const prompt = [
			`Eres un experto planificador de Objetos Virtuales de Aprendizaje (OVAs) y resursos didácticos que son de utilidad para las clases de profesores.`,
			`Mi nombre es ${user.names}, y soy profesor en ${user.school}. Mis especialidades son: ${user.skills}.`,
			`Genera un plan de OVAs para el curso de ${course.title}. Los temas o conceptos clave de este curso son: ${course.concepts}. El nivel de mis estudiantes es: ${course.level}. El curso inicia en ${courseDateFormatter.format(new Date(course.start))} y termina en ${courseDateFormatter.format(new Date(course.end))}. Los días de la semana en las que imparto el curso son: ${course.schedules}.`,
			'Tus instrucciones son:',
			'1. Genera una lista de OVAs por cada sesión diaria que tendré mientras dure el curso.',
			'2. El contenido de cada OVA debe ser muy bien pensada y adecuada para el nivel de mis estudiantes.',
			'3. Accede a internet en busca de artículos, blogs, etc. que justifiquen y sustenten la información generada.',
			'4. Cada OVA que generes debe respetar la estructura Flipped Learning, es decir, pensar en actividad para antes, durante y después de la clase.',
			'5. Agrega tablas y enlaces a recursos gráficos cuando lo creas necesario.',
			'6. Tu respuesta debe respetar este esquema en formato JSON:',
			'',
			'[',
			'  {',
			'    "title": "Título de la lección/OVA o tema relacionado con el contenido de la lección/OVA. El total de caracteres debe ser entre 200 y 300",',
			'    "caption": "Descripción resumida de la lección/OVA o tema relacionado con el contenido de la lección/OVA. El total de caracteres debe ser entre 200 y 400",',
			'    "start": "Fecha de inicio de la lección en formato ISO 8601",',
			'    "end": "Fecha de fin de la lección en formato ISO 8601",',
			'    "content": "Contenido de la lección en formato markdown. El total de caracteres debe ser entre 100 y 2000."',
			'  }',
			']',
			'',
			'7. Solamente la propiedad "content" debe tener el formato mardown, tu respuesta en general debe tener formato JSON, eso significa que NO debes agregar ```json al inicio ni ``` al final.',
			'8. Para el contenido markdown de la propiedad "content" usa \\n para los saltos de línea para su correcto parseado.',
			'9. En cada comilla(") que uses en el contenido markdown, tebes tener en cuenta que es un contenido dentro de comillas, por lo que debes escaparlos.',
			'10. Solo genera un único array que contenga todos los objetos según el esquema.',
		].join('\n')

		const responseSchema = z.array(
			z.object({
				title: z.string(),
				caption: z.string(),
				start: z.string(),
				end: z.string(),
				content: z.string(),
			}),
		)

		const output = await model.invoke(prompt)
		// .withStructuredOutput(responseSchema)

		console.log(output.content)
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
