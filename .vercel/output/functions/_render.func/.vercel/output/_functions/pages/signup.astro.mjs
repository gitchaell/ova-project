import { c as createComponent, r as renderTemplate, a as renderComponent } from '../chunks/astro/server_C-GoM-57.mjs';
import 'kleur/colors';
/* empty css                                 */
import { jsxs, jsx } from 'react/jsx-runtime';
import { B as Button, n as navigate } from '../chunks/button_8d98dCD9.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from '../chunks/card_CVbpHiJx.mjs';
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, I as Input, e as FormMessage } from '../chunks/form_qp9dzUxP.mjs';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { u as useToast } from '../chunks/BaseLayout_CepjJgi_.mjs';
import { a as USER_NAMES_MAX_LENGTH } from '../chunks/UserNames_Bc3wNygV.mjs';
import { U as USER_PASSWORD_MIN_LENGTH, a as USER_PASSWORD_MAX_LENGTH } from '../chunks/UserPasswordHash_DZw5iRFw.mjs';
import { $ as $$AuthLayout } from '../chunks/AuthLayout_CffZrs5F.mjs';
export { renderers } from '../renderers.mjs';

const formSchema = z.object({
  firstname: z.string().min(2).max(USER_NAMES_MAX_LENGTH / 2),
  lastname: z.string().min(2).max(USER_NAMES_MAX_LENGTH / 2),
  email: z.string().email(),
  password: z.string().min(USER_PASSWORD_MIN_LENGTH).max(USER_PASSWORD_MAX_LENGTH)
});
const UserSignupForm = () => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema)
  });
  const onSubmit = async (values) => {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Accept": "application.json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });
    const data = await response.json();
    if (data.message === "success") {
      form.reset();
      toast({
        title: "Registrado!",
        description: "Te has registrado correctamente! Redireccionando a inicio de sesión ..."
      });
      setTimeout(() => {
        navigate();
      }, 3e3);
    } else {
      toast({
        title: "Algo salió mal!",
        description: data.message,
        variant: "destructive"
      });
    }
  };
  return /* @__PURE__ */ jsxs(Card, { className: "mx-auto max-w-sm", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-xl", children: "Registro de usuarios" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Ingresa tu información para registrarte como nuevo usuario" })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { className: "grid gap-4", children: [
      /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "grid gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx(
            FormField,
            {
              control: form.control,
              name: "firstname",
              render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                /* @__PURE__ */ jsx(FormLabel, { children: "Nombres" }),
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    placeholder: "Jhon",
                    autoComplete: "given-name",
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
              name: "lastname",
              render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                /* @__PURE__ */ jsx(FormLabel, { children: "Apellidos" }),
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                  Input,
                  {
                    placeholder: "Doe",
                    autoComplete: "family-name",
                    ...field
                  }
                ) }),
                /* @__PURE__ */ jsx(FormMessage, {})
              ] })
            }
          )
        ] }),
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
                  autoComplete: "new-password",
                  placeholder: "Crea un contraseña segura",
                  ...field
                }
              ) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full mt-4", children: "Crear una cuenta" }),
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", className: "w-full", children: "Registrarme con LinkedIn" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 text-center text-sm", children: [
        "¿Ya estás registrado?",
        " ",
        /* @__PURE__ */ jsx(Button, { variant: "link", className: "underline", children: /* @__PURE__ */ jsx("a", { href: "/login", children: "Iniciar sesión" }) })
      ] })
    ] })
  ] });
};

const $$Signup = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AuthLayout", $$AuthLayout, { "title": "Registro de usuarios", "description": "Ingresa tu informaci\xF3n para registrarte como nuevo usuario" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "UserSignupForm", UserSignupForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/user/UserSignupForm", "client:component-export": "UserSignupForm" })} ` })}`;
}, "/home/user/ova-project/src/pages/signup.astro", void 0);

const $$file = "/home/user/ova-project/src/pages/signup.astro";
const $$url = "/signup";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Signup,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
