import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import React__default from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { c as cn, u as useToast, $ as $$BaseLayout } from './BaseLayout_CepjJgi_.mjs';
import { b as buttonVariants, n as navigate, B as Button } from './button_8d98dCD9.mjs';
import { c as createComponent, r as renderTemplate, a as renderComponent, b as createAstro, m as maybeRenderHead, e as addAttribute, d as renderSlot } from './astro/server_C-GoM-57.mjs';
import 'kleur/colors';
import { a as actions } from './_astro_actions_BP7j5CaX.mjs';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { House, X, Search, BadgeCheck, User, Settings, LogOut } from 'lucide-react';
import { Command as Command$1, CommandDialog } from 'cmdk';
import * as DialogPrimitive from '@radix-ui/react-dialog';

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;
const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
const AlertDialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  }
);
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Action,
  {
    ref,
    className: cn(buttonVariants(), className),
    ...props
  }
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Cancel,
  {
    ref,
    className: cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    ),
    ...props
  }
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

const Avatar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const UserAvatar = ({ user }) => {
  return /* @__PURE__ */ jsxs(
    Avatar,
    {
      className: "cursor-pointer ring-gray-300 hover:ring-4",
      onClick: () => navigate(),
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: user.photoUrl || "/avatar.webp",
            alt: user.names,
            style: { aspectRatio: "1/1", objectFit: "cover" },
            loading: "lazy"
          }
        ),
        /* @__PURE__ */ jsx(AvatarFallback, { children: user.names.split(" ").map((name) => name[0].toUpperCase()) })
      ]
    }
  );
};

const Header = ({ title, user }) => {
  const handleOpenMenu = () => {
    document.dispatchEvent(new CustomEvent("openMenuEvent"));
  };
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[min-content_1fr_min-content] gap-4 p-4", children: [
    /* @__PURE__ */ jsx(Button, { type: "button", size: "icon", onClick: () => navigate(), children: /* @__PURE__ */ jsx(House, { className: "w-12 h-12" }) }),
    /* @__PURE__ */ jsx(
      Button,
      {
        type: "button",
        variant: "secondary",
        className: "line-clamp-1",
        onClick: handleOpenMenu,
        children: title
      }
    ),
    /* @__PURE__ */ jsx(UserAvatar, { user })
  ] });
};

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

const Command = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = Command$1.displayName;
const CommandInput = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsx(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ jsx(
    Command$1.Input,
    {
      ref,
      className: cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
] }));
CommandInput.displayName = Command$1.Input.displayName;
const CommandList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = Command$1.List.displayName;
const CommandEmpty = React.forwardRef((props, ref) => /* @__PURE__ */ jsx(
  Command$1.Empty,
  {
    ref,
    className: "py-6 text-center text-sm",
    ...props
  }
));
CommandEmpty.displayName = Command$1.Empty.displayName;
const CommandGroup = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = Command$1.Group.displayName;
const CommandSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Separator,
  {
    ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = Command$1.Separator.displayName;
const CommandItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
      className
    ),
    ...props
  }
));
CommandItem.displayName = Command$1.Item.displayName;
const CommandShortcut = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      ),
      ...props
    }
  );
};
CommandShortcut.displayName = "CommandShortcut";

function Menu({ courses }) {
  const { toast } = useToast();
  const [open, setOpen] = React__default.useState(false);
  React__default.useEffect(() => {
    const toggle = (e) => {
      e.preventDefault();
      setOpen((open2) => !open2);
    };
    const togglefromKeydown = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open2) => !open2);
      }
    };
    document.addEventListener("keydown", togglefromKeydown);
    document.addEventListener("openMenuEvent", toggle);
    return () => {
      document.removeEventListener("keydown", togglefromKeydown);
      document.removeEventListener("openMenuEvent", toggle);
    };
  }, []);
  const onLogout = async () => {
    const response = await fetch("/api/users/logout", { method: "POST" });
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
  return /* @__PURE__ */ jsx(
    CommandDialog,
    {
      open,
      onOpenChange: setOpen,
      className: "fixed top-16 left-0 right-0 mx-2",
      children: /* @__PURE__ */ jsxs(Command, { className: "rounded-lg border shadow-md md:min-w-[450px]", children: [
        /* @__PURE__ */ jsx(CommandInput, { placeholder: "Busca tus cursos usando palabras clave..." }),
        /* @__PURE__ */ jsxs(CommandList, { children: [
          /* @__PURE__ */ jsx(CommandEmpty, { children: "0 coincidencias" }),
          /* @__PURE__ */ jsx(CommandGroup, { heading: "Sugerencias", children: courses.map((course) => /* @__PURE__ */ jsxs(CommandItem, { onSelect: () => navigate(`/courses/details/${course.id}`), children: [
            /* @__PURE__ */ jsx(BadgeCheck, { className: "mr-2 h-4 w-4" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Curso: ",
              course.title
            ] })
          ] }, course.id)) }),
          /* @__PURE__ */ jsx(CommandSeparator, {}),
          /* @__PURE__ */ jsxs(CommandGroup, { heading: "Menú de opciones", children: [
            /* @__PURE__ */ jsxs(CommandItem, { onSelect: () => navigate(), children: [
              /* @__PURE__ */ jsx(House, { className: "mr-2 h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { children: "Inicio" }),
              /* @__PURE__ */ jsx(CommandShortcut, { children: "⌘H" })
            ] }),
            /* @__PURE__ */ jsxs(CommandItem, { onSelect: () => navigate(), children: [
              /* @__PURE__ */ jsx(User, { className: "mr-2 h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { children: "Perfil" }),
              /* @__PURE__ */ jsx(CommandShortcut, { children: "⌘P" })
            ] }),
            /* @__PURE__ */ jsxs(CommandItem, { onSelect: () => navigate(), children: [
              /* @__PURE__ */ jsx(Settings, { className: "mr-2 h-4 w-4" }),
              /* @__PURE__ */ jsx("span", { children: "Ajustes" }),
              /* @__PURE__ */ jsx(CommandShortcut, { children: "⌘S" })
            ] }),
            /* @__PURE__ */ jsxs(CommandItem, { onSelect: onLogout, children: [
              /* @__PURE__ */ jsx(LogOut, { className: "mr-2 h-4 w-4", color: "rgb(239 68 68)" }),
              /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "Cerrar sesión" })
            ] })
          ] })
        ] })
      ] })
    }
  );
}

const $$Astro = createAstro();
const $$MainLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { title, headerTitle, description, bodyClass } = Astro2.props;
  if (!Astro2.locals.user) {
    return Astro2.redirect("/login");
  }
  const userResult = await Astro2.callAction(actions.user.find, {
    id: Astro2.locals.user.id
  });
  if (!userResult || userResult.error || !userResult.data) {
    return Astro2.redirect("/login");
  }
  const coursesResult = await Astro2.callAction(actions.course.search, {
    userId: Astro2.locals.user.id
  });
  const user = userResult.data;
  const courses = coursesResult?.data || [];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "description": description }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "title": headerTitle, "user": user, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/layout/Header", "client:component-export": "Header" })} ${maybeRenderHead()}<main${addAttribute(cn(bodyClass), "class")}> ${renderSlot($$result2, $$slots["default"])} </main> ${renderComponent($$result2, "Menu", Menu, { "courses": courses, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/layout/Menu", "client:component-export": "Menu" })}  ` })}`;
}, "/home/user/ova-project/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $, AlertDialog as A, Dialog as D, AlertDialogTrigger as a, AlertDialogContent as b, AlertDialogHeader as c, AlertDialogTitle as d, AlertDialogDescription as e, AlertDialogFooter as f, AlertDialogCancel as g, AlertDialogAction as h, DialogTrigger as i, DialogContent as j, DialogHeader as k, DialogTitle as l, DialogDescription as m, DialogFooter as n, DialogClose as o };
