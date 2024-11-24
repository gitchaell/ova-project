import { u as userService } from '../../../../chunks/UserService_BDUu-52_.mjs';
export { renderers } from '../../../../renderers.mjs';

const POST = async (context) => {
  try {
    if (!context.locals.session) {
      return new Response(JSON.stringify({ message: "Sesión expirada" }), {
        status: 401
      });
    }
    const userId = context.params.id;
    const sessionId = context.locals.session.id;
    const sessionCookie = await userService.removeUser(userId, sessionId);
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
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
  return new Response(JSON.stringify({ message: "success" }), { status: 200 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };