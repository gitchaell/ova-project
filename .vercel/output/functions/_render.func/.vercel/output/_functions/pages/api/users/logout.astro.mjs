import { u as userService } from '../../../chunks/UserService_BDUu-52_.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async (context) => {
  if (!context.locals.session) {
    return new Response(JSON.stringify({ message: "Sesión expirada" }), {
      status: 401
    });
  }
  const sessionCookie = await userService.logout(context.locals.session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return new Response(JSON.stringify({ message: "success" }), { status: 200 });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
