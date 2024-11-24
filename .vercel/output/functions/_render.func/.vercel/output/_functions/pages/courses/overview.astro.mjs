import { c as createComponent, r as renderTemplate, a as renderComponent, b as createAstro } from '../../chunks/astro/server_C-GoM-57.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../../chunks/MainLayout_C6K2NQ9O.mjs';
import { C as CourseList } from '../../chunks/CourseList_hCFBzzDO.mjs';
import { a as actions } from '../../chunks/_astro_actions_BP7j5CaX.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Overview = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Overview;
  if (!Astro2.locals.user) {
    return Astro2.redirect("/login");
  }
  const result = await Astro2.callAction(actions.user.find, {
    id: Astro2.locals.user.id
  });
  if (!result || result.error || !result.data) {
    return Astro2.redirect("/login");
  }
  const user = result.data;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Inicio", "headerTitle": "Mis cursos", "bodyClass": "px-4" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CourseList", CourseList, { "user": user, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/course/CourseList", "client:component-export": "CourseList" })} ` })}`;
}, "/home/user/ova-project/src/pages/courses/overview.astro", void 0);

const $$file = "/home/user/ova-project/src/pages/courses/overview.astro";
const $$url = "/courses/overview";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Overview,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
