import{j as e}from"./index.C-M3_CjP.js";import{n as u}from"./router.7tVD49SL.js";import{B as c}from"./button.Ry9IsCwB.js";import{C as h,a as g,b as f,c as C,d as N}from"./card.CKo05vsE.js";import{z as a,u as S,F as b,a as o,b as n,c as t,d as i,I as l,e as m,t as v}from"./zod.yEY8vnza.js";import{u as w}from"./use-toast.BAq_dyGy.js";import{a as p}from"./UserNames.DTNUW7hs.js";import{U as F,a as R}from"./UserPasswordHash.gzJzPMQz.js";import"./index.Cpi2Ks0G.js";import"./index.CxOCE76-.js";const y=a.object({firstname:a.string().min(2).max(p/2),lastname:a.string().min(2).max(p/2),email:a.string().email(),password:a.string().min(F).max(R)}),G=()=>{const{toast:d}=w(),r=S({resolver:v(y)}),j=async s=>{const x=await(await fetch("/api/users/signup",{method:"POST",headers:{Accept:"application.json","Content-Type":"application/json"},body:JSON.stringify(s)})).json();x.message==="success"?(r.reset(),d({title:"Registrado!",description:"Te has registrado correctamente! Redireccionando a inicio de sesión ..."}),setTimeout(()=>{u("/login")},3e3)):d({title:"Algo salió mal!",description:x.message,variant:"destructive"})};return e.jsxs(h,{className:"mx-auto max-w-sm",children:[e.jsxs(g,{children:[e.jsx(f,{className:"text-xl",children:"Registro de usuarios"}),e.jsx(C,{children:"Ingresa tu información para registrarte como nuevo usuario"})]}),e.jsxs(N,{className:"grid gap-4",children:[e.jsx(b,{...r,children:e.jsxs("form",{onSubmit:r.handleSubmit(j),className:"grid gap-4",children:[e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsx(o,{control:r.control,name:"firstname",render:({field:s})=>e.jsxs(n,{children:[e.jsx(t,{children:"Nombres"}),e.jsx(i,{children:e.jsx(l,{placeholder:"Jhon",autoComplete:"given-name",...s})}),e.jsx(m,{})]})}),e.jsx(o,{control:r.control,name:"lastname",render:({field:s})=>e.jsxs(n,{children:[e.jsx(t,{children:"Apellidos"}),e.jsx(i,{children:e.jsx(l,{placeholder:"Doe",autoComplete:"family-name",...s})}),e.jsx(m,{})]})})]}),e.jsx(o,{control:r.control,name:"email",render:({field:s})=>e.jsxs(n,{children:[e.jsx(t,{children:"Correo electrónico"}),e.jsx(i,{children:e.jsx(l,{type:"email",autoComplete:"email",placeholder:"maestro@escuela.com",...s})}),e.jsx(m,{})]})}),e.jsx(o,{control:r.control,name:"password",render:({field:s})=>e.jsxs(n,{children:[e.jsx(t,{children:"Contraseña"}),e.jsx(i,{children:e.jsx(l,{type:"password",autoComplete:"new-password",placeholder:"Crea un contraseña segura",...s})}),e.jsx(m,{})]})}),e.jsx(c,{type:"submit",className:"w-full mt-4",children:"Crear una cuenta"}),e.jsx(c,{type:"button",variant:"outline",className:"w-full",children:"Registrarme con LinkedIn"})]})}),e.jsxs("div",{className:"mt-4 text-center text-sm",children:["¿Ya estás registrado?"," ",e.jsx(c,{variant:"link",className:"underline",children:e.jsx("a",{href:"/login",children:"Iniciar sesión"})})]})]})]})};export{G as UserSignupForm};
