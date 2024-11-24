import { c as createComponent, r as renderTemplate, a as renderComponent, b as createAstro, d as renderSlot } from './astro/server_C-GoM-57.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from './BaseLayout_CepjJgi_.mjs';

const $$Astro = createAstro();
const $$AuthLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AuthLayout;
  const { title, description } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description, "bodyClass": "grid place-content-center" }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })}`;
}, "/home/user/ova-project/src/layouts/AuthLayout.astro", void 0);

export { $$AuthLayout as $ };
