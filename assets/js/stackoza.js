$=jQuery;let mname="",mdom="",isTouch=!1;var shaderSource="\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\n#define PHI 1.618033988749\n#define PI 3.14159265358979323846\n\nuniform vec2 u_resolution;\nuniform vec2 u_mouse;\nuniform float u_time;\n\n// ---------------------------- NOISE ----------------------------------------------\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute(vec3 x) {\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nfloat snoise(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n  i = mod289(i);\n  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))\n\t\t+ i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\n//---------------------------------------------------------------------------\n\nvec3 colorE = vec3(0.140,0.132,0.132);\nvec3 colorD = vec3(0.015,0.013,0.014);\nvec3 colorC = vec3(0.290,0.278,0.275);\nvec3 colorB = vec3(0.110,0.104,0.105);\nvec3 colorA = vec3(0.010,0.010,0.010);\n\nfloat aspect = u_resolution.y / u_resolution.x;\n\nvec3 bgColor(float length) {\n    return mix( colorA,\n               mix( colorB,\n                   mix( colorC,\n                       mix( colorD, colorE, smoothstep(3., .133, length)),\n                       smoothstep( .6, .65, length)),\n                 smoothstep( .1, .2, length)),\n             smoothstep( -2.3, .2, length));\n}\n\nvoid main() {\n    vec2 st = gl_FragCoord.xy / u_resolution.xy;\n    vec2 mouse = u_mouse.xy / u_resolution.xy;\n   \tst.xy = 1. - st.xy;\n    vec2 uv = st * vec2(3. , aspect);\n    // float n = snoise( uv + (321.3234 + u_time) / 21.22213 + smoothstep(0.,1., mouse.x * mouse.x)) * (0.5 + 1.- smoothstep(0.1,0.3, mouse.x) * mouse.y );\n    float n = snoise( uv.y + (mouse) + (uv.x * mouse.y) + u_time / 5.22213);\n\n    uv.x = mod( n + uv.x,uv.y );\n\tvec3 color = bgColor( uv.y * 2.9 -  n / PHI / uv.x );\n\n    gl_FragColor = vec4(color * 0.9,1.0);\n}\n\n";$((function(){isTouch=isTouchDevice(),showTime(".social-links",3800),showTime("main.home .artworks-button",2e3),showTime("main.home .home-video",250),showTime("main.home .text-wrapper",1e3),showTime("a.toggle-audio",2500),showTime("main.about .image",200),showTime("main.about .intro",200)})),$(document).ready((function(){if(0!=$("#background-canvas").length){var e=window.innerWidth,o=window.innerHeight,n=document.getElementById("background-canvas");n.width=e/2,n.height=o,new GlslCanvas(n).load(shaderSource),$(window).trigger("resize")}}));let isMenuActive=!1,isViewerActive=!1;function showTime(e,o){setTimeout((function(){$(e).addClass("showing")}),o)}function toggleActive(e="active"){$("html").toggleClass("stop-scrolling"),$("body").toggleClass(e),$(".nav-right-button").toggleClass(e),$("a.logo").toggleClass(e),!0===isMenuActive||!0===isViewerActive?$("html").on("touchmove",(function(e){e.preventDefault()})):$("html").off("touchmove")}function mailto(){isTouch&&$(".social-mail").trigger("mouseenter"),window.location=`mailto:${mname}@${mdom}.xyz`,isTouch&&$(".social-mail").trigger("mouseleave")}function isTouchDevice(){return"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0}$(document).ready((function(){var e=$(".nav-right-button"),o=($(".grid article"),$("main.showcase .viewer"));e.on("click",(function(){if(!0===isViewerActive)return o.fadeToggle(400),isViewerActive=!1,o.trigger("close"),void toggleActive("active-light");isMenuActive=!isMenuActive,$(".overlay-nav").fadeToggle(400),toggleActive()})),$("main.showcase").on("click",".viewer .slide",(function(e){0==$(e.target).hasClass("nft-url")&&e.preventDefault(),e.stopPropagation(),0!=$(e.target).is(".slide, .card, .overlay")&&0!=isViewerActive&&(isViewerActive=!1,o.trigger("close"),o.fadeToggle(400),toggleActive("active-light"))})),$("main.showcase .grid").on("click","article",(function(){isViewerActive=!0,o.fadeToggle(400),toggleActive("active-light")})),$(document).on("keyup",(function(e){"Escape"==e.key&&$(".nav-right-button").click()}));function n(e,o){return e.height()/2-Math.abs(o-e.offset().top)>0?"top":"bottom"}$(".nav-link").mouseenter((function(e){n($(this),e.pageY)})),$(".nav-link").mouseleave((function(e){n($(this),e.pageY)})),$(".social-mail").mouseenter((function(){mname="mail",mdom="stackoza"})),$(".social-mail").mouseleave((function(){mname="",mdom=""}))})),$(document).ready((function(){var e=document.querySelector("video");if(null===e)return;let o=!1;e.muted=!0;var n=e.play();void 0!==n&&n.then((e=>{o=!0})).catch((e=>{o=!1,$("main.home").addClass("no-autoplay")})),e.addEventListener("waiting",(()=>{$("main.home").removeClass("no-autoplay")})),$(e).click((function(){e.play(),e.muted=!1,$("main.home").removeClass("no-autoplay"),$("a.toggle-audio").addClass("active")})),$("a.toggle-audio, a.play-btn").click((function(){o||(e.play(),$("main.home").removeClass("no-autoplay")),$("a.toggle-audio").toggleClass("active"),o=!o,e.muted=!e.muted}))}));
//# sourceMappingURL=stackoza.js.map