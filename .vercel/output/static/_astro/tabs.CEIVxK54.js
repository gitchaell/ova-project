import{j as p,u as le,P as F,c as A}from"./index.C-M3_CjP.js";import{r}from"./index.Cpi2Ks0G.js";import{u as G,c as I,P as de}from"./index.Dox3Ggkk.js";import{c as fe}from"./index.B-mGbkiQ.js";import{c as pe}from"./index.BjuswFHX.js";import{u as k}from"./index.C3Bs01oF.js";import{a as ve}from"./index.DYGEF4Um.js";var me=r.createContext(void 0);function O(e){const t=r.useContext(me);return e||t||"ltr"}var _="rovingFocusGroup.onEntryFocus",be={bubbles:!1,cancelable:!0},h="RovingFocusGroup",[N,$,ge]=fe(h),[xe,K]=pe(h,[ge]),[Te,Ie]=xe(h),L=r.forwardRef((e,t)=>p.jsx(N.Provider,{scope:e.__scopeRovingFocusGroup,children:p.jsx(N.Slot,{scope:e.__scopeRovingFocusGroup,children:p.jsx(Ce,{...e,ref:t})})}));L.displayName=h;var Ce=r.forwardRef((e,t)=>{const{__scopeRovingFocusGroup:o,orientation:n,loop:a=!1,dir:d,currentTabStopId:s,defaultCurrentTabStopId:u,onCurrentTabStopIdChange:f,onEntryFocus:c,preventScrollOnEntryFocus:v=!1,...i}=e,m=r.useRef(null),C=le(t,m),l=O(d),[g=null,w]=G({prop:s,defaultProp:u,onChange:f}),[x,T]=r.useState(!1),S=ve(c),re=$(o),y=r.useRef(!1),[se,D]=r.useState(0);return r.useEffect(()=>{const b=m.current;if(b)return b.addEventListener(_,S),()=>b.removeEventListener(_,S)},[S]),p.jsx(Te,{scope:o,orientation:n,dir:l,loop:a,currentTabStopId:g,onItemFocus:r.useCallback(b=>w(b),[w]),onItemShiftTab:r.useCallback(()=>T(!0),[]),onFocusableItemAdd:r.useCallback(()=>D(b=>b+1),[]),onFocusableItemRemove:r.useCallback(()=>D(b=>b-1),[]),children:p.jsx(F.div,{tabIndex:x||se===0?-1:0,"data-orientation":n,...i,ref:C,style:{outline:"none",...e.style},onMouseDown:I(e.onMouseDown,()=>{y.current=!0}),onFocus:I(e.onFocus,b=>{const ae=!y.current;if(b.target===b.currentTarget&&ae&&!x){const M=new CustomEvent(_,be);if(b.currentTarget.dispatchEvent(M),!M.defaultPrevented){const E=re().filter(R=>R.focusable),ce=E.find(R=>R.active),ie=E.find(R=>R.id===g),ue=[ce,ie,...E].filter(Boolean).map(R=>R.ref.current);U(ue,v)}}y.current=!1}),onBlur:I(e.onBlur,()=>T(!1))})})}),V="RovingFocusGroupItem",B=r.forwardRef((e,t)=>{const{__scopeRovingFocusGroup:o,focusable:n=!0,active:a=!1,tabStopId:d,...s}=e,u=k(),f=d||u,c=Ie(V,o),v=c.currentTabStopId===f,i=$(o),{onFocusableItemAdd:m,onFocusableItemRemove:C}=c;return r.useEffect(()=>{if(n)return m(),()=>C()},[n,m,C]),p.jsx(N.ItemSlot,{scope:o,id:f,focusable:n,active:a,children:p.jsx(F.span,{tabIndex:v?0:-1,"data-orientation":c.orientation,...s,ref:t,onMouseDown:I(e.onMouseDown,l=>{n?c.onItemFocus(f):l.preventDefault()}),onFocus:I(e.onFocus,()=>c.onItemFocus(f)),onKeyDown:I(e.onKeyDown,l=>{if(l.key==="Tab"&&l.shiftKey){c.onItemShiftTab();return}if(l.target!==l.currentTarget)return;const g=we(l,c.orientation,c.dir);if(g!==void 0){if(l.metaKey||l.ctrlKey||l.altKey||l.shiftKey)return;l.preventDefault();let x=i().filter(T=>T.focusable).map(T=>T.ref.current);if(g==="last")x.reverse();else if(g==="prev"||g==="next"){g==="prev"&&x.reverse();const T=x.indexOf(l.currentTarget);x=c.loop?he(x,T+1):x.slice(T+1)}setTimeout(()=>U(x))}})})})});B.displayName=V;var Re={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function Fe(e,t){return t!=="rtl"?e:e==="ArrowLeft"?"ArrowRight":e==="ArrowRight"?"ArrowLeft":e}function we(e,t,o){const n=Fe(e.key,o);if(!(t==="vertical"&&["ArrowLeft","ArrowRight"].includes(n))&&!(t==="horizontal"&&["ArrowUp","ArrowDown"].includes(n)))return Re[n]}function U(e,t=!1){const o=document.activeElement;for(const n of e)if(n===o||(n.focus({preventScroll:t}),document.activeElement!==o))return}function he(e,t){return e.map((o,n)=>e[(t+n)%e.length])}var Se=L,ye=B;function Ee(e,t=[]){let o=[];function n(d,s){const u=r.createContext(s),f=o.length;o=[...o,s];const c=i=>{const{scope:m,children:C,...l}=i,g=m?.[e]?.[f]||u,w=r.useMemo(()=>l,Object.values(l));return p.jsx(g.Provider,{value:w,children:C})};c.displayName=d+"Provider";function v(i,m){const C=m?.[e]?.[f]||u,l=r.useContext(C);if(l)return l;if(s!==void 0)return s;throw new Error(`\`${i}\` must be used within \`${d}\``)}return[c,v]}const a=()=>{const d=o.map(s=>r.createContext(s));return function(u){const f=u?.[e]||d;return r.useMemo(()=>({[`__scope${e}`]:{...u,[e]:f}}),[u,f])}};return a.scopeName=e,[n,_e(a,...t)]}function _e(...e){const t=e[0];if(e.length===1)return t;const o=()=>{const n=e.map(a=>({useScope:a(),scopeName:a.scopeName}));return function(d){const s=n.reduce((u,{useScope:f,scopeName:c})=>{const i=f(d)[`__scope${c}`];return{...u,...i}},{});return r.useMemo(()=>({[`__scope${t.scopeName}`]:s}),[s])}};return o.scopeName=t.scopeName,o}var P="Tabs",[Ne,Ue]=Ee(P,[K]),H=K(),[Ae,j]=Ne(P),Y=r.forwardRef((e,t)=>{const{__scopeTabs:o,value:n,onValueChange:a,defaultValue:d,orientation:s="horizontal",dir:u,activationMode:f="automatic",...c}=e,v=O(u),[i,m]=G({prop:n,onChange:a,defaultProp:d});return p.jsx(Ae,{scope:o,baseId:k(),value:i,onValueChange:m,orientation:s,dir:v,activationMode:f,children:p.jsx(F.div,{dir:v,"data-orientation":s,...c,ref:t})})});Y.displayName=P;var z="TabsList",q=r.forwardRef((e,t)=>{const{__scopeTabs:o,loop:n=!0,...a}=e,d=j(z,o),s=H(o);return p.jsx(Se,{asChild:!0,...s,orientation:d.orientation,dir:d.dir,loop:n,children:p.jsx(F.div,{role:"tablist","aria-orientation":d.orientation,...a,ref:t})})});q.displayName=z;var J="TabsTrigger",Q=r.forwardRef((e,t)=>{const{__scopeTabs:o,value:n,disabled:a=!1,...d}=e,s=j(J,o),u=H(o),f=Z(s.baseId,n),c=ee(s.baseId,n),v=n===s.value;return p.jsx(ye,{asChild:!0,...u,focusable:!a,active:v,children:p.jsx(F.button,{type:"button",role:"tab","aria-selected":v,"aria-controls":c,"data-state":v?"active":"inactive","data-disabled":a?"":void 0,disabled:a,id:f,...d,ref:t,onMouseDown:I(e.onMouseDown,i=>{!a&&i.button===0&&i.ctrlKey===!1?s.onValueChange(n):i.preventDefault()}),onKeyDown:I(e.onKeyDown,i=>{[" ","Enter"].includes(i.key)&&s.onValueChange(n)}),onFocus:I(e.onFocus,()=>{const i=s.activationMode!=="manual";!v&&!a&&i&&s.onValueChange(n)})})})});Q.displayName=J;var W="TabsContent",X=r.forwardRef((e,t)=>{const{__scopeTabs:o,value:n,forceMount:a,children:d,...s}=e,u=j(W,o),f=Z(u.baseId,n),c=ee(u.baseId,n),v=n===u.value,i=r.useRef(v);return r.useEffect(()=>{const m=requestAnimationFrame(()=>i.current=!1);return()=>cancelAnimationFrame(m)},[]),p.jsx(de,{present:a||v,children:({present:m})=>p.jsx(F.div,{"data-state":v?"active":"inactive","data-orientation":u.orientation,role:"tabpanel","aria-labelledby":f,hidden:!m,id:c,tabIndex:0,...s,ref:t,style:{...e.style,animationDuration:i.current?"0s":void 0},children:m&&d})})});X.displayName=W;function Z(e,t){return`${e}-trigger-${t}`}function ee(e,t){return`${e}-content-${t}`}var Pe=Y,te=q,oe=Q,ne=X;const He=Pe,je=r.forwardRef(({className:e,...t},o)=>p.jsx(te,{ref:o,className:A("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",e),...t}));je.displayName=te.displayName;const De=r.forwardRef(({className:e,...t},o)=>p.jsx(oe,{ref:o,className:A("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",e),...t}));De.displayName=oe.displayName;const Me=r.forwardRef(({className:e,...t},o)=>p.jsx(ne,{ref:o,className:A("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",e),...t}));Me.displayName=ne.displayName;export{ye as I,Se as R,He as T,je as a,De as b,Me as c,K as d,O as u};
