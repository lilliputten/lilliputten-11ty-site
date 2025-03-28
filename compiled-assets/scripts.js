(()=>{var e={858:()=>{window.addEventListener("load",(function(){var e=window.document.getElementById("noise");e&&e.classList.toggle("show",!0)}))}},t={};function n(o){var i=t[o];if(void 0!==i)return i.exports;var a=t[o]={exports:{}};return e[o](a,a.exports,n),a.exports}(()=>{"use strict";var e,t={el:"VisualAnimation",wrapperEl:"PageVisual",fov:70,cameraZ:100,xyCoef:250,zCoef:15,lightIntensity:1,ambientColor:"#cc2200",light1Color:"#4b9e89",light2Color:"#5c75a1",light3Color:"#1418cd",light4Color:"#b9caec"};function o(e,t){var n,o,i,a,r,s,l,c,d,u,w,h,p=t.setUpdateVisualizationCallback,g=window.THREE,f=new window.SimplexNoise,v=new g.Vector2,m=(new g.Plane(new g.Vector3(0,0,1),0),document.getElementById(e.el)),b=document.getElementById(e.wrapperEl);function y(e){return"string"==typeof e&&(e.startsWith("#")&&(e=e.replace("#","0x")),e=Number(e)),e}function C(t,n,i,a,r){var s=new g.PointLight(y(t),e.lightIntensity,n);return s.position.set(i,a,r),o.add(s),s}function E(){!function(){for(var t=c.geometry.attributes.position.array,n=2e-4*Date.now(),o=0;o<t.length;o+=3)t[o+2]=f.noise4D(t[o]/e.xyCoef,t[o+1]/e.xyCoef,n,v.x+v.y)*e.zCoef;c.geometry.attributes.position.needsUpdate=!0}(),function(){var e=.001*Date.now(),t=50;d&&(d.position.x=Math.sin(.1*e)*t,d.position.z=Math.cos(.2*e)*t);u;w&&(w.position.x=Math.sin(.5*e)*t,w.position.z=Math.sin(.6*e)*t);h}(),n.render(o,i),requestAnimationFrame(E)}function x(){var t=b.clientWidth,o=b.clientHeight;if(a=t,r=o,n&&i){n.setSize(a,r),i.aspect=a/r,i.updateProjectionMatrix();var c=function(){var t=new g.PerspectiveCamera(i.fov,i.aspect),n=t.fov*Math.PI/180,o=2*Math.tan(n/2)*Math.abs(e.cameraZ),a=o*t.aspect;return[a,o]}();s=c[0],l=c[1]}}!function(){n=new g.WebGLRenderer({canvas:m,antialias:!0,alpha:!0}),(i=new g.PerspectiveCamera(e.fov)).position.z=e.cameraZ,x(),window.addEventListener("resize",x,!1),p&&p(x);false;(function(){o=new g.Scene,t=30,n=10,a=300,r=new g.AmbientLight(y(e.ambientColor)),o.add(r),d=C(e.light1Color,a,0,n,t),w=C(e.light3Color,a,t,n,0);var t,n,a,r;var u=new g.MeshLambertMaterial({color:16777215,side:g.DoubleSide}),h=new g.PlaneBufferGeometry(s,l,s/2,l/2);c=new g.Mesh(h,u),o.add(c);var p=-Math.PI/2-.1,f=20,v=30;c.rotation.x=p,c.position.y=f,i.position.z=v})(),E()}()}function i(){var t=document.body,n=document.getElementById("navbarNavigation"),o=null==n?void 0:n.classList.contains("show"),i=document.documentElement.clientWidth<768,a=i&&o;t.classList.toggle("mobileView",i),t.classList.toggle("wideView",!i),t.classList.toggle("showNavigation",a),e&&e()}function a(e){return requestAnimationFrame.bind(null,setTimeout.bind(null,i,e))}var r=function(){return r=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},r.apply(this,arguments)},s={dots:!0,arrows:!1,lazyLoad:"ondemand",infinite:!0,speed:1e3,slidesToShow:4,slidesToScroll:1,swipeToSlide:!0,pauseOnHover:!0,autoplay:!0,autoplaySpeed:2e3},l={},c={phoneScreenshotsWide:{width:1600,count:8,step:200},browserScreenshotsWide:{width:1600,count:3,step:400}};function d(e){var t=e.getAttribute("data-carousel-type"),n=l[t],o=function(e){if(e){for(var t=e.step,n=e.width,o=e.count,i=[],a={slidesToShow:o,responsive:i};o>0&&n>0;)i.push({breakpoint:n,settings:{slidesToShow:o}}),n-=t,o--;return a}}(c[t]),i=r(r(r({},s),n),o);$(e).slick(i)}var u,w,h,p;n(858);o(t,{setUpdateVisualizationCallback:function(t){e=t,i()}}),u=document.getElementById("toggleNavigation"),w=a(100),h=a(500),p=a(700),u&&(null==u||u.addEventListener("click",(function(){w(),h(),p()}))),window.addEventListener("resize",i,!1),i(),function(){var e=(0,window.$)(".slick-carousel");if("IntersectionObserver"in window){var t=new IntersectionObserver((function(e,t){e.forEach((function(e){e.isIntersecting&&(d(e.target),t.unobserve(e.target))}))}),{root:null,rootMargin:"50%",threshold:0});e.map((function(e,n){t.observe(n)}))}else e.map((function(e,t){return d(t)}))}(),window.toggleTheme=function(){var e=window.document.body,t=e&&e.parentNode,n=t.dataset?t.dataset.theme:t.getAttribute?t.getAttribute("theme"):"",o=n&&"light"!==n?"light":"dark";o&&t&&(t.setAttribute?t.setAttribute("data-theme",o):t.dataset&&(t.dataset.theme=o)),window.localStorage&&window.localStorage.setItem("theme",o)}})()})();
//# sourceMappingURL=scripts.js.map