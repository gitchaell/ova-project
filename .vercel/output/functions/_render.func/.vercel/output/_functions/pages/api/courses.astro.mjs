import { c as courseService } from '../../chunks/CourseService_BKaDX8jH.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async (context) => {
  let allCourses = [];
  let inProgressCourses = [];
  let upcomingCourses = [];
  let pastCourses = [];
  try {
    const { userId } = context.request.url.includes("?") ? Object.fromEntries(
      new URLSearchParams(context.request.url.split("?")[1])
    ) : { userId: null };
    if (!userId) {
      return new Response(
        JSON.stringify({ message: "El Id del usuario es requerido." }),
        {
          status: 400
        }
      );
    }
    allCourses = await courseService.searchCourses({ userId });
    inProgressCourses = allCourses.filter(
      (course) => new Date(course.start) <= /* @__PURE__ */ new Date() && /* @__PURE__ */ new Date() <= new Date(course.end)
    );
    upcomingCourses = allCourses.filter(
      (course) => /* @__PURE__ */ new Date() < new Date(course.start)
    );
    pastCourses = allCourses.filter(
      (course) => new Date(course.end) < /* @__PURE__ */ new Date()
    );
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
      courses: {
        all: allCourses,
        inProgress: inProgressCourses,
        upcoming: upcomingCourses,
        past: pastCourses
      }
    }),
    {
      status: 200
    }
  );
};
const POST = async (context) => {
  try {
    const course = await context.request.json();
    await courseService.saveCourse(course);
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
    await courseService.removeCourse(params.courseId);
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	DELETE,
	GET,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
