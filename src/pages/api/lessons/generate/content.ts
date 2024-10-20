import type { APIContext, APIRoute } from 'astro'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import * as dotenv from 'dotenv'
import type { Lesson } from '@/core/lessons/domain/Lesson'
import { courseService } from '@/services/CourseService'
import { userService } from '@/services/UserService'
import {
	LESSON_CONTENT_MAX_LENGTH,
	LESSON_CONTENT_MIN_LENGTH,
} from '@/core/lessons/domain/LessonContent'
import { lessonService } from '@/services/LessonService'

dotenv.config()

export const POST: APIRoute = async (context: APIContext) => {
	try {
		const { lesson } = (await context.request.json()) as {
			lesson: Lesson
		}

		const course = await courseService.findCourse({ id: lesson.courseId })
		const user = await userService.findUser({ id: course.userId })

		const model = new ChatGoogleGenerativeAI({
			modelName: 'gemini-1.5-flash',
			// modelName: 'gemini-1.5-pro',
		})

		const prompt = [
			`Rol:`,
			`Eres un experto planificador de Objetos Virtuales de Aprendizaje (OVAs) y resursos didácticos que son de utilidad para las clases de profesores.`,
			`Contexto:`,
			`Mi nombre es ${user.names}, y soy profesor en ${user.school}. Mis especialidades son: ${user.skills}.`,
			`El curso que imparto se titula: ${course.title}. Los temas o conceptos clave de este curso son: ${course.concepts}. El nivel de mis estudiantes es: ${course.level}.`,
			`La lección del día se titula ${lesson.title} y el propósito es: ${lesson.caption}.`,
			'Indicaciones:',
			'1. Redacta el contenido de esta OVA en base a mis datos, del curso y de la lección.',
			'2. El contenido debe ser muy bien pensado, didáctico, creativo y adecuado para el nivel de mis estudiantes.',
			'3. Accede a internet en busca de artículos, blogs, etc. que justifiquen y sustenten la información que generes.',
			'4. El contenido debe respetar la estructura Flipped Learning, es decir, pensar en actividades para antes, durante y después de la clase.',
			'5. Agrega tablas y enlaces a recursos gráficos cuando lo creas necesario.',
			'6. Debes dar tu respuesta en formato Markdown',
			`7. El contenido debe tener al menos ${LESSON_CONTENT_MIN_LENGTH} caracteres y lo mucho ${
				LESSON_CONTENT_MAX_LENGTH
			} caracteres.`,
			`8. Ten en cuenta que este contenido solo lo podré ver yo y lo usaré como una guía para mis sesiones educativas.`,
		].join('\n')

		const output = await model.invoke(prompt)

		await lessonService.saveLesson({
			...lesson,
			id: lesson.id,
			content: output.content.toString(),
		})

		return new Response(JSON.stringify({ message: 'success' }), { status: 200 })
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
