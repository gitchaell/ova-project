import { c as createComponent, r as renderTemplate, a as renderComponent, b as createAstro, m as maybeRenderHead } from '../../../chunks/astro/server_C-GoM-57.mjs';
import 'kleur/colors';
import { L as LessonForm } from '../../../chunks/LessonForm_BgtITO7V.mjs';
import { $ as $$MainLayout } from '../../../chunks/MainLayout_C6K2NQ9O.mjs';
import { a as actions } from '../../../chunks/_astro_actions_BP7j5CaX.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro();
const $$lessonId = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$lessonId;
  if (!Astro2.locals.user || !Astro2.params.lessonId) {
    return Astro2.redirect("/login");
  }
  const result = await Astro2.callAction(actions.lesson.find, {
    id: Astro2.params.lessonId
  });
  if (!result || result.error || !result.data) {
    return Astro2.redirect("/login");
  }
  const lesson = result.data;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": lesson.title, "headerTitle": lesson.title, "bodyClass": "px-4" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid pb-20"> ${renderComponent($$result2, "LessonForm", LessonForm, { "lesson": lesson, "mode": "UPDATE", "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/lesson/LessonForm", "client:component-export": "LessonForm" })} </div> ` })}`;
}, "/home/user/ova-project/src/pages/lessons/editor/[lessonId].astro", void 0);

const $$file = "/home/user/ova-project/src/pages/lessons/editor/[lessonId].astro";
const $$url = "/lessons/editor/[lessonId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$lessonId,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
