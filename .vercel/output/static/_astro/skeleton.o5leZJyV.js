import{c as P}from"./createLucideIcon.BAPAnDpJ.js";import{j as r,u as G,P as N,a as ve,S as _n,d as Rn,c as C}from"./index.DBbjwa8k.js";import{r as s}from"./index.lFdC2nkX.js";import{P as X,c as v,D as bn,a as Dn,u as In}from"./index.BatipnVx.js";import{c as he,a as Me}from"./index.BLNbD4pj.js";import{c as En}from"./index.DbJ_ZDUh.js";import{d as ge,R as Sn,I as Pn,u as Nn}from"./tabs.CrGyxHtg.js";import{h as Tn,a as kn,F as jn,R as An,u as fe}from"./index.CTnt_JEC.js";import{c as xe,A as On,C as Ln,a as Gn,R as Fn,b as Kn}from"./index.C3TQdI97.js";import{c as $n}from"./index.CxOCE76-.js";/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const go=P("CalendarDays",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 18h.01",key:"lrp35t"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M16 18h.01",key:"kzsmim"}]]);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Un=P("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bn=P("Circle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xo=P("EllipsisVertical",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"12",cy:"5",r:"1",key:"gxeob9"}],["circle",{cx:"12",cy:"19",r:"1",key:"lyex9k"}]]);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wo=P("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yo=P("Trash",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}]]);var Q=["Enter"," "],Vn=["ArrowDown","PageUp","Home"],we=["ArrowUp","PageDown","End"],zn=[...Vn,...we],Xn={ltr:[...Q,"ArrowRight"],rtl:[...Q,"ArrowLeft"]},Yn={ltr:["ArrowLeft"],rtl:["ArrowRight"]},F="Menu",[O,Hn,Wn]=En(F),[R,ye]=he(F,[Wn,xe,ge]),Y=xe(),Ce=ge(),[Zn,b]=R(F),[qn,K]=R(F),_e=e=>{const{__scopeMenu:t,open:n=!1,children:o,dir:a,onOpenChange:c,modal:d=!0}=e,l=Y(t),[f,m]=s.useState(null),p=s.useRef(!1),i=Me(c),h=Nn(a);return s.useEffect(()=>{const y=()=>{p.current=!0,document.addEventListener("pointerdown",M,{capture:!0,once:!0}),document.addEventListener("pointermove",M,{capture:!0,once:!0})},M=()=>p.current=!1;return document.addEventListener("keydown",y,{capture:!0}),()=>{document.removeEventListener("keydown",y,{capture:!0}),document.removeEventListener("pointerdown",M,{capture:!0}),document.removeEventListener("pointermove",M,{capture:!0})}},[]),r.jsx(Fn,{...l,children:r.jsx(Zn,{scope:t,open:n,onOpenChange:i,content:f,onContentChange:m,children:r.jsx(qn,{scope:t,onClose:s.useCallback(()=>i(!1),[i]),isUsingKeyboardRef:p,dir:h,modal:d,children:o})})})};_e.displayName=F;var Jn="MenuAnchor",ee=s.forwardRef((e,t)=>{const{__scopeMenu:n,...o}=e,a=Y(n);return r.jsx(On,{...a,...o,ref:t})});ee.displayName=Jn;var ne="MenuPortal",[Qn,Re]=R(ne,{forceMount:void 0}),be=e=>{const{__scopeMenu:t,forceMount:n,children:o,container:a}=e,c=b(ne,t);return r.jsx(Qn,{scope:t,forceMount:n,children:r.jsx(X,{present:n||c.open,children:r.jsx(Dn,{asChild:!0,container:a,children:o})})})};be.displayName=ne;var w="MenuContent",[et,te]=R(w),De=s.forwardRef((e,t)=>{const n=Re(w,e.__scopeMenu),{forceMount:o=n.forceMount,...a}=e,c=b(w,e.__scopeMenu),d=K(w,e.__scopeMenu);return r.jsx(O.Provider,{scope:e.__scopeMenu,children:r.jsx(X,{present:o||c.open,children:r.jsx(O.Slot,{scope:e.__scopeMenu,children:d.modal?r.jsx(nt,{...a,ref:t}):r.jsx(tt,{...a,ref:t})})})})}),nt=s.forwardRef((e,t)=>{const n=b(w,e.__scopeMenu),o=s.useRef(null),a=G(t,o);return s.useEffect(()=>{const c=o.current;if(c)return Tn(c)},[]),r.jsx(oe,{...e,ref:a,trapFocus:n.open,disableOutsidePointerEvents:n.open,disableOutsideScroll:!0,onFocusOutside:v(e.onFocusOutside,c=>c.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>n.onOpenChange(!1)})}),tt=s.forwardRef((e,t)=>{const n=b(w,e.__scopeMenu);return r.jsx(oe,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>n.onOpenChange(!1)})}),oe=s.forwardRef((e,t)=>{const{__scopeMenu:n,loop:o=!1,trapFocus:a,onOpenAutoFocus:c,onCloseAutoFocus:d,disableOutsidePointerEvents:l,onEntryFocus:f,onEscapeKeyDown:m,onPointerDownOutside:p,onFocusOutside:i,onInteractOutside:h,onDismiss:y,disableOutsideScroll:M,...D}=e,T=b(w,n),I=K(w,n),vn=Y(n),hn=Ce(n),ie=Hn(n),[Mn,ue]=s.useState(null),$=s.useRef(null),gn=G(t,$,T.onContentChange),U=s.useRef(0),B=s.useRef(""),xn=s.useRef(0),W=s.useRef(null),de=s.useRef("right"),Z=s.useRef(0),wn=M?An:s.Fragment,yn=M?{as:_n,allowPinchZoom:!0}:void 0,Cn=u=>{const S=B.current+u,_=ie().filter(x=>!x.disabled),k=document.activeElement,q=_.find(x=>x.ref.current===k)?.textValue,J=_.map(x=>x.textValue),le=mt(J,S,q),j=_.find(x=>x.textValue===le)?.ref.current;(function x(pe){B.current=pe,window.clearTimeout(U.current),pe!==""&&(U.current=window.setTimeout(()=>x(""),1e3))})(S),j&&setTimeout(()=>j.focus())};s.useEffect(()=>()=>window.clearTimeout(U.current),[]),kn();const E=s.useCallback(u=>de.current===W.current?.side&&ht(u,W.current?.area),[]);return r.jsx(et,{scope:n,searchRef:B,onItemEnter:s.useCallback(u=>{E(u)&&u.preventDefault()},[E]),onItemLeave:s.useCallback(u=>{E(u)||($.current?.focus(),ue(null))},[E]),onTriggerLeave:s.useCallback(u=>{E(u)&&u.preventDefault()},[E]),pointerGraceTimerRef:xn,onPointerGraceIntentChange:s.useCallback(u=>{W.current=u},[]),children:r.jsx(wn,{...yn,children:r.jsx(jn,{asChild:!0,trapped:a,onMountAutoFocus:v(c,u=>{u.preventDefault(),$.current?.focus({preventScroll:!0})}),onUnmountAutoFocus:d,children:r.jsx(bn,{asChild:!0,disableOutsidePointerEvents:l,onEscapeKeyDown:m,onPointerDownOutside:p,onFocusOutside:i,onInteractOutside:h,onDismiss:y,children:r.jsx(Sn,{asChild:!0,...hn,dir:I.dir,orientation:"vertical",loop:o,currentTabStopId:Mn,onCurrentTabStopIdChange:ue,onEntryFocus:v(f,u=>{I.isUsingKeyboardRef.current||u.preventDefault()}),preventScrollOnEntryFocus:!0,children:r.jsx(Ln,{role:"menu","aria-orientation":"vertical","data-state":Ue(T.open),"data-radix-menu-content":"",dir:I.dir,...vn,...D,ref:gn,style:{outline:"none",...D.style},onKeyDown:v(D.onKeyDown,u=>{const _=u.target.closest("[data-radix-menu-content]")===u.currentTarget,k=u.ctrlKey||u.altKey||u.metaKey,q=u.key.length===1;_&&(u.key==="Tab"&&u.preventDefault(),!k&&q&&Cn(u.key));const J=$.current;if(u.target!==J||!zn.includes(u.key))return;u.preventDefault();const j=ie().filter(x=>!x.disabled).map(x=>x.ref.current);we.includes(u.key)&&j.reverse(),pt(j)}),onBlur:v(e.onBlur,u=>{u.currentTarget.contains(u.target)||(window.clearTimeout(U.current),B.current="")}),onPointerMove:v(e.onPointerMove,L(u=>{const S=u.target,_=Z.current!==u.clientX;if(u.currentTarget.contains(S)&&_){const k=u.clientX>Z.current?"right":"left";de.current=k,Z.current=u.clientX}}))})})})})})})});De.displayName=w;var ot="MenuGroup",re=s.forwardRef((e,t)=>{const{__scopeMenu:n,...o}=e;return r.jsx(N.div,{role:"group",...o,ref:t})});re.displayName=ot;var rt="MenuLabel",Ie=s.forwardRef((e,t)=>{const{__scopeMenu:n,...o}=e;return r.jsx(N.div,{...o,ref:t})});Ie.displayName=rt;var V="MenuItem",me="menu.itemSelect",H=s.forwardRef((e,t)=>{const{disabled:n=!1,onSelect:o,...a}=e,c=s.useRef(null),d=K(V,e.__scopeMenu),l=te(V,e.__scopeMenu),f=G(t,c),m=s.useRef(!1),p=()=>{const i=c.current;if(!n&&i){const h=new CustomEvent(me,{bubbles:!0,cancelable:!0});i.addEventListener(me,y=>o?.(y),{once:!0}),Rn(i,h),h.defaultPrevented?m.current=!1:d.onClose()}};return r.jsx(Ee,{...a,ref:f,disabled:n,onClick:v(e.onClick,p),onPointerDown:i=>{e.onPointerDown?.(i),m.current=!0},onPointerUp:v(e.onPointerUp,i=>{m.current||i.currentTarget?.click()}),onKeyDown:v(e.onKeyDown,i=>{const h=l.searchRef.current!=="";n||h&&i.key===" "||Q.includes(i.key)&&(i.currentTarget.click(),i.preventDefault())})})});H.displayName=V;var Ee=s.forwardRef((e,t)=>{const{__scopeMenu:n,disabled:o=!1,textValue:a,...c}=e,d=te(V,n),l=Ce(n),f=s.useRef(null),m=G(t,f),[p,i]=s.useState(!1),[h,y]=s.useState("");return s.useEffect(()=>{const M=f.current;M&&y((M.textContent??"").trim())},[c.children]),r.jsx(O.ItemSlot,{scope:n,disabled:o,textValue:a??h,children:r.jsx(Pn,{asChild:!0,...l,focusable:!o,children:r.jsx(N.div,{role:"menuitem","data-highlighted":p?"":void 0,"aria-disabled":o||void 0,"data-disabled":o?"":void 0,...c,ref:m,onPointerMove:v(e.onPointerMove,L(M=>{o?d.onItemLeave(M):(d.onItemEnter(M),M.defaultPrevented||M.currentTarget.focus({preventScroll:!0}))})),onPointerLeave:v(e.onPointerLeave,L(M=>d.onItemLeave(M))),onFocus:v(e.onFocus,()=>i(!0)),onBlur:v(e.onBlur,()=>i(!1))})})})}),at="MenuCheckboxItem",Se=s.forwardRef((e,t)=>{const{checked:n=!1,onCheckedChange:o,...a}=e;return r.jsx(je,{scope:e.__scopeMenu,checked:n,children:r.jsx(H,{role:"menuitemcheckbox","aria-checked":z(n)?"mixed":n,...a,ref:t,"data-state":se(n),onSelect:v(a.onSelect,()=>o?.(z(n)?!0:!n),{checkForDefaultPrevented:!1})})})});Se.displayName=at;var Pe="MenuRadioGroup",[st,ct]=R(Pe,{value:void 0,onValueChange:()=>{}}),Ne=s.forwardRef((e,t)=>{const{value:n,onValueChange:o,...a}=e,c=Me(o);return r.jsx(st,{scope:e.__scopeMenu,value:n,onValueChange:c,children:r.jsx(re,{...a,ref:t})})});Ne.displayName=Pe;var Te="MenuRadioItem",ke=s.forwardRef((e,t)=>{const{value:n,...o}=e,a=ct(Te,e.__scopeMenu),c=n===a.value;return r.jsx(je,{scope:e.__scopeMenu,checked:c,children:r.jsx(H,{role:"menuitemradio","aria-checked":c,...o,ref:t,"data-state":se(c),onSelect:v(o.onSelect,()=>a.onValueChange?.(n),{checkForDefaultPrevented:!1})})})});ke.displayName=Te;var ae="MenuItemIndicator",[je,it]=R(ae,{checked:!1}),Ae=s.forwardRef((e,t)=>{const{__scopeMenu:n,forceMount:o,...a}=e,c=it(ae,n);return r.jsx(X,{present:o||z(c.checked)||c.checked===!0,children:r.jsx(N.span,{...a,ref:t,"data-state":se(c.checked)})})});Ae.displayName=ae;var ut="MenuSeparator",Oe=s.forwardRef((e,t)=>{const{__scopeMenu:n,...o}=e;return r.jsx(N.div,{role:"separator","aria-orientation":"horizontal",...o,ref:t})});Oe.displayName=ut;var dt="MenuArrow",Le=s.forwardRef((e,t)=>{const{__scopeMenu:n,...o}=e,a=Y(n);return r.jsx(Gn,{...a,...o,ref:t})});Le.displayName=dt;var lt="MenuSub",[Co,Ge]=R(lt),A="MenuSubTrigger",Fe=s.forwardRef((e,t)=>{const n=b(A,e.__scopeMenu),o=K(A,e.__scopeMenu),a=Ge(A,e.__scopeMenu),c=te(A,e.__scopeMenu),d=s.useRef(null),{pointerGraceTimerRef:l,onPointerGraceIntentChange:f}=c,m={__scopeMenu:e.__scopeMenu},p=s.useCallback(()=>{d.current&&window.clearTimeout(d.current),d.current=null},[]);return s.useEffect(()=>p,[p]),s.useEffect(()=>{const i=l.current;return()=>{window.clearTimeout(i),f(null)}},[l,f]),r.jsx(ee,{asChild:!0,...m,children:r.jsx(Ee,{id:a.triggerId,"aria-haspopup":"menu","aria-expanded":n.open,"aria-controls":a.contentId,"data-state":Ue(n.open),...e,ref:ve(t,a.onTriggerChange),onClick:i=>{e.onClick?.(i),!(e.disabled||i.defaultPrevented)&&(i.currentTarget.focus(),n.open||n.onOpenChange(!0))},onPointerMove:v(e.onPointerMove,L(i=>{c.onItemEnter(i),!i.defaultPrevented&&!e.disabled&&!n.open&&!d.current&&(c.onPointerGraceIntentChange(null),d.current=window.setTimeout(()=>{n.onOpenChange(!0),p()},100))})),onPointerLeave:v(e.onPointerLeave,L(i=>{p();const h=n.content?.getBoundingClientRect();if(h){const y=n.content?.dataset.side,M=y==="right",D=M?-5:5,T=h[M?"left":"right"],I=h[M?"right":"left"];c.onPointerGraceIntentChange({area:[{x:i.clientX+D,y:i.clientY},{x:T,y:h.top},{x:I,y:h.top},{x:I,y:h.bottom},{x:T,y:h.bottom}],side:y}),window.clearTimeout(l.current),l.current=window.setTimeout(()=>c.onPointerGraceIntentChange(null),300)}else{if(c.onTriggerLeave(i),i.defaultPrevented)return;c.onPointerGraceIntentChange(null)}})),onKeyDown:v(e.onKeyDown,i=>{const h=c.searchRef.current!=="";e.disabled||h&&i.key===" "||Xn[o.dir].includes(i.key)&&(n.onOpenChange(!0),n.content?.focus(),i.preventDefault())})})})});Fe.displayName=A;var Ke="MenuSubContent",$e=s.forwardRef((e,t)=>{const n=Re(w,e.__scopeMenu),{forceMount:o=n.forceMount,...a}=e,c=b(w,e.__scopeMenu),d=K(w,e.__scopeMenu),l=Ge(Ke,e.__scopeMenu),f=s.useRef(null),m=G(t,f);return r.jsx(O.Provider,{scope:e.__scopeMenu,children:r.jsx(X,{present:o||c.open,children:r.jsx(O.Slot,{scope:e.__scopeMenu,children:r.jsx(oe,{id:l.contentId,"aria-labelledby":l.triggerId,...a,ref:m,align:"start",side:d.dir==="rtl"?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:p=>{d.isUsingKeyboardRef.current&&f.current?.focus(),p.preventDefault()},onCloseAutoFocus:p=>p.preventDefault(),onFocusOutside:v(e.onFocusOutside,p=>{p.target!==l.trigger&&c.onOpenChange(!1)}),onEscapeKeyDown:v(e.onEscapeKeyDown,p=>{d.onClose(),p.preventDefault()}),onKeyDown:v(e.onKeyDown,p=>{const i=p.currentTarget.contains(p.target),h=Yn[d.dir].includes(p.key);i&&h&&(c.onOpenChange(!1),l.trigger?.focus(),p.preventDefault())})})})})})});$e.displayName=Ke;function Ue(e){return e?"open":"closed"}function z(e){return e==="indeterminate"}function se(e){return z(e)?"indeterminate":e?"checked":"unchecked"}function pt(e){const t=document.activeElement;for(const n of e)if(n===t||(n.focus(),document.activeElement!==t))return}function ft(e,t){return e.map((n,o)=>e[(t+o)%e.length])}function mt(e,t,n){const a=t.length>1&&Array.from(t).every(m=>m===t[0])?t[0]:t,c=n?e.indexOf(n):-1;let d=ft(e,Math.max(c,0));a.length===1&&(d=d.filter(m=>m!==n));const f=d.find(m=>m.toLowerCase().startsWith(a.toLowerCase()));return f!==n?f:void 0}function vt(e,t){const{x:n,y:o}=e;let a=!1;for(let c=0,d=t.length-1;c<t.length;d=c++){const l=t[c].x,f=t[c].y,m=t[d].x,p=t[d].y;f>o!=p>o&&n<(m-l)*(o-f)/(p-f)+l&&(a=!a)}return a}function ht(e,t){if(!t)return!1;const n={x:e.clientX,y:e.clientY};return vt(n,t)}function L(e){return t=>t.pointerType==="mouse"?e(t):void 0}var Mt=_e,gt=ee,xt=be,wt=De,yt=re,Ct=Ie,_t=H,Rt=Se,bt=Ne,Dt=ke,It=Ae,Et=Oe,St=Le,Pt=Fe,Nt=$e,ce="DropdownMenu",[Tt,_o]=he(ce,[ye]),g=ye(),[kt,Be]=Tt(ce),Ve=e=>{const{__scopeDropdownMenu:t,children:n,dir:o,open:a,defaultOpen:c,onOpenChange:d,modal:l=!0}=e,f=g(t),m=s.useRef(null),[p=!1,i]=In({prop:a,defaultProp:c,onChange:d});return r.jsx(kt,{scope:t,triggerId:fe(),triggerRef:m,contentId:fe(),open:p,onOpenChange:i,onOpenToggle:s.useCallback(()=>i(h=>!h),[i]),modal:l,children:r.jsx(Mt,{...f,open:p,onOpenChange:i,dir:o,modal:l,children:n})})};Ve.displayName=ce;var ze="DropdownMenuTrigger",Xe=s.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,disabled:o=!1,...a}=e,c=Be(ze,n),d=g(n);return r.jsx(gt,{asChild:!0,...d,children:r.jsx(N.button,{type:"button",id:c.triggerId,"aria-haspopup":"menu","aria-expanded":c.open,"aria-controls":c.open?c.contentId:void 0,"data-state":c.open?"open":"closed","data-disabled":o?"":void 0,disabled:o,...a,ref:ve(t,c.triggerRef),onPointerDown:v(e.onPointerDown,l=>{!o&&l.button===0&&l.ctrlKey===!1&&(c.onOpenToggle(),c.open||l.preventDefault())}),onKeyDown:v(e.onKeyDown,l=>{o||(["Enter"," "].includes(l.key)&&c.onOpenToggle(),l.key==="ArrowDown"&&c.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(l.key)&&l.preventDefault())})})})});Xe.displayName=ze;var jt="DropdownMenuPortal",Ye=e=>{const{__scopeDropdownMenu:t,...n}=e,o=g(t);return r.jsx(xt,{...o,...n})};Ye.displayName=jt;var He="DropdownMenuContent",We=s.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...o}=e,a=Be(He,n),c=g(n),d=s.useRef(!1);return r.jsx(wt,{id:a.contentId,"aria-labelledby":a.triggerId,...c,...o,ref:t,onCloseAutoFocus:v(e.onCloseAutoFocus,l=>{d.current||a.triggerRef.current?.focus(),d.current=!1,l.preventDefault()}),onInteractOutside:v(e.onInteractOutside,l=>{const f=l.detail.originalEvent,m=f.button===0&&f.ctrlKey===!0,p=f.button===2||m;(!a.modal||p)&&(d.current=!0)}),style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});We.displayName=He;var At="DropdownMenuGroup",Ze=s.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...o}=e,a=g(n);return r.jsx(yt,{...a,...o,ref:t})});Ze.displayName=At;var Ot="DropdownMenuLabel",qe=s.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...o}=e,a=g(n);return r.jsx(Ct,{...a,...o,ref:t})});qe.displayName=Ot;var Lt="DropdownMenuItem",Je=s.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...o}=e,a=g(n);return r.jsx(_t,{...a,...o,ref:t})});Je.displayName=Lt;var Gt="DropdownMenuCheckboxItem",Qe=s.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...o}=e,a=g(n);return r.jsx(Rt,{...a,...o,ref:t})});Qe.displayName=Gt;var Ft="DropdownMenuRadioGroup",Kt=s.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...o}=e,a=g(n);return r.jsx(bt,{...a,...o,ref:t})});Kt.displayName=Ft;var $t="DropdownMenuRadioItem",en=s.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...o}=e,a=g(n);return r.jsx(Dt,{...a,...o,ref:t})});en.displayName=$t;var Ut="DropdownMenuItemIndicator",nn=s.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...o}=e,a=g(n);return r.jsx(It,{...a,...o,ref:t})});nn.displayName=Ut;var Bt="DropdownMenuSeparator",tn=s.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...o}=e,a=g(n);return r.jsx(Et,{...a,...o,ref:t})});tn.displayName=Bt;var Vt="DropdownMenuArrow",zt=s.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...o}=e,a=g(n);return r.jsx(St,{...a,...o,ref:t})});zt.displayName=Vt;var Xt="DropdownMenuSubTrigger",on=s.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...o}=e,a=g(n);return r.jsx(Pt,{...a,...o,ref:t})});on.displayName=Xt;var Yt="DropdownMenuSubContent",rn=s.forwardRef((e,t)=>{const{__scopeDropdownMenu:n,...o}=e,a=g(n);return r.jsx(Nt,{...a,...o,ref:t,style:{...e.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});rn.displayName=Yt;var Ht=Ve,Wt=Xe,Zt=Ye,an=We,qt=Ze,sn=qe,cn=Je,un=Qe,dn=en,ln=nn,pn=tn,fn=on,mn=rn;const Ro=Ht,bo=Wt,Do=qt,Jt=s.forwardRef(({className:e,inset:t,children:n,...o},a)=>r.jsxs(fn,{ref:a,className:C("flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",t&&"pl-8",e),...o,children:[n,r.jsx(Kn,{className:"ml-auto"})]}));Jt.displayName=fn.displayName;const Qt=s.forwardRef(({className:e,...t},n)=>r.jsx(mn,{ref:n,className:C("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e),...t}));Qt.displayName=mn.displayName;const eo=s.forwardRef(({className:e,sideOffset:t=4,...n},o)=>r.jsx(Zt,{children:r.jsx(an,{ref:o,sideOffset:t,className:C("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e),...n})}));eo.displayName=an.displayName;const no=s.forwardRef(({className:e,inset:t,...n},o)=>r.jsx(cn,{ref:o,className:C("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",t&&"pl-8",e),...n}));no.displayName=cn.displayName;const to=s.forwardRef(({className:e,children:t,checked:n,...o},a)=>r.jsxs(un,{ref:a,className:C("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",e),checked:n,...o,children:[r.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:r.jsx(ln,{children:r.jsx(Un,{className:"h-4 w-4"})})}),t]}));to.displayName=un.displayName;const oo=s.forwardRef(({className:e,children:t,...n},o)=>r.jsxs(dn,{ref:o,className:C("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",e),...n,children:[r.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:r.jsx(ln,{children:r.jsx(Bn,{className:"h-2 w-2 fill-current"})})}),t]}));oo.displayName=dn.displayName;const ro=s.forwardRef(({className:e,inset:t,...n},o)=>r.jsx(sn,{ref:o,className:C("px-2 py-1.5 text-sm font-semibold",t&&"pl-8",e),...n}));ro.displayName=sn.displayName;const ao=s.forwardRef(({className:e,...t},n)=>r.jsx(pn,{ref:n,className:C("-mx-1 my-1 h-px bg-muted",e),...t}));ao.displayName=pn.displayName;const so=$n("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function Io({className:e,variant:t,...n}){return r.jsx("div",{className:C(so({variant:t}),e),...n})}function Eo({className:e,...t}){return r.jsx("div",{className:C("animate-pulse rounded-md bg-muted",e),...t})}export{Io as B,go as C,Ro as D,xo as E,wo as P,Eo as S,yo as T,bo as a,eo as b,ro as c,ao as d,Do as e,no as f};