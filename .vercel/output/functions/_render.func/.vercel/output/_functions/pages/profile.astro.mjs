import { c as createComponent, r as renderTemplate, a as renderComponent, b as createAstro, m as maybeRenderHead } from '../chunks/astro/server_C-GoM-57.mjs';
import 'kleur/colors';
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction, $ as $$MainLayout } from '../chunks/MainLayout_C6K2NQ9O.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { B as Button, n as navigate } from '../chunks/button_8d98dCD9.mjs';
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, I as Input, e as FormMessage } from '../chunks/form_qp9dzUxP.mjs';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { u as useToast } from '../chunks/BaseLayout_CepjJgi_.mjs';
import { Info } from 'lucide-react';
import { A as Alert, a as AlertTitle, b as AlertDescription } from '../chunks/alert_BYjylnn6.mjs';
import { T as Textarea } from '../chunks/textarea_D3HzyVYa.mjs';
import { U as USER_NAMES_MIN_LENGTH, a as USER_NAMES_MAX_LENGTH } from '../chunks/UserNames_Bc3wNygV.mjs';
import { a as actions } from '../chunks/_astro_actions_BP7j5CaX.mjs';
export { renderers } from '../renderers.mjs';

const formSchema = z.object({
  names: z.string().min(USER_NAMES_MIN_LENGTH).max(USER_NAMES_MAX_LENGTH),
  school: z.string().min(2).max(700),
  skills: z.string().min(2).max(700)
});
const UserProfileForm = ({ user }) => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      names: user.names,
      school: user.school || "",
      skills: user.skills || ""
    }
  });
  const onSubmit = async (values) => {
    const response = await fetch(`/api/users/${user.id}/profile`, {
      method: "POST",
      headers: {
        "Accept": "application.json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });
    const data = await response.json();
    if (data.message === "success") {
      toast({
        title: "Datos actualizados!",
        description: "Tus datos han sido actualizados"
      });
    } else {
      toast({
        title: "Algo salió mal!",
        description: data.message,
        variant: "destructive"
      });
    }
  };
  const onDeleteAccount = async () => {
    const response = await fetch(`/api/users/${user.id}/remove`, {
      method: "POST"
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
  return /* @__PURE__ */ jsxs(AlertDialog, { children: [
    /* @__PURE__ */ jsxs(Alert, { className: "bg-blue-50 border-blue-600", children: [
      /* @__PURE__ */ jsx(Info, { className: "h-4 w-4", color: "rgb(37 99 235)" }),
      /* @__PURE__ */ jsx(AlertTitle, { className: "text-blue-600", children: /* @__PURE__ */ jsx("strong", { children: "Formulario de datos personales" }) }),
      /* @__PURE__ */ jsx(AlertDescription, { className: "text-blue-600", children: "En este espacio puede detallar datos que pueden ser de mayor utilidad en la generación de las lecciones de tus cursos." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-4 mt-4", children: /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "grid gap-4", children: [
      /* @__PURE__ */ jsx(
        FormField,
        {
          control: form.control,
          name: "names",
          render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Nombre completo" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "Ingresa tus nombres y apellidos",
                autoComplete: "name",
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
          name: "school",
          render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Nombre de tu centro educativo" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
              Textarea,
              {
                placeholder: "Centro educativo, plataforma virtual, etc.",
                className: "resize-none",
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
          name: "skills",
          render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Tu especialidad en cursos o materias" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
              Textarea,
              {
                placeholder: "Matemáticas de nivel primaria, comunicación verbal, historia, etc.",
                className: "resize-none",
                ...field
              }
            ) }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full mt-4", children: "Guardar cambios" }),
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", className: "w-full", children: /* @__PURE__ */ jsx("a", { href: "/", children: "Volver al inicio" }) }),
      /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { type: "button", variant: "destructive", className: "w-full", children: "Eliminar cuenta de usuario" }) })
    ] }) }) }),
    /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "¿Está seguro de eliminar tu cuenta?" }),
        /* @__PURE__ */ jsx(AlertDialogDescription, { children: "Esta acción no se podrá deshacer. Todos los datos de tu cuenta serán eliminados permanentemente de la de base de datos." })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancelar" }),
        /* @__PURE__ */ jsx(
          AlertDialogAction,
          {
            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            onClick: onDeleteAccount,
            children: "Eliminar cuenta"
          }
        )
      ] })
    ] })
  ] });
};

const $$Astro = createAstro();
const $$Profile = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Profile;
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
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Perfil", "headerTitle": "Perfil de usuario" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="grid place-content-center px-4 pb-10"> ${renderComponent($$result2, "UserProfileForm", UserProfileForm, { "user": user, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/user/UserProfileForm", "client:component-export": "UserProfileForm" })} </div> ` })}`;
}, "/home/user/ova-project/src/pages/profile.astro", void 0);

const $$file = "/home/user/ova-project/src/pages/profile.astro";
const $$url = "/profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Profile,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
