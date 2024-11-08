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
import { SerperService } from '@/services/SerperService'

dotenv.config()

export const POST: APIRoute = async (context: APIContext) => {
	try {
		const { lesson } = (await context.request.json()) as {
			lesson: Lesson
		}

		const course = await courseService.findCourse({ id: lesson.courseId })
		const user = await userService.findUser({ id: course.userId })

		const web = await SerperService.search(course.title, lesson.title)

		const model = new ChatGoogleGenerativeAI({
			modelName: 'gemini-1.5-pro',
		})

		const prompt = [
			`Rol:`,
			`Eres un experto planificador de Objetos Virtuales de Aprendizaje (OVAs) y resursos didácticos que son de utilidad para las clases de profesores.`,
			`Contexto:`,
			`Mi nombre es ${user.names}, y soy profesor en ${user.school}. Mis especialidades son: ${user.skills}.`,
			`El curso que imparto se titula: ${course.title}. Los temas o conceptos clave de este curso son: ${course.concepts}. El nivel de mis estudiantes es: ${course.level}.`,
			`La lección del día se titula ${lesson.title} y el propósito es: ${lesson.caption}.`,
			'Indicaciones:',
			'- Redacta el contenido de esta OVA en base a mis datos, del curso y de la lección.',
			'- El contenido debe ser muy bien pensado, didáctico, creativo y adecuado para el nivel de mis estudiantes.',
			'- El contenido debe respetar la estructura Flipped Learning, es decir, pensar en actividades para antes, durante y después de la clase.',
			'- Debes dar tu respuesta en formato Markdown.',
			'- Agrega tablas cuando lo creas necesario.',
			`- El contenido debe tener al menos ${LESSON_CONTENT_MIN_LENGTH} caracteres y máximo ${LESSON_CONTENT_MAX_LENGTH} caracteres.`,
			`- Ten en cuenta que este contenido solo lo podré ver yo y lo usaré como una guía para mis sesiones educativas.`,
			'- Usa las siguientes imágenes y vídeos para enriquecer el contenido de esta lección:',
			JSON.stringify(web),
		].join('\n')

		const output = await model.invoke(prompt)

		const annexes: string[] = []

		for (const image of web.images.slice(0, 3)) {
			if (!image) continue
			annexes.push(`### ${image.title}\n`)
			annexes.push(`[![${image.title}](${image.imageUrl})](${image.link})\n\n`)
		}

		for (const video of web.videos.slice(0, 3)) {
			if (!video) continue
			annexes.push(`### ${video.title} - ${video.channel}\n`)
			annexes.push(
				`[![${video.title} - ${video.channel}](${video.imageUrl})](${video.link})\n\n`,
			)
		}

		const content =
			output.content.toString() + `\n\n## Anexos\n\n${annexes.join('')}\n\n`

		await lessonService.saveLesson({
			...lesson,
			id: lesson.id,
			content,
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
