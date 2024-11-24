import { c as createComponent, r as renderTemplate, a as renderComponent, b as createAstro, m as maybeRenderHead } from '../../../chunks/astro/server_C-GoM-57.mjs';
import 'kleur/colors';
import { C as CourseForm } from '../../../chunks/CourseForm_CB2jsLtJ.mjs';
import { $ as $$MainLayout } from '../../../chunks/MainLayout_C6K2NQ9O.mjs';
import { a as actions } from '../../../chunks/_astro_actions_BP7j5CaX.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$courseId = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$courseId;
  if (!Astro2.locals.user || !Astro2.params.courseId) {
    return Astro2.redirect("/login");
  }
  const result = await Astro2.callAction(actions.course.find, {
    id: Astro2.params.courseId
  });
  if (!result || result.error || !result.data) {
    return Astro2.redirect("/login");
  }
  const course = result.data;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Formulario de Curso", "headerTitle": "Formulario de Curso", "bodyClass": "px-4" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid place-content-center px-4 pb-10"> ${renderComponent($$result2, "CourseForm", CourseForm, { "course": course, "mode": "UPDATE", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/course/CourseForm", "client:component-export": "CourseForm" })} </div> ` })}`;
}, "/home/user/ova-project/src/pages/courses/editor/[courseId].astro", void 0);

const $$file = "/home/user/ova-project/src/pages/courses/editor/[courseId].astro";
const $$url = "/courses/editor/[courseId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$courseId,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
