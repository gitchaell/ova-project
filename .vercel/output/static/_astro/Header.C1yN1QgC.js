import{j as r,P as m,c as u}from"./index.C-M3_CjP.js";import{n as g}from"./router.7tVD49SL.js";import{r as s}from"./index.Cpi2Ks0G.js";import{c as E}from"./index.BjuswFHX.js";import{a as I,u as x}from"./index.DYGEF4Um.js";import{B as v}from"./button.Ry9IsCwB.js";import{H as _}from"./house.FDbGsj2o.js";import"./index.CxOCE76-.js";import"./createLucideIcon.DlBfeOJM.js";var p="Avatar",[k,V]=E(p),[M,A]=k(p),h=s.forwardRef((a,e)=>{const{__scopeAvatar:t,...o}=a,[n,i]=s.useState("idle");return r.jsx(M,{scope:t,imageLoadingStatus:n,onImageLoadingStatusChange:i,children:r.jsx(m.span,{...o,ref:e})})});h.displayName=p;var w="AvatarImage",j=s.forwardRef((a,e)=>{const{__scopeAvatar:t,src:o,onLoadingStatusChange:n=()=>{},...i}=a,c=A(w,t),l=F(o),d=I(f=>{n(f),c.onImageLoadingStatusChange(f)});return x(()=>{l!=="idle"&&d(l)},[l,d]),l==="loaded"?r.jsx(m.img,{...i,ref:e,src:o}):null});j.displayName=w;var N="AvatarFallback",y=s.forwardRef((a,e)=>{const{__scopeAvatar:t,delayMs:o,...n}=a,i=A(N,t),[c,l]=s.useState(o===void 0);return s.useEffect(()=>{if(o!==void 0){const d=window.setTimeout(()=>l(!0),o);return()=>window.clearTimeout(d)}},[o]),c&&i.imageLoadingStatus!=="loaded"?r.jsx(m.span,{...n,ref:e}):null});y.displayName=N;function F(a){const[e,t]=s.useState("idle");return x(()=>{if(!a){t("error");return}let o=!0;const n=new window.Image,i=c=>()=>{o&&t(c)};return t("loading"),n.onload=i("loaded"),n.onerror=i("error"),n.src=a,()=>{o=!1}},[a]),e}var S=h,C=j,L=y;const R=s.forwardRef(({className:a,...e},t)=>r.jsx(S,{ref:t,className:u("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",a),...e}));R.displayName=S.displayName;const P=s.forwardRef(({className:a,...e},t)=>r.jsx(C,{ref:t,className:u("aspect-square h-full w-full",a),...e}));P.displayName=C.displayName;const b=s.forwardRef(({className:a,...e},t)=>r.jsx(L,{ref:t,className:u("flex h-full w-full items-center justify-center rounded-full bg-muted",a),...e}));b.displayName=L.displayName;const B=({user:a})=>r.jsxs(R,{className:"cursor-pointer ring-gray-300 hover:ring-4",onClick:()=>g("/profile"),children:[r.jsx("img",{src:a.photoUrl||"/avatar.webp",alt:a.names,style:{aspectRatio:"1/1",objectFit:"cover"},loading:"lazy"}),r.jsx(b,{children:a.names.split(" ").map(e=>e[0].toUpperCase())})]}),D=({title:a,user:e})=>{const t=()=>{document.dispatchEvent(new CustomEvent("openMenuEvent"))};return r.jsxs("div",{className:"grid grid-cols-[min-content_1fr_min-content] gap-4 p-4",children:[r.jsx(v,{type:"button",size:"icon",onClick:()=>g("/"),children:r.jsx(_,{className:"w-12 h-12"})}),r.jsx(v,{type:"button",variant:"secondary",className:"line-clamp-1",onClick:t,children:a}),r.jsx(B,{user:e})]})};export{D as Header};
