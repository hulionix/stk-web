$((function(){let e=$(".grid"),t=$(".end"),i=!0,a=$(".collect-link"),n=document.querySelector(".artworks-button"),s=document.querySelector(".bg-balls .s1"),l=(document.querySelector(".bg-balls .s1"),document.querySelector(".bg-balls .s3"),document.querySelector(".bg-balls .s4"),document.querySelector(".bg-balls .s5"),$(".parallax")),o=$(".parallax-layer-orbit")[0],r=0,h=0,d=document.querySelector("header.top"),g=(document.querySelector(".bg-balls .chain-grid"),document.querySelector("main.showcase .content"),""),m={all:[],nft:[],"2d":[],"3d":[],code:[],animation:[],procreate:[]},c=!1,u={totalPages:1,totalItems:1,itemsPerPage:12,currentPage:1},f=new IntersectionObserver((function(e){if(e.length){let t=e[0];1==t.isIntersecting&&(f.unobserve(t.target),function(){if(u.totalPages==u.currentPage)return;let e=u.itemsPerPage*u.currentPage,t=u.totalItems-e,i=Math.min(u.itemsPerPage,t);if(v(e,e+i-1),u.currentPage+=1,u.totalPages==u.currentPage);}())}}),{root:document.querySelector("main.showcase"),threshold:0});function v(t,i){let a=m[g].length;if(t>=a||t<0||i>=a||i<0)return;let n="";for(let e=t;e<=i;e++){let t=m[g][e];n+=k(dataObjs[t],e)}e.append(n),$(window).trigger("resize");const s=$(".grid article").last().get(0);f.observe(s)}function w(a,l=500){a!=g&&(("nft"==a&&""!=g||"nft"==g&&"nft"!=a)&&($(n).removeClass("showing"),setTimeout((function(){"nft"==a?($(n).html("CryptoArt"),$(s).addClass("crypto")):($(n).html("artworks"),$(s).removeClass("crypto")),$(n).addClass("showing")}),500)),g=a,S(a),e.removeClass("showing"),t.removeClass("showing"),0==i&&e.removeClass("slow"),i=!1,setTimeout((function(){if(g=a,u.currentPage=1,u.totalItems=m[g].length,u.totalPages=Math.ceil(u.totalItems/u.itemsPerPage),e.children().remove(),!m.hasOwnProperty(a)&&m[a].length>0){let i='<div class="message"><span class="text" style="margin-left: 0">This page isn\'t blank in some parallel universe.</span></div>';return e.append(i),t.addClass("showing"),void e.addClass("showing")}v(0,Math.min(m[g].length,u.itemsPerPage)-1),t.addClass("showing"),e.addClass("showing")}),l))}function D(e,t={},i={}){var a=new Image;a.src=e,a.fetchPriority="high",a.onload=t,a.onerror=i}!function(){n.hasOwnProperty("currentOpacity")||(n.currentOpacity=1);let e=new URL(window.location.href).hash.slice(1);"collect"==e?e="nft":""==e&&(e="all");"nft"==e?$(n).html("CryptoArt"):$(n).html("artworks");(function(){for(let e=0;e<dataObjs.length;e++){let t=dataObjs[e].tags.split(" ");for(const i of t)m[i].push(e);m.all.push(e)}})(),function(e){var t=(new Date).getTime();let i=["/assets/images/bg-obj-white.png","/assets/images/bg-obj-red.png","/assets/images/bg-obj-green.png","/assets/images/bg-obj-smile.png","/assets/content/Twisted-Dream-2.png"];for(let e=0,t=dataObjs.length;e<Math.min(t,3);e++)i.push("/assets/content/"+dataObjs[e].image+"-mini.png");let a=0,n=i.length,s=!1;setTimeout((function(){a!=n&&0==s&&(s=!0,e(20))}),2e4);for(let l=0;l<i.length;l++){let o=function(){if(a+=1,a==n&&0==s){s=!0;var i=(new Date).getTime();e((i-t)/1e3)}};D(i[l],o)}}((function(t){let i=1e3*Math.max(0-t,0);setTimeout((function(){requestAnimationFrame((function(){$("main.showcase").addClass("loaded")})),setTimeout((function(){$("main.showcase").removeClass("loader"),$("main.showcase").removeClass("loaded"),function(e){showTime(".parallax-layer-smile",600),showTime(".parallax-layer-artworks h2",2300),setTimeout((function(){l.removeClass("no-scroll")}),2310),showTime(".parallax-layer-white",600),showTime(".parallax-layer-orbit",1800),showTime(".parallax-layer-green",1e3),showTime(".parallax-layer-red",2500),showTime("header.top",1e3),showTime(".filter-buttons",2500),showTime(".end",1500),setTimeout((function(){w(e)}),500)}(e)}),1e3)}),i)}))}();var p=!1;l.scroll((function(){p=p||requestAnimationFrame(U)}));let L=$(".parallax-layer-artworks h2"),I=!0,R=!0;function U(){p=!1;let e=l.scrollTop();0==R&&e<200&&(R=!0,$(d).addClass("showing"),$(o).addClass("showing")),1==R&&e>0&&(R=!1,$(d).removeClass("showing"),$(o).removeClass("showing")),0==I&&e<150&&(I=!0,$(L).addClass("showing")),1==I&&e>0&&(I=!1,$(L).removeClass("showing"))}function S(e){$(".filters-button-group button").removeClass("is-checked"),$(".filters-button-group button."+e).addClass("is-checked")}function T(){$(".viewer a.next").off("click"),setTimeout((function(){$(".viewer a.next").click(T)}),500),y.get(0).scroll({left:y.get(0).scrollLeft+P.slideWidth,top:0,behavior:"smooth"})}function b(){$(".viewer a.prev").off("click"),setTimeout((function(){$(".viewer a.prev").click(b)}),500),y.get(0).scroll({left:y.get(0).scrollLeft-P.slideWidth,top:0,behavior:"smooth"})}a.on("click",(function(){toggleActive(),$(".overlay-nav").fadeToggle(400,(function(){l.animate({scrollTop:0},500,(function(){U()})),w("nft")}))})),$(".filters-button-group").on("click","button",(function(){let e=$(this).attr("data-filter");history.replaceState(null,null,"#"+e),S(e),l.animate({scrollTop:0},1e3,(function(){U(),w(e)}))})),$(document).on("keyup",(function(e){"ArrowRight"==e.key&&T(),"ArrowLeft"==e.key&&b()})),$(".viewer a.next").click(T),$(".viewer a.prev").click(b),$("article .overlay").hover((function(){}));let y=$(".viewer .slider"),P={slideWidth:0,currentSlide:0,maxSlides:0,dataSourceId:"all",preventDoubles:!1};$(window).resize((function(){e.children().each((function(e,t){const i=$(t).find(".title-container"),a=i.width()/400+"s";i.css("-webkit-animation-duration",a),i.css("-moz-animation-duration",a),i.css("animation-duration",a)}));const t=P.currentSlide,i=P.dataSourceId,a=P.maxSlides,n=P.preventDoubles;P={slideWidth:Math.round(y.width()),currentSlide:t,scrollMax:Math.round(2*y.width()),maxSlides:a,dataSourceId:i,preventDoubles:n},r=Math.round(l[0].scrollHeight),h=Math.round(l.height())})),$(window).trigger("resize"),y.scroll((function(e){if(P.preventDoubles)return 0==P.currentSlide?void y.scrollLeft(0):P.currentSlide==P.maxSlides?void y.scrollLeft(2*P.slideWidth):void y.scrollLeft(P.slideWidth);let t=Math.round(y.scrollLeft());t===P.slideWidth&&(0==P.currentSlide&&(P.currentSlide+=1),P.currentSlide==P.maxSlides&&(P.currentSlide-=1),x(),M(1));if(0===t&&P.currentSlide>0){let e=-1;P.currentSlide==P.maxSlides&&(e=-2),P.currentSlide+=e,x();let t=A(P.currentSlide-1);return void(""!=t?(P.preventDoubles=!0,setTimeout((function(){P.preventDoubles=!1}),200),y.prepend(t),y.children().last().remove(),y.scrollLeft(P.slideWidth),M(1)):M(0))}if(t===P.scrollMax&&P.currentSlide<P.maxSlides){let e=1;0==P.currentSlide&&(e=2),P.currentSlide+=e,x();let t=A(P.currentSlide+1);return void(""!=t?(P.preventDoubles=!0,setTimeout((function(){P.preventDoubles=!1}),200),y.children().first().remove(),y.append(t),y.scrollLeft(P.slideWidth),M(1)):M(2))}}));let C="";function M(e){if(y.children().removeClass("active"),y.children().eq(e).addClass("active"),""!=C){y.find(`#${C} iframe`)[0].src+="",C=""}let t=y.children().eq(e),i=t.attr("id");t.find("iframe").length&&(C=i)}function O(){C="",y.children().remove()}function x(){0===P.currentSlide?$(".viewer a.prev").addClass("disabled"):$(".viewer a.prev").removeClass("disabled"),P.currentSlide===P.maxSlides?$(".viewer a.next").addClass("disabled"):$(".viewer a.next").removeClass("disabled")}function A(e){if(e<0||e>P.maxSlides)return"";D("/assets/content/"+dataObjs[e].image+".png",(function(){$(`#${e}-slide`).addClass("loaded")}),{});let t=dataObjs[m[P.dataSourceId][e]],i=`<img fetchpriority="high" src="/assets/content/${t.image}.png" class="image-content"/>`;""!=t.vimeoID&&(i=`<iframe id="${t.vimeoID}" class="video-content" src="https://player.vimeo.com/video/${t.vimeoID}?dnt=1&color=b7b8b9&title=0&byline=0&portrait=0" width="${t.width}" height="${t.height}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`);let a="";return t.nftURL&&(a=`<a class="nft-url" target="_blank" href="${t.nftURL}"><span>COLLECT</span></a>`),`<div id="${e}-slide" class="slide cursor-close">\n                    <div class="card cursor-close">\n                        ${i}\n                        <div class="overlay cursor-close">\n                            <div class="title-container cursor-default">\n                                <span class="title cursor-default">${t.title}</span>\n                            </div>\n                            ${a}\n                        </div>\n                    </div>\n                </div>`}function k(e,t){let i='<a class="show-btn"><span class="show">VIEW</span></a>';""!=e.nftURL&&(i=`<a class="nft-url" target="_blank" href="${e.nftURL}"><span class="collect">COLLECT</span></a>`);let a="";return""!=e.vimeoID&&(a='<span class="play-icon"><svg width="100%" height="100%" viewBox="0 0 73 73"><path d="M72.886,36.189l-72.886,36.189l0,-72.378l72.886,36.189Z" style="fill:#000;"/></svg></span>'),`<article data-id="${t}" class="${e.tags}">\n                    ${a}\n                    <div class="card">\n                        <img src="/assets/content/${e.image}-mini.png" alt="${e.title}" width="${e.width}" height="${e.height}" class="image-content cursor-pointer" />\n                        <div class="overlay">\n                            <div class="title-container">\n                                <span class=title>${e.title}</span>\n                                <span class=title>${e.title}</span>\n                                <span class=title>${e.title}</span>\n                                <span class=title>${e.title}</span>\n                            </div>\n                            ${i}\n                        </div>\n                    </div>\n                </article>`}$("main.showcase .viewer").on("close",(function(){1==c&&(c=!1,setTimeout((function(){O()}),400))})),$("main.showcase .grid").on("click","article",(function(e){0==$(e.target).hasClass("nft-url")&&e.preventDefault(),e.stopPropagation(),c=!0;let t=$(".filters-button-group .is-checked").attr("id");P.dataSourceId=t,P.maxSlides=m[t].length-1,O();let i=parseInt($(this).attr("data-id"));P.currentSlide=m[t].indexOf(i),y.append(A(P.currentSlide)),P.preventDoubles=!0,window.setTimeout((function(){0===P.currentSlide?(y.append(A(P.currentSlide+1)),y.append(A(P.currentSlide+2)),M(0),P.preventDoubles=!0):P.currentSlide==P.maxSlides?(y.prepend(A(P.currentSlide-1)),y.prepend(A(P.currentSlide-2)),y.scrollLeft(2*P.slideWidth),M(2),P.preventDoubles=!0):(y.prepend(A(P.currentSlide-1)),y.append(A(P.currentSlide+1)),y.scrollLeft(P.slideWidth),y.children().eq(1).addClass("active"),M(1),P.preventDoubles=!0),x(),setTimeout((function(){P.preventDoubles=!1}),200)}),100)}))}));const dataObjs=[{image:"Cherries-On-Top",title:"Cherries On Top",tags:"3d",vimeoID:"",width:374,height:500,nftURL:""},{image:"Luna",title:"Luna",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"There-Is-No-Time-To-Kill-Today",title:"There Is No Time To Kill Today",tags:"3d",vimeoID:"",width:374,height:500,nftURL:""},{image:"Acid-Typo-2",title:"Acid Typo - 2",tags:"3d",vimeoID:"",width:500,height:374,nftURL:""},{image:"Oilstan",title:"The Ruins Of Oilstan",tags:"3d",vimeoID:"",width:500,height:374,nftURL:""},{image:"High-Tubs",title:"High Tubs",tags:"3d",vimeoID:"",width:500,height:374,nftURL:""},{image:"Melting-Green-Brains",title:"Melting Green Brains",tags:"3d",vimeoID:"",width:500,height:374,nftURL:""},{image:"Swimming-With-My-Bubble",title:"Swimming With A Bubble",tags:"3d",vimeoID:"",width:500,height:374,nftURL:""},{image:"Anger-Hunger",title:"Looking For Trouble",tags:"3d",vimeoID:"",width:500,height:374,nftURL:""},{image:"Acid-Typo-1",title:"Acid Typo - 1",tags:"3d",vimeoID:"",width:500,height:374,nftURL:""},{image:"Magic-Feeling-Lost",title:"Magic Feeling Lost",tags:"3d",vimeoID:"",width:500,height:374,nftURL:""},{image:"Alien-Pro-Pool",title:"Alien Pro-Pool",tags:"3d",vimeoID:"",width:500,height:374,nftURL:""},{image:"Layers-Of-perception",title:"Layers Of Perception",tags:"3d",vimeoID:"",width:374,height:500,nftURL:""},{image:"The-Green-Mask",title:"The Green Mask",tags:"3d",vimeoID:"",width:374,height:500,nftURL:""},{image:"Space-Island",title:"Space Island",tags:"3d",vimeoID:"",width:374,height:500,nftURL:""},{image:"Sokkar",title:"Sokkar",tags:"3d",vimeoID:"",width:500,height:500,nftURL:""},{image:"Glass-Dream",title:"Glass Dream",tags:"3d",vimeoID:"",width:374,height:500,nftURL:""},{image:"Dangerous-Gardens",title:"Dangerous Gardens",tags:"3d",vimeoID:"",width:374,height:500,nftURL:""},{image:"Letters-From-Far-Away-1",title:"Letters From Far Away - 3",tags:"3d",vimeoID:"",width:374,height:500,nftURL:""},{image:"Letters-From-Far-Away-3",title:"Letters From Far Away - 2",tags:"3d",vimeoID:"",width:500,height:374,nftURL:""},{image:"Letters-From-Far-Away-2",title:"Letters From Far Away - 1",tags:"3d",vimeoID:"",width:374,height:500,nftURL:""},{image:"Kleo",title:"Kleo",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Wompland",title:"Wompland",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Didi",title:"Didi",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"White-Rose",title:"White Rose",tags:"3d",vimeoID:"",width:374,height:500,nftURL:""},{image:"Dancing-In-A-Lake-At-Night",title:"Dancing In A Lake At Night",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Not-A-Monument",title:"Not A Monument",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Alien-Egg-1",title:"Alien Pod - 1",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Alien-Egg-2",title:"Alien Pod - 2",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Alien-Egg-3",title:"Alien Pod - 3",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Alien-Predator",title:"Alien Predator",tags:"3d",vimeoID:"",width:500,height:392,nftURL:""},{image:"Extraterrestrial-Structure-9",title:"Extraterrestrial Structure - 1",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Extraterrestrial-Structure-8",title:"Extraterrestrial Structure - 2",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Extraterrestrial-Structure-7",title:"Extraterrestrial Structure - 3",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Extraterrestrial-Structure-6",title:"Extraterrestrial Structure - 4",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Extraterrestrial-Structure-5",title:"Extraterrestrial Structure - 5",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Extraterrestrial-Structure-4",title:"Extraterrestrial Structure - 6",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Extraterrestrial-Structure-3",title:"Extraterrestrial Structure - 7",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Korean-Grill",title:"Korean Grill",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Through-Space-Vortex",title:"Through Space Vortex",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Twisted-Dream-1",title:"Twisted Dream 1",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Twisted-Dream-2",title:"Twisted Dream 2",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Molecules-Of-Pleasure-Red",title:"Molecules Of Pleasure - Red",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Molecules-Of-Pleasure-1",title:"Molecules Of Pleasure - 1",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Molecules-Of-Pleasure-2",title:"Molecules Of Pleasure - 2",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Molecules-Of-Pleasure-3",title:"Molecules Of Pleasure - 3",tags:"3d",vimeoID:"",width:500,height:392,nftURL:""},{image:"Molecules-Of-Pleasure-4",title:"Molecules Of Pleasure - 4",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Knots-1",title:"Knots - 1",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Knots-2",title:"Knots - 2",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Knots-3",title:"Knots - 3",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Knots-4",title:"Knots - 4",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Foundation-In-Progress-1",title:"Foundation In Progress - 1",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Foundation-In-Progress-2",title:"Foundation In Progress - 2",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Is-There-Anybody-Out-There",title:"Is There Anybody Out There",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Love-Kills",title:"Love Kills",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Trinity",title:"Trinity",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"What-Have-You-Done!",title:"What Have You Done!",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Flying-in-Eden",title:"Flying in Eden",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Happy-Monsters",title:"Happy Monsters",tags:"3d nft",vimeoID:"",width:392,height:500,nftURL:""},{image:"Good-Plan",title:"Good Plan",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Glass-Eyes",title:"Glass Eyes",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Gentle-Pressure",title:"Ascending Order",tags:"3d nft",vimeoID:"",width:392,height:500,nftURL:""},{image:"Getting-There-Together",title:"Getting There Together",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"Eclipse",title:"Eclipse",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"The-Transcender",title:"The Transcender",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"The-Magic-Well",title:"The Magic Well",tags:"3d",vimeoID:"",width:392,height:500,nftURL:""},{image:"The-Loop",title:"The Loop",tags:"3d",vimeoID:"595024406",width:720,height:720,nftURL:""},{image:"Multiversal-Trip",title:"Multiversal Trip",tags:"3d",vimeoID:"595023535",width:720,height:720,nftURL:""},{image:"Floating-Point-Planet",title:"Floating Point Planet",tags:"3d",vimeoID:"",width:500,height:500,nftURL:""},{image:"Gravitational-Waves-1",title:"Gravitational Waves 1 of 3",tags:"3d",vimeoID:"",width:500,height:500,nftURL:""},{image:"Gravitational-Waves-2",title:"Gravitational Waves 2 of 3",tags:"3d",vimeoID:"",width:500,height:500,nftURL:""},{image:"Gravitational-Waves-3",title:"Gravitational Waves 3 of 3",tags:"3d",vimeoID:"",width:500,height:500,nftURL:""},{image:"Diamonds-and-Chains-1",title:"Diamonds & Chains 1 of 2",tags:"3d",vimeoID:"",width:500,height:500,nftURL:""},{image:"Diamonds-and-Chains-2",title:"Diamonds & Chains 2 of 2",tags:"3d",vimeoID:"",width:500,height:500,nftURL:""},{image:"Flight-Around-a-Universe-Instance",title:"Flight Around a Universe Instance",tags:"3d",vimeoID:"595013803",width:720,height:720,nftURL:""},{image:"Bath-House",title:"Bath House",tags:"3d",vimeoID:"",width:376,height:500,nftURL:""},{image:"Solar-Pool",title:"Solar Pool",tags:"3d",vimeoID:"",width:500,height:500,nftURL:""},{image:"45C-Reasons-to-Drink",title:"45°C Reasons to Drink",tags:"3d",vimeoID:"",width:374,height:500,nftURL:""},{image:"Otherworld-Site-of-Entry",title:"Otherworld Site of Entry",tags:"3d",vimeoID:"",width:500,height:500,nftURL:""},{image:"Multiversal-Trip-1",title:"Multiversal Trip 1 of 2",tags:"3d",vimeoID:"",width:500,height:500,nftURL:""},{image:"Multiversal-Trip-2",title:"Multiversal Trip 2 of 2",tags:"3d",vimeoID:"",width:500,height:500,nftURL:""},{image:"The-Loop",title:"The Loop",tags:"3d",vimeoID:"",width:500,height:500,nftURL:""},{image:"Valley-of-the-Rising-Stellar",title:"Valley of the Rising Stellar",tags:"3d procreate",vimeoID:"",width:500,height:500,nftURL:""},{image:"Somewhere-Feeling-Happy",title:"Somewhere Feeling Happy",tags:"3d procreate",vimeoID:"",width:500,height:500,nftURL:""},{image:"Red-Jasmines",title:"Red Jasmines",tags:"3d",vimeoID:"",width:500,height:500,nftURL:""},{image:"Face-It",title:"Black Desert",tags:"3d procreate",vimeoID:"",width:500,height:500,nftURL:""},{image:"Lines-to-Nowhere",title:"Lines to Nowhere",tags:"3d procreate",vimeoID:"",width:500,height:500,nftURL:""},{image:"Give-Me-Some-Good-Rays",title:"Give Me Some Good Rays",tags:"3d procreate",vimeoID:"",width:500,height:500,nftURL:""},{image:"The-Floating-Busts-of-an-Ancient-Museum-Built-at-a-Time-Once-Called-Modern",title:"The Floating Busts of an Ancient Museum Built at a Time Once Called Modern",tags:"3d",vimeoID:"",width:500,height:500,nftURL:""},{image:"Class-Glass",title:"Class Glass",tags:"3d",vimeoID:"",width:500,height:500,nftURL:""},{image:"Deep-Space",title:"Deep Space",tags:"2d",vimeoID:"",width:375,height:500,nftURL:""},{image:"Nefertiti-1",title:"Nefertiti - 1 of 2",tags:"2d",vimeoID:"",width:395,height:500,nftURL:""},{image:"Nefertiti-2",title:"Nefertiti - 2 of 2",tags:"2d",vimeoID:"",width:400,height:500,nftURL:""},{image:"Mountains-on-a-Distant-Planet-1",title:"Mountains on a Distant Planet - 1 of 2",tags:"2d",vimeoID:"",width:397,height:500,nftURL:""},{image:"Mountains-on-a-Distant-Planet-2",title:"Mountains on a Distant Planet - 2 of 2",tags:"2d",vimeoID:"",width:400,height:500,nftURL:""},{image:"Other-Universes-1",title:"Other Universes - 1 of 4",tags:"2d",vimeoID:"",width:330,height:500,nftURL:""},{image:"Other-Universes-2",title:"Other Universes - 2 of 4",tags:"2d",vimeoID:"",width:331,height:500,nftURL:""},{image:"Other-Universes-3",title:"Other Universes - 3 of 4",tags:"2d",vimeoID:"",width:327,height:500,nftURL:""},{image:"Other-Universes-4",title:"Other Universes - 4 of 4",tags:"2d",vimeoID:"",width:329,height:500,nftURL:""},{image:"Spring-Bubbles",title:"Spring Bubbles 1 of 2",tags:"2d",vimeoID:"",width:331,height:500,nftURL:""},{image:"Spring-Bubbles-2",title:"Spring Bubbles 2 of 2",tags:"2d",vimeoID:"",width:332,height:500,nftURL:""},{image:"Ultraviolet",title:"Ultraviolet",tags:"2d",vimeoID:"",width:345,height:500,nftURL:""},{image:"Golden-Gate",title:"Golden Gate",tags:"2d",vimeoID:"",width:362,height:500,nftURL:""},{image:"Ballz-and-Holez",title:"Ballz & Holez",tags:"2d code",vimeoID:"",width:366,height:500,nftURL:""},{image:"Sonic-Curtain",title:"Sonic Curtain",tags:"code",vimeoID:"",width:374,height:500,nftURL:""},{image:"Time-Lines",title:"Time Lines",tags:"code",vimeoID:"",width:376,height:500,nftURL:""},{image:"Shiny-Celestial-Dust",title:"Shiny Celestial Dust",tags:"code",vimeoID:"",width:374,height:500,nftURL:""},{image:"Night-At-The-Pyramids",title:"Night At The Pyramids",tags:"code",vimeoID:"",width:374,height:500,nftURL:""},{image:"Data-Waves",title:"Data Waves",tags:"code",vimeoID:"",width:374,height:500,nftURL:""},{image:"Somewhere-on-Venus",title:"Somewhere on Venus",tags:"code animation",vimeoID:"202356093",width:720,height:720,nftURL:""},{image:"Data-Channels",title:"Data Channels",tags:"code animation",vimeoID:"201782970",width:720,height:720,nftURL:""},{image:"Drop",title:"Drop",tags:"code animation",vimeoID:"201779758",width:720,height:720,nftURL:""}];
//# sourceMappingURL=artworks.js.map