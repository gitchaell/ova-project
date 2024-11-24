import * as dotenv from 'dotenv';
import { l as lessonService } from '../../../../chunks/LessonService_Bd77hKO8.mjs';
import { V as VideoService, a as VideoProvider } from '../../../../chunks/VideoService_DfcGJ-5j.mjs';
export { renderers } from '../../../../renderers.mjs';

dotenv.config();
const POST = async (context) => {
  try {
    const { lesson } = await context.request.json();
    if (!lesson?.image?.length) {
      throw new Error("No se ha encontrado la imágen parámetro.");
    }
    const videoId = await VideoService.generate(
      lesson.image,
      VideoProvider.Stability,
      {}
    );
    if (!videoId?.length) {
      throw new Error(
        "El servicio de generación de vídeos no ha respondido con éxito."
      );
    }
    await lessonService.saveLesson({
      ...lesson,
      id: lesson.id,
      videoId
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
  return new Response(JSON.stringify({ message: "success" }), { status: 200 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
