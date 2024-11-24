import { jsx, jsxs } from 'react/jsx-runtime';
import { B as Button, n as navigate } from './button_8d98dCD9.mjs';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { L as Label, F as Form, a as FormField, b as FormItem, d as FormControl, e as FormMessage, c as FormLabel, I as Input } from './form_qp9dzUxP.mjs';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { c as cn, u as useToast } from './BaseLayout_CepjJgi_.mjs';
import { Fullscreen, Image, Video, LoaderCircle, Sparkles, Info, CalendarIcon } from 'lucide-react';
import { A as Alert, a as AlertTitle, b as AlertDescription } from './alert_BYjylnn6.mjs';
import { T as Textarea } from './textarea_D3HzyVYa.mjs';
import { A as AlertDialog, D as Dialog, i as DialogTrigger, j as DialogContent, k as DialogHeader, l as DialogTitle, m as DialogDescription, n as DialogFooter, o as DialogClose, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from './MainLayout_C6K2NQ9O.mjs';
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from './tabs_CrHgpoaI.mjs';
import { P as Popover, a as PopoverTrigger, b as PopoverContent, C as Calendar } from './calendar_o5OmdHHB.mjs';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { l as lessonDateFormatter } from './LessonDate_CMDfJMRJ.mjs';
import { b as LESSON_TITLE_MIN_LENGTH, c as LESSON_TITLE_MAX_LENGTH, d as LESSON_CAPTION_MIN_LENGTH, e as LESSON_CAPTION_MAX_LENGTH, a as LESSON_CONTENT_MAX_LENGTH } from './LessonContent_BHymJ9VX.mjs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SwitchPrimitives.Root,
  {
    className: cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsx(
      SwitchPrimitives.Thumb,
      {
        className: cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = SwitchPrimitives.Root.displayName;

const formSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(LESSON_TITLE_MIN_LENGTH).max(LESSON_TITLE_MAX_LENGTH),
  caption: z.string().min(LESSON_CAPTION_MIN_LENGTH).max(LESSON_CAPTION_MAX_LENGTH).optional(),
  content: z.string().max(LESSON_CONTENT_MAX_LENGTH).optional(),
  start: z.date(),
  end: z.date(),
  includeImages: z.boolean(),
  includeVideos: z.boolean(),
  done: z.boolean(),
  courseId: z.string().uuid()
}).refine(
  (data) => {
    const minDuration = 0;
    const maxDuration = 1 * 24 * 60 * 60 * 1e3;
    const duration = data.end.getTime() - data.start.getTime();
    return duration >= minDuration && duration <= maxDuration;
  },
  {
    message: "La lección debe durar mínimo 1 día y máximo 2 días.",
    path: ["end"]
  }
);
const LessonForm = ({
  lesson,
  mode
}) => {
  const { toast } = useToast();
  const [markdownContent, setMarkdownContent] = useState(
    lesson.content || ""
  );
  const [generating, setGenerating] = useState(false);
  const [imagePrompt, setImagePrompt] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: lesson.id,
      title: lesson.title || "",
      caption: lesson.caption || "",
      content: lesson.content || "",
      start: lesson.start ? new Date(lesson.start) : void 0,
      end: lesson.end ? new Date(lesson.end) : void 0,
      includeImages: true,
      includeVideos: true,
      done: lesson.done,
      courseId: lesson.courseId
    }
  });
  useEffect(() => {
    if (lesson?.videoId?.length && !lesson?.video?.length) {
      getVideo();
    }
  }, []);
  const onSubmit = async (values) => {
    const response = await fetch(`/api/lessons`, {
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
        title: "Lección guardada!",
        description: mode === "CREATE" ? `La lección ha sido creada` : `La lección "${values.title}" ha sido actualizada`
      });
      if (mode === "CREATE") {
        navigate("/courses/details/" + lesson.courseId);
      }
    } else {
      toast({
        title: "Algo salió mal!",
        description: data.message,
        variant: "destructive"
      });
    }
  };
  const onGenerateContent = async () => {
    setGenerating(true);
    const response = await fetch(`/api/lessons/generate/content`, {
      method: "POST",
      headers: {
        "Accept": "application.json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ lesson })
    });
    const data = await response.json();
    if (data.message === "success") {
      window.location.reload();
    } else {
      toast({
        title: "Algo salió mal!",
        description: data.message,
        variant: "destructive"
      });
    }
    setGenerating(false);
  };
  const onGenerateImage = async () => {
    if (!imagePrompt?.length) {
      toast({
        title: "Prompt requerido!",
        description: "Debes ingresar un prompt que describa la imágen",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Generando imágen ...",
      description: "La imágen se está generando en segundo plano. Cuando termine, se actualizará la lección."
    });
    const response = await fetch(`/api/lessons/generate/image`, {
      method: "POST",
      headers: {
        "Accept": "application.json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ lesson, imagePrompt })
    });
    const data = await response.json();
    if (data.message === "success") {
      window.location.reload();
    } else {
      toast({
        title: "Algo salió mal!",
        description: data.message,
        variant: "destructive"
      });
    }
  };
  const onGenerateVideo = async () => {
    if (!lesson?.image?.length) {
      toast({
        title: "Imágen requerida!",
        description: "Antes de generar un video, debes generar una imágen",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Generando vídeo ...",
      description: "El vídeo se está generando en segundo plano. Cuando termine, se actualizará la lección."
    });
    const response = await fetch(`/api/lessons/generate/video`, {
      method: "POST",
      headers: {
        "Accept": "application.json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ lesson })
    });
    const data = await response.json();
    if (data.message === "success") ; else {
      toast({
        title: "Algo salió mal!",
        description: data.message,
        variant: "destructive"
      });
    }
  };
  const getVideo = async () => {
    if (lesson?.videoId?.length && !lesson?.video?.length) {
      const response = await fetch("/api/lessons/generate/video-result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ lesson })
      });
      const data = await response.json();
      if (data.message === "success") {
        toast({
          title: "El vídeo se ha generado ...",
          description: "El vídeo se termino de generar. Actualiza la lección."
        });
      }
    }
  };
  const onDelete = async () => {
    const response = await fetch(`/api/lessons`, {
      method: "DELETE",
      headers: {
        "Accept": "application.json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ lessonId: lesson.id })
    });
    const data = await response.json();
    if (data.message === "success") {
      toast({
        title: "Lección eliminada",
        description: `La lección "${lesson.title}" ha sido eliminada`
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
    /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: /* @__PURE__ */ jsxs(Tabs, { defaultValue: mode === "CREATE" ? "DETAIL" : "CONTENT", children: [
      /* @__PURE__ */ jsxs(TabsList, { children: [
        mode === "UPDATE" && /* @__PURE__ */ jsx(TabsTrigger, { value: "CONTENT", children: "Contenido" }),
        mode === "UPDATE" && /* @__PURE__ */ jsx(TabsTrigger, { value: "EDITOR", children: "Editor" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "DETAIL", children: "Detalles" })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "CONTENT", children: markdownContent?.length ? /* @__PURE__ */ jsxs("div", { className: "w-dvw grid gap-4 pr-10 py-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[1fr_min-content_min-content] gap-2", children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => navigate("/lessons/preview/" + lesson.id),
              children: [
                /* @__PURE__ */ jsx(Fullscreen, { className: "h-4 w-4 mr-2" }),
                "Ver en pantalla completa"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(Dialog, { children: [
            /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "default", size: "icon", children: /* @__PURE__ */ jsx(Image, { className: "h-4 w-4" }) }) }),
            /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-[400px]", children: [
              /* @__PURE__ */ jsxs(DialogHeader, { children: [
                /* @__PURE__ */ jsx(DialogTitle, { children: "Generación de imágenes con AI" }),
                /* @__PURE__ */ jsx(DialogDescription, { children: "Usa este formulario para generar una imágen para tu lección en base a un prompt." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid gap-4 py-4", children: [
                /* @__PURE__ */ jsx(Label, { htmlFor: "imagePrompt", children: "Prompt" }),
                /* @__PURE__ */ jsx(
                  Textarea,
                  {
                    id: "imagePrompt",
                    placeholder: "Ejm. Mapa geográfico de Perú en el año 1870",
                    maxLength: 500,
                    autoComplete: "off",
                    autoCorrect: "on",
                    autoCapitalize: "on",
                    spellCheck: true,
                    onChange: (e) => setImagePrompt(e.target.value)
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsx(Button, { type: "button", onClick: onGenerateImage, children: "Generar imágen" }) }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Dialog, { children: [
            /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "default", size: "icon", children: /* @__PURE__ */ jsx(Video, { className: "h-4 w-4" }) }) }),
            /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-[400px]", children: [
              /* @__PURE__ */ jsxs(DialogHeader, { children: [
                /* @__PURE__ */ jsx(DialogTitle, { children: "Generación de vídeos con AI" }),
                /* @__PURE__ */ jsx(DialogDescription, { children: "Generar un vídeo para tu lección en base a la imágen previamente generada." })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "w-full", children: lesson?.image?.length && /* @__PURE__ */ jsx(
                "img",
                {
                  className: "block rounded-md",
                  src: lesson.image,
                  alt: lesson.title
                }
              ) }),
              /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsx(Button, { type: "button", onClick: onGenerateVideo, children: "Generar vídeo" }) }) })
            ] })
          ] })
        ] }),
        lesson?.image?.length && !lesson?.video?.length && /* @__PURE__ */ jsx(
          "img",
          {
            className: "block rounded-md min-w-xs w-full max-w-md",
            src: lesson.image,
            alt: lesson.title
          }
        ),
        lesson?.video?.length && /* @__PURE__ */ jsx(
          "video",
          {
            className: "block rounded-md min-w-xs w-full max-w-md",
            src: lesson.video,
            controls: true,
            loop: true
          }
        ),
        /* @__PURE__ */ jsx(
          ReactMarkdown,
          {
            className: "markdown-body",
            remarkPlugins: [remarkGfm],
            children: markdownContent
          }
        )
      ] }) : /* @__PURE__ */ jsxs("div", { className: "grid", children: [
        /* @__PURE__ */ jsx("span", { className: "text-slate-600 text-center py-8", children: "No hay contenido para previsualizar" }),
        !markdownContent?.length && (generating ? /* @__PURE__ */ jsxs(Button, { disabled: true, children: [
          /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
          "Generando contenido automáticamente"
        ] }) : /* @__PURE__ */ jsxs(Button, { onClick: onGenerateContent, children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4 mr-2" }),
          "Generar contenido automáticamente"
        ] }))
      ] }) }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "EDITOR", children: [
        /* @__PURE__ */ jsxs(Alert, { className: "bg-blue-50 border-blue-600 mb-4", children: [
          /* @__PURE__ */ jsx(Info, { className: "h-4 w-4", color: "rgb(37 99 235)" }),
          /* @__PURE__ */ jsx(AlertTitle, { className: "text-blue-600", children: /* @__PURE__ */ jsx("strong", { children: "Editor de la Lección" }) }),
          /* @__PURE__ */ jsx(AlertDescription, { className: "text-blue-600", children: "Aquí podrás realizar las modificaciones que creas necesarias sobre el contenido generado por la IA." })
        ] }),
        !markdownContent?.length && (generating ? /* @__PURE__ */ jsxs(Button, { className: "w-full mb-4", disabled: true, children: [
          /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
          "Generando contenido automáticamente"
        ] }) : /* @__PURE__ */ jsxs(Button, { className: "w-full mb-4", onClick: onGenerateContent, children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4 mr-2" }),
          "Generar contenido automáticamente"
        ] })),
        /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs(
          "form",
          {
            onSubmit: form.handleSubmit(onSubmit),
            className: "grid gap-4",
            children: [
              /* @__PURE__ */ jsx(
                FormField,
                {
                  control: form.control,
                  name: "content",
                  render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                    /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                      Textarea,
                      {
                        placeholder: "Escribir aquí ...",
                        className: "resize-none h-dvh",
                        ...field,
                        onChange: (e) => {
                          setMarkdownContent(e.target.value);
                          field.onChange(e);
                        }
                      }
                    ) }),
                    /* @__PURE__ */ jsx(FormMessage, {})
                  ] })
                }
              ),
              /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full mt-4", children: "Guardar cambios" }),
              markdownContent?.length && (generating ? /* @__PURE__ */ jsxs(Button, { className: "w-full", variant: "secondary", disabled: true, children: [
                /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
                "Generando contenido automáticamente"
              ] }) : /* @__PURE__ */ jsxs(
                Button,
                {
                  className: "w-full",
                  variant: "secondary",
                  onClick: onGenerateContent,
                  children: [
                    /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4 mr-2" }),
                    "Re-generar contenido automáticamente"
                  ]
                }
              )),
              /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", className: "w-full", children: /* @__PURE__ */ jsx("a", { href: "/", children: "Cancelar" }) }),
              mode === "UPDATE" && /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  variant: "destructive",
                  className: "w-full",
                  children: "Eliminar lección"
                }
              ) })
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "DETAIL", children: [
        /* @__PURE__ */ jsxs(Alert, { className: "bg-blue-50 border-blue-600 mb-4", children: [
          /* @__PURE__ */ jsx(Info, { className: "h-4 w-4", color: "rgb(37 99 235)" }),
          /* @__PURE__ */ jsx(AlertTitle, { className: "text-blue-600", children: /* @__PURE__ */ jsx("strong", { children: "Formulario de la Lección" }) }),
          /* @__PURE__ */ jsx(AlertDescription, { className: "text-blue-600", children: "Aquí podrás actualizar el título, descripción de la lección." })
        ] }),
        /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs(
          "form",
          {
            onSubmit: form.handleSubmit(onSubmit),
            className: "grid gap-4",
            children: [
              /* @__PURE__ */ jsx("div", { className: "hidden", children: /* @__PURE__ */ jsx(
                FormField,
                {
                  control: form.control,
                  name: "id",
                  render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                    /* @__PURE__ */ jsx(FormLabel, { children: "Identificador de la lección" }),
                    /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                      Input,
                      {
                        placeholder: "Identificador de la lección",
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
                    /* @__PURE__ */ jsx(FormLabel, { children: "Título de la lección" }),
                    /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                      Textarea,
                      {
                        placeholder: "Título de la lección",
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
                  name: "caption",
                  render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                    /* @__PURE__ */ jsx(FormLabel, { children: "Descripción de la lección" }),
                    /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                      Textarea,
                      {
                        placeholder: "Descripción de la lección",
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
                            field.value ? lessonDateFormatter.format(
                              new Date(field.value)
                            ) : /* @__PURE__ */ jsx("span", { children: "Seleccionar ..." }),
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
                            field.value ? lessonDateFormatter.format(
                              new Date(field.value)
                            ) : /* @__PURE__ */ jsx("span", { children: "Seleccionar ..." }),
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
                  name: "includeImages",
                  render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                    /* @__PURE__ */ jsx(FormLabel, { children: "¿Incluir imágenes?" }),
                    /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                      Switch,
                      {
                        className: "block",
                        checked: field.value,
                        onCheckedChange: field.onChange
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
                  name: "includeVideos",
                  render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                    /* @__PURE__ */ jsx(FormLabel, { children: "¿Incluir vídeos?" }),
                    /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                      Switch,
                      {
                        className: "block",
                        checked: field.value,
                        onCheckedChange: field.onChange
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
                  name: "done",
                  render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                    /* @__PURE__ */ jsx(FormLabel, { children: "¿Lección finalizada?" }),
                    /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
                      Switch,
                      {
                        className: "block",
                        checked: field.value,
                        onCheckedChange: field.onChange
                      }
                    ) }),
                    /* @__PURE__ */ jsx(FormMessage, {})
                  ] })
                }
              ),
              /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full mt-4", children: "Guardar cambios" }),
              /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", className: "w-full", children: /* @__PURE__ */ jsx("a", { href: "/", children: "Cancelar" }) }),
              mode === "UPDATE" && /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  variant: "destructive",
                  className: "w-full",
                  children: "Eliminar lección"
                }
              ) })
            ]
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsx(AlertDialogTitle, { children: "¿Está seguro de eliminar esta lección?" }),
        /* @__PURE__ */ jsx(AlertDialogDescription, { children: "Esta acción no se podrá deshacer. Todos los datos de la lección serán eliminados permanentemente de la de base de datos." })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancelar" }),
        /* @__PURE__ */ jsx(
          AlertDialogAction,
          {
            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            onClick: onDelete,
            children: "Eliminar lección"
          }
        )
      ] })
    ] })
  ] });
};

export { LessonForm as L };
