import{j as s}from"./index.C-M3_CjP.js";import{r as a}from"./index.Cpi2Ks0G.js";import{u as v}from"./use-toast.BAq_dyGy.js";import{A as E,I as P,a as y,b as k}from"./alert.cTtBj1Dv.js";import{n as t}from"./router.7tVD49SL.js";import{C as I,a as R,b as G,c as M}from"./card.CKo05vsE.js";import{A as O,a as B,b as _,c as L,d as U,e as F,f as V,g as z,h as H}from"./alert-dialog.DpSbKqzE.js";import{c as $}from"./CourseDate.LDpDWJrq.js";import{B as g}from"./button.Ry9IsCwB.js";import{D as q,a as J,E as K,C as Q,b as W,c as X,d as f,e as Y,f as p,T as Z,S as u,P as w,B as x}from"./skeleton.C5CUaIhD.js";import{c as S}from"./createLucideIcon.DlBfeOJM.js";import{S as ss}from"./settings.CvriO5X6.js";import{T as es,a as rs,b as h,c as j}from"./tabs.CEIVxK54.js";import"./index.CxOCE76-.js";import"./index.C3Bs01oF.js";import"./index.Dox3Ggkk.js";import"./index.DYGEF4Um.js";import"./index.B-mGbkiQ.js";import"./index.BjuswFHX.js";import"./index.CSNuKgWl.js";/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const as=S("Bookmark",[["path",{d:"m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z",key:"1fy3hk"}]]);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ts=S("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]),os=({course:e})=>{const{toast:o}=v(),i=async()=>{const n=await(await fetch("/api/courses",{method:"DELETE",headers:{Accept:"application.json","Content-Type":"application/json"},body:JSON.stringify({courseId:e.id})})).json();n.message==="success"?o({title:"Curso eliminado",description:`El curso "${e.title}" ha sido eliminado`}):o({title:"Algo salió mal!",description:n.message,variant:"destructive"})};return s.jsxs(O,{children:[s.jsxs(q,{children:[s.jsx(I,{className:"cursor-pointer hover:bg-slate-50",onClick:()=>t("/courses/details/"+e.id),children:s.jsxs(R,{children:[s.jsxs("div",{className:"grid grid-cols-[1fr_min-content] gap-2",children:[s.jsx(G,{children:e.title}),s.jsx(J,{asChild:!0,children:s.jsx(g,{type:"button",size:"icon",variant:"outline",children:s.jsx(K,{})})})]}),s.jsx(M,{className:"text-slate-700 line-clamp-2",children:e.concepts}),s.jsxs("div",{className:"grid grid-cols-[min-content_1fr] items-center gap-2 text-sm text-gray-500",children:[s.jsx(Q,{className:"w-4 h-4"}),s.jsx("span",{children:$.formatRange(new Date(e.start),new Date(e.end))})]}),s.jsxs("div",{className:"grid grid-cols-[min-content_1fr] items-center gap-2 text-sm text-gray-500",children:[s.jsx(ts,{className:"w-4 h-4"}),s.jsxs("span",{children:[" ",e.schedules]})]})]})}),s.jsxs(W,{className:"w-56",children:[s.jsx(X,{children:"Opciones"}),s.jsx(f,{}),s.jsxs(Y,{children:[s.jsxs(p,{onSelect:()=>t("/courses/editor/"+e.id),children:[s.jsx(ss,{}),s.jsx("span",{children:"Editar"})]}),s.jsxs(p,{onSelect:()=>t("/courses/details/"+e.id),children:[s.jsx(as,{}),s.jsx("span",{children:"Ver lecciones"})]})]}),s.jsx(f,{}),s.jsx(B,{asChild:!0,children:s.jsxs(p,{className:"text-red-500",children:[s.jsx(Z,{}),s.jsx("span",{children:"Eliminar"})]})})]})]}),s.jsxs(_,{children:[s.jsxs(L,{children:[s.jsxs(U,{children:['¿Está seguro de eliminar el curso "',e.title,'"?']}),s.jsx(F,{children:"Esta acción no se podrá deshacer. Todos los datos de este curso serán eliminados permanentemente de la de base de datos."})]}),s.jsxs(V,{children:[s.jsx(z,{children:"Cancelar"}),s.jsx(H,{className:"bg-destructive text-destructive-foreground hover:bg-destructive/90",onClick:i,children:"Eliminar curso"})]})]})]})},is=()=>s.jsxs("div",{className:"grid grid-flow-row auto-rows-min gap-4 border border-gray-100 p-4 rounded-md",children:[s.jsx(u,{className:"h-12 w-11/12"}),s.jsx(u,{className:"h-4 w-8/12"}),s.jsx(u,{className:"h-3 w-8/12"})]}),ns=()=>s.jsxs("div",{className:"grid place-content-center gap-4 py-10",children:[s.jsx("p",{className:"text-gray-600",children:"Cursos no encontrados"}),s.jsxs(g,{variant:"default",onClick:()=>t("/courses/editor"),children:[s.jsx(w,{className:"w-4 h-4 mr-2"}),"Crear curso"]})]}),ls=()=>s.jsxs(g,{variant:"default",className:"fixed bottom-4 right-4",onClick:()=>t("/courses/editor"),children:[s.jsx(w,{className:"w-4 h-4"}),"Nuevo curso"]}),Ps=({user:e})=>{const[o,i]=a.useState(!0),[l,n]=a.useState([]),[C,b]=a.useState([]),[N,D]=a.useState([]),{toast:A}=v(),T=async d=>{i(!0);const r=await(await fetch(`/api/courses?userId=${d}`,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json"}})).json();r.message==="success"?(n(r.courses.inProgress),b(r.courses.upcoming),D(r.courses.past)):A({title:"Error",description:r.messages,variant:"destructive"}),i(!1)};a.useEffect(()=>{e.id&&T(e.id)},[e.id]);const c=d=>{const m={IN_PROGRESS:l,UPCOMING:C,PAST:N}[d];return s.jsx("div",{className:"grid grid-flow-row auto-rows-min gap-2",children:o?[1,2,3].map(r=>s.jsx(is,{},r)):m.length>0?m.map(r=>s.jsx(os,{course:r},r.id)):s.jsx(ns,{})})};return s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"grid gap-4 mt-4",children:[s.jsxs(E,{className:"bg-blue-50 border-blue-600",children:[s.jsx(P,{className:"h-4 w-4",color:"rgb(37 99 235)"}),s.jsx(y,{className:"text-blue-600",children:s.jsxs("strong",{children:["Bienvenid@ ",e.names]})}),s.jsx(k,{className:"text-blue-600",children:"A continuación se muestran todos los cursos que impartes."})]}),s.jsxs(es,{defaultValue:"IN_PROGRESS",children:[s.jsxs(rs,{children:[s.jsxs(h,{value:"IN_PROGRESS",children:["En Progreso",s.jsx(x,{variant:"outline",className:"ml-1",children:l.length})]}),s.jsxs(h,{value:"UPCOMING",children:["Próximos",s.jsx(x,{variant:"outline",className:"ml-1",children:C.length})]}),s.jsxs(h,{value:"PAST",children:["Pasados",s.jsx(x,{variant:"outline",className:"ml-1",children:N.length})]})]}),s.jsx(j,{value:"IN_PROGRESS",children:c("IN_PROGRESS")}),s.jsx(j,{value:"UPCOMING",children:c("UPCOMING")}),s.jsx(j,{value:"PAST",children:c("PAST")})]})]}),s.jsx(ls,{})]})};export{Ps as CourseList};
