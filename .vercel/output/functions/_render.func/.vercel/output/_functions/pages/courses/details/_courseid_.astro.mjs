import { c as createComponent, r as renderTemplate, a as renderComponent, b as createAstro } from '../../../chunks/astro/server_C-GoM-57.mjs';
import 'kleur/colors';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { u as useToast, c as cn } from '../../../chunks/BaseLayout_CepjJgi_.mjs';
import { EllipsisVertical, CalendarDays, Settings, Eye, Trash, ChevronDown, LoaderCircle, Sparkles, Plus, Info, CalendarIcon } from 'lucide-react';
import { A as Alert, a as AlertTitle, b as AlertDescription } from '../../../chunks/alert_BYjylnn6.mjs';
import { n as navigate, B as Button } from '../../../chunks/button_8d98dCD9.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription } from '../../../chunks/card_CVbpHiJx.mjs';
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction, $ as $$MainLayout } from '../../../chunks/MainLayout_C6K2NQ9O.mjs';
import { D as DropdownMenu, a as DropdownMenuTrigger, B as Badge, b as DropdownMenuContent, c as DropdownMenuLabel, d as DropdownMenuSeparator, e as DropdownMenuGroup, f as DropdownMenuItem, S as Skeleton } from '../../../chunks/skeleton_BxpFyi8f.mjs';
import { l as lessonDateFormatter } from '../../../chunks/LessonDate_CMDfJMRJ.mjs';
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from '../../../chunks/tabs_CrHgpoaI.mjs';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { a as actions } from '../../../chunks/_astro_actions_BP7j5CaX.mjs';
export { renderers } from '../../../renderers.mjs';

const LessonCard = ({ lesson }) => {
  const { toast } = useToast();
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
    } else {
      toast({
        title: "Algo salió mal!",
        description: data.message,
        variant: "destructive"
      });
    }
  };
  return /* @__PURE__ */ jsxs(AlertDialog, { children: [
    /* @__PURE__ */ jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsx(
        Card,
        {
          className: "cursor-pointer hover:bg-slate-50",
          onClick: () => navigate("/lessons/editor/" + lesson.id),
          children: /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[1fr_min-content] gap-2", children: [
              /* @__PURE__ */ jsx(CardTitle, { children: lesson.title }),
              /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { type: "button", size: "icon", variant: "outline", children: /* @__PURE__ */ jsx(EllipsisVertical, {}) }) })
            ] }),
            /* @__PURE__ */ jsx(CardDescription, { className: "text-slate-700 line-clamp-2", children: lesson.caption }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[1fr_min-content] items-center gap-2 ", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[min-content_1fr_min-content] items-center gap-2 text-sm text-gray-500", children: [
                /* @__PURE__ */ jsx(CalendarDays, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: lessonDateFormatter.formatRange(
                  new Date(lesson.start),
                  new Date(lesson.end)
                ) })
              ] }),
              lesson.done ? /* @__PURE__ */ jsx(Badge, { className: "bg-green-100 border-green-500 text-green-600 hover:bg-green-200 w-fit", children: "Finalizado" }) : /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "w-fit", children: "Pendiente" })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxs(DropdownMenuContent, { className: "w-56", children: [
        /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Opciones" }),
        /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
        /* @__PURE__ */ jsxs(DropdownMenuGroup, { children: [
          /* @__PURE__ */ jsxs(
            DropdownMenuItem,
            {
              onSelect: () => navigate("/lessons/editor/" + lesson.id),
              children: [
                /* @__PURE__ */ jsx(Settings, {}),
                /* @__PURE__ */ jsx("span", { children: "Editar" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            DropdownMenuItem,
            {
              onSelect: () => navigate("/lessons/preview/" + lesson.id),
              children: [
                /* @__PURE__ */ jsx(Eye, {}),
                /* @__PURE__ */ jsx("span", { children: "Previsualizar" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
        /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(DropdownMenuItem, { className: "text-red-500", children: [
          /* @__PURE__ */ jsx(Trash, {}),
          /* @__PURE__ */ jsx("span", { children: "Eliminar" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxs(AlertDialogTitle, { children: [
          '¿Está seguro de eliminar la lección "',
          lesson.title,
          '"?'
        ] }),
        /* @__PURE__ */ jsx(AlertDialogDescription, { children: "Esta acción no se podrá deshacer. Todos los datos de esta lección serán eliminados permanentemente de la de base de datos." })
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

const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Item,
  {
    ref,
    className: cn("border-b", className),
    ...props
  }
));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
  AccordionPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 shrink-0 transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;
const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  AccordionPrimitive.Content,
  {
    ref,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

const LessonListNotFound = ({
  course,
  user,
  enableAI = false
}) => {
  const { toast } = useToast();
  const [generating, setGenerating] = useState(false);
  const onGenerateLessons = async () => {
    setGenerating(true);
    const response = await fetch(`/api/lessons/generate/array`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ course, user })
    });
    const data = await response.json();
    if (data.message === "success") {
      window.location.reload();
    } else {
      toast({
        title: "Error",
        description: data.message,
        variant: "destructive"
      });
    }
    setGenerating(false);
  };
  return /* @__PURE__ */ jsxs("div", { className: "grid place-content-center gap-4 py-10", children: [
    /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-center", children: "Lecciones no encontradas" }),
    enableAI && (generating ? /* @__PURE__ */ jsxs(Button, { disabled: true, children: [
      /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
      "Generando lecciones automáticamente"
    ] }) : /* @__PURE__ */ jsxs(Button, { onClick: onGenerateLessons, children: [
      /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4 mr-2" }),
      "Generar lecciones automáticamente"
    ] }))
  ] });
};

const LessonCardSkeleton = () => {
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-flow-row auto-rows-min gap-4 border border-gray-100 p-4 rounded-md", children: [
    /* @__PURE__ */ jsx(Skeleton, { className: "h-12 w-11/12" }),
    /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-8/12" }),
    /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-8/12" })
  ] });
};

const LessonNewButton = ({ course }) => {
  return /* @__PURE__ */ jsxs(
    Button,
    {
      variant: "default",
      className: "fixed bottom-4 right-4",
      onClick: () => navigate(`/lessons/${course.id}/editor`),
      children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
        "Nueva lección"
      ]
    }
  );
};

const LessonList = ({ course, user }) => {
  const [loading, setLoading] = useState(true);
  const [allLessonsCount, setAllLessonsCount] = useState(0);
  const [doneLessonsCount, setDoneLessonsCount] = useState(0);
  const [undoneLessonsCount, setUndoneLessonsCount] = useState(0);
  const [allLessons, setAllLessons] = useState([]);
  const [undoneLessons, setUndoneLessons] = useState([]);
  const [doneLessons, setDoneLessons] = useState([]);
  const { toast } = useToast();
  const fetchLessons = async (courseId) => {
    setLoading(true);
    const response = await fetch(`/api/lessons?courseId=${courseId}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    if (data.message === "success") {
      setAllLessonsCount(data.count.all);
      setDoneLessonsCount(data.count.done);
      setUndoneLessonsCount(data.count.undone);
      setAllLessons(data.lessons.all);
      setUndoneLessons(data.lessons.undone);
      setDoneLessons(data.lessons.done);
    } else {
      toast({
        title: "Error",
        description: "No se pudieron cargar las lecciones.",
        variant: "destructive"
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    if (course.id) {
      fetchLessons(course.id);
    }
  }, [course.id]);
  const getContent = (filter) => {
    const groups = {
      ALL: allLessons,
      DONE: doneLessons,
      UNDONE: undoneLessons
    }[filter];
    return /* @__PURE__ */ jsx(Fragment, { children: loading ? [1, 2, 3].map((key) => /* @__PURE__ */ jsx(LessonCardSkeleton, {}, key)) : groups.length > 0 ? /* @__PURE__ */ jsx(
      Accordion,
      {
        type: "multiple",
        className: "w-full",
        defaultValue: groups.map((group) => group.key),
        children: groups.map((group) => /* @__PURE__ */ jsxs(AccordionItem, { value: group.key, children: [
          /* @__PURE__ */ jsx(AccordionTrigger, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-flow-col gap-2 items-center", children: [
            /* @__PURE__ */ jsx(CalendarIcon, { className: "h-4 w-4" }),
            "Semana ",
            group.week,
            ", ",
            group.year
          ] }) }),
          /* @__PURE__ */ jsx(AccordionContent, { children: /* @__PURE__ */ jsx("div", { className: "grid grid-flow-row auto-rows-min gap-2", children: group.lessons.map((lesson) => /* @__PURE__ */ jsx(LessonCard, { lesson }, lesson.id)) }) })
        ] }, group.key))
      }
    ) : /* @__PURE__ */ jsx(
      LessonListNotFound,
      {
        course,
        user,
        enableAI: filter === "ALL"
      }
    ) });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 mt-4 pb-20", children: [
      /* @__PURE__ */ jsxs(Alert, { className: "bg-blue-50 border-blue-600", children: [
        /* @__PURE__ */ jsx(Info, { className: "h-4 w-4", color: "rgb(37 99 235)" }),
        /* @__PURE__ */ jsx(AlertTitle, { className: "text-blue-600", children: /* @__PURE__ */ jsx("strong", { children: "Contenido del curso" }) }),
        /* @__PURE__ */ jsx(AlertDescription, { className: "text-blue-600", children: "A continuación se muestran las lecciones que componen el contenido de tu curso agrupado por semanas." })
      ] }),
      /* @__PURE__ */ jsxs(Tabs, { defaultValue: "ALL", children: [
        /* @__PURE__ */ jsxs(TabsList, { children: [
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "ALL", children: [
            "Todos",
            /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "ml-1", children: allLessonsCount })
          ] }),
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "UNDONE", children: [
            "Pendientes",
            /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "ml-1", children: undoneLessonsCount })
          ] }),
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "DONE", children: [
            "Finalizados",
            /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "ml-1", children: doneLessonsCount })
          ] })
        ] }),
        /* @__PURE__ */ jsx(TabsContent, { value: "ALL", children: getContent("ALL") }),
        /* @__PURE__ */ jsx(TabsContent, { value: "UNDONE", children: getContent("UNDONE") }),
        /* @__PURE__ */ jsx(TabsContent, { value: "DONE", children: getContent("DONE") })
      ] })
    ] }),
    /* @__PURE__ */ jsx(LessonNewButton, { course })
  ] });
};

const $$Astro = createAstro();
const $$courseId = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$courseId;
  if (!Astro2.locals.user || !Astro2.params.courseId) {
    return Astro2.redirect("/login");
  }
  const [courseResult, userResult] = await Promise.all([
    Astro2.callAction(actions.course.find, { id: Astro2.params.courseId }),
    Astro2.callAction(actions.user.find, { id: Astro2.locals.user.id })
  ]);
  if (!courseResult || courseResult.error || !courseResult.data || !userResult || userResult.error || !userResult.data) {
    return Astro2.redirect("/login");
  }
  const user = userResult.data;
  const course = courseResult.data;
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": course.title, "headerTitle": course.title, "bodyClass": "px-4" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "LessonList", LessonList, { "course": course, "user": user, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/lesson/LessonList", "client:component-export": "LessonList" })} ` })}`;
}, "/home/user/ova-project/src/pages/courses/details/[courseId].astro", void 0);

const $$file = "/home/user/ova-project/src/pages/courses/details/[courseId].astro";
const $$url = "/courses/details/[courseId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$courseId,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
