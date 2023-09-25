(()=>{var D=Object.create;var w=Object.defineProperty;var $=Object.getOwnPropertyDescriptor;var Y=Object.getOwnPropertyNames;var q=Object.getPrototypeOf,z=Object.prototype.hasOwnProperty;var B=(t,e)=>()=>(t&&(e=t(t=0)),e);var k=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var J=(t,e,n,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of Y(e))!z.call(t,a)&&a!==n&&w(t,a,{get:()=>e[a],enumerable:!(r=$(e,a))||r.enumerable});return t};var f=(t,e,n)=>(n=t!=null?D(q(t)):{},J(e||!t||!t.__esModule?w(n,"default",{value:t,enumerable:!0}):n,t));function c(t){return(...e)=>{if(window["@Neos:HostPluginAPI"]&&window["@Neos:HostPluginAPI"][`@${t}`])return window["@Neos:HostPluginAPI"][`@${t}`](...e);throw new Error("You are trying to read from a consumer api that hasn't been initialized yet!")}}var b=B(()=>{});var m=k((Lt,P)=>{b();P.exports=c("vendor")().React});var x=k((Et,v)=>{b();v.exports=c("NeosProjectPackages")().ReactUiComponents});var F=k((It,W)=>{b();W.exports=c("NeosProjectPackages")().NeosUiDecorators});b();var R=c("manifest");var s=f(m());var E=t=>{let e={};return!t||typeof t!="object"||Array.isArray(t)||Object.entries(t).forEach(([n,r])=>{!r||typeof r!="object"||Array.isArray(r)||!("label"in r)||typeof r.label!="string"||(e[n]={key:n,label:r.label})}),e},C="default",S=t=>{if(!("linkAttributes"in t)||!t.linkAttributes||typeof t.linkAttributes!="object"||Array.isArray(t.linkAttributes))return[];let e=[];return Object.keys(t.linkAttributes).forEach(n=>{let r=t.linkAttributes[n];if(!r)return;if(typeof r=="string")return e.push({attribute:n,label:r,group:C});if(typeof r!="object"||Array.isArray(r)||!("label"in r&&typeof r.label=="string"))return;let a="help"in r&&typeof r.help=="string"?r.help:void 0,l="placeholder"in r&&typeof r.placeholder=="string"?r.placeholder:void 0,o="group"in r&&typeof r.group=="string"?r.group:C;return e.push({attribute:n,label:r.label,help:a,placeholder:l,group:o})}),e},N=t=>{let e=t.reduce((n,r)=>({...n,[r.group]:[...n[r.group]??[],r]}),{});return Object.entries(e)};var O=t=>t.reduce((e,[n,r])=>(e[n]=r,e),{});var g=f(m());var p=f(m()),d=f(x()),j=({inputId:t,option:e,i18nRegistry:n})=>{let[r,a]=(0,p.useState)(!1),l=()=>a(o=>!o);return p.default.createElement("div",null,p.default.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},p.default.createElement(d.Label,{htmlFor:t},n.translate(e.label)),e.help&&p.default.createElement("span",{role:"button",onClick:l},p.default.createElement(d.Icon,{icon:"question-circle"}))),e.help&&r&&p.default.createElement(d.Tooltip,{renderInline:!0},n.translate(e.help)))};var I=f(x()),X={padding:8,border:0,margin:0},Z={display:"flex",flexWrap:"wrap",gap:8},_=t=>g.default.createElement("fieldset",{style:X},g.default.createElement("legend",null,t.i18nRegistry.translate(t.label)),g.default.createElement("div",{style:Z},t.options.map((e,n)=>{let r=`link-attribute-input-${n}`;return g.default.createElement("div",{key:e.attribute},g.default.createElement(j,{option:e,inputId:r,i18nRegistry:t.i18nRegistry}),g.default.createElement(I.TextInput,{id:r,value:t.values[e.attribute],onChange:t.onChange(e.attribute),placeholder:t.i18nRegistry.translate(e.placeholder)}))})));var V=f(m()),G=f(F()),K=()=>(0,V.useContext)(G.NeosContext);var U=t=>{let{onLinkChange:e}=t,{globalRegistry:n}=K(),r=(0,s.useMemo)(()=>{let i=n.get("frontendConfiguration").get("Prgfx.Neos.LinkEditor");return E(i.groups)},[n]),[a,l]=(0,s.useState)({}),o=(0,s.useMemo)(()=>S(t.linkingOptions),[t.linkingOptions]),h=(0,s.useMemo)(()=>N(o).filter(([i])=>i in r),[o,r]);(0,s.useEffect)(()=>{try{let i=new URL(t.linkValue);i.search&&(i.searchParams,l(O(o.map(u=>[u.attribute,i.searchParams.get(u.attribute)??""]))))}catch{l(O(o.map(u=>[u.attribute,""])))}},[t.linkValue,o]);let M=(0,s.useCallback)(i=>u=>{l(T=>{let H={...T,[i]:u};try{let y=new URL(t.linkValue),A=y.searchParams;u.length===0&&A.has(i)?A.delete(i):A.set(i,u),e(y.toString())}catch{}return H})},[t.linkValue,e]);return s.default.createElement(s.default.Fragment,null,h.map(([i,u])=>s.default.createElement(_,{key:i,label:r[i].label,i18nRegistry:t.i18nRegistry,options:u,onChange:M,values:a})))};R("Prgfx.Neos.LinkEditor:LinkEditor",{},t=>{t.get("containers").set("LinkInput/OptionsPanel/LinkAttributeEditor",U,"end");let n=t.get("dataLoaders").get("LinkLookup"),r=n.resolveValue,a=(l,o)=>{let h=typeof o=="string"&&/^node:\/\//.test(o)?o.split("?")[0]:o;return r.call(n,l,h)};n.resolveValue=a.bind(n)});})();
