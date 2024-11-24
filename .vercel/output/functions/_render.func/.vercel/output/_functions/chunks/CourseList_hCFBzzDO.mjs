import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { u as useToast } from './BaseLayout_CepjJgi_.mjs';
import { EllipsisVertical, CalendarDays, Clock, Settings, Bookmark, Trash, Plus, Info } from 'lucide-react';
import { A as Alert, a as AlertTitle, b as AlertDescription } from './alert_BYjylnn6.mjs';
import { n as navigate, B as Button } from './button_8d98dCD9.mjs';
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription } from './card_CVbpHiJx.mjs';
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from './MainLayout_C6K2NQ9O.mjs';
import { c as courseDateFormatter } from './CourseDate_De5miepE.mjs';
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuLabel, d as DropdownMenuSeparator, e as DropdownMenuGroup, f as DropdownMenuItem, S as Skeleton, B as Badge } from './skeleton_BxpFyi8f.mjs';
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from './tabs_CrHgpoaI.mjs';

const CourseCard = ({ course }) => {
  const { toast } = useToast();
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
          onClick: () => navigate("/courses/details/" + course.id),
          children: /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[1fr_min-content] gap-2", children: [
              /* @__PURE__ */ jsx(CardTitle, { children: course.title }),
              /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { type: "button", size: "icon", variant: "outline", children: /* @__PURE__ */ jsx(EllipsisVertical, {}) }) })
            ] }),
            /* @__PURE__ */ jsx(CardDescription, { className: "text-slate-700 line-clamp-2", children: course.concepts }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[min-content_1fr] items-center gap-2 text-sm text-gray-500", children: [
              /* @__PURE__ */ jsx(CalendarDays, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { children: courseDateFormatter.formatRange(
                new Date(course.start),
                new Date(course.end)
              ) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[min-content_1fr] items-center gap-2 text-sm text-gray-500", children: [
              /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxs("span", { children: [
                " ",
                course.schedules
              ] })
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
              onSelect: () => navigate("/courses/editor/" + course.id),
              children: [
                /* @__PURE__ */ jsx(Settings, {}),
                /* @__PURE__ */ jsx("span", { children: "Editar" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            DropdownMenuItem,
            {
              onSelect: () => navigate("/courses/details/" + course.id),
              children: [
                /* @__PURE__ */ jsx(Bookmark, {}),
                /* @__PURE__ */ jsx("span", { children: "Ver lecciones" })
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
          '¿Está seguro de eliminar el curso "',
          course.title,
          '"?'
        ] }),
        /* @__PURE__ */ jsx(AlertDialogDescription, { children: "Esta acción no se podrá deshacer. Todos los datos de este curso serán eliminados permanentemente de la de base de datos." })
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

const CourseCardSkeleton = () => {
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-flow-row auto-rows-min gap-4 border border-gray-100 p-4 rounded-md", children: [
    /* @__PURE__ */ jsx(Skeleton, { className: "h-12 w-11/12" }),
    /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-8/12" }),
    /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-8/12" })
  ] });
};

const CourseListNotFound = () => {
  return /* @__PURE__ */ jsxs("div", { className: "grid place-content-center gap-4 py-10", children: [
    /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Cursos no encontrados" }),
    /* @__PURE__ */ jsxs(Button, { variant: "default", onClick: () => navigate(), children: [
      /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
      "Crear curso"
    ] })
  ] });
};

const CourseNewButton = () => {
  return /* @__PURE__ */ jsxs(
    Button,
    {
      variant: "default",
      className: "fixed bottom-4 right-4",
      onClick: () => navigate(),
      children: [
        /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
        "Nuevo curso"
      ]
    }
  );
};

const CourseList = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [inProgressCourses, setInProgressCourses] = useState([]);
  const [upcomingCourses, setUpcomingCourses] = useState([]);
  const [pastCourses, setPastCourses] = useState([]);
  const { toast } = useToast();
  const fetchCourses = async (userId) => {
    setLoading(true);
    const response = await fetch(`/api/courses?userId=${userId}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    if (data.message === "success") {
      setInProgressCourses(data.courses.inProgress);
      setUpcomingCourses(data.courses.upcoming);
      setPastCourses(data.courses.past);
    } else {
      toast({
        title: "Error",
        description: data.messages,
        variant: "destructive"
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    if (user.id) {
      fetchCourses(user.id);
    }
  }, [user.id]);
  const getContent = (filter) => {
    const courses = {
      IN_PROGRESS: inProgressCourses,
      UPCOMING: upcomingCourses,
      PAST: pastCourses
    }[filter];
    return /* @__PURE__ */ jsx("div", { className: "grid grid-flow-row auto-rows-min gap-2", children: loading ? [1, 2, 3].map((key) => /* @__PURE__ */ jsx(CourseCardSkeleton, {}, key)) : courses.length > 0 ? courses.map((course) => /* @__PURE__ */ jsx(CourseCard, { course }, course.id)) : /* @__PURE__ */ jsx(CourseListNotFound, {}) });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 mt-4", children: [
      /* @__PURE__ */ jsxs(Alert, { className: "bg-blue-50 border-blue-600", children: [
        /* @__PURE__ */ jsx(Info, { className: "h-4 w-4", color: "rgb(37 99 235)" }),
        /* @__PURE__ */ jsx(AlertTitle, { className: "text-blue-600", children: /* @__PURE__ */ jsxs("strong", { children: [
          "Bienvenid@ ",
          user.names
        ] }) }),
        /* @__PURE__ */ jsx(AlertDescription, { className: "text-blue-600", children: "A continuación se muestran todos los cursos que impartes." })
      ] }),
      /* @__PURE__ */ jsxs(Tabs, { defaultValue: "IN_PROGRESS", children: [
        /* @__PURE__ */ jsxs(TabsList, { children: [
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "IN_PROGRESS", children: [
            "En Progreso",
            /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "ml-1", children: inProgressCourses.length })
          ] }),
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "UPCOMING", children: [
            "Próximos",
            /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "ml-1", children: upcomingCourses.length })
          ] }),
          /* @__PURE__ */ jsxs(TabsTrigger, { value: "PAST", children: [
            "Pasados",
            /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "ml-1", children: pastCourses.length })
          ] })
        ] }),
        /* @__PURE__ */ jsx(TabsContent, { value: "IN_PROGRESS", children: getContent("IN_PROGRESS") }),
        /* @__PURE__ */ jsx(TabsContent, { value: "UPCOMING", children: getContent("UPCOMING") }),
        /* @__PURE__ */ jsx(TabsContent, { value: "PAST", children: getContent("PAST") })
      ] })
    ] }),
    /* @__PURE__ */ jsx(CourseNewButton, {})
  ] });
};

export { CourseList as C };
