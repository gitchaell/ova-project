import { l as lessonService } from '../../chunks/LessonService_Bd77hKO8.mjs';
import { getWeek, getWeekYear } from 'date-fns';
export { renderers } from '../../renderers.mjs';

const GET = async (context) => {
  let lessons = [];
  try {
    const { courseId } = context.request.url.includes("?") ? Object.fromEntries(
      new URLSearchParams(context.request.url.split("?")[1])
    ) : { courseId: null };
    if (!courseId) {
      return new Response(
        JSON.stringify({ message: "El Id del curso es requerido." }),
        {
          status: 400
        }
      );
    }
    lessons = await lessonService.searchLessons({ courseId });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
          stack: error.stack
        }),
        { status: 400 }
      );
    }
  }
  return new Response(
    JSON.stringify({
      message: "success",
      count: {
        all: lessons.length,
        done: lessons.filter((lesson) => lesson.done).length,
        undone: lessons.filter((lesson) => !lesson.done).length
      },
      lessons: {
        all: groupLessons(lessons),
        done: groupLessons(lessons.filter((lesson) => lesson.done)),
        undone: groupLessons(lessons.filter((lesson) => !lesson.done))
      }
    }),
    {
      status: 200
    }
  );
};
const POST = async (context) => {
  try {
    const lesson = await context.request.json();
    await lessonService.saveLesson(lesson);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return new Response(
        JSON.stringify({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
          stack: error.stack
        }),
        { status: 400 }
      );
    }
  }
  return new Response(JSON.stringify({ message: "success" }), { status: 200 });
};
const DELETE = async (context) => {
  try {
    const params = await context.request.json();
    await lessonService.removeLesson(params.lessonId);
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
          stack: error.stack
        }),
        { status: 400 }
      );
    }
  }
  return new Response(JSON.stringify({ message: "success" }), { status: 200 });
};
const groupLessons = (lessons) => {
  const lessonMap = /* @__PURE__ */ new Map();
  lessons.forEach((lesson) => {
    const startDate = new Date(lesson.start);
    const week = getWeek(startDate);
    const year = getWeekYear(startDate);
    const key = `${year}-${week}`;
    if (!lessonMap.has(key)) {
      lessonMap.set(key, []);
    }
    lessonMap.get(key).push(lesson);
  });
  const groups = Array.from(lessonMap, ([key, lessons2]) => {
    const [year, week] = key.split("-").map(Number);
    return {
      key,
      year,
      week,
      lessons: lessons2
    };
  });
  groups.sort((a, b) => a.year === b.year ? a.week - b.week : a.year - b.year);
  return groups;
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	DELETE,
	GET,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
