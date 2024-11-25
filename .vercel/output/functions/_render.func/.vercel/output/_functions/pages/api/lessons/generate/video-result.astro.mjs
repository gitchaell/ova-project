import { l as lessonService } from '../../../../chunks/LessonService_Bd77hKO8.mjs';
import { S as StorageService } from '../../../../chunks/StorageService_B90JeVMn.mjs';
import { V as VideoService, a as VideoProvider } from '../../../../chunks/VideoService_DfcGJ-5j.mjs';
export { renderers } from '../../../../renderers.mjs';

const POST = async (context) => {
  try {
    const { lesson } = await context.request.json();
    if (!lesson?.videoId?.length) {
      throw new Error("Hubo un error al generar el video.");
    }
    const file = await VideoService.getVideo(
      lesson.videoId,
      VideoProvider.Stability
    );
    const url = await StorageService.upload(file);
    await lessonService.saveLesson({
      ...lesson,
      id: lesson.id,
      video: url
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
