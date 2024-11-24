import { jsxs, jsx } from 'react/jsx-runtime';
import { B as Button, n as navigate } from './button_8d98dCD9.mjs';
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, I as Input, e as FormMessage } from './form_qp9dzUxP.mjs';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { u as useToast, c as cn } from './BaseLayout_CepjJgi_.mjs';
import { Info, CalendarIcon } from 'lucide-react';
import { A as Alert, a as AlertTitle, b as AlertDescription } from './alert_BYjylnn6.mjs';
import { T as Textarea } from './textarea_D3HzyVYa.mjs';
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from './MainLayout_C6K2NQ9O.mjs';
import { P as Popover, a as PopoverTrigger, b as PopoverContent, C as Calendar } from './calendar_o5OmdHHB.mjs';
import { c as courseDateFormatter } from './CourseDate_De5miepE.mjs';
import { C as COURSE_TITLE_MIN_LENGTH, a as COURSE_TITLE_MAX_LENGTH, b as COURSE_CONCEPTS_MIN_LENGTH, c as COURSE_CONCEPTS_MAX_LENGTH, d as COURSE_LEVEL_MIN_LENGTH, e as COURSE_LEVEL_MAX_LENGTH, f as COURSE_SCHEDULES_MAX_LENGTH } from './CourseSchedule_CFnDbjrM.mjs';

const formSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(COURSE_TITLE_MIN_LENGTH).max(COURSE_TITLE_MAX_LENGTH),
  concepts: z.string().min(COURSE_CONCEPTS_MIN_LENGTH).max(COURSE_CONCEPTS_MAX_LENGTH),
  level: z.string().min(COURSE_LEVEL_MIN_LENGTH).max(COURSE_LEVEL_MAX_LENGTH),
  start: z.date(),
  end: z.date(),
  schedules: z.string().max(COURSE_SCHEDULES_MAX_LENGTH).optional(),
  userId: z.string().uuid()
}).refine(
  (data) => {
    const minDuration = 6 * 24 * 60 * 60 * 1e3;
    const maxDuration = 6 * 31 * 24 * 60 * 60 * 1e3;
    const duration = data.end.getTime() - data.start.getTime();
    return duration >= minDuration && duration <= maxDuration;
  },
  {
    message: "El curso debe durar mínimo 1 semana y máximo 6 meses.",
    path: ["end"]
  }
);
const CourseForm = ({
  course,
  mode
}) => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: course.id,
      title: course.title || "",
      concepts: course.concepts || "",
      level: course.level || "",
      start: course.start ? new Date(course.start) : /* @__PURE__ */ new Date(),
      end: course.end ? new Date(course.end) : void 0,
      schedules: course.schedules || "",
      userId: course.userId
    }
  });
  const onSubmit = async (values) => {
    const response = await fetch(`/api/courses`, {
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
        title: "Curso guardado!",
        description: mode === "CREATE" ? `El curso ha sido creado` : `El curso "${values.title}" ha sido actualizado`
      });
      navigate();
    } else {
      toast({
        title: "Algo salió mal!",
        description: data.message,
        variant: "destructive"
      });
    }
  };
  const onDelete = async () => {
    const response = await fetch(`/api/courses`, {
      method: "DELETE",
      headers: {
        "Accept": "application.json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ courseId: course.id })
    });
    const data = await response.json();
    if (data.message === "success") {
      toast({
        title: "Curso eliminado",
        description: `El curso "${course.title}" ha sido eliminado`
      });
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
      /* @__PURE__ */ jsx(AlertTitle, { className: "text-blue-600", children: /* @__PURE__ */ jsx("strong", { children: "Formulario de Cursos" }) }),
      /* @__PURE__ */ jsx(AlertDescription, { className: "text-blue-600", children: "Completa los campos de entrada mostrados a continuación para crear un nuevo Curso." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-4 mt-4", children: /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "grid gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "hidden", children: /* @__PURE__ */ jsx(
        FormField,
        {
          control: form.control,
          name: "id",
          render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Identificador del curso" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "Identificador del curso",
                autoComplete: "id",
                ...field
              }
            ) }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] })
        }
      ) }),
      /* @__PURE__ */ jsx(
        FormField,
        {
          control: form.control,
          name: "title",
          render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "¿Cuál es el título del curso o materia?" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
              Textarea,
              {
                placeholder: "Ejm. Razonamiento verbal",
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
          name: "concepts",
          render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "¿Cuáles son los temas o conceptos más relevantes?" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
              Textarea,
              {
                placeholder: "Ejm. Comprensión de textos argumentativos",
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
          name: "level",
          render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "¿Cuál es el nivel educativo de tus estudiantes?" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
              Textarea,
              {
                placeholder: "Ejm. 2do Primaria, 5to Secundaria, Universitario, etc.",
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
          name: "start",
          render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Fecha de inicio" }),
            /* @__PURE__ */ jsxs(Popover, { children: [
              /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: "outline",
                  className: cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  ),
                  children: [
                    field.value ? courseDateFormatter.format(field.value) : /* @__PURE__ */ jsx("span", { children: "Seleccionar ..." }),
                    /* @__PURE__ */ jsx(CalendarIcon, { className: "ml-auto h-4 w-4 opacity-50" })
                  ]
                }
              ) }) }),
              /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsx(
                Calendar,
                {
                  mode: "single",
                  selected: field.value,
                  onSelect: field.onChange,
                  disabled: (date) => date < /* @__PURE__ */ new Date("1900-01-01"),
                  initialFocus: true
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        FormField,
        {
          control: form.control,
          name: "end",
          render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Fecha de finalización" }),
            /* @__PURE__ */ jsxs(Popover, { children: [
              /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: "outline",
                  className: cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  ),
                  children: [
                    field.value ? courseDateFormatter.format(field.value) : /* @__PURE__ */ jsx("span", { children: "Seleccionar ..." }),
                    /* @__PURE__ */ jsx(CalendarIcon, { className: "ml-auto h-4 w-4 opacity-50" })
                  ]
                }
              ) }) }),
              /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsx(
                Calendar,
                {
                  mode: "single",
                  selected: field.value,
                  onSelect: field.onChange,
                  disabled: (date) => date < /* @__PURE__ */ new Date("1900-01-01"),
                  initialFocus: true
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        FormField,
        {
          control: form.control,
          name: "schedules",
          render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Itinerario del curso" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
              Textarea,
              {
                placeholder: "Ejm. De lunes a viernes, 3 horas cada día",
                className: "resize-none",
                ...field
              }
            ) }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full mt-4", children: "Guardar cambios" }),
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", className: "w-full", children: /* @__PURE__ */ jsx("a", { href: "/", children: "Cancelar" }) }),
      mode === "UPDATE" && /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { type: "button", variant: "destructive", className: "w-full", children: "Eliminar curso" }) })
    ] }) }) }),
    /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "¿Está seguro de eliminar el curso?" }),
        /* @__PURE__ */ jsx(AlertDialogDescription, { children: "Esta acción no se podrá deshacer. Todos los datos del curso serán eliminados permanentemente de la de base de datos." })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancelar" }),
        /* @__PURE__ */ jsx(
          AlertDialogAction,
          {
            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            onClick: onDelete,
            children: "Eliminar curso"
          }
        )
      ] })
    ] })
  ] });
};

export { CourseForm as C };
