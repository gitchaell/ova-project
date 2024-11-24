import { c as createComponent, r as renderTemplate, a as renderComponent, b as createAstro } from '../chunks/astro/server_C-GoM-57.mjs';
import 'kleur/colors';
/* empty css                                 */
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { B as Button, n as navigate } from '../chunks/button_8d98dCD9.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from '../chunks/card_CVbpHiJx.mjs';
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, I as Input, e as FormMessage } from '../chunks/form_qp9dzUxP.mjs';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { u as useToast } from '../chunks/BaseLayout_CepjJgi_.mjs';
import { Info, ArrowRight } from 'lucide-react';
import { A as Alert, b as AlertDescription } from '../chunks/alert_BYjylnn6.mjs';
import { U as USER_PASSWORD_MIN_LENGTH, a as USER_PASSWORD_MAX_LENGTH } from '../chunks/UserPasswordHash_DZw5iRFw.mjs';
import { $ as $$AuthLayout } from '../chunks/AuthLayout_CffZrs5F.mjs';
export { renderers } from '../renderers.mjs';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(USER_PASSWORD_MIN_LENGTH).max(USER_PASSWORD_MAX_LENGTH)
});
const UserLoginForm = () => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema)
  });
  const onSubmit = async (values) => {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Accept": "application.json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });
    const data = await response.json();
    if (data.message === "success") {
      navigate();
    } else {
      toast({
        title: "Algo salió mal!",
        description: data.message,
        variant: "destructive"
      });
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Alert, { className: "mx-auto max-w-sm bg-blue-50 border-blue-600", children: [
      /* @__PURE__ */ jsx(Info, { className: "h-4 w-4", color: "rgb(37 99 235)" }),
      /* @__PURE__ */ jsxs(AlertDescription, { className: "text-blue-600", children: [
        "Esta aplicación te permite generar",
        " ",
        /* @__PURE__ */ jsx("strong", { children: "Objetos Virtuales de Aprendizaje (OVAs)" }),
        " aprovechando las bondades de la",
        " ",
        /* @__PURE__ */ jsx("strong", { children: "Inteligencia Artificial generativa (IA)" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "mx-auto max-w-sm mt-4", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-xl", children: "Inicio de sesión" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Ingresa tus credenciales para iniciar sesión" })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "grid gap-4", children: [
        /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "grid gap-4", children: [
          /* @__PURE__ */ jsx(
            FormField,
            {
              control: form.control,
              name: "email",
              render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                /* @__PURE__ */ jsx(FormLabel, { children: "Correo electrónico" }),
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "email",
                    autoComplete: "email",
                    placeholder: "maestro@escuela.com",
                    ...field
                  }
                ) }),
                /* @__PURE__ */ jsx(FormMessage, {})
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            FormField,
            {
              control: form.control,
              name: "password",
              render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                /* @__PURE__ */ jsx(FormLabel, { children: "Contraseña" }),
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "password",
                    autoComplete: "current-password",
                    placeholder: "Ingresa tu contraseña",
                    ...field
                  }
                ) }),
                /* @__PURE__ */ jsx(FormMessage, {})
              ] })
            }
          ),
          /* @__PURE__ */ jsxs(Button, { type: "submit", className: "w-full mt-4", children: [
            "Iniciar sesión ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
          ] }),
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", className: "w-full", children: "Iniciar sesión con Google" }),
          /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", className: "w-full", children: "Iniciar sesión con LinkedIn" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 text-center text-sm", children: [
          "Aún no estás registrado?",
          " ",
          /* @__PURE__ */ jsx(Button, { variant: "link", className: "underline", children: /* @__PURE__ */ jsx("a", { href: "/signup", children: "Crear una cuenta" }) })
        ] })
      ] })
    ] })
  ] });
};

const $$Astro = createAstro();
const $$Login = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  if (Astro2.locals.user) {
    return Astro2.redirect("/");
  }
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, { "title": "Inicio de sesi\xF3n", "description": "Accede a tu cuenta" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "UserLoginForm", UserLoginForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/user/UserLoginForm", "client:component-export": "UserLoginForm" })} ` })}`;
}, "/home/user/ova-project/src/pages/login.astro", void 0);

const $$file = "/home/user/ova-project/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Login,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
