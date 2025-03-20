(()=>{var e={858:()=>{window.addEventListener("load",(function(){var e=window.document.getElementById("noise");e&&e.classList.toggle("show",!0)}))}},t={};function n(i){var o=t[i];if(void 0!==o)return o.exports;var a=t[i]={exports:{}};return e[i](a,a.exports,n),a.exports}(()=>{"use strict";var e,t={el:"VisualAnimation",wrapperEl:"PageVisual",fov:70,cameraZ:100,xyCoef:250,zCoef:15,lightIntensity:1,ambientColor:"#cc2200",light1Color:"#4b9e89",light2Color:"#5c75a1",light3Color:"#1418cd",light4Color:"#b9caec"};function i(e,t){var n,i,o,a,r,s,l,d,c,u,m,w,g=t.setUpdateVisualizationCallback,h=window.THREE,v=new window.SimplexNoise,f=new h.Vector2,p=(new h.Plane(new h.Vector3(0,0,1),0),document.getElementById(e.el)),b=document.getElementById(e.wrapperEl);function y(e){return"string"==typeof e&&(e.startsWith("#")&&(e=e.replace("#","0x")),e=Number(e)),e}function C(t,n,o,a,r){var s=new h.PointLight(y(t),e.lightIntensity,n);return s.position.set(o,a,r),i.add(s),s}function x(){!function(){for(var t=d.geometry.attributes.position.array,n=2e-4*Date.now(),i=0;i<t.length;i+=3)t[i+2]=v.noise4D(t[i]/e.xyCoef,t[i+1]/e.xyCoef,n,f.x+f.y)*e.zCoef;d.geometry.attributes.position.needsUpdate=!0}(),function(){var e=.001*Date.now(),t=50;c&&(c.position.x=Math.sin(.1*e)*t,c.position.z=Math.cos(.2*e)*t);u;m&&(m.position.x=Math.sin(.5*e)*t,m.position.z=Math.sin(.6*e)*t);w}(),n.render(i,o),requestAnimationFrame(x)}function E(){var t=b.clientWidth,i=b.clientHeight;if(a=t,r=i,n&&o){n.setSize(a,r),o.aspect=a/r,o.updateProjectionMatrix();var d=function(){var t=new h.PerspectiveCamera(o.fov,o.aspect),n=t.fov*Math.PI/180,i=2*Math.tan(n/2)*Math.abs(e.cameraZ),a=i*t.aspect;return[a,i]}();s=d[0],l=d[1]}}!function(){n=new h.WebGLRenderer({canvas:p,antialias:!0,alpha:!0}),(o=new h.PerspectiveCamera(e.fov)).position.z=e.cameraZ,E(),window.addEventListener("resize",E,!1),g&&g(E);false;(function(){i=new h.Scene,t=30,n=10,a=300,r=new h.AmbientLight(y(e.ambientColor)),i.add(r),c=C(e.light1Color,a,0,n,t),m=C(e.light3Color,a,t,n,0);var t,n,a,r;var u=new h.MeshLambertMaterial({color:16777215,side:h.DoubleSide}),w=new h.PlaneBufferGeometry(s,l,s/2,l/2);d=new h.Mesh(w,u),i.add(d);var g=-Math.PI/2-.1,v=20,f=30;d.rotation.x=g,d.position.y=v,o.position.z=f})(),x()}()}function o(){var t=document.body,n=document.getElementById("navbarNavigation"),i=null==n?void 0:n.classList.contains("show"),o=document.documentElement.clientWidth<768,a=o&&i;t.classList.toggle("mobileView",o),t.classList.toggle("wideView",!o),t.classList.toggle("showNavigation",a),e&&e()}function a(e){return requestAnimationFrame.bind(null,setTimeout.bind(null,o,e))}var r,s,l,d;n(858);i(t,{setUpdateVisualizationCallback:function(t){e=t,o()}}),r=document.getElementById("toggleNavigation"),s=a(100),l=a(500),d=a(700),r&&(null==r||r.addEventListener("click",(function(){s(),l(),d()}))),window.addEventListener("resize",o,!1),o(),window.toggleTheme=function(){var e=window.document.body,t=e&&e.parentNode,n=t.dataset?t.dataset.theme:t.getAttribute?t.getAttribute("theme"):"",i=n&&"light"!==n?"light":"dark";i&&t&&(t.setAttribute?t.setAttribute("data-theme",i):t.dataset&&(t.dataset.theme=i)),window.localStorage&&window.localStorage.setItem("theme",i)}})()})();
//# sourceMappingURL=scripts.js.map