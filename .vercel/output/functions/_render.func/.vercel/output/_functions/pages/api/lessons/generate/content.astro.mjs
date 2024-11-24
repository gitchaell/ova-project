import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import * as dotenv from 'dotenv';
import { c as courseService } from '../../../../chunks/CourseService_BKaDX8jH.mjs';
import { u as userService } from '../../../../chunks/UserService_BDUu-52_.mjs';
import { L as LESSON_CONTENT_MIN_LENGTH, a as LESSON_CONTENT_MAX_LENGTH } from '../../../../chunks/LessonContent_BHymJ9VX.mjs';
import { l as lessonService } from '../../../../chunks/LessonService_Bd77hKO8.mjs';
export { renderers } from '../../../../renderers.mjs';

dotenv.config();
const POST = async (context) => {
  try {
    const { lesson } = await context.request.json();
    const course = await courseService.findCourse({ id: lesson.courseId });
    const user = await userService.findUser({ id: course.userId });
    const model = new ChatGoogleGenerativeAI({
      modelName: "gemini-1.5-pro"
    });
    const prompt = [
      `### Rol:`,
      `Eres un experto en diseño de Objetos Virtuales de Aprendizaje (OVAs) y recursos didácticos, especializado en apoyar a profesores a planificar lecciones efectivas y creativas.`,
      ``,
      `### Contexto:`,
      `- Mi nombre es **${user.names}**, y soy profesor en **${user.school}**.`,
      `- Mis especialidades son: **${user.skills}**.`,
      `- El curso que imparto se titula: **${course.title}**.`,
      `- Los temas o conceptos clave del curso son: **${course.concepts}**.`,
      `- El nivel de mis estudiantes es: **${course.level}**.`,
      ``,
      `### Información de la lección:`,
      `- Título: **${lesson.title}**.`,
      `- Propósito: **${lesson.caption}**.`,
      ``,
      `### Instruccions:`,
      `1. Crea el contenido de la lección basado en los datos proporcionados sobre el curso y el propósito de la lección.`,
      `2. Estructura el contenido siguiendo el modelo de **Flipped Learning**, que incluye:`,
      `   - Actividades para **antes** de la clase.`,
      `   - Actividades para **durante** la clase.`,
      `   - Actividades para **después** de la clase.`,
      `3. El contenido debe ser:`,
      `   - **Didáctico**, **creativo** y **adecuado** para el nivel de mis estudiantes.`,
      `   - Redactado en **Markdown** con tablas y listas cuando sea necesario.`,
      `   - Tener entre **${LESSON_CONTENT_MIN_LENGTH} y ${LESSON_CONTENT_MAX_LENGTH} caracteres**.`,
      ``,
      `### Ejemplo de estructura esperada:`,
      `\`\`\`markdown`,
      `# Título de la lección: ${lesson.title}`,
      ``,
      `## Introducción`,
      `Texto introductorio aquí.`,
      ``,
      `## Actividades antes de la clase`,
      `- Instrucciones para los estudiantes.`,
      ``,
      `## Actividades durante la clase`,
      `- Descripción detallada.`,
      ``,
      `## Actividades después de la clase`,
      `- Tareas o actividades sugeridas.`,
      ``,
      `\`\`\``,
      ``,
      `Por favor, asegúrate de respetar la estructura anterior y usar Markdown.`
    ].join("\n");
    const output = await model.invoke(prompt);
    const content = output.content.toString();
    await lessonService.saveLesson({
      ...lesson,
      id: lesson.id,
      content
    });
    return new Response(JSON.stringify({ message: "success" }), { status: 200 });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500
      });
    }
  }
  return new Response(JSON.stringify({ message: "success", lessons: [] }), {
    status: 200
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
