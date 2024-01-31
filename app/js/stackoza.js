$ = jQuery;

let mname = "";
let mdom = "";
let isTouch = false;
var shaderSource = `
#ifdef GL_ES
precision mediump float;
#endif

#define PHI 1.618033988749
#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// ---------------------------- NOISE ----------------------------------------------
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x*34.0)+1.0)*x);
}

float snoise(vec2 v)
  {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0

  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
		+ i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

//---------------------------------------------------------------------------

vec3 colorE = vec3(0.140,0.132,0.132);
vec3 colorD = vec3(0.015,0.013,0.014);
vec3 colorC = vec3(0.290,0.278,0.275);
vec3 colorB = vec3(0.110,0.104,0.105);
vec3 colorA = vec3(0.010,0.010,0.010);

float aspect = u_resolution.y / u_resolution.x;

vec3 bgColor(float length) {
    return mix( colorA,
               mix( colorB,
                   mix( colorC,
                       mix( colorD, colorE, smoothstep(3., .133, length)),
                       smoothstep( .6, .65, length)),
                 smoothstep( .1, .2, length)),
             smoothstep( -2.3, .2, length));
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 mouse = u_mouse.xy / u_resolution.xy;
   	st.xy = 1. - st.xy;
    vec2 uv = st * vec2(3. , aspect);
    // float n = snoise( uv + (321.3234 + u_time) / 21.22213 + smoothstep(0.,1., mouse.x * mouse.x)) * (0.5 + 1.- smoothstep(0.1,0.3, mouse.x) * mouse.y );
    float n = snoise( uv.y + (mouse) + (uv.x * mouse.y) + u_time / 5.22213);

    uv.x = mod( n + uv.x,uv.y );
	vec3 color = bgColor( uv.y * 2.9 -  n / PHI / uv.x );

    gl_FragColor = vec4(color * 0.9,1.0);
}

`;

$( function() {
    main();

    function main() {
        isTouch = isTouchDevice();
        reveal();
    }

    function reveal() {
        showTime('a.logo', 1000);
        showTime('.nav-right-button svg', 1000);
        showTime('.social-links', 1800);
        showTime('main.home .artworks-button', 2000);
        showTime('main.home .home-video', 100);
        showTime('a.toggle-audio', 100);
        showTime('main.about .intro', 100);
        showTime('main.about .image', 100);
    }
});

$(document).ready(function() {
    if ( $('#background-canvas').length == 0 ) { return; }
    var width = window.innerWidth;
    var height = window.innerHeight;
    var canvas = document.getElementById('background-canvas');

    canvas.width = width / 2;
    canvas.height = height;
    var glslCanvas = new GlslCanvas(canvas);
    glslCanvas.load(shaderSource);
    $(window).trigger('resize');
});

let isMenuActive = false;
let isViewerActive = false;
$(document).ready(function() {
    var navButton = $(".nav-right-button");
    var gridItem = $(".grid article");
    var viewer = $("main.showcase .viewer");

    navButton.on('click', function() {
        // Handle Viewer
        if ( isViewerActive === true ) { 
            viewer.fadeToggle(400);
            isViewerActive = false;
            viewer.trigger('close');
            toggleActive("active-light");
            return 
        }
        // Handle Nav
        isMenuActive = !isMenuActive;
        $('.overlay-nav').fadeToggle(400);
        toggleActive();
    });

    $("main.showcase").on("click", ".viewer .slide", function (e) {
        if ($(e.target).hasClass("nft-url") == false ) {
            e.preventDefault();
        }
        e.stopPropagation();
        if ($(e.target).is(".slide, .card, .overlay") == false ) return;
        isViewerActive = false;
        viewer.trigger('close');
        viewer.fadeToggle(400);
        toggleActive("active-light");
    });

    $('main.showcase .grid').on("click", "article", function () {
        isViewerActive = true;
        viewer. fadeToggle(400);
        toggleActive("active-light");
    });

    
    $(document).on('keyup', function(e) {
        if (e.key == "Escape") $(".nav-right-button").click();
    });

    let top = true;
    let enterPosition = 'top';

    $(".nav-link").mouseenter(function(e) {
        let position = getPosition($(this), e.pageY);
        // $(this).removeClass("top");
        // $(this).removeClass("bottom");
        // $(this).addClass(position);
    });

    $(".nav-link").mouseleave(function(e) {
        let position = getPosition($(this), e.pageY);
        // if ($(this).hasClass("top") && position == "top") { 
        //     $(this).removeClass("top"); 
        //     return; 
        // } else if ($(this).hasClass("top") && position == "bottom") { 
        //     //$(this).removeClass("top"); 
        //     $(this).addClass("bottom"); 
        //     return; 
        // } else if ($(this).hasClass("bottom") && position == "top") { 
        //     $(this).removeClass("bottom"); 
        //     $(this).addClass("top"); 
        //     return; 
        // } else if ($(this).hasClass("bottom") && position == "bottom") { 
        //     $(this).removeClass("bottom"); 
        //     return; 
        // };
    });

    function getPosition(obj, pageY) {
        let mid = obj.height() / 2;
        var relY = Math.abs(pageY - obj.offset().top);
        return ((mid - relY) > 0)? "top" : "bottom";
    }

    $('.social-mail').mouseenter(function() {
        mname = 'mail';
        mdom = 'stackoza';
    });

    $('.social-mail').mouseleave(function() {
        mname = '';
        mdom = '';
    });
});

function showTime(selector, delay) {
    setTimeout(function () { $(selector).addClass("showing"); }, delay);
}

function toggleActive(css = "active") {
    $('html').toggleClass('stop-scrolling');
    $('body').toggleClass(css);
    $('.nav-right-button').toggleClass(css);
    $('a.logo').toggleClass(css);
    if (isMenuActive === true || isViewerActive === true ) {
        $('html').on('touchmove', function(e){e.preventDefault()});
    } else {
        $('html').off('touchmove');
    }
}

function mailto() {
    if (isTouch) { $('.social-mail').trigger('mouseenter'); }
    window.location = `mailto:${mname}@${mdom}.xyz`;
    if (isTouch) { $('.social-mail').trigger('mouseleave'); }
}

function isTouchDevice() {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0));
  }

$(document).ready(function() {

    var video = document.querySelector("video");

    if (video === null) { return }

    $('a.toggle-audio').click( function () {
        $(this).toggleClass('active');
        video.muted = !video.muted;
    });
});

$(document).ready(function() {
    // GDPR
    const cookieName = "cookies-consent";
    const cookieContent = "Agreed";

    checkCookie();
    $('.cookies-jar a.ok').click(function () {
        setCookie(cookieName, cookieContent, 365);
        $('.cookies-jar').remove();
    });

    $('.cookies-jar a.info').click(function () {
        $('p.more-info').toggleClass('active');
    });

    function checkCookie() {
        let cookie = getCookie(cookieName);
        if (cookie == "") {
            let text = `
            <div class="cookies-jar">
                <p class="more-info">Cookies are required to show you videos stored on <a href="https://vimeo.com/cookie_policy" target="_blank">vimeo</a>, and to remember your consent on allowing cookies.</p>
                <p>Essential cookies will be stored when you use this website. <span><a class="info">?</a><a class="ok">Ok</a></span></p>
            </div>
            `
            $('body').append(text);
        }
    }
});

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}