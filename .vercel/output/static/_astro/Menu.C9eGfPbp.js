import{j as $,c as V}from"./index.C-M3_CjP.js";import{n as ne}from"./router.7tVD49SL.js";import{r,$ as It,a as ot,b as Tt,R as He}from"./index.Cpi2Ks0G.js";import{f as At,_ as Lt,g as Mt,i as G,j as _t,z as Ft,s as jt,k as Ut,l as Bt,m as Kt,h as Wt}from"./index.C3Bs01oF.js";import"./dialog.BO0z1hxZ.js";import{c as me}from"./createLucideIcon.DlBfeOJM.js";import{u as Ht}from"./use-toast.BAq_dyGy.js";import{H as Vt}from"./house.FDbGsj2o.js";import{S as Xt}from"./settings.CvriO5X6.js";import"./index.Dox3Ggkk.js";import"./index.DYGEF4Um.js";import"./x.DnAD47Gr.js";/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zt=me("BadgeCheck",[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yt=me("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qt=me("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gt=me("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);var Ve=1,Zt=.9,Jt=.8,Qt=.17,Ee=.1,ye=.999,en=.9999,tn=.99,nn=/[\\\/_+.#"@\[\(\{&]/,rn=/[\\\/_+.#"@\[\(\{&]/g,on=/[\s-]/,at=/[\s-]/g;function Pe(e,n,t,o,a,c,l){if(c===n.length)return a===e.length?Ve:tn;var s=`${a},${c}`;if(l[s]!==void 0)return l[s];for(var u=o.charAt(c),d=t.indexOf(u,a),f=0,m,E,h,w;d>=0;)m=Pe(e,n,t,o,d+1,c+1,l),m>f&&(d===a?m*=Ve:nn.test(e.charAt(d-1))?(m*=Jt,h=e.slice(a,d-1).match(rn),h&&a>0&&(m*=Math.pow(ye,h.length))):on.test(e.charAt(d-1))?(m*=Zt,w=e.slice(a,d-1).match(at),w&&a>0&&(m*=Math.pow(ye,w.length))):(m*=Qt,a>0&&(m*=Math.pow(ye,d-a))),e.charAt(d)!==n.charAt(c)&&(m*=en)),(m<Ee&&t.charAt(d-1)===o.charAt(c+1)||o.charAt(c+1)===o.charAt(c)&&t.charAt(d-1)!==o.charAt(c))&&(E=Pe(e,n,t,o,d+1,c+2,l),E*Ee>m&&(m=E*Ee)),m>f&&(f=m),d=t.indexOf(u,d+1);return l[s]=f,f}function Xe(e){return e.toLowerCase().replace(at," ")}function an(e,n,t){return e=t&&t.length>0?`${e+" "+t.join(" ")}`:e,Pe(e,n,Xe(e),Xe(n),0,0,{})}function T(){return T=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var o in t)({}).hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},T.apply(null,arguments)}function Q(e,n,{checkForDefaultPrevented:t=!0}={}){return function(a){if(e?.(a),t===!1||!a.defaultPrevented)return n?.(a)}}function cn(e,n){typeof e=="function"?e(n):e!=null&&(e.current=n)}function ct(...e){return n=>e.forEach(t=>cn(t,n))}function ce(...e){return r.useCallback(ct(...e),e)}function sn(e,n=[]){let t=[];function o(c,l){const s=r.createContext(l),u=t.length;t=[...t,l];function d(m){const{scope:E,children:h,...w}=m,v=E?.[e][u]||s,b=r.useMemo(()=>w,Object.values(w));return r.createElement(v.Provider,{value:b},h)}function f(m,E){const h=E?.[e][u]||s,w=r.useContext(h);if(w)return w;if(l!==void 0)return l;throw new Error(`\`${m}\` must be used within \`${c}\``)}return d.displayName=c+"Provider",[d,f]}const a=()=>{const c=t.map(l=>r.createContext(l));return function(s){const u=s?.[e]||c;return r.useMemo(()=>({[`__scope${e}`]:{...s,[e]:u}}),[s,u])}};return a.scopeName=e,[o,ln(a,...n)]}function ln(...e){const n=e[0];if(e.length===1)return n;const t=()=>{const o=e.map(a=>({useScope:a(),scopeName:a.scopeName}));return function(c){const l=o.reduce((s,{useScope:u,scopeName:d})=>{const m=u(c)[`__scope${d}`];return{...s,...m}},{});return r.useMemo(()=>({[`__scope${n.scopeName}`]:l}),[l])}};return t.scopeName=n.scopeName,t}const ke=globalThis?.document?r.useLayoutEffect:()=>{},un=It.useId||(()=>{});let dn=0;function xe(e){const[n,t]=r.useState(un());return ke(()=>{e||t(o=>o??String(dn++))},[e]),e||(n?`radix-${n}`:"")}function K(e){const n=r.useRef(e);return r.useEffect(()=>{n.current=e}),r.useMemo(()=>(...t)=>{var o;return(o=n.current)===null||o===void 0?void 0:o.call(n,...t)},[])}function fn({prop:e,defaultProp:n,onChange:t=()=>{}}){const[o,a]=mn({defaultProp:n,onChange:t}),c=e!==void 0,l=c?e:o,s=K(t),u=r.useCallback(d=>{if(c){const m=typeof d=="function"?d(e):d;m!==e&&s(m)}else a(d)},[c,e,a,s]);return[l,u]}function mn({defaultProp:e,onChange:n}){const t=r.useState(e),[o]=t,a=r.useRef(o),c=K(n);return r.useEffect(()=>{a.current!==o&&(c(o),a.current=o)},[o,a,c]),t}const Me=r.forwardRef((e,n)=>{const{children:t,...o}=e,a=r.Children.toArray(t),c=a.find(pn);if(c){const l=c.props.children,s=a.map(u=>u===c?r.Children.count(l)>1?r.Children.only(null):r.isValidElement(l)?l.props.children:null:u);return r.createElement(Oe,T({},o,{ref:n}),r.isValidElement(l)?r.cloneElement(l,void 0,s):null)}return r.createElement(Oe,T({},o,{ref:n}),t)});Me.displayName="Slot";const Oe=r.forwardRef((e,n)=>{const{children:t,...o}=e;return r.isValidElement(t)?r.cloneElement(t,{...hn(o,t.props),ref:n?ct(n,t.ref):t.ref}):r.Children.count(t)>1?r.Children.only(null):null});Oe.displayName="SlotClone";const vn=({children:e})=>r.createElement(r.Fragment,null,e);function pn(e){return r.isValidElement(e)&&e.type===vn}function hn(e,n){const t={...n};for(const o in n){const a=e[o],c=n[o];/^on[A-Z]/.test(o)?a&&c?t[o]=(...s)=>{c(...s),a(...s)}:a&&(t[o]=a):o==="style"?t[o]={...a,...c}:o==="className"&&(t[o]=[a,c].filter(Boolean).join(" "))}return{...e,...t}}const bn=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","span","svg","ul"],M=bn.reduce((e,n)=>{const t=r.forwardRef((o,a)=>{const{asChild:c,...l}=o,s=c?Me:n;return r.useEffect(()=>{window[Symbol.for("radix-ui")]=!0},[]),r.createElement(s,T({},l,{ref:a}))});return t.displayName=`Primitive.${n}`,{...e,[n]:t}},{});function gn(e,n){e&&ot.flushSync(()=>e.dispatchEvent(n))}function $n(e,n=globalThis?.document){const t=K(e);r.useEffect(()=>{const o=a=>{a.key==="Escape"&&t(a)};return n.addEventListener("keydown",o),()=>n.removeEventListener("keydown",o)},[t,n])}const De="dismissableLayer.update",En="dismissableLayer.pointerDownOutside",yn="dismissableLayer.focusOutside";let ze;const xn=r.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),Cn=r.forwardRef((e,n)=>{var t;const{disableOutsidePointerEvents:o=!1,onEscapeKeyDown:a,onPointerDownOutside:c,onFocusOutside:l,onInteractOutside:s,onDismiss:u,...d}=e,f=r.useContext(xn),[m,E]=r.useState(null),h=(t=m?.ownerDocument)!==null&&t!==void 0?t:globalThis?.document,[,w]=r.useState({}),v=ce(n,R=>E(R)),b=Array.from(f.layers),[x]=[...f.layersWithOutsidePointerEventsDisabled].slice(-1),D=b.indexOf(x),S=m?b.indexOf(m):-1,N=f.layersWithOutsidePointerEventsDisabled.size>0,C=S>=D,k=wn(R=>{const _=R.target,z=[...f.branches].some(j=>j.contains(_));!C||z||(c?.(R),s?.(R),R.defaultPrevented||u?.())},h),O=Sn(R=>{const _=R.target;[...f.branches].some(j=>j.contains(_))||(l?.(R),s?.(R),R.defaultPrevented||u?.())},h);return $n(R=>{S===f.layers.size-1&&(a?.(R),!R.defaultPrevented&&u&&(R.preventDefault(),u()))},h),r.useEffect(()=>{if(m)return o&&(f.layersWithOutsidePointerEventsDisabled.size===0&&(ze=h.body.style.pointerEvents,h.body.style.pointerEvents="none"),f.layersWithOutsidePointerEventsDisabled.add(m)),f.layers.add(m),Ye(),()=>{o&&f.layersWithOutsidePointerEventsDisabled.size===1&&(h.body.style.pointerEvents=ze)}},[m,h,o,f]),r.useEffect(()=>()=>{m&&(f.layers.delete(m),f.layersWithOutsidePointerEventsDisabled.delete(m),Ye())},[m,f]),r.useEffect(()=>{const R=()=>w({});return document.addEventListener(De,R),()=>document.removeEventListener(De,R)},[]),r.createElement(M.div,T({},d,{ref:v,style:{pointerEvents:N?C?"auto":"none":void 0,...e.style},onFocusCapture:Q(e.onFocusCapture,O.onFocusCapture),onBlurCapture:Q(e.onBlurCapture,O.onBlurCapture),onPointerDownCapture:Q(e.onPointerDownCapture,k.onPointerDownCapture)}))});function wn(e,n=globalThis?.document){const t=K(e),o=r.useRef(!1),a=r.useRef(()=>{});return r.useEffect(()=>{const c=s=>{if(s.target&&!o.current){let d=function(){st(En,t,u,{discrete:!0})};const u={originalEvent:s};s.pointerType==="touch"?(n.removeEventListener("click",a.current),a.current=d,n.addEventListener("click",a.current,{once:!0})):d()}else n.removeEventListener("click",a.current);o.current=!1},l=window.setTimeout(()=>{n.addEventListener("pointerdown",c)},0);return()=>{window.clearTimeout(l),n.removeEventListener("pointerdown",c),n.removeEventListener("click",a.current)}},[n,t]),{onPointerDownCapture:()=>o.current=!0}}function Sn(e,n=globalThis?.document){const t=K(e),o=r.useRef(!1);return r.useEffect(()=>{const a=c=>{c.target&&!o.current&&st(yn,t,{originalEvent:c},{discrete:!1})};return n.addEventListener("focusin",a),()=>n.removeEventListener("focusin",a)},[n,t]),{onFocusCapture:()=>o.current=!0,onBlurCapture:()=>o.current=!1}}function Ye(){const e=new CustomEvent(De);document.dispatchEvent(e)}function st(e,n,t,{discrete:o}){const a=t.originalEvent.target,c=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:t});n&&a.addEventListener(e,n,{once:!0}),o?gn(a,c):a.dispatchEvent(c)}const Ce="focusScope.autoFocusOnMount",we="focusScope.autoFocusOnUnmount",qe={bubbles:!1,cancelable:!0},Rn=r.forwardRef((e,n)=>{const{loop:t=!1,trapped:o=!1,onMountAutoFocus:a,onUnmountAutoFocus:c,...l}=e,[s,u]=r.useState(null),d=K(a),f=K(c),m=r.useRef(null),E=ce(n,v=>u(v)),h=r.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;r.useEffect(()=>{if(o){let v=function(S){if(h.paused||!s)return;const N=S.target;s.contains(N)?m.current=N:F(m.current,{select:!0})},b=function(S){if(h.paused||!s)return;const N=S.relatedTarget;N!==null&&(s.contains(N)||F(m.current,{select:!0}))},x=function(S){if(document.activeElement===document.body)for(const C of S)C.removedNodes.length>0&&F(s)};document.addEventListener("focusin",v),document.addEventListener("focusout",b);const D=new MutationObserver(x);return s&&D.observe(s,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",v),document.removeEventListener("focusout",b),D.disconnect()}}},[o,s,h.paused]),r.useEffect(()=>{if(s){Ze.add(h);const v=document.activeElement;if(!s.contains(v)){const x=new CustomEvent(Ce,qe);s.addEventListener(Ce,d),s.dispatchEvent(x),x.defaultPrevented||(Nn(In(lt(s)),{select:!0}),document.activeElement===v&&F(s))}return()=>{s.removeEventListener(Ce,d),setTimeout(()=>{const x=new CustomEvent(we,qe);s.addEventListener(we,f),s.dispatchEvent(x),x.defaultPrevented||F(v??document.body,{select:!0}),s.removeEventListener(we,f),Ze.remove(h)},0)}}},[s,d,f,h]);const w=r.useCallback(v=>{if(!t&&!o||h.paused)return;const b=v.key==="Tab"&&!v.altKey&&!v.ctrlKey&&!v.metaKey,x=document.activeElement;if(b&&x){const D=v.currentTarget,[S,N]=Pn(D);S&&N?!v.shiftKey&&x===N?(v.preventDefault(),t&&F(S,{select:!0})):v.shiftKey&&x===S&&(v.preventDefault(),t&&F(N,{select:!0})):x===D&&v.preventDefault()}},[t,o,h.paused]);return r.createElement(M.div,T({tabIndex:-1},l,{ref:E,onKeyDown:w}))});function Nn(e,{select:n=!1}={}){const t=document.activeElement;for(const o of e)if(F(o,{select:n}),document.activeElement!==t)return}function Pn(e){const n=lt(e),t=Ge(n,e),o=Ge(n.reverse(),e);return[t,o]}function lt(e){const n=[],t=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:o=>{const a=o.tagName==="INPUT"&&o.type==="hidden";return o.disabled||o.hidden||a?NodeFilter.FILTER_SKIP:o.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;t.nextNode();)n.push(t.currentNode);return n}function Ge(e,n){for(const t of e)if(!kn(t,{upTo:n}))return t}function kn(e,{upTo:n}){if(getComputedStyle(e).visibility==="hidden")return!0;for(;e;){if(n!==void 0&&e===n)return!1;if(getComputedStyle(e).display==="none")return!0;e=e.parentElement}return!1}function On(e){return e instanceof HTMLInputElement&&"select"in e}function F(e,{select:n=!1}={}){if(e&&e.focus){const t=document.activeElement;e.focus({preventScroll:!0}),e!==t&&On(e)&&n&&e.select()}}const Ze=Dn();function Dn(){let e=[];return{add(n){const t=e[0];n!==t&&t?.pause(),e=Je(e,n),e.unshift(n)},remove(n){var t;e=Je(e,n),(t=e[0])===null||t===void 0||t.resume()}}}function Je(e,n){const t=[...e],o=t.indexOf(n);return o!==-1&&t.splice(o,1),t}function In(e){return e.filter(n=>n.tagName!=="A")}const Tn=r.forwardRef((e,n)=>{var t;const{container:o=globalThis==null||(t=globalThis.document)===null||t===void 0?void 0:t.body,...a}=e;return o?Tt.createPortal(r.createElement(M.div,T({},a,{ref:n})),o):null});function An(e,n){return r.useReducer((t,o)=>{const a=n[t][o];return a??t},e)}const ve=e=>{const{present:n,children:t}=e,o=Ln(n),a=typeof t=="function"?t({present:o.isPresent}):r.Children.only(t),c=ce(o.ref,a.ref);return typeof t=="function"||o.isPresent?r.cloneElement(a,{ref:c}):null};ve.displayName="Presence";function Ln(e){const[n,t]=r.useState(),o=r.useRef({}),a=r.useRef(e),c=r.useRef("none"),l=e?"mounted":"unmounted",[s,u]=An(l,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return r.useEffect(()=>{const d=ie(o.current);c.current=s==="mounted"?d:"none"},[s]),ke(()=>{const d=o.current,f=a.current;if(f!==e){const E=c.current,h=ie(d);e?u("MOUNT"):h==="none"||d?.display==="none"?u("UNMOUNT"):u(f&&E!==h?"ANIMATION_OUT":"UNMOUNT"),a.current=e}},[e,u]),ke(()=>{if(n){const d=m=>{const h=ie(o.current).includes(m.animationName);m.target===n&&h&&ot.flushSync(()=>u("ANIMATION_END"))},f=m=>{m.target===n&&(c.current=ie(o.current))};return n.addEventListener("animationstart",f),n.addEventListener("animationcancel",d),n.addEventListener("animationend",d),()=>{n.removeEventListener("animationstart",f),n.removeEventListener("animationcancel",d),n.removeEventListener("animationend",d)}}else u("ANIMATION_END")},[n,u]),{isPresent:["mounted","unmountSuspended"].includes(s),ref:r.useCallback(d=>{d&&(o.current=getComputedStyle(d)),t(d)},[])}}function ie(e){return e?.animationName||"none"}let Se=0;function Mn(){r.useEffect(()=>{var e,n;const t=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",(e=t[0])!==null&&e!==void 0?e:Qe()),document.body.insertAdjacentElement("beforeend",(n=t[1])!==null&&n!==void 0?n:Qe()),Se++,()=>{Se===1&&document.querySelectorAll("[data-radix-focus-guard]").forEach(o=>o.remove()),Se--}},[])}function Qe(){const e=document.createElement("span");return e.setAttribute("data-radix-focus-guard",""),e.tabIndex=0,e.style.cssText="outline: none; opacity: 0; position: fixed; pointer-events: none",e}var it=At(),Re=function(){},pe=r.forwardRef(function(e,n){var t=r.useRef(null),o=r.useState({onScrollCapture:Re,onWheelCapture:Re,onTouchMoveCapture:Re}),a=o[0],c=o[1],l=e.forwardProps,s=e.children,u=e.className,d=e.removeScrollBar,f=e.enabled,m=e.shards,E=e.sideCar,h=e.noIsolation,w=e.inert,v=e.allowPinchZoom,b=e.as,x=b===void 0?"div":b,D=Lt(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as"]),S=E,N=Mt([t,n]),C=G(G({},D),a);return r.createElement(r.Fragment,null,f&&r.createElement(S,{sideCar:it,removeScrollBar:d,shards:m,noIsolation:h,inert:w,setCallbacks:c,allowPinchZoom:!!v,lockRef:t}),l?r.cloneElement(r.Children.only(s),G(G({},C),{ref:N})):r.createElement(x,G({},C,{className:u,ref:N}),s))});pe.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};pe.classNames={fullWidth:_t,zeroRight:Ft};var Ie=!1;if(typeof window<"u")try{var ue=Object.defineProperty({},"passive",{get:function(){return Ie=!0,!0}});window.addEventListener("test",ue,ue),window.removeEventListener("test",ue,ue)}catch{Ie=!1}var Y=Ie?{passive:!1}:!1,_n=function(e){return e.tagName==="TEXTAREA"},ut=function(e,n){var t=window.getComputedStyle(e);return t[n]!=="hidden"&&!(t.overflowY===t.overflowX&&!_n(e)&&t[n]==="visible")},Fn=function(e){return ut(e,"overflowY")},jn=function(e){return ut(e,"overflowX")},et=function(e,n){var t=n;do{typeof ShadowRoot<"u"&&t instanceof ShadowRoot&&(t=t.host);var o=dt(e,t);if(o){var a=ft(e,t),c=a[1],l=a[2];if(c>l)return!0}t=t.parentNode}while(t&&t!==document.body);return!1},Un=function(e){var n=e.scrollTop,t=e.scrollHeight,o=e.clientHeight;return[n,t,o]},Bn=function(e){var n=e.scrollLeft,t=e.scrollWidth,o=e.clientWidth;return[n,t,o]},dt=function(e,n){return e==="v"?Fn(n):jn(n)},ft=function(e,n){return e==="v"?Un(n):Bn(n)},Kn=function(e,n){return e==="h"&&n==="rtl"?-1:1},Wn=function(e,n,t,o,a){var c=Kn(e,window.getComputedStyle(n).direction),l=c*o,s=t.target,u=n.contains(s),d=!1,f=l>0,m=0,E=0;do{var h=ft(e,s),w=h[0],v=h[1],b=h[2],x=v-b-c*w;(w||x)&&dt(e,s)&&(m+=x,E+=w),s=s.parentNode}while(!u&&s!==document.body||u&&(n.contains(s)||n===s));return(f&&(m===0||!a)||!f&&(E===0||!a))&&(d=!0),d},de=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},tt=function(e){return[e.deltaX,e.deltaY]},nt=function(e){return e&&"current"in e?e.current:e},Hn=function(e,n){return e[0]===n[0]&&e[1]===n[1]},Vn=function(e){return`
  .block-interactivity-`.concat(e,` {pointer-events: none;}
  .allow-interactivity-`).concat(e,` {pointer-events: all;}
`)},Xn=0,q=[];function zn(e){var n=r.useRef([]),t=r.useRef([0,0]),o=r.useRef(),a=r.useState(Xn++)[0],c=r.useState(function(){return jt()})[0],l=r.useRef(e);r.useEffect(function(){l.current=e},[e]),r.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(a));var v=Ut([e.lockRef.current],(e.shards||[]).map(nt),!0).filter(Boolean);return v.forEach(function(b){return b.classList.add("allow-interactivity-".concat(a))}),function(){document.body.classList.remove("block-interactivity-".concat(a)),v.forEach(function(b){return b.classList.remove("allow-interactivity-".concat(a))})}}},[e.inert,e.lockRef.current,e.shards]);var s=r.useCallback(function(v,b){if("touches"in v&&v.touches.length===2)return!l.current.allowPinchZoom;var x=de(v),D=t.current,S="deltaX"in v?v.deltaX:D[0]-x[0],N="deltaY"in v?v.deltaY:D[1]-x[1],C,k=v.target,O=Math.abs(S)>Math.abs(N)?"h":"v";if("touches"in v&&O==="h"&&k.type==="range")return!1;var R=et(O,k);if(!R)return!0;if(R?C=O:(C=O==="v"?"h":"v",R=et(O,k)),!R)return!1;if(!o.current&&"changedTouches"in v&&(S||N)&&(o.current=C),!C)return!0;var _=o.current||C;return Wn(_,b,v,_==="h"?S:N,!0)},[]),u=r.useCallback(function(v){var b=v;if(!(!q.length||q[q.length-1]!==c)){var x="deltaY"in b?tt(b):de(b),D=n.current.filter(function(C){return C.name===b.type&&C.target===b.target&&Hn(C.delta,x)})[0];if(D&&D.should){b.cancelable&&b.preventDefault();return}if(!D){var S=(l.current.shards||[]).map(nt).filter(Boolean).filter(function(C){return C.contains(b.target)}),N=S.length>0?s(b,S[0]):!l.current.noIsolation;N&&b.cancelable&&b.preventDefault()}}},[]),d=r.useCallback(function(v,b,x,D){var S={name:v,delta:b,target:x,should:D};n.current.push(S),setTimeout(function(){n.current=n.current.filter(function(N){return N!==S})},1)},[]),f=r.useCallback(function(v){t.current=de(v),o.current=void 0},[]),m=r.useCallback(function(v){d(v.type,tt(v),v.target,s(v,e.lockRef.current))},[]),E=r.useCallback(function(v){d(v.type,de(v),v.target,s(v,e.lockRef.current))},[]);r.useEffect(function(){return q.push(c),e.setCallbacks({onScrollCapture:m,onWheelCapture:m,onTouchMoveCapture:E}),document.addEventListener("wheel",u,Y),document.addEventListener("touchmove",u,Y),document.addEventListener("touchstart",f,Y),function(){q=q.filter(function(v){return v!==c}),document.removeEventListener("wheel",u,Y),document.removeEventListener("touchmove",u,Y),document.removeEventListener("touchstart",f,Y)}},[]);var h=e.removeScrollBar,w=e.inert;return r.createElement(r.Fragment,null,w?r.createElement(c,{styles:Vn(a)}):null,h?r.createElement(Bt,{gapMode:"margin"}):null)}const Yn=Kt(it,zn);var mt=r.forwardRef(function(e,n){return r.createElement(pe,G({},e,{ref:n,sideCar:Yn}))});mt.classNames=pe.classNames;const vt="Dialog",[pt,Ar]=sn(vt),[qn,X]=pt(vt),Gn=e=>{const{__scopeDialog:n,children:t,open:o,defaultOpen:a,onOpenChange:c,modal:l=!0}=e,s=r.useRef(null),u=r.useRef(null),[d=!1,f]=fn({prop:o,defaultProp:a,onChange:c});return r.createElement(qn,{scope:n,triggerRef:s,contentRef:u,contentId:xe(),titleId:xe(),descriptionId:xe(),open:d,onOpenChange:f,onOpenToggle:r.useCallback(()=>f(m=>!m),[f]),modal:l},t)},ht="DialogPortal",[Zn,bt]=pt(ht,{forceMount:void 0}),Jn=e=>{const{__scopeDialog:n,forceMount:t,children:o,container:a}=e,c=X(ht,n);return r.createElement(Zn,{scope:n,forceMount:t},r.Children.map(o,l=>r.createElement(ve,{present:t||c.open},r.createElement(Tn,{asChild:!0,container:a},l))))},Te="DialogOverlay",Qn=r.forwardRef((e,n)=>{const t=bt(Te,e.__scopeDialog),{forceMount:o=t.forceMount,...a}=e,c=X(Te,e.__scopeDialog);return c.modal?r.createElement(ve,{present:o||c.open},r.createElement(er,T({},a,{ref:n}))):null}),er=r.forwardRef((e,n)=>{const{__scopeDialog:t,...o}=e,a=X(Te,t);return r.createElement(mt,{as:Me,allowPinchZoom:!0,shards:[a.contentRef]},r.createElement(M.div,T({"data-state":$t(a.open)},o,{ref:n,style:{pointerEvents:"auto",...o.style}})))}),oe="DialogContent",tr=r.forwardRef((e,n)=>{const t=bt(oe,e.__scopeDialog),{forceMount:o=t.forceMount,...a}=e,c=X(oe,e.__scopeDialog);return r.createElement(ve,{present:o||c.open},c.modal?r.createElement(nr,T({},a,{ref:n})):r.createElement(rr,T({},a,{ref:n})))}),nr=r.forwardRef((e,n)=>{const t=X(oe,e.__scopeDialog),o=r.useRef(null),a=ce(n,t.contentRef,o);return r.useEffect(()=>{const c=o.current;if(c)return Wt(c)},[]),r.createElement(gt,T({},e,{ref:a,trapFocus:t.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:Q(e.onCloseAutoFocus,c=>{var l;c.preventDefault(),(l=t.triggerRef.current)===null||l===void 0||l.focus()}),onPointerDownOutside:Q(e.onPointerDownOutside,c=>{const l=c.detail.originalEvent,s=l.button===0&&l.ctrlKey===!0;(l.button===2||s)&&c.preventDefault()}),onFocusOutside:Q(e.onFocusOutside,c=>c.preventDefault())}))}),rr=r.forwardRef((e,n)=>{const t=X(oe,e.__scopeDialog),o=r.useRef(!1),a=r.useRef(!1);return r.createElement(gt,T({},e,{ref:n,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:c=>{var l;if((l=e.onCloseAutoFocus)===null||l===void 0||l.call(e,c),!c.defaultPrevented){var s;o.current||(s=t.triggerRef.current)===null||s===void 0||s.focus(),c.preventDefault()}o.current=!1,a.current=!1},onInteractOutside:c=>{var l,s;(l=e.onInteractOutside)===null||l===void 0||l.call(e,c),c.defaultPrevented||(o.current=!0,c.detail.originalEvent.type==="pointerdown"&&(a.current=!0));const u=c.target;((s=t.triggerRef.current)===null||s===void 0?void 0:s.contains(u))&&c.preventDefault(),c.detail.originalEvent.type==="focusin"&&a.current&&c.preventDefault()}}))}),gt=r.forwardRef((e,n)=>{const{__scopeDialog:t,trapFocus:o,onOpenAutoFocus:a,onCloseAutoFocus:c,...l}=e,s=X(oe,t),u=r.useRef(null),d=ce(n,u);return Mn(),r.createElement(r.Fragment,null,r.createElement(Rn,{asChild:!0,loop:!0,trapped:o,onMountAutoFocus:a,onUnmountAutoFocus:c},r.createElement(Cn,T({role:"dialog",id:s.contentId,"aria-describedby":s.descriptionId,"aria-labelledby":s.titleId,"data-state":$t(s.open)},l,{ref:d,onDismiss:()=>s.onOpenChange(!1)}))),!1)});function $t(e){return e?"open":"closed"}const or=Gn,ar=Jn,cr=Qn,sr=tr;var re='[cmdk-group=""]',Ne='[cmdk-group-items=""]',lr='[cmdk-group-heading=""]',_e='[cmdk-item=""]',rt=`${_e}:not([aria-disabled="true"])`,Ae="cmdk-item-select",B="data-value",ir=(e,n,t)=>an(e,n,t),Et=r.createContext(void 0),se=()=>r.useContext(Et),yt=r.createContext(void 0),Fe=()=>r.useContext(yt),xt=r.createContext(void 0),Ct=r.forwardRef((e,n)=>{let t=Z(()=>{var i,g;return{search:"",value:(g=(i=e.value)!=null?i:e.defaultValue)!=null?g:"",filtered:{count:0,items:new Map,groups:new Set}}}),o=Z(()=>new Set),a=Z(()=>new Map),c=Z(()=>new Map),l=Z(()=>new Set),s=St(e),{label:u,children:d,value:f,onValueChange:m,filter:E,shouldFilter:h,loop:w,disablePointerSelection:v=!1,vimBindings:b=!0,...x}=e,D=r.useId(),S=r.useId(),N=r.useId(),C=r.useRef(null),k=$r();W(()=>{if(f!==void 0){let i=f.trim();t.current.value=i,O.emit()}},[f]),W(()=>{k(6,je)},[]);let O=r.useMemo(()=>({subscribe:i=>(l.current.add(i),()=>l.current.delete(i)),snapshot:()=>t.current,setState:(i,g,y)=>{var p,P,I;if(!Object.is(t.current[i],g)){if(t.current[i]=g,i==="search")be(),z(),k(1,j);else if(i==="value"&&(y||k(5,je),((p=s.current)==null?void 0:p.value)!==void 0)){let L=g??"";(I=(P=s.current).onValueChange)==null||I.call(P,L);return}O.emit()}},emit:()=>{l.current.forEach(i=>i())}}),[]),R=r.useMemo(()=>({value:(i,g,y)=>{var p;g!==((p=c.current.get(i))==null?void 0:p.value)&&(c.current.set(i,{value:g,keywords:y}),t.current.filtered.items.set(i,_(g,y)),k(2,()=>{z(),O.emit()}))},item:(i,g)=>(o.current.add(i),g&&(a.current.has(g)?a.current.get(g).add(i):a.current.set(g,new Set([i]))),k(3,()=>{be(),z(),t.current.value||j(),O.emit()}),()=>{c.current.delete(i),o.current.delete(i),t.current.filtered.items.delete(i);let y=ee();k(4,()=>{be(),y?.getAttribute("id")===i&&j(),O.emit()})}),group:i=>(a.current.has(i)||a.current.set(i,new Set),()=>{c.current.delete(i),a.current.delete(i)}),filter:()=>s.current.shouldFilter,label:u||e["aria-label"],disablePointerSelection:v,listId:D,inputId:N,labelId:S,listInnerRef:C}),[]);function _(i,g){var y,p;let P=(p=(y=s.current)==null?void 0:y.filter)!=null?p:ir;return i?P(i,t.current.search,g):0}function z(){if(!t.current.search||s.current.shouldFilter===!1)return;let i=t.current.filtered.items,g=[];t.current.filtered.groups.forEach(p=>{let P=a.current.get(p),I=0;P.forEach(L=>{let U=i.get(L);I=Math.max(U,I)}),g.push([p,I])});let y=C.current;te().sort((p,P)=>{var I,L;let U=p.getAttribute("id"),le=P.getAttribute("id");return((I=i.get(le))!=null?I:0)-((L=i.get(U))!=null?L:0)}).forEach(p=>{let P=p.closest(Ne);P?P.appendChild(p.parentElement===P?p:p.closest(`${Ne} > *`)):y.appendChild(p.parentElement===y?p:p.closest(`${Ne} > *`))}),g.sort((p,P)=>P[1]-p[1]).forEach(p=>{let P=C.current.querySelector(`${re}[${B}="${encodeURIComponent(p[0])}"]`);P?.parentElement.appendChild(P)})}function j(){let i=te().find(y=>y.getAttribute("aria-disabled")!=="true"),g=i?.getAttribute(B);O.setState("value",g||void 0)}function be(){var i,g,y,p;if(!t.current.search||s.current.shouldFilter===!1){t.current.filtered.count=o.current.size;return}t.current.filtered.groups=new Set;let P=0;for(let I of o.current){let L=(g=(i=c.current.get(I))==null?void 0:i.value)!=null?g:"",U=(p=(y=c.current.get(I))==null?void 0:y.keywords)!=null?p:[],le=_(L,U);t.current.filtered.items.set(I,le),le>0&&P++}for(let[I,L]of a.current)for(let U of L)if(t.current.filtered.items.get(U)>0){t.current.filtered.groups.add(I);break}t.current.filtered.count=P}function je(){var i,g,y;let p=ee();p&&(((i=p.parentElement)==null?void 0:i.firstChild)===p&&((y=(g=p.closest(re))==null?void 0:g.querySelector(lr))==null||y.scrollIntoView({block:"nearest"})),p.scrollIntoView({block:"nearest"}))}function ee(){var i;return(i=C.current)==null?void 0:i.querySelector(`${_e}[aria-selected="true"]`)}function te(){var i;return Array.from((i=C.current)==null?void 0:i.querySelectorAll(rt))}function ge(i){let g=te()[i];g&&O.setState("value",g.getAttribute(B))}function $e(i){var g;let y=ee(),p=te(),P=p.findIndex(L=>L===y),I=p[P+i];(g=s.current)!=null&&g.loop&&(I=P+i<0?p[p.length-1]:P+i===p.length?p[0]:p[P+i]),I&&O.setState("value",I.getAttribute(B))}function Ue(i){let g=ee(),y=g?.closest(re),p;for(;y&&!p;)y=i>0?br(y,re):gr(y,re),p=y?.querySelector(rt);p?O.setState("value",p.getAttribute(B)):$e(i)}let Be=()=>ge(te().length-1),Ke=i=>{i.preventDefault(),i.metaKey?Be():i.altKey?Ue(1):$e(1)},We=i=>{i.preventDefault(),i.metaKey?ge(0):i.altKey?Ue(-1):$e(-1)};return r.createElement(M.div,{ref:n,tabIndex:-1,...x,"cmdk-root":"",onKeyDown:i=>{var g;if((g=x.onKeyDown)==null||g.call(x,i),!i.defaultPrevented)switch(i.key){case"n":case"j":{b&&i.ctrlKey&&Ke(i);break}case"ArrowDown":{Ke(i);break}case"p":case"k":{b&&i.ctrlKey&&We(i);break}case"ArrowUp":{We(i);break}case"Home":{i.preventDefault(),ge(0);break}case"End":{i.preventDefault(),Be();break}case"Enter":if(!i.nativeEvent.isComposing&&i.keyCode!==229){i.preventDefault();let y=ee();if(y){let p=new Event(Ae);y.dispatchEvent(p)}}}}},r.createElement("label",{"cmdk-label":"",htmlFor:R.inputId,id:R.labelId,style:yr},u),he(e,i=>r.createElement(yt.Provider,{value:O},r.createElement(Et.Provider,{value:R},i))))}),ur=r.forwardRef((e,n)=>{var t,o;let a=r.useId(),c=r.useRef(null),l=r.useContext(xt),s=se(),u=St(e),d=(o=(t=u.current)==null?void 0:t.forceMount)!=null?o:l?.forceMount;W(()=>{if(!d)return s.item(a,l?.id)},[d]);let f=Rt(a,c,[e.value,e.children,c],e.keywords),m=Fe(),E=H(k=>k.value&&k.value===f.current),h=H(k=>d||s.filter()===!1?!0:k.search?k.filtered.items.get(a)>0:!0);r.useEffect(()=>{let k=c.current;if(!(!k||e.disabled))return k.addEventListener(Ae,w),()=>k.removeEventListener(Ae,w)},[h,e.onSelect,e.disabled]);function w(){var k,O;v(),(O=(k=u.current).onSelect)==null||O.call(k,f.current)}function v(){m.setState("value",f.current,!0)}if(!h)return null;let{disabled:b,value:x,onSelect:D,forceMount:S,keywords:N,...C}=e;return r.createElement(M.div,{ref:ae([c,n]),...C,id:a,"cmdk-item":"",role:"option","aria-disabled":!!b,"aria-selected":!!E,"data-disabled":!!b,"data-selected":!!E,onPointerMove:b||s.disablePointerSelection?void 0:v,onClick:b?void 0:w},e.children)}),dr=r.forwardRef((e,n)=>{let{heading:t,children:o,forceMount:a,...c}=e,l=r.useId(),s=r.useRef(null),u=r.useRef(null),d=r.useId(),f=se(),m=H(h=>a||f.filter()===!1?!0:h.search?h.filtered.groups.has(l):!0);W(()=>f.group(l),[]),Rt(l,s,[e.value,e.heading,u]);let E=r.useMemo(()=>({id:l,forceMount:a}),[a]);return r.createElement(M.div,{ref:ae([s,n]),...c,"cmdk-group":"",role:"presentation",hidden:m?void 0:!0},t&&r.createElement("div",{ref:u,"cmdk-group-heading":"","aria-hidden":!0,id:d},t),he(e,h=>r.createElement("div",{"cmdk-group-items":"",role:"group","aria-labelledby":t?d:void 0},r.createElement(xt.Provider,{value:E},h))))}),fr=r.forwardRef((e,n)=>{let{alwaysRender:t,...o}=e,a=r.useRef(null),c=H(l=>!l.search);return!t&&!c?null:r.createElement(M.div,{ref:ae([a,n]),...o,"cmdk-separator":"",role:"separator"})}),mr=r.forwardRef((e,n)=>{let{onValueChange:t,...o}=e,a=e.value!=null,c=Fe(),l=H(f=>f.search),s=H(f=>f.value),u=se(),d=r.useMemo(()=>{var f;let m=(f=u.listInnerRef.current)==null?void 0:f.querySelector(`${_e}[${B}="${encodeURIComponent(s)}"]`);return m?.getAttribute("id")},[]);return r.useEffect(()=>{e.value!=null&&c.setState("search",e.value)},[e.value]),r.createElement(M.input,{ref:n,...o,"cmdk-input":"",autoComplete:"off",autoCorrect:"off",spellCheck:!1,"aria-autocomplete":"list",role:"combobox","aria-expanded":!0,"aria-controls":u.listId,"aria-labelledby":u.labelId,"aria-activedescendant":d,id:u.inputId,type:"text",value:a?e.value:l,onChange:f=>{a||c.setState("search",f.target.value),t?.(f.target.value)}})}),vr=r.forwardRef((e,n)=>{let{children:t,label:o="Suggestions",...a}=e,c=r.useRef(null),l=r.useRef(null),s=se();return r.useEffect(()=>{if(l.current&&c.current){let u=l.current,d=c.current,f,m=new ResizeObserver(()=>{f=requestAnimationFrame(()=>{let E=u.offsetHeight;d.style.setProperty("--cmdk-list-height",E.toFixed(1)+"px")})});return m.observe(u),()=>{cancelAnimationFrame(f),m.unobserve(u)}}},[]),r.createElement(M.div,{ref:ae([c,n]),...a,"cmdk-list":"",role:"listbox","aria-label":o,id:s.listId},he(e,u=>r.createElement("div",{ref:ae([l,s.listInnerRef]),"cmdk-list-sizer":""},u)))}),wt=r.forwardRef((e,n)=>{let{open:t,onOpenChange:o,overlayClassName:a,contentClassName:c,container:l,...s}=e;return r.createElement(or,{open:t,onOpenChange:o},r.createElement(ar,{container:l},r.createElement(cr,{"cmdk-overlay":"",className:a}),r.createElement(sr,{"aria-label":e.label,"cmdk-dialog":"",className:c},r.createElement(Ct,{ref:n,...s}))))}),pr=r.forwardRef((e,n)=>H(t=>t.filtered.count===0)?r.createElement(M.div,{ref:n,...e,"cmdk-empty":"",role:"presentation"}):null),hr=r.forwardRef((e,n)=>{let{progress:t,children:o,label:a="Loading...",...c}=e;return r.createElement(M.div,{ref:n,...c,"cmdk-loading":"",role:"progressbar","aria-valuenow":t,"aria-valuemin":0,"aria-valuemax":100,"aria-label":a},he(e,l=>r.createElement("div",{"aria-hidden":!0},l)))}),A=Object.assign(Ct,{List:vr,Item:ur,Input:mr,Group:dr,Separator:fr,Dialog:wt,Empty:pr,Loading:hr});function br(e,n){let t=e.nextElementSibling;for(;t;){if(t.matches(n))return t;t=t.nextElementSibling}}function gr(e,n){let t=e.previousElementSibling;for(;t;){if(t.matches(n))return t;t=t.previousElementSibling}}function St(e){let n=r.useRef(e);return W(()=>{n.current=e}),n}var W=typeof window>"u"?r.useEffect:r.useLayoutEffect;function Z(e){let n=r.useRef();return n.current===void 0&&(n.current=e()),n}function ae(e){return n=>{e.forEach(t=>{typeof t=="function"?t(n):t!=null&&(t.current=n)})}}function H(e){let n=Fe(),t=()=>e(n.snapshot());return r.useSyncExternalStore(n.subscribe,t,t)}function Rt(e,n,t,o=[]){let a=r.useRef(),c=se();return W(()=>{var l;let s=(()=>{var d;for(let f of t){if(typeof f=="string")return f.trim();if(typeof f=="object"&&"current"in f)return f.current?(d=f.current.textContent)==null?void 0:d.trim():a.current}})(),u=o.map(d=>d.trim());c.value(e,s,u),(l=n.current)==null||l.setAttribute(B,s),a.current=s}),a}var $r=()=>{let[e,n]=r.useState(),t=Z(()=>new Map);return W(()=>{t.current.forEach(o=>o()),t.current=new Map},[e]),(o,a)=>{t.current.set(o,a),n({})}};function Er(e){let n=e.type;return typeof n=="function"?n(e.props):"render"in n?n.render(e.props):e}function he({asChild:e,children:n},t){return e&&r.isValidElement(n)?r.cloneElement(Er(n),{ref:n.ref},t(n.props.children)):t(n)}var yr={position:"absolute",width:"1px",height:"1px",padding:"0",margin:"-1px",overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0"};const Nt=r.forwardRef(({className:e,...n},t)=>$.jsx(A,{ref:t,className:V("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",e),...n}));Nt.displayName=A.displayName;const Pt=r.forwardRef(({className:e,...n},t)=>$.jsxs("div",{className:"flex items-center border-b px-3","cmdk-input-wrapper":"",children:[$.jsx(qt,{className:"mr-2 h-4 w-4 shrink-0 opacity-50"}),$.jsx(A.Input,{ref:t,className:V("flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",e),...n})]}));Pt.displayName=A.Input.displayName;const kt=r.forwardRef(({className:e,...n},t)=>$.jsx(A.List,{ref:t,className:V("max-h-[300px] overflow-y-auto overflow-x-hidden",e),...n}));kt.displayName=A.List.displayName;const Ot=r.forwardRef((e,n)=>$.jsx(A.Empty,{ref:n,className:"py-6 text-center text-sm",...e}));Ot.displayName=A.Empty.displayName;const Le=r.forwardRef(({className:e,...n},t)=>$.jsx(A.Group,{ref:t,className:V("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",e),...n}));Le.displayName=A.Group.displayName;const Dt=r.forwardRef(({className:e,...n},t)=>$.jsx(A.Separator,{ref:t,className:V("-mx-1 h-px bg-border",e),...n}));Dt.displayName=A.Separator.displayName;const J=r.forwardRef(({className:e,...n},t)=>$.jsx(A.Item,{ref:t,className:V("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",e),...n}));J.displayName=A.Item.displayName;const fe=({className:e,...n})=>$.jsx("span",{className:V("ml-auto text-xs tracking-widest text-muted-foreground",e),...n});fe.displayName="CommandShortcut";function Lr({courses:e}){const{toast:n}=Ht(),[t,o]=He.useState(!1);He.useEffect(()=>{const c=s=>{s.preventDefault(),o(u=>!u)},l=s=>{s.key==="k"&&(s.metaKey||s.ctrlKey)&&(s.preventDefault(),o(u=>!u))};return document.addEventListener("keydown",l),document.addEventListener("openMenuEvent",c),()=>{document.removeEventListener("keydown",l),document.removeEventListener("openMenuEvent",c)}},[]);const a=async()=>{const l=await(await fetch("/api/users/logout",{method:"POST"})).json();l.message==="success"?ne("/login"):n({title:"Algo salió mal!",description:l.message,variant:"destructive"})};return $.jsx(wt,{open:t,onOpenChange:o,className:"fixed top-16 left-0 right-0 mx-2",children:$.jsxs(Nt,{className:"rounded-lg border shadow-md md:min-w-[450px]",children:[$.jsx(Pt,{placeholder:"Busca tus cursos usando palabras clave..."}),$.jsxs(kt,{children:[$.jsx(Ot,{children:"0 coincidencias"}),$.jsx(Le,{heading:"Sugerencias",children:e.map(c=>$.jsxs(J,{onSelect:()=>ne(`/courses/details/${c.id}`),children:[$.jsx(zt,{className:"mr-2 h-4 w-4"}),$.jsxs("span",{children:["Curso: ",c.title]})]},c.id))}),$.jsx(Dt,{}),$.jsxs(Le,{heading:"Menú de opciones",children:[$.jsxs(J,{onSelect:()=>ne("/"),children:[$.jsx(Vt,{className:"mr-2 h-4 w-4"}),$.jsx("span",{children:"Inicio"}),$.jsx(fe,{children:"⌘H"})]}),$.jsxs(J,{onSelect:()=>ne("/profile"),children:[$.jsx(Gt,{className:"mr-2 h-4 w-4"}),$.jsx("span",{children:"Perfil"}),$.jsx(fe,{children:"⌘P"})]}),$.jsxs(J,{onSelect:()=>ne("/profile"),children:[$.jsx(Xt,{className:"mr-2 h-4 w-4"}),$.jsx("span",{children:"Ajustes"}),$.jsx(fe,{children:"⌘S"})]}),$.jsxs(J,{onSelect:a,children:[$.jsx(Yt,{className:"mr-2 h-4 w-4",color:"rgb(239 68 68)"}),$.jsx("span",{className:"text-red-500",children:"Cerrar sesión"})]})]})]})]})})}export{Lr as Menu};
