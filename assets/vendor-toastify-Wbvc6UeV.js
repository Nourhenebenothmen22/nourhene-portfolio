import{a as ct,r as dt}from"./rolldown-runtime-M0oDzQ_3.js";import{V as yt}from"./vendor-icons-2pi1RXdL.js";import{t as A}from"./vendor-other-CsavARlI.js";var Qt=dt({Bounce:()=>lt,Icons:()=>U,ToastContainer:()=>qt,collapseToast:()=>tt,cssTransition:()=>M,toast:()=>g}),n=ct(yt(),1),N=t=>typeof t=="number"&&!isNaN(t),D=t=>typeof t=="string",$=t=>typeof t=="function",mt=t=>D(t)||N(t),Y=t=>D(t)||$(t)?t:null,ut=(t,o)=>t===!1||N(t)&&t>0?t:o,Q=t=>(0,n.isValidElement)(t)||D(t)||$(t)||N(t);function tt(t,o,e=300){let{scrollHeight:s,style:i}=t;requestAnimationFrame(()=>{i.minHeight="initial",i.height=s+"px",i.transition=`all ${e}ms`,requestAnimationFrame(()=>{i.height="0",i.padding="0",i.margin="0",setTimeout(o,e)})})}function M({enter:t,exit:o,appendPosition:e=!1,collapse:s=!0,collapseDuration:i=300}){return function({children:f,position:a,preventExitTransition:y,done:c,nodeRef:u,isIn:v,playToast:x}){let E=e?`${t}--${a}`:t,k=e?`${o}--${a}`:o,I=(0,n.useRef)(0);return(0,n.useLayoutEffect)(()=>{let T=u.current,_=E.split(" "),p=r=>{r.target===u.current&&(x(),T.removeEventListener("animationend",p),T.removeEventListener("animationcancel",p),I.current===0&&r.type!=="animationcancel"&&T.classList.remove(..._))};T.classList.add(..._),T.addEventListener("animationend",p),T.addEventListener("animationcancel",p)},[]),(0,n.useEffect)(()=>{let T=u.current,_=()=>{T.removeEventListener("animationend",_),s?tt(T,c,i):c()};v||(y?_():(I.current=1,T.className+=` ${k}`,T.addEventListener("animationend",_)))},[v]),n.createElement(n.Fragment,null,f)}}function J(t,o){return{content:ot(t.content,t.props),containerId:t.props.containerId,id:t.props.toastId,theme:t.props.theme,type:t.props.type,data:t.props.data||{},isLoading:t.props.isLoading,icon:t.props.icon,reason:t.removalReason,status:o}}function ot(t,o,e=!1){return(0,n.isValidElement)(t)&&!D(t.type)?(0,n.cloneElement)(t,{closeToast:o.closeToast,toastProps:o,data:o.data,isPaused:e}):$(t)?t({closeToast:o.closeToast,toastProps:o,data:o.data,isPaused:e}):t}function pt({closeToast:t,theme:o,ariaLabel:e="close"}){return n.createElement("button",{className:`Toastify__close-button Toastify__close-button--${o}`,type:"button",onClick:s=>{s.stopPropagation(),t(!0)},"aria-label":e},n.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},n.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}function _t({delay:t,isRunning:o,closeToast:e,type:s="default",hide:i,className:f,controlledProgress:a,progress:y,rtl:c,isIn:u,theme:v}){let x=i||a&&y===0,E={animationDuration:`${t}ms`,animationPlayState:o?"running":"paused"};a&&(E.transform=`scaleX(${y})`);let k=A("Toastify__progress-bar",a?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${v}`,`Toastify__progress-bar--${s}`,{"Toastify__progress-bar--rtl":c}),I=$(f)?f({rtl:c,type:s,defaultClassName:k}):A(k,f),T={[a&&y>=1?"onTransitionEnd":"onAnimationEnd"]:a&&y<1?null:()=>{u&&e()}};return n.createElement("div",{className:"Toastify__progress-bar--wrp","data-hidden":x},n.createElement("div",{className:`Toastify__progress-bar--bg Toastify__progress-bar-theme--${v} Toastify__progress-bar--${s}`}),n.createElement("div",{role:"progressbar","aria-hidden":x?"true":"false","aria-label":"notification timer","aria-valuenow":a?Math.round(y*100):void 0,"aria-valuemin":0,"aria-valuemax":100,className:I,style:E,...T}))}var gt=1,et=()=>`${gt++}`;function vt(t,o,e){let s=1,i=0,f=[],a=[],y=o,c=new Map,u=new Set,v=r=>(u.add(r),()=>u.delete(r)),x=()=>{a=Array.from(c.values()),u.forEach(r=>r())},E=({containerId:r,toastId:l,updateId:d})=>{let h=r?r!==t:t!==1,C=c.has(l)&&d==null;return h||C},k=(r,l)=>{c.forEach(d=>{var h;(l==null||l===d.props.toastId)&&((h=d.toggle)==null||h.call(d,r))})},I=r=>{var l,d;r.isActive&&((d=(l=r.props)==null?void 0:l.onClose)==null||d.call(l,r.removalReason),r.isActive=!1,e(J(r,"removed")))},T=r=>{if(r==null)c.forEach(I);else{let l=c.get(r);l&&I(l)}x()},_=()=>{i-=f.length,f=[]},p=r=>{var l,d;let{toastId:h,updateId:C}=r.props,m=C==null;r.staleId&&c.delete(r.staleId),r.isActive=!0,c.set(h,r),x(),e(J(r,m?"added":"updated")),m&&((d=(l=r.props).onOpen)==null||d.call(l))};return{id:t,props:y,observe:v,toggle:k,removeToast:T,toasts:c,clearQueue:_,buildToast:(r,l)=>{if(E(l))return;let{toastId:d,updateId:h,data:C,staleId:m,delay:b}=l,L=h==null;L&&i++;let O={...y,style:y.toastStyle,key:s++,...Object.fromEntries(Object.entries(l).filter(([B,P])=>P!=null)),toastId:d,updateId:h,data:C,isIn:!1,className:Y(l.className||y.toastClassName),progressClassName:Y(l.progressClassName||y.progressClassName),autoClose:l.isLoading?!1:ut(l.autoClose,y.autoClose),closeToast(B){let P=c.get(d);P&&(P.removalReason=B,T(d))},deleteToast(){if(c.get(d)!=null){if(c.delete(d),i--,i<0&&(i=0),f.length>0){p(f.shift());return}x()}}};O.closeButton=y.closeButton,l.closeButton===!1||Q(l.closeButton)?O.closeButton=l.closeButton:l.closeButton===!0&&(O.closeButton=Q(y.closeButton)?y.closeButton:!0);let z={content:r,props:O,staleId:m};y.limit&&y.limit>0&&i>y.limit&&L?f.push(z):N(b)?setTimeout(()=>{p(z)},b):p(z)},setProps(r){y=r},setToggle:(r,l)=>{let d=c.get(r);d&&(d.toggle=l)},isToastActive:r=>{var l;return(l=c.get(r))==null?void 0:l.isActive},getSnapshot:()=>a}}var w=new Map,R=[],W=new Set,bt=t=>W.forEach(o=>o(t)),at=()=>w.size>0;function Tt(){R.forEach(t=>st(t.content,t.options)),R=[]}var ht=(t,{containerId:o})=>{var e;return(e=w.get(o||1))==null?void 0:e.toasts.get(t)};function rt(t,o){var e;if(o)return!!((e=w.get(o))!=null&&e.isToastActive(t));let s=!1;return w.forEach(i=>{i.isToastActive(t)&&(s=!0)}),s}function xt(t){if(!at()){R=R.filter(o=>t!=null&&o.options.toastId!==t);return}if(t==null||mt(t))w.forEach(o=>{o.removeToast(t)});else if(t&&("containerId"in t||"id"in t)){let o=w.get(t.containerId);o?o.removeToast(t.id):w.forEach(e=>{e.removeToast(t.id)})}}var kt=(t={})=>{w.forEach(o=>{o.props.limit&&(!t.containerId||o.id===t.containerId)&&o.clearQueue()})};function st(t,o){Q(t)&&(at()||R.push({content:t,options:o}),w.forEach(e=>{e.buildToast(t,o)}))}function Et(t){var o;(o=w.get(t.containerId||1))==null||o.setToggle(t.id,t.fn)}function it(t,o){w.forEach(e=>{(o==null||!(o!=null&&o.containerId)||o?.containerId===e.id)&&e.toggle(t,o?.id)})}function wt(t){let o=t.containerId||1;return{subscribe(e){let s=vt(o,t,bt);w.set(o,s);let i=s.observe(e);return Tt(),()=>{i(),w.delete(o)}},setProps(e){var s;(s=w.get(o))==null||s.setProps(e)},getSnapshot(){var e;return(e=w.get(o))==null?void 0:e.getSnapshot()}}}function It(t){return W.add(t),()=>{W.delete(t)}}function Ct(t){return t&&(D(t.toastId)||N(t.toastId))?t.toastId:et()}function S(t,o){return st(t,o),o.toastId}function H(t,o){return{...o,type:o&&o.type||t,toastId:Ct(o)}}function F(t){return(o,e)=>S(o,H(t,e))}function g(t,o){return S(t,H("default",o))}g.loading=(t,o)=>S(t,H("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...o}));function Lt(t,{pending:o,error:e,success:s},i){let f;o&&(f=D(o)?g.loading(o,i):g.loading(o.render,{...i,...o}));let a={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null},y=(u,v,x)=>{if(v==null){g.dismiss(f);return}let E={type:u,...a,...i,data:x},k=D(v)?{render:v}:v;return f?g.update(f,{...E,...k}):g(k.render,{...E,...k}),x},c=$(t)?t():t;return c.then(u=>y("success",s,u)).catch(u=>y("error",e,u)),c}g.promise=Lt;g.success=F("success");g.info=F("info");g.error=F("error");g.warning=F("warning");g.warn=g.warning;g.dark=(t,o)=>S(t,H("default",{theme:"dark",...o}));function Ot(t){xt(t)}g.dismiss=Ot;g.clearWaitingQueue=kt;g.isActive=rt;g.update=(t,o={})=>{let e=ht(t,o);if(e){let{props:s,content:i}=e,f={delay:100,...s,...o,toastId:o.toastId||t,updateId:et()};f.toastId!==t&&(f.staleId=t);let a=f.render||i;delete f.render,S(a,f)}};g.done=t=>{g.update(t,{progress:1})};g.onChange=It;g.play=t=>it(!0,t);g.pause=t=>it(!1,t);function zt(t){var o;let{subscribe:e,getSnapshot:s,setProps:i}=(0,n.useRef)(wt(t)).current;i(t);let f=(o=(0,n.useSyncExternalStore)(e,s,s))==null?void 0:o.slice();function a(y){if(!f)return[];let c=new Map;return t.newestOnTop&&f.reverse(),f.forEach(u=>{let{position:v}=u.props;c.has(v)||c.set(v,[]),c.get(v).push(u)}),Array.from(c,u=>y(u[0],u[1]))}return{getToastToRender:a,isToastActive:rt,count:f?.length}}function $t(t){let[o,e]=(0,n.useState)(!1),[s,i]=(0,n.useState)(!1),f=(0,n.useRef)(null),a=(0,n.useRef)({start:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,didMove:!1}).current,{autoClose:y,pauseOnHover:c,closeToast:u,onClick:v,closeOnClick:x}=t;Et({id:t.toastId,containerId:t.containerId,fn:e}),(0,n.useEffect)(()=>{if(t.pauseOnFocusLoss)return E(),()=>{k()}},[t.pauseOnFocusLoss]);function E(){document.hasFocus()||p(),window.addEventListener("focus",_),window.addEventListener("blur",p)}function k(){window.removeEventListener("focus",_),window.removeEventListener("blur",p)}function I(m){if(t.draggable===!0||t.draggable===m.pointerType){r();let b=f.current;a.canCloseOnClick=!0,a.canDrag=!0,b.style.transition="none",t.draggableDirection==="x"?(a.start=m.clientX,a.removalDistance=b.offsetWidth*(t.draggablePercent/100)):(a.start=m.clientY,a.removalDistance=b.offsetHeight*(t.draggablePercent===80?t.draggablePercent*1.5:t.draggablePercent)/100)}}function T(m){let{top:b,bottom:L,left:O,right:z}=f.current.getBoundingClientRect();m.pointerType==="mouse"&&t.pauseOnHover&&m.clientX>=O&&m.clientX<=z&&m.clientY>=b&&m.clientY<=L?p():_()}function _(){e(!0)}function p(){e(!1)}function r(){a.didMove=!1,document.addEventListener("pointermove",d),document.addEventListener("pointerup",h)}function l(){document.removeEventListener("pointermove",d),document.removeEventListener("pointerup",h)}function d(m){let b=f.current;if(a.canDrag&&b){a.didMove=!0,o&&p(),t.draggableDirection==="x"?a.delta=m.clientX-a.start:a.delta=m.clientY-a.start,a.start!==m.clientX&&(a.canCloseOnClick=!1);let L=t.draggableDirection==="x"?`${a.delta}px, var(--y)`:`0, calc(${a.delta}px + var(--y))`;b.style.transform=`translate3d(${L},0)`,b.style.opacity=`${1-Math.abs(a.delta/a.removalDistance)}`}}function h(){l();let m=f.current;if(a.canDrag&&a.didMove&&m){if(a.canDrag=!1,Math.abs(a.delta)>a.removalDistance){i(!0),t.closeToast(!0),t.collapseAll();return}m.style.transition="transform 0.2s, opacity 0.2s",m.style.removeProperty("transform"),m.style.removeProperty("opacity")}}let C={onPointerDown:I,onPointerUp:T};return y&&c&&(C.onMouseEnter=p,t.stacked||(C.onMouseLeave=_)),x&&(C.onClick=m=>{v&&v(m),a.canCloseOnClick&&u(!0)}),{playToast:_,pauseToast:p,isRunning:o,preventExitTransition:s,toastRef:f,eventHandlers:C}}var nt=typeof window<"u"?n.useLayoutEffect:n.useEffect,q=({theme:t,type:o,isLoading:e,...s})=>n.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:t==="colored"?"currentColor":`var(--toastify-icon-color-${o})`,...s});function Pt(t){return n.createElement(q,{...t},n.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))}function At(t){return n.createElement(q,{...t},n.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))}function Dt(t){return n.createElement(q,{...t},n.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))}function Rt(t){return n.createElement(q,{...t},n.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))}function Nt(){return n.createElement("div",{className:"Toastify__spinner"})}var U={info:At,warning:Pt,success:Dt,error:Rt,spinner:Nt},Mt=t=>t in U;function St({theme:t,type:o,isLoading:e,icon:s}){let i=null,f={theme:t,type:o};return s===!1||($(s)?i=s({...f,isLoading:e}):(0,n.isValidElement)(s)?i=(0,n.cloneElement)(s,f):e?i=U.spinner():Mt(o)&&(i=U[o](f))),i}var Bt=t=>{let{isRunning:o,preventExitTransition:e,toastRef:s,eventHandlers:i,playToast:f}=$t(t),{closeButton:a,children:y,autoClose:c,onClick:u,type:v,hideProgressBar:x,closeToast:E,transition:k,position:I,className:T,style:_,progressClassName:p,updateId:r,role:l,progress:d,rtl:h,toastId:C,deleteToast:m,isIn:b,isLoading:L,closeOnClick:O,theme:z,ariaLabel:B}=t,P=A("Toastify__toast",`Toastify__toast-theme--${z}`,`Toastify__toast--${v}`,{"Toastify__toast--rtl":h},{"Toastify__toast--close-on-click":O}),ft=$(T)?T({rtl:h,position:I,type:v,defaultClassName:P}):A(P,T),j=St(t),G=!!d||!c,V={closeToast:E,type:v,theme:z},X=null;return a===!1||($(a)?X=a(V):(0,n.isValidElement)(a)?X=(0,n.cloneElement)(a,V):X=pt(V)),n.createElement(k,{isIn:b,done:m,position:I,preventExitTransition:e,nodeRef:s,playToast:f},n.createElement("div",{id:C,tabIndex:0,onClick:u,"data-in":b,className:ft,...i,style:_,ref:s,...b&&{role:l,"aria-label":B}},j!=null&&n.createElement("div",{className:A("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!L})},j),ot(y,t,!o),X,!t.customProgressBar&&n.createElement(_t,{...r&&!G?{key:`p-${r}`}:{},rtl:h,theme:z,delay:c,isRunning:o,isIn:b,closeToast:E,hide:x,type:v,className:p,controlledProgress:G,progress:d||0})))},K=(t,o=!1)=>({enter:`Toastify--animate Toastify__${t}-enter`,exit:`Toastify--animate Toastify__${t}-exit`,appendPosition:o}),lt=M(K("bounce",!0)),Wt=M(K("slide",!0)),jt=M(K("zoom")),Gt=M(K("flip")),Xt={position:"top-right",transition:lt,autoClose:5e3,closeButton:!0,pauseOnHover:!0,pauseOnFocusLoss:!0,draggable:"touch",draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light","aria-label":"Notifications Alt+T",hotKeys:t=>t.altKey&&t.code==="KeyT"};function Ut(t){let o={...Xt,...t},e=t.stacked,[s,i]=(0,n.useState)(!0),f=(0,n.useRef)(null),{getToastToRender:a,isToastActive:y,count:c}=zt(o),{className:u,style:v,rtl:x,containerId:E,hotKeys:k}=o;function I(_){let p=A("Toastify__toast-container",`Toastify__toast-container--${_}`,{"Toastify__toast-container--rtl":x});return $(u)?u({position:_,rtl:x,defaultClassName:p}):A(p,Y(u))}function T(){e&&(i(!0),g.play())}return nt(()=>{var _;if(e){let p=f.current.querySelectorAll('[data-in="true"]'),r=12,l=(_=o.position)==null?void 0:_.includes("top"),d=0,h=0;Array.from(p).reverse().forEach((C,m)=>{let b=C;b.classList.add("Toastify__toast--stacked"),m>0&&(b.dataset.collapsed=`${s}`),b.dataset.pos||(b.dataset.pos=l?"top":"bot");let L=d*(s?.2:1)+(s?0:r*m),O=Math.max(.5,1-(s?h:0));b.style.setProperty("--y",`${l?L:L*-1}px`),b.style.setProperty("--g",`${r}`),b.style.setProperty("--s",`${O}`),d+=b.offsetHeight,h+=.025})}},[s,c,e]),(0,n.useEffect)(()=>{function _(p){var r;let l=f.current;k(p)&&((r=l?.querySelector('[tabIndex="0"]'))==null||r.focus(),i(!1),g.pause()),p.key==="Escape"&&(document.activeElement===l||l!=null&&l.contains(document.activeElement))&&(i(!0),g.play())}return document.addEventListener("keydown",_),()=>{document.removeEventListener("keydown",_)}},[k]),n.createElement("section",{ref:f,className:"Toastify",id:E,onMouseEnter:()=>{e&&(i(!1),g.pause())},onMouseLeave:T,"aria-live":"polite","aria-atomic":"false","aria-relevant":"additions text","aria-label":o["aria-label"]},a((_,p)=>{let r=p.length?{...v}:{...v,pointerEvents:"none"};return n.createElement("div",{tabIndex:-1,className:I(_),"data-stacked":e,style:r,key:`c-${_}`},p.map(({content:l,props:d})=>n.createElement(Bt,{...d,stacked:e,collapseAll:T,isIn:y(d.toastId,d.containerId),key:`t-${d.key}`},l)))}))}var Ht=`:root {
  --toastify-color-light: #fff;
  --toastify-color-dark: #121212;
  --toastify-color-info: #3498db;
  --toastify-color-success: #07bc0c;
  --toastify-color-warning: #f1c40f;
  --toastify-color-error: hsl(6, 78%, 57%);
  --toastify-color-transparent: rgba(255, 255, 255, 0.7);

  --toastify-icon-color-info: var(--toastify-color-info);
  --toastify-icon-color-success: var(--toastify-color-success);
  --toastify-icon-color-warning: var(--toastify-color-warning);
  --toastify-icon-color-error: var(--toastify-color-error);

  --toastify-container-width: fit-content;
  --toastify-toast-width: 320px;
  --toastify-toast-offset: 16px;
  --toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));
  --toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));
  --toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));
  --toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));
  --toastify-toast-background: #fff;
  --toastify-toast-padding: 14px;
  --toastify-toast-min-height: 64px;
  --toastify-toast-max-height: 800px;
  --toastify-toast-bd-radius: 6px;
  --toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  --toastify-font-family: sans-serif;
  --toastify-z-index: 9999;
  --toastify-text-color-light: #757575;
  --toastify-text-color-dark: #fff;

  /* Used only for colored theme */
  --toastify-text-color-info: #fff;
  --toastify-text-color-success: #fff;
  --toastify-text-color-warning: #fff;
  --toastify-text-color-error: #fff;

  --toastify-spinner-color: #616161;
  --toastify-spinner-color-empty-area: #e0e0e0;
  --toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);
  --toastify-color-progress-dark: #bb86fc;
  --toastify-color-progress-info: var(--toastify-color-info);
  --toastify-color-progress-success: var(--toastify-color-success);
  --toastify-color-progress-warning: var(--toastify-color-warning);
  --toastify-color-progress-error: var(--toastify-color-error);
  /* used to control the opacity of the progress trail */
  --toastify-color-progress-bgo: 0.2;
}

.Toastify__toast-container {
  z-index: var(--toastify-z-index);
  -webkit-transform: translate3d(0, 0, var(--toastify-z-index));
  position: fixed;
  width: var(--toastify-container-width);
  box-sizing: border-box;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.Toastify__toast-container--top-left {
  top: var(--toastify-toast-top);
  left: var(--toastify-toast-left);
}
.Toastify__toast-container--top-center {
  top: var(--toastify-toast-top);
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}
.Toastify__toast-container--top-right {
  top: var(--toastify-toast-top);
  right: var(--toastify-toast-right);
  align-items: end;
}
.Toastify__toast-container--bottom-left {
  bottom: var(--toastify-toast-bottom);
  left: var(--toastify-toast-left);
}
.Toastify__toast-container--bottom-center {
  bottom: var(--toastify-toast-bottom);
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}
.Toastify__toast-container--bottom-right {
  bottom: var(--toastify-toast-bottom);
  right: var(--toastify-toast-right);
  align-items: end;
}

.Toastify__toast {
  --y: 0px;
  position: relative;
  touch-action: none;
  width: var(--toastify-toast-width);
  min-height: var(--toastify-toast-min-height);
  box-sizing: border-box;
  margin-bottom: 1rem;
  padding: var(--toastify-toast-padding);
  border-radius: var(--toastify-toast-bd-radius);
  box-shadow: var(--toastify-toast-shadow);
  max-height: var(--toastify-toast-max-height);
  font-family: var(--toastify-font-family);
  /* webkit only issue #791 */
  z-index: 0;
  /* inner swag */
  display: flex;
  flex: 1 auto;
  align-items: center;
  word-break: break-word;
}

@media only screen and (max-width: 480px) {
  .Toastify__toast-container {
    width: 100vw;
    left: env(safe-area-inset-left);
    margin: 0;
  }
  .Toastify__toast-container--top-left,
  .Toastify__toast-container--top-center,
  .Toastify__toast-container--top-right {
    top: env(safe-area-inset-top);
    transform: translateX(0);
  }
  .Toastify__toast-container--bottom-left,
  .Toastify__toast-container--bottom-center,
  .Toastify__toast-container--bottom-right {
    bottom: env(safe-area-inset-bottom);
    transform: translateX(0);
  }
  .Toastify__toast-container--rtl {
    right: env(safe-area-inset-right);
    left: initial;
  }
  .Toastify__toast {
    --toastify-toast-width: 100%;
    margin-bottom: 0;
    border-radius: 0;
  }
}

.Toastify__toast-container[data-stacked='true'] {
  width: var(--toastify-toast-width);
}

@media only screen and (max-width: 480px) {
  .Toastify__toast-container[data-stacked='true'] {
    width: 100vw;
  }
}

.Toastify__toast--stacked {
  position: absolute;
  width: 100%;
  transform: translate3d(0, var(--y), 0) scale(var(--s));
  transition: transform 0.3s;
}

.Toastify__toast--stacked[data-collapsed] .Toastify__toast-body,
.Toastify__toast--stacked[data-collapsed] .Toastify__close-button {
  transition: opacity 0.1s;
}

.Toastify__toast--stacked[data-collapsed='false'] {
  overflow: visible;
}

.Toastify__toast--stacked[data-collapsed='true']:not(:last-child) > * {
  opacity: 0;
}

.Toastify__toast--stacked:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: calc(var(--g) * 1px);
  bottom: 100%;
}

.Toastify__toast--stacked[data-pos='top'] {
  top: 0;
}

.Toastify__toast--stacked[data-pos='bot'] {
  bottom: 0;
}

.Toastify__toast--stacked[data-pos='bot'].Toastify__toast--stacked:before {
  transform-origin: top;
}

.Toastify__toast--stacked[data-pos='top'].Toastify__toast--stacked:before {
  transform-origin: bottom;
}

.Toastify__toast--stacked:before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  transform: scaleY(3);
  z-index: -1;
}

.Toastify__toast--rtl {
  direction: rtl;
}

.Toastify__toast--close-on-click {
  cursor: pointer;
}

.Toastify__toast-icon {
  margin-inline-end: 10px;
  width: 22px;
  flex-shrink: 0;
  display: flex;
}

.Toastify--animate {
  animation-fill-mode: both;
  animation-duration: 0.5s;
}

.Toastify--animate-icon {
  animation-fill-mode: both;
  animation-duration: 0.3s;
}

.Toastify__toast-theme--dark {
  background: var(--toastify-color-dark);
  color: var(--toastify-text-color-dark);
}

.Toastify__toast-theme--light {
  background: var(--toastify-color-light);
  color: var(--toastify-text-color-light);
}

.Toastify__toast-theme--colored.Toastify__toast--default {
  background: var(--toastify-color-light);
  color: var(--toastify-text-color-light);
}

.Toastify__toast-theme--colored.Toastify__toast--info {
  color: var(--toastify-text-color-info);
  background: var(--toastify-color-info);
}

.Toastify__toast-theme--colored.Toastify__toast--success {
  color: var(--toastify-text-color-success);
  background: var(--toastify-color-success);
}

.Toastify__toast-theme--colored.Toastify__toast--warning {
  color: var(--toastify-text-color-warning);
  background: var(--toastify-color-warning);
}

.Toastify__toast-theme--colored.Toastify__toast--error {
  color: var(--toastify-text-color-error);
  background: var(--toastify-color-error);
}

.Toastify__progress-bar-theme--light {
  background: var(--toastify-color-progress-light);
}

.Toastify__progress-bar-theme--dark {
  background: var(--toastify-color-progress-dark);
}

.Toastify__progress-bar--info {
  background: var(--toastify-color-progress-info);
}

.Toastify__progress-bar--success {
  background: var(--toastify-color-progress-success);
}

.Toastify__progress-bar--warning {
  background: var(--toastify-color-progress-warning);
}

.Toastify__progress-bar--error {
  background: var(--toastify-color-progress-error);
}

.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error {
  background: var(--toastify-color-transparent);
}

.Toastify__close-button {
  color: #fff;
  position: absolute;
  top: 6px;
  right: 6px;
  background: transparent;
  outline: none;
  border: none;
  padding: 0;
  cursor: pointer;
  opacity: 0.7;
  transition: 0.3s ease;
  z-index: 1;
}

.Toastify__toast--rtl .Toastify__close-button {
  left: 6px;
  right: unset;
}

.Toastify__close-button--light {
  color: #000;
  opacity: 0.3;
}

.Toastify__close-button > svg {
  fill: currentColor;
  height: 16px;
  width: 14px;
}

.Toastify__close-button:hover,
.Toastify__close-button:focus {
  opacity: 1;
}

@keyframes Toastify__trackProgress {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}

.Toastify__progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.7;
  transform-origin: left;
}

.Toastify__progress-bar--animated {
  animation: Toastify__trackProgress linear 1 forwards;
}

.Toastify__progress-bar--controlled {
  transition: transform 0.2s;
}

.Toastify__progress-bar--rtl {
  right: 0;
  left: initial;
  transform-origin: right;
  border-bottom-left-radius: initial;
}

.Toastify__progress-bar--wrp {
  position: absolute;
  overflow: hidden;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5px;
  border-bottom-left-radius: var(--toastify-toast-bd-radius);
  border-bottom-right-radius: var(--toastify-toast-bd-radius);
}

.Toastify__progress-bar--wrp[data-hidden='true'] {
  opacity: 0;
}

.Toastify__progress-bar--bg {
  opacity: var(--toastify-color-progress-bgo);
  width: 100%;
  height: 100%;
}

.Toastify__spinner {
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: var(--toastify-spinner-color-empty-area);
  border-right-color: var(--toastify-spinner-color);
  animation: Toastify__spin 0.65s linear infinite;
}

@keyframes Toastify__bounceInRight {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(3000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(-25px, 0, 0);
  }
  75% {
    transform: translate3d(10px, 0, 0);
  }
  90% {
    transform: translate3d(-5px, 0, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutRight {
  20% {
    opacity: 1;
    transform: translate3d(-20px, var(--y), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(2000px, var(--y), 0);
  }
}

@keyframes Toastify__bounceInLeft {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: translate3d(-3000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(25px, 0, 0);
  }
  75% {
    transform: translate3d(-10px, 0, 0);
  }
  90% {
    transform: translate3d(5px, 0, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutLeft {
  20% {
    opacity: 1;
    transform: translate3d(20px, var(--y), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(-2000px, var(--y), 0);
  }
}

@keyframes Toastify__bounceInUp {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(0, 3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
  }
  75% {
    transform: translate3d(0, 10px, 0);
  }
  90% {
    transform: translate3d(0, -5px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes Toastify__bounceOutUp {
  20% {
    transform: translate3d(0, calc(var(--y) - 10px), 0);
  }
  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, calc(var(--y) + 20px), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, -2000px, 0);
  }
}

@keyframes Toastify__bounceInDown {
  from,
  60%,
  75%,
  90%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: translate3d(0, -3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, 25px, 0);
  }
  75% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, 5px, 0);
  }
  to {
    transform: none;
  }
}

@keyframes Toastify__bounceOutDown {
  20% {
    transform: translate3d(0, calc(var(--y) - 10px), 0);
  }
  40%,
  45% {
    opacity: 1;
    transform: translate3d(0, calc(var(--y) + 20px), 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, 2000px, 0);
  }
}

.Toastify__bounce-enter--top-left,
.Toastify__bounce-enter--bottom-left {
  animation-name: Toastify__bounceInLeft;
}

.Toastify__bounce-enter--top-right,
.Toastify__bounce-enter--bottom-right {
  animation-name: Toastify__bounceInRight;
}

.Toastify__bounce-enter--top-center {
  animation-name: Toastify__bounceInDown;
}

.Toastify__bounce-enter--bottom-center {
  animation-name: Toastify__bounceInUp;
}

.Toastify__bounce-exit--top-left,
.Toastify__bounce-exit--bottom-left {
  animation-name: Toastify__bounceOutLeft;
}

.Toastify__bounce-exit--top-right,
.Toastify__bounce-exit--bottom-right {
  animation-name: Toastify__bounceOutRight;
}

.Toastify__bounce-exit--top-center {
  animation-name: Toastify__bounceOutUp;
}

.Toastify__bounce-exit--bottom-center {
  animation-name: Toastify__bounceOutDown;
}

@keyframes Toastify__zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
}

@keyframes Toastify__zoomOut {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0;
    transform: translate3d(0, var(--y), 0) scale3d(0.3, 0.3, 0.3);
  }
  to {
    opacity: 0;
  }
}

.Toastify__zoom-enter {
  animation-name: Toastify__zoomIn;
}

.Toastify__zoom-exit {
  animation-name: Toastify__zoomOut;
}

@keyframes Toastify__flipIn {
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    animation-timing-function: ease-in;
  }
  60% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }
  80% {
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }
  to {
    transform: perspective(400px);
  }
}

@keyframes Toastify__flipOut {
  from {
    transform: translate3d(0, var(--y), 0) perspective(400px);
  }
  30% {
    transform: translate3d(0, var(--y), 0) perspective(400px) rotate3d(1, 0, 0, -20deg);
    opacity: 1;
  }
  to {
    transform: translate3d(0, var(--y), 0) perspective(400px) rotate3d(1, 0, 0, 90deg);
    opacity: 0;
  }
}

.Toastify__flip-enter {
  animation-name: Toastify__flipIn;
}

.Toastify__flip-exit {
  animation-name: Toastify__flipOut;
}

@keyframes Toastify__slideInRight {
  from {
    transform: translate3d(110%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInLeft {
  from {
    transform: translate3d(-110%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInUp {
  from {
    transform: translate3d(0, 110%, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideInDown {
  from {
    transform: translate3d(0, -110%, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, var(--y), 0);
  }
}

@keyframes Toastify__slideOutRight {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(110%, var(--y), 0);
  }
}

@keyframes Toastify__slideOutLeft {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(-110%, var(--y), 0);
  }
}

@keyframes Toastify__slideOutDown {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(0, 500px, 0);
  }
}

@keyframes Toastify__slideOutUp {
  from {
    transform: translate3d(0, var(--y), 0);
  }
  to {
    visibility: hidden;
    transform: translate3d(0, -500px, 0);
  }
}

.Toastify__slide-enter--top-left,
.Toastify__slide-enter--bottom-left {
  animation-name: Toastify__slideInLeft;
}

.Toastify__slide-enter--top-right,
.Toastify__slide-enter--bottom-right {
  animation-name: Toastify__slideInRight;
}

.Toastify__slide-enter--top-center {
  animation-name: Toastify__slideInDown;
}

.Toastify__slide-enter--bottom-center {
  animation-name: Toastify__slideInUp;
}

.Toastify__slide-exit--top-left,
.Toastify__slide-exit--bottom-left {
  animation-name: Toastify__slideOutLeft;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--top-right,
.Toastify__slide-exit--bottom-right {
  animation-name: Toastify__slideOutRight;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--top-center {
  animation-name: Toastify__slideOutUp;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

.Toastify__slide-exit--bottom-center {
  animation-name: Toastify__slideOutDown;
  animation-timing-function: ease-in;
  animation-duration: 0.3s;
}

@keyframes Toastify__spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`,Z=new Map,Ft=(t,o)=>{nt(()=>{if(!t||typeof document>"u")return;let e=document,s=Z.get(e);if(s){o&&s.setAttribute("nonce",o);return}let i=e.createElement("style");i.textContent=t,o&&i.setAttribute("nonce",o),e.head.appendChild(i),Z.set(e,i)},[o])};function qt(t){return Ft(Ht,t.nonce),n.createElement(Ut,{...t})}export{g as n,Qt as t};
