import { c as createComponent, r as renderTemplate, a as renderComponent, b as createAstro, m as maybeRenderHead } from '../../chunks/astro/server_C-GoM-57.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../../chunks/MainLayout_C6K2NQ9O.mjs';
import { a as actions } from '../../chunks/_astro_actions_BP7j5CaX.mjs';
import { randomUUID } from 'node:crypto';
import { C as CourseForm } from '../../chunks/CourseForm_CB2jsLtJ.mjs';
import { C as Course } from '../../chunks/Course_D1xd8dtT.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Editor = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Editor;
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
  const course = Course.createCourse({
    id: randomUUID(),
    start: /* @__PURE__ */ new Date(),
    userId: user.id
  });
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Formulario de Curso", "headerTitle": "Formulario de curso", "bodyClass": "px-4" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid place-content-center px-4 pb-10"> ${renderComponent($$result2, "CourseForm", CourseForm, { "course": course, "mode": "CREATE", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/course/CourseForm", "client:component-export": "CourseForm" })} </div> ` })}`;
}, "/home/user/ova-project/src/pages/courses/editor.astro", void 0);

const $$file = "/home/user/ova-project/src/pages/courses/editor.astro";
const $$url = "/courses/editor";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Editor,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
