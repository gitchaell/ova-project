import { c as createComponent, r as renderTemplate, a as renderComponent, b as createAstro, m as maybeRenderHead } from '../../../chunks/astro/server_C-GoM-57.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../../../chunks/MainLayout_C6K2NQ9O.mjs';
import { a as actions } from '../../../chunks/_astro_actions_BP7j5CaX.mjs';
import { randomUUID } from 'node:crypto';
import { L as LessonForm } from '../../../chunks/LessonForm_BgtITO7V.mjs';
import { L as Lesson } from '../../../chunks/Lesson_DklW7y_n.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$Editor = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Editor;
  if (!Astro2.locals.user || !Astro2.params.courseId) {
    return Astro2.redirect("/login");
  }
  const [userResult, courseResult] = await Promise.all([
    Astro2.callAction(actions.user.find, { id: Astro2.locals.user.id }),
    Astro2.callAction(actions.course.find, { id: Astro2.params.courseId })
  ]);
  if (!userResult || userResult.error || !userResult.data || !courseResult || courseResult.error || !courseResult.data) {
    return Astro2.redirect("/login");
  }
  userResult.data;
  const course = courseResult.data;
  const lesson = Lesson.createLesson({
    id: randomUUID(),
    courseId: course.id
  });
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Formulario de la Lecci\xF3n", "headerTitle": "Formulario de la Lecci\xF3n", "bodyClass": "px-4" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid place-content-center px-4 pb-10"> ${renderComponent($$result2, "LessonForm", LessonForm, { "lesson": lesson, "mode": "CREATE", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/lesson/LessonForm", "client:component-export": "LessonForm" })} </div> ` })}`;
}, "/home/user/ova-project/src/pages/lessons/[courseId]/editor.astro", void 0);

const $$file = "/home/user/ova-project/src/pages/lessons/[courseId]/editor.astro";
const $$url = "/lessons/[courseId]/editor";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Editor,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
