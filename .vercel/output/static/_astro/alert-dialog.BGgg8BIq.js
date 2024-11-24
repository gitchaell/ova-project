import{j as o,u as f,b as L,c as n}from"./index.DBbjwa8k.js";import{r as s}from"./index.lFdC2nkX.js";import{c as G}from"./index.BLNbD4pj.js";import{c as u,T as H,O as W,W as k,C as V,b as Y,D as q,d as A,P as B,e as J}from"./index.CTnt_JEC.js";import{c as K}from"./index.BatipnVx.js";import{b as D}from"./button.AZqx0Umo.js";var v="AlertDialog",[Q,ye]=G(v,[u]),i=u(),x=e=>{const{__scopeAlertDialog:a,...t}=e,r=i(a);return o.jsx(J,{...r,...t,modal:!0})};x.displayName=v;var U="AlertDialogTrigger",N=s.forwardRef((e,a)=>{const{__scopeAlertDialog:t,...r}=e,l=i(t);return o.jsx(H,{...l,...r,ref:a})});N.displayName=U;var X="AlertDialogPortal",y=e=>{const{__scopeAlertDialog:a,...t}=e,r=i(a);return o.jsx(B,{...r,...t})};y.displayName=X;var Z="AlertDialogOverlay",R=s.forwardRef((e,a)=>{const{__scopeAlertDialog:t,...r}=e,l=i(t);return o.jsx(W,{...l,...r,ref:a})});R.displayName=Z;var c="AlertDialogContent",[ee,ae]=Q(c),_=s.forwardRef((e,a)=>{const{__scopeAlertDialog:t,children:r,...l}=e,g=i(t),p=s.useRef(null),z=f(a,p),m=s.useRef(null);return o.jsx(k,{contentName:c,titleName:j,docsSlug:"alert-dialog",children:o.jsx(ee,{scope:t,cancelRef:m,children:o.jsxs(V,{role:"alertdialog",...g,...l,ref:z,onOpenAutoFocus:K(l.onOpenAutoFocus,d=>{d.preventDefault(),m.current?.focus({preventScroll:!0})}),onPointerDownOutside:d=>d.preventDefault(),onInteractOutside:d=>d.preventDefault(),children:[o.jsx(L,{children:r}),o.jsx(oe,{contentRef:p})]})})})});_.displayName=c;var j="AlertDialogTitle",b=s.forwardRef((e,a)=>{const{__scopeAlertDialog:t,...r}=e,l=i(t);return o.jsx(Y,{...l,...r,ref:a})});b.displayName=j;var h="AlertDialogDescription",w=s.forwardRef((e,a)=>{const{__scopeAlertDialog:t,...r}=e,l=i(t);return o.jsx(q,{...l,...r,ref:a})});w.displayName=h;var te="AlertDialogAction",C=s.forwardRef((e,a)=>{const{__scopeAlertDialog:t,...r}=e,l=i(t);return o.jsx(A,{...l,...r,ref:a})});C.displayName=te;var E="AlertDialogCancel",P=s.forwardRef((e,a)=>{const{__scopeAlertDialog:t,...r}=e,{cancelRef:l}=ae(E,t),g=i(t),p=f(a,l);return o.jsx(A,{...g,...r,ref:p})});P.displayName=E;var oe=({contentRef:e})=>{const a=`\`${c}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${c}\` by passing a \`${h}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${c}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;return s.useEffect(()=>{document.getElementById(e.current?.getAttribute("aria-describedby"))||console.warn(a)},[a,e]),null},re=x,se=N,le=y,T=R,S=_,O=C,$=P,M=b,I=w;const Re=re,_e=se,ie=le,F=s.forwardRef(({className:e,...a},t)=>o.jsx(T,{className:n("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",e),...a,ref:t}));F.displayName=T.displayName;const ne=s.forwardRef(({className:e,...a},t)=>o.jsxs(ie,{children:[o.jsx(F,{}),o.jsx(S,{ref:t,className:n("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",e),...a})]}));ne.displayName=S.displayName;const ce=({className:e,...a})=>o.jsx("div",{className:n("flex flex-col space-y-2 text-center sm:text-left",e),...a});ce.displayName="AlertDialogHeader";const de=({className:e,...a})=>o.jsx("div",{className:n("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",e),...a});de.displayName="AlertDialogFooter";const pe=s.forwardRef(({className:e,...a},t)=>o.jsx(M,{ref:t,className:n("text-lg font-semibold",e),...a}));pe.displayName=M.displayName;const ge=s.forwardRef(({className:e,...a},t)=>o.jsx(I,{ref:t,className:n("text-sm text-muted-foreground",e),...a}));ge.displayName=I.displayName;const me=s.forwardRef(({className:e,...a},t)=>o.jsx(O,{ref:t,className:n(D(),e),...a}));me.displayName=O.displayName;const fe=s.forwardRef(({className:e,...a},t)=>o.jsx($,{ref:t,className:n(D({variant:"outline"}),"mt-2 sm:mt-0",e),...a}));fe.displayName=$.displayName;export{Re as A,_e as a,ne as b,ce as c,pe as d,ge as e,de as f,fe as g,me as h};
