$( function() {
    let $grid = $('.grid');
    let firstRun = true;
    let collectLink = $(".collect-link");
    let $end = $(".end");
    let title = document.querySelector('.artworks-button');
    let s1 = document.querySelector('.bg-balls .s1');
    let s2 = document.querySelector('.bg-balls .s1');
    let s3 = document.querySelector('.bg-balls .s3');
    let s4 = document.querySelector('.bg-balls .s4');
    let s5 = document.querySelector('.bg-balls .s5');
    let topHeader = document.querySelector('header.top');
    let chainGrid = document.querySelector('.bg-balls .chain-grid');
    let content = document.querySelector('main.showcase .content');
    let currentFilter = '';
    let dataSources = {'all': [], 'nft': [], '2d': [], '3d': [], 'code': [], 'animation': [], 'procreate': []};
    main();

    function main() {
        if (!title.hasOwnProperty('currentOpacity')) { title.currentOpacity = 1; }
        const url = new URL(window.location.href);
        let filter = url.hash.slice(1);
        if (filter == "collect") {
            filter = "nft"
        } else if (filter == "") {
            filter = "all"
        }

        if (filter == "nft") {
            $(title).html("CryptoArt");
        } else {
            $(title).html("artworks");
        }

        prepareData();
        showPage(filter);
    }

    // Prepare gallery data
    function prepareData() {

      for (let i = 0; i < dataObjs.length; i++) {
          let data = dataObjs[i];
          let tags = data['tags'].split(" ");
          for (const tag of tags) { 
              dataSources[tag].push(i);
          }
          dataSources["all"].push(i);
      }

  }

  

    // To ScrollAnimation
    function scrollTranslateXYZ( elem, targetXMax, targetYMax, targetScroll, z, scroll ) {
        const targetY = (targetYMax / targetScroll) * (scroll);
        const targetX = (targetXMax / targetScroll) * (scroll);
        elem.style.transform = `translate(${targetX}px, ${targetY}px) translateZ(${z}px)`;
    }
    function scrollTranslateXYZ2( elem, targetXMax, targetYMax, targetScroll, z, scroll ) {
        const targetY = (targetYMax / targetScroll) * (scroll);
        const targetX = (targetXMax / targetScroll) * (scroll);

        $(elem).css({transform: `translate(${targetX}px, ${targetY}px) translateZ(${z}px)`});
    }
    // To ScrollAnimation
    function scrollOpacity( elem, opacityMin, targetScroll, scroll ) {
        const scrollRatio = Math.min(targetScroll, scroll) / targetScroll;
        const opacity = 1 + ((opacityMin - 1) * scrollRatio);

        elem.currentOpacity = opacity;
        elem.style.opacity = `${elem.currentOpacity}`;
    }


    // (function(){
    //   scrollOpacity(title, 0.0, 100, window.scrollY);
    //   setTimeout(arguments.callee, 1000);
    // })();
  
    // ScrollAnimation User

    $(window).scroll(windowScroll);

    //window.addEventListener('scroll', throttle(windowScroll, 200));
    function windowScroll() {
        let scroll = window.scrollY;
        // scrollTranslateXYZ2(s3, -200, 500, 7000, 3, scroll);
        // scrollTranslateXYZ2(s4, 30, -300, 300, 4, scroll);
        // scrollTranslateXYZ2(chainGrid, -200, 500, 7000, 5, scroll);

        // text
        scrollOpacity(topHeader, 0.0, 450, scroll);
    }
    // To Utils
    function throttle(fn, wait) {
        var time = Date.now();
        return function() {
          if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
          }
        }
      }
      
    // Page intro animation
    function showPage(filter) {
        showTime('header.top', 2000);
        showTime('.filter-buttons', 2500);
        showTime('.end', 1500);
        setTimeout(function () { showFilter(filter); }, 1000);
        $("html, body").animate({ scrollTop: 0 }, 500, function() {
          windowScroll();
        });
        visuals();
    }
  

    // Handle special same page click on collect
    collectLink.on('click', function () {
        toggleActive();
        $('.overlay-nav').fadeToggle(400, function (){
            $("html, body").animate({ scrollTop: 0 }, 500, function() {
              windowScroll();
            });
            showFilter("nft");
        });
    });

    // Show filtered gallery
    function showFilter(filter, delay = 500) {
        if (filter == currentFilter) {
            return;
        }
        if ( (filter == "nft" && currentFilter != '') || (currentFilter == "nft" && filter != "nft" ) ) {
          $(title).removeClass('showing');
            setTimeout(function() {
                if (filter == "nft") {
                    $(title).html("CryptoArt");
                    $(s1).addClass('crypto');
                } else {
                    $(title).html("artworks");
                    $(s1).removeClass('crypto');
                }
                $(title).addClass('showing');
            }, 500);
        }
        currentFilter = filter;
        setActiveFilterButton(filter);
        $grid.removeClass('showing');
        $end.removeClass('showing');
        if (firstRun == false ) {
            $grid.removeClass('slow');
        }
        firstRun = false;
        setTimeout(function () {
            currentFilter = filter
            $grid.children().remove();
            
            let added = 0;
    
            if (!dataSources.hasOwnProperty(filter)) {
                let message = `<div class="message"><span class="text" style="margin-left: 0">This page isn't blank in some parallel universe.</span></div>`;
                $grid.append(message);
                $end.addClass('showing');
                $grid.addClass('showing');
                return;
            }
            let items = "";
            dataSources[filter].forEach( i => {
                let data = dataObjs[i];
                items += getGridItemFor(data, i);
                added += 1;
            });

            $grid.prepend(items);
    
            if (added === 0) {
                $grid.append(getCryptoMessage());
                $end.addClass('showing');
                $grid.addClass('showing');
                return;
            }
            $(window).trigger("resize");
            // document.querySelectorAll(".grid article").forEach((elem) => {
            //     if (elem) { observer.observe(elem); }
            // });
            $end.addClass('showing');
            $grid.addClass('showing');
          }, delay);
    }

    // let observer = new IntersectionObserver(function(entries) {
    //   for (let i = 0; i< entries.length; i++) {
    //     let entry = entries[i];
    //     if (entry.isIntersecting == true) {
    //       entry.target.style.transform = `translateY(0px)`;
    //     } else {
    //       if (entry.boundingClientRect.top < 10) {
    //         entry.target.style.transform = `translateY(-250px)`;
  
    //       } else {
    //         entry.target.style.transform = `translateY(250px)`;
    //       }
    //     }
    //   }
      
    // }, { threshold: [0.01] });

    function getCryptoMessage() {
      return `
      <div class="message">
        <img src="/assets/images/Metaverse.png" width="1500" height="2793 " />
        <!--span class="text">FIRST DROP<span><img class="spinner-cw" src="/assets/images/soon-hollow.svg"/></span></span-->
        <div class="drops">
          <form action="https://icloud.us5.list-manage.com/subscribe/post?u=2907ec70735bb82d8366cf6b5&amp;id=aba3770b55" class="validate" target="_blank">
            <h2 class="title">KNOW<br/>WHEN</h2>
            <span class="small-title">plus more on future drops</span><span class="small-title">when you subscribe to</span><span class="small-title">the newsletter</span>
            <div>
              <label for="mce-EMAIL">Email Address</label>
              <input type="email" name="EMAIL" id="mce-EMAIL" title="The domain part is invalid." placeholder="Email" required>
            </div>
              <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_2907ec70735bb82d8366cf6b5_aba3770b55" tabindex="-1" value=""></div>
              <div class="mc-status"></div>
              <div><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
          </form>
          <script type='text/javascript' src='/assets/js/validate.js'></script>
        </div>
      </div>
      
      `
    }

    function visuals() {
      var postImage = new Image();
      postImage.src = "/assets/content/Luna.png"
      postImage.onload = function(){
        //$(".bg-image img").attr("src", postImage.src).addClass("showing");
        
      };
    }

    // To Utils, helper to get gallery image sizes
    function imageSizes() {
        let loaded = 0;
        let total = dataObjs.length;
        for (let i = 0; i < dataObjs.length; i++) {
            var postImage = new Image();
            postImage.src = "/assets/content/" + dataObjs[i].image + "-mini.png"
            postImage.onload = function(){
                dataObjs[i].width = this.width;
                dataObjs[i].height = this.height;
                loaded += 1;
                if (loaded == total) {
                    console.log(dataObjs);
                }
            };
        }
    }
    
    // filter buttons
    $('.filters-button-group').on( 'click', 'button', function() {
        let filter = $( this ).attr('data-filter');
        history.replaceState(null, null, '#' + filter);
        setActiveFilterButton(filter);
        $("html, body").animate({ scrollTop: 0 }, 500, function() {
          windowScroll();
        });
        showFilter(filter);
    });

    function setActiveFilterButton(filter) {
        $('.filters-button-group button').removeClass('is-checked');
        $('.filters-button-group button.' + filter).addClass('is-checked');
    }

    $(document).on('keyup', function(e) {
        if (e.key == "ArrowRight") nextSlide();
        if (e.key == "ArrowLeft") prevSlide();
    });

    $('.viewer a.next').click(function(e) {
        nextSlide();
    });

    $('.viewer a.prev').click(function(e) {
        prevSlide();
    });

    function nextSlide() {
        $slider.get(0).scrollLeft += sliderData.slideWidth;
    }

    function prevSlide() {
        $slider.get(0).scrollLeft -= sliderData.slideWidth;
    }

    $('article .overlay').hover( function() {
        
    });

    function updateDuration() {
        $grid.children().each(function(index, item){
            const pixelsPerSecond = 400;
            const $title = $(item).find('.title-container');
            const titleWidth = $title.width();
            const duration = (titleWidth / pixelsPerSecond) + "s";
            $title.css('-webkit-animation-duration', duration);
            $title.css('-moz-animation-duration', duration);
            $title.css('animation-duration', duration);
        });
        
    }


    let $slider = $('.viewer .slider');
    let sliderData = {
        slideWidth: 0,
        currentSlide: 0,
        maxSlides: 0,
        dataSourceId: "all",
        preventDoubles: false
    }

    $(window).resize(function() {
        updateDuration();
        const id = sliderData.currentSlide;
        const dataSourceId = sliderData.dataSourceId;
        const maxSlides = sliderData.maxSlides;
        const preventDoubles = sliderData.preventDoubles;
        
        sliderData = {
            slideWidth: $slider.width(),
            currentSlide: id,
            scrollMax: Math.round($slider.width() * 2),
            maxSlides: maxSlides,
            dataSourceId: dataSourceId,
            preventDoubles: preventDoubles
        }
    }); 
    
    $(window).trigger("resize");

    $slider.scroll( function(e) {
        if (sliderData.preventDoubles) { 
            if (sliderData.currentSlide == 0) {
                $slider.scrollLeft(0);
                return; 
            }
            if (sliderData.currentSlide == sliderData.maxSlides) {
                $slider.scrollLeft(sliderData.slideWidth * 2);
                return; 
            }
            $slider.scrollLeft(sliderData.slideWidth);
            return;
        }
        let hScroll = $slider.scrollLeft();
        
        // handle first and last slides
        if (hScroll === sliderData.slideWidth) {
            if (sliderData.currentSlide == 0) { 
                sliderData.currentSlide += 1; 
            }
            if (sliderData.currentSlide == sliderData.maxSlides) { 
                sliderData.currentSlide -= 1
            }
            updateSliderButtons();
            setActiveSlide(1);
        }

        // Preload previous
        if (hScroll === 0 && sliderData.currentSlide > 0) {
            let advance = -1;
            if (sliderData.currentSlide == sliderData.maxSlides) advance = -2;
            sliderData.currentSlide += advance;
            updateSliderButtons();
            let prev = getSlideFor(sliderData.currentSlide-1);
            if (prev != "") {
                sliderData.preventDoubles = true;
                setTimeout(function(){ sliderData.preventDoubles = false; }, 200);
                $slider.prepend(prev);
                $slider.children().last().remove();
                $slider.scrollLeft(sliderData.slideWidth);
                setActiveSlide(1);
            } else {
                setActiveSlide(0);
            }
           return;
        }
        
        // Preload next
        if (hScroll === sliderData.scrollMax && sliderData.currentSlide < sliderData.maxSlides) {
        
            let advance = 1;
            if (sliderData.currentSlide == 0) advance = 2;
            sliderData.currentSlide += advance;
            updateSliderButtons();
            let next = getSlideFor(sliderData.currentSlide+1);
            if (next != "") {
                sliderData.preventDoubles = true;
                setTimeout(function(){ sliderData.preventDoubles = false; }, 200);
                $slider.children().first().remove();
                $slider.append(next);
                $slider.scrollLeft(sliderData.slideWidth);
                setActiveSlide(1);
            } else {
                setActiveSlide(2);
            }
            return;
         }
    });

    let lastVideoId = '';
    function setActiveSlide(id) {
        $slider.children().removeClass('active');
        $slider.children().eq(id).addClass('active');
        // terminate video
        if (lastVideoId != '') {  
          let iframe = $slider.find(`#${lastVideoId} iframe`)[0];
          iframe.src += '';
          lastVideoId = '';
        }
        let slide = $slider.children().eq(id);
        let iframes = slide.find('iframe');
        if (iframes.length) {
          lastVideoId = slide.attr('id');
        }
    }
    $("main.showcase .viewer").on('close', function() { 
      setTimeout(function() {
        clearSlides();
      }, 400);
    });
    
    function clearSlides() {
      lastVideoId = '';
      $slider.children().remove();
    }

    $('main.showcase .grid').on("click", "article", function (e) {
      if ($(e.target).hasClass("nft-url") == false ) {
        e.preventDefault();
      }
        e.stopPropagation();
        
        let dataSourceId = $('.filters-button-group .is-checked').attr('id');
        sliderData.dataSourceId = dataSourceId;
        sliderData.maxSlides = dataSources[dataSourceId].length-1;
        clearSlides();
        let itemId = parseInt($(this).attr("data-id"));
        sliderData.currentSlide = dataSources[dataSourceId].indexOf(itemId);
        $slider.append(getSlideFor(sliderData.currentSlide));
        sliderData.preventDoubles = true;
        window.setTimeout(function() {
            if (sliderData.currentSlide === 0) {
                $slider.append(getSlideFor(sliderData.currentSlide+1));
                $slider.append(getSlideFor(sliderData.currentSlide+2));
                setActiveSlide(0);
                sliderData.preventDoubles = true;
            } else if (sliderData.currentSlide == sliderData.maxSlides) {
                $slider.prepend(getSlideFor(sliderData.currentSlide-1));
                $slider.prepend(getSlideFor(sliderData.currentSlide-2));
                $slider.scrollLeft(sliderData.slideWidth * 2);
                setActiveSlide(2);
                sliderData.preventDoubles = true;
            } else {
                $slider.prepend(getSlideFor(sliderData.currentSlide-1));
                $slider.append(getSlideFor(sliderData.currentSlide+1));
                $slider.scrollLeft(sliderData.slideWidth);
                $slider.children().eq(1).addClass('active');
                setActiveSlide(1);
                sliderData.preventDoubles = true;
            }
            updateSliderButtons();
            setTimeout(function(){ sliderData.preventDoubles = false; }, 200);
        }, 100);
    });

    function updateSliderButtons() {
        if (sliderData.currentSlide === 0) {
            $('.viewer a.prev').addClass('disabled');
        } else {
            $('.viewer a.prev').removeClass('disabled');
        }

        if (sliderData.currentSlide === sliderData.maxSlides) {
            $('.viewer a.next').addClass('disabled');
        } else {
            $('.viewer a.next').removeClass('disabled');
        }
    }

    function getSlideFor(id) {
        if (id < 0 || id > sliderData.maxSlides) return "";
    
        let obj = dataObjs[dataSources[sliderData.dataSourceId][id]];
        let content = `<img src="/assets/content/${obj.image}.png" class="image-content" />`;
        if (obj.vimeoID != '') {
            content = `<iframe id="${obj.vimeoID}" class="video-content" src="https://player.vimeo.com/video/${obj.vimeoID}?dnt=1&color=b7b8b9&title=0&byline=0&portrait=0" width="${obj.width}" height="${obj.height}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`;
        }
        let collect = '';
        if (obj.nftURL) {
            collect = `<a class="nft-url" target="_blank" href="${obj.nftURL}"><span>COLLECT</span></a>`;
        }
        return `<div id="${id}-slide" class="slide cursor-close">
                    <div class="card cursor-close">
                        ${content}
                        <div class="overlay cursor-close">
                            <div class="title-container cursor-default">
                                <span class="title cursor-default">${obj.title}</span>
                            </div>
                            ${collect}
                        </div>
                    </div>
                </div>`;
    }

    function getGridItemFor(obj, id) {
        let url = `<a class="show-btn"><span class="show eye">VIEW</span></a>`;
        if (obj.nftURL != '') {
            url = `<a class="nft-url" target="_blank" href="${obj.nftURL}"><span class="collect">COLLECT</span></a>`;
        }
        let playIcon = '';
        if (obj.vimeoID != '') {
            playIcon = `<span class="play-icon"><svg width="100%" height="100%" viewBox="0 0 73 73"><path d="M72.886,36.189l-72.886,36.189l0,-72.378l72.886,36.189Z" style="fill:#000;"/></svg></span>`;
        }
        //let xPos = randomPositiveOrNegative(-5, 5);
        //  let yPos = randomPositiveOrNegative(-3, 3);
        //let transform = makePrefixed('transform', `translate(${xPos}vh, ${yPos}vw)`);
        return `<article data-id="${id}" class="${obj.tags}">
                    ${playIcon}
                    <div class="card cursor-zoom">
                        <img src="/assets/content/${obj.image}-mini.png" alt="${obj.title}" width="${obj.width}" height="${obj.height}" class="image-content" />
                        <div class="overlay">
                            <div class="title-container">
                                <span class=title>${obj.title}</span>
                                <span class=title>${obj.title}</span>
                                <span class=title>${obj.title}</span>
                                <span class=title>${obj.title}</span>
                            </div>
                            ${url}
                        </div>
                    </div>
                </article>`;
    }

    function makePrefixed(property, value) {
        return `-webkit-${property}: ${value};`+
        `-moz-${property}: ${value};`+
        `${property}: ${value};`;
    }

    function random (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      function randomPositiveOrNegative (min, max) {
        return random(min, max) * (Math.random() > 0.5 ? 1 : -1)
      }
});

const dataObjs = [
  {
    image: "Cherries-On-Top",
    title: "Cherries On Top",
    tags: "3d",
    vimeoID: "",
    width: 374,
    height: 500,
    nftURL: ""
  },

  {
    image: "White-Rose",
    title: "White Rose",
    tags: "3d",
    vimeoID: "",
    width: 374,
    height: 500,
    nftURL: ""
  },

  {
    image: "There-Is-No-Time-To-Kill-Today",
    title: "There Is No Time To Kill Today",
    tags: "3d",
    vimeoID: "",
    width: 374,
    height: 500,
    nftURL: ""
  },
  {
    image: "Acid-Typo-2",
    title: "Acid Typo - 2",
    tags: "3d",
    vimeoID: "",
    width: 500,
    height: 374,
    nftURL: ""
  },
  {
    image: "Oilstan",
    title: "The Ruins Of Oilstan",
    tags: "3d",
    vimeoID: "",
    width: 500,
    height: 374,
    nftURL: ""
  },
{
    image: "High-Tubs",
    title: "High Tubs",
    tags: "3d",
    vimeoID: "",
    width: 500,
    height: 374,
    nftURL: ""
  },
  {
    image: "Melting-Green-Brains",
    title: "Melting Green Brains",
    tags: "3d",
    vimeoID: "",
    width: 500,
    height: 374,
    nftURL: ""
  },

  {
    image: "Swimming-With-My-Bubble",
    title: "Swimming With A Bubble",
    tags: "3d",
    vimeoID: "",
    width: 500,
    height: 374,
    nftURL: ""
  },

  {
    image: "Anger-Hunger",
    title: "Anger Hunger",
    tags: "3d",
    vimeoID: "",
    width: 500,
    height: 374,
    nftURL: ""
  },
  {
    image: "Acid-Typo-1",
    title: "Acid Typo - 1",
    tags: "3d",
    vimeoID: "",
    width: 500,
    height: 374,
    nftURL: ""
  },
  {
    image: "Magic-Feeling-Lost",
    title: "Magic Feeling Lost",
    tags: "3d",
    vimeoID: "",
    width: 500,
    height: 374,
    nftURL: ""
  },
  {
    image: "Alien-Pro-Pool",
    title: "Alien Pro-Pool",
    tags: "3d",
    vimeoID: "",
    width: 500,
    height: 374,
    nftURL: ""
  },
  {
    image: "Layers-Of-perception",
    title: "Layers Of Perception",
    tags: "3d",
    vimeoID: "",
    width: 374,
    height: 500,
    nftURL: ""
  },
  {
    image: "The-Green-Mask",
    title: "The Green Mask",
    tags: "3d",
    vimeoID: "",
    width: 374,
    height: 500,
    nftURL: ""
  },
    {
    image: "Space-Island",
    title: "Space Island",
    tags: "3d",
    vimeoID: "",
    width: 374,
    height: 500,
    nftURL: ""
  },

  {
    image: "Sokkar",
    title: "Sokkar",
    tags: "3d",
    vimeoID: "",
    width: 500,
    height: 500,
    nftURL: ""
  },
  {
    image: "Glass-Dream",
    title: "Glass Dream",
    tags: "3d",
    vimeoID: "",
    width: 374,
    height: 500,
    nftURL: ""
  },
  {
    image: "Dangerous-Gardens",
    title: "Dangerous Gardens",
    tags: "3d",
    vimeoID: "",
    width: 374,
    height: 500,
    nftURL: ""
  },
  {
    image: "Far-Away-Letters-1",
    title: "Far Away Letters - 3",
    tags: "3d",
    vimeoID: "",
    width: 374,
    height: 500,
    nftURL: ""
  },

  {
    image: "Far-Away-Letters-3",
    title: "Far Away Letters - 2",
    tags: "3d",
    vimeoID: "",
    width: 500,
    height: 374,
    nftURL: ""
  },
  {
    image: "Far-Away-Letters-2",
    title: "Far Away Letters - 1",
    tags: "3d",
    vimeoID: "",
    width: 374,
    height: 500,
    nftURL: ""
  },

  {
    image: "Kleo",
    title: "Kleo",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },
  {
    image: "Wompland",
    title: "Wompland",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },
  // {
  //   image: "RTX6090",
  //   title: "RTX 6090",
  //   tags: "3d",
  //   vimeoID: "",
  //   width: 392,
  //   height: 500,
  //   nftURL: ""
  // },
  // {
  //   image: "Stackoza-Logotype",
  //   title: "Stackoza Logotype",
  //   tags: "3d",
  //   vimeoID: "",
  //   width: 392,
  //   height: 500,
  //   nftURL: ""
  // },
  {
    image: "Didi",
    title: "Didi",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },
  // {
  //   image: "AR-Eyewear-Computer-Of-The-Future",
  //   title: "AR-Eyewear Computer Of The Future",
  //   tags: "3d",
  //   vimeoID: "",
  //   width: 392,
  //   height: 500,
  //   nftURL: ""
  // },


  {
    image: "Luna",
    title: "Luna",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },
  {
    image: "Dancing-In-A-Lake-At-Night",
    title: "Dancing In A Lake At Night",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },
  {
    image: "Not-A-Monument",
    title: "Not A Monument",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },


  {
    image: "Alien-Egg-1",
    title: "Alien Pod - 1",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Alien-Egg-2",
    title: "Alien Pod - 2",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Alien-Egg-3",
    title: "Alien Pod - 3",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },

  {
    image: "Alien-Predator",
    title: "Alien Predator",
    tags: "3d",
    vimeoID: "",
    width: 500,
    height: 392,
    nftURL: ""
  },

  {
    image: "Extraterrestrial-Structure-9",
    title: "Extraterrestrial Structure - 1",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Extraterrestrial-Structure-8",
    title: "Extraterrestrial Structure - 2",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Extraterrestrial-Structure-7",
    title: "Extraterrestrial Structure - 3",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Extraterrestrial-Structure-6",
    title: "Extraterrestrial Structure - 4",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Extraterrestrial-Structure-5",
    title: "Extraterrestrial Structure - 5",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Extraterrestrial-Structure-4",
    title: "Extraterrestrial Structure - 6",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Extraterrestrial-Structure-3",
    title: "Extraterrestrial Structure - 7",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },
  // {
  //   image: "Extraterrestrial-Structure-2",
  //   title: "Extraterrestrial Structure - 8",
  //   tags: "3d",
  //   vimeoID: "",
  //   width: 392,
  //   height: 500,
  //   nftURL: ""
  // },{
  //   image: "Extraterrestrial-Structure-1",
  //   title: "Extraterrestrial Structure - 9",
  //   tags: "3d",
  //   vimeoID: "",
  //   width: 392,
  //   height: 500,
  //   nftURL: ""
  // },

  {
    image: "Korean-Grill",
    title: "Korean Grill",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Through-Space-Vortex",
    title: "Through Space Vortex",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Twisted-Dream-1",
    title: "Twisted Dream 1",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Twisted-Dream-2",
    title: "Twisted Dream 2",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },

  {
    image: "Molecules-Of-Pleasure-Red",
    title: "Molecules Of Pleasure - Red",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Molecules-Of-Pleasure-1",
    title: "Molecules Of Pleasure - 1",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Molecules-Of-Pleasure-2",
    title: "Molecules Of Pleasure - 2",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Molecules-Of-Pleasure-3",
    title: "Molecules Of Pleasure - 3",
    tags: "3d",
    vimeoID: "",
    width: 500,
    height: 392,
    nftURL: ""
  },{
    image: "Molecules-Of-Pleasure-4",
    title: "Molecules Of Pleasure - 4",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },

  {
    image: "Knots-1",
    title: "Knots - 1",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Knots-2",
    title: "Knots - 2",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Knots-3",
    title: "Knots - 3",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Knots-4",
    title: "Knots - 4",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },

  {
    image: "Foundation-In-Progress-1",
    title: "Foundation In Progress - 1",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Foundation-In-Progress-2",
    title: "Foundation In Progress - 2",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Is-There-Anybody-Out-There",
    title: "Is There Anybody Out There",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },


  {
    image: "Love-Kills",
    title: "Love Kills",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Trinity",
    title: "Trinity",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },
  // {
  //   image: "Dark-Matter-1",
  //   title: "Dark Matter",
  //   tags: "3d",
  //   vimeoID: "",
  //   width: 392,
  //   height: 500,
  //   nftURL: ""
  // },
  // {
  //   image: "Dark-Matter-2",
  //   title: "Dark Matter - 2",
  //   tags: "3d",
  //   vimeoID: "",
  //   width: 392,
  //   height: 500,
  //   nftURL: ""
  // },



  // {
  //   image: "New-Planet",
  //   title: "New Planet",
  //   tags: "3d",
  //   vimeoID: "",
  //   width: 392,
  //   height: 500,
  //   nftURL: ""
  // },
  {
    image: "What-Have-You-Done!",
    title: "What Have You Done!",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },
  // {
  //   image: "Silver-Future",
  //   title: "Silver Future",
  //   tags: "3d",
  //   vimeoID: "",
  //   width: 392,
  //   height: 500,
  //   nftURL: ""
  // },

  {
    image: "Flying-in-Eden",
    title: "Flying in Eden",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Happy-Monsters",
    title: "Happy Monsters",
    tags: "3d nft",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Good-Plan",
    title: "Good Plan",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Glass-Eyes",
    title: "Glass Eyes",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Gentle-Pressure",
    title: "Ascending Order",
    tags: "3d nft",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  },{
    image: "Getting-There-Together",
    title: "Getting There Together",
    tags: "3d",
    vimeoID: "",
    width: 392,
    height: 500,
    nftURL: ""
  }, 
  // {
  //   image: "Gold-Infection",
  //   title: "Gold Infection",
  //   tags: "3d nft",
  //   vimeoID: "",
  //   width: 392,
  //   height: 500,
  //   nftURL: ""
  // },{
  //   image: "Sending-Good-Vibes",
  //   title: "Sending Good Vibes",
  //   tags: "3d",
  //   vimeoID: "",
  //   width: 392,
  //   height: 500,
  //   nftURL: ""
  // }, {
  //   image: "Wild-Card",
  //   title: "Wild Card",
  //   tags: "3d",
  //   vimeoID: "",
  //   width: 392,
  //   height: 500,
  //   nftURL: ""
  // }, 
  // {
  //   image: "Cosmic-Born",
  //   title: "Cosmic Born",
  //   tags: "3d nft",
  //   vimeoID: "",
  //   width: 392,
  //   height: 500,
  //   nftURL: ""
  // },
  {
      image: "Eclipse",
      title: "Eclipse",
      tags: "3d",
      vimeoID: "",
      width: 392,
      height: 500,
      nftURL: ""
    },
    {
      image: "The-Transcender",
      title: "The Transcender",
      tags: "3d",
      vimeoID: "",
      width: 392,
      height: 500,
      nftURL: ""
    },
    {
      image: "The-Magic-Well",
      title: "The Magic Well",
      tags: "3d",
      vimeoID: "",
      width: 392,
      height: 500,
      nftURL: ""
    },
    {
      image: "The-Loop",
      title: "The Loop",
      tags: "3d",
      vimeoID: "595024406",
      width: 720,
      height: 720,
      nftURL: ""
    },
    {
      image: "Multiversal-Trip",
      title: "Multiversal Trip",
      tags: "3d",
      vimeoID: "595023535",
      width: 720,
      height: 720,
      nftURL: ""
    },
    // {
    //   image: "Peaks-and-Valleys",
    //   title: "Peaks and Valleys",
    //   tags: "3d",
    //   vimeoID: "",
    //   width: 392,
    //   height: 500,
    //   nftURL: ""
    // },
    {
      image: "Floating-Point-Planet",
      title: "Floating Point Planet",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "Gravitational-Waves-1",
      title: "Gravitational Waves 1 of 3",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "Gravitational-Waves-2",
      title: "Gravitational Waves 2 of 3",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "Gravitational-Waves-3",
      title: "Gravitational Waves 3 of 3",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    // {
    //   image: "Gold-Landscapes-1",
    //   title: "Gold Landscapes 1 of 4",
    //   tags: "3d",
    //   vimeoID: "",
    //   width: 392,
    //   height: 500,
    //   nftURL: ""
    // },
    // {
    //   image: "Gold-Landscapes-2",
    //   title: "Gold Landscapes 2 of 4",
    //   tags: "3d",
    //   vimeoID: "",
    //   width: 392,
    //   height: 500,
    //   nftURL: ""
    // },
    // {
    //   image: "Gold-Landscapes-3",
    //   title: "Gold Landscapes 3 of 4",
    //   tags: "3d",
    //   vimeoID: "",
    //   width: 392,
    //   height: 500,
    //   nftURL: ""
    // },
    // {
    //   image: "Gold-Landscapes-4",
    //   title: "Gold Landscapes 4 of 4",
    //   tags: "3d",
    //   vimeoID: "",
    //   width: 392,
    //   height: 500,
    //   nftURL: ""
    // },
    {
      image: "Diamonds-and-Chains-1",
      title: "Diamonds & Chains 1 of 2",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "Diamonds-and-Chains-2",
      title: "Diamonds & Chains 2 of 2",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    // {
    //   image: "Gold-Mine",
    //   title: "Gold Mine",
    //   tags: "3d",
    //   vimeoID: "",
    //   width: 500,
    //   height: 500,
    //   nftURL: ""
    // },
    {
      image: "Flight-Around-a-Universe-Instance",
      title: "Flight Around a Universe Instance",
      tags: "3d",
      vimeoID: "595013803",
      width: 720,
      height: 720,
      nftURL: ""
    },
    {
      image: "Bath-House",
      title: "Bath House",
      tags: "3d",
      vimeoID: "",
      width: 376,
      height: 500,
      nftURL: ""
    },
    {
      image: "Solar-Pool",
      title: "Solar Pool",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "45C-Reasons-to-Drink",
      title: "45°C Reasons to Drink",
      tags: "3d",
      vimeoID: "",
      width: 374,
      height: 500,
      nftURL: ""
    },
    {
      image: "Otherworld-Site-of-Entry",
      title: "Otherworld Site of Entry",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    // {
    //   image: "Interconnected-Skies",
    //   title: "Interconnected Skies",
    //   tags: "3d",
    //   vimeoID: "",
    //   width: 500,
    //   height: 500,
    //   nftURL: ""
    // },
    {
      image: "Multiversal-Trip-1",
      title: "Multiversal Trip 1 of 2",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "Multiversal-Trip-2",
      title: "Multiversal Trip 2 of 2",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "The-Loop",
      title: "The L♾p",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    // {
    //   image: "Keyless-Box",
    //   title: "Keyless Box",
    //   tags: "3d",
    //   vimeoID: "",
    //   width: 500,
    //   height: 500,
    //   nftURL: ""
    // },
    // {
    //   image: "Welcome-to-the-Chain",
    //   title: "Welcome to the Chain",
    //   tags: "3d",
    //   vimeoID: "",
    //   width: 375,
    //   height: 500,
    //   nftURL: ""
    // },
    // {
    //   image: "The-Incubation-which-Preceded-the-Population-of-a-Futureverse",
    //   title: "The Incubation which Preceded the Population of a Futureverse",
    //   tags: "3d procreate",
    //   vimeoID: "",
    //   width: 500,
    //   height: 500,
    //   nftURL: ""
    // },
    {
      image: "Valley-of-the-Rising-Stellar",
      title: "Valley of the Rising Stellar",
      tags: "3d procreate",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    // {
    //   image: "Where-the-Mice-Went",
    //   title: "Where the Mice Went",
    //   tags: "3d procreate",
    //   vimeoID: "",
    //   width: 500,
    //   height: 500,
    //   nftURL: ""
    // },
    {
      image: "Somewhere-Feeling-Happy",
      title: "Somewhere Feeling Happy",
      tags: "3d procreate",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "Red-Jasmines",
      title: "Red Jasmines",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "Face-It",
      title: "Black Desert",
      tags: "3d procreate",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "Lines-to-Nowhere",
      title: "Lines to Nowhere",
      tags: "3d procreate",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "Give-Me-Some-Good-Rays",
      title: "Give Me Some Good Rays",
      tags: "3d procreate",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    // {
    //   image: "Declining-Orbits",
    //   title: "Declining Orbits",
    //   tags: "3d",
    //   vimeoID: "",
    //   width: 500,
    //   height: 500,
    //   nftURL: ""
    // },
    {
      image: "The-Floating-Busts-of-an-Ancient-Museum-Built-at-a-Time-Once-Called-Modern",
      title: "The Floating Busts of an Ancient Museum Built at a Time Once Called Modern",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    // {
    //   image: "Tide-Caused-by-the-Approaching-Planet-Over-a-Scarlet-Rose",
    //   title: "Tide Caused by the Approaching Planet Over a Scarlet Rose",
    //   tags: "3d",
    //   vimeoID: "",
    //   width: 500,
    //   height: 500,
    //   nftURL: ""
    // },
    // {
    //   image: "Catching-a-Star-a-Moment-Before-Cosmic-Competition",
    //   title: "Catching a Star a Moment Before Cosmic Competition",
    //   tags: "3d",
    //   vimeoID: "",
    //   width: 500,
    //   height: 500,
    //   nftURL: ""
    // },
    // {
    //   image: "Love-Star",
    //   title: "Love Star",
    //   tags: "3d",
    //   vimeoID: "",
    //   width: 500,
    //   height: 500,
    //   nftURL: ""
    // },
    // {
    //   image: "Planet-Rainbow-Everywhere",
    //   title: "Planet Rainbow Everywhere",
    //   tags: "3d",
    //   vimeoID: "",
    //   width: 500,
    //   height: 500,
    //   nftURL: ""
    // },
    // {
    //   image: "Planet-Pure-Gold",
    //   title: "Planet Pure Gold",
    //   tags: "3d",
    //   vimeoID: "",
    //   width: 500,
    //   height: 500,
    //   nftURL: ""
    // },
    // {
    //   image: "Planet-Holo",
    //   title: "Planet Holo",
    //   tags: "3d",
    //   vimeoID: "",
    //   width: 500,
    //   height: 500,
    //   nftURL: ""
    // },
    // {
    //   image: "Stairway-to-Vega",
    //   title: "Stairway to Vega",
    //   tags: "3d",
    //   vimeoID: "",
    //   width: 500,
    //   height: 500,
    //   nftURL: ""
    // },
    // {
    //   image: "8-Bit-Celestial",
    //   title: "8-Bit Celestial",
    //   tags: "3d",
    //   vimeoID: "",
    //   width: 374,
    //   height: 500,
    //   nftURL: ""
    // },
    {
      image: "Class-Glass",
      title: "Class Glass",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "Deep-Space",
      title: "Deep Space",
      tags: "2d",
      vimeoID: "",
      width: 375,
      height: 500,
      nftURL: ""
    },
    {
      image: "Nefertiti-1",
      title: "Nefertiti - 1 of 2",
      tags: "2d",
      vimeoID: "",
      width: 395,
      height: 500,
      nftURL: ""
    },
    {
      image: "Nefertiti-2",
      title: "Nefertiti - 2 of 2",
      tags: "2d",
      vimeoID: "",
      width: 400,
      height: 500,
      nftURL: ""
    },
    {
      image: "Mountains-on-a-Distant-Planet-1",
      title: "Mountains on a Distant Planet - 1 of 2",
      tags: "2d",
      vimeoID: "",
      width: 397,
      height: 500,
      nftURL: ""
    },
    {
      image: "Mountains-on-a-Distant-Planet-2",
      title: "Mountains on a Distant Planet - 2 of 2",
      tags: "2d",
      vimeoID: "",
      width: 400,
      height: 500,
      nftURL: ""
    },
    {
      image: "Other-Universes-1",
      title: "Other Universes - 1 of 4",
      tags: "2d",
      vimeoID: "",
      width: 330,
      height: 500,
      nftURL: ""
    },
    {
      image: "Other-Universes-2",
      title: "Other Universes - 2 of 4",
      tags: "2d",
      vimeoID: "",
      width: 331,
      height: 500,
      nftURL: ""
    },
    {
      image: "Other-Universes-3",
      title: "Other Universes - 3 of 4",
      tags: "2d",
      vimeoID: "",
      width: 327,
      height: 500,
      nftURL: ""
    },
    {
      image: "Other-Universes-4",
      title: "Other Universes - 4 of 4",
      tags: "2d",
      vimeoID: "",
      width: 329,
      height: 500,
      nftURL: ""
    },
    {
      image: "Spring-Bubbles",
      title: "Spring Bubbles 1 of 2",
      tags: "2d",
      vimeoID: "",
      width: 331,
      height: 500,
      nftURL: ""
    },
    {
      image: "Spring-Bubbles-2",
      title: "Spring Bubbles 2 of 2",
      tags: "2d",
      vimeoID: "",
      width: 332,
      height: 500,
      nftURL: ""
    },
    // {
    //   image: "Summer-Garden",
    //   title: "Summer Garden",
    //   tags: "2d procreate",
    //   vimeoID: "",
    //   width: 329,
    //   height: 500,
    //   nftURL: ""
    // },

    {
      image: "Ultraviolet",
      title: "Ultraviolet",
      tags: "2d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "Golden-Gate",
      title: "Golden Gate",
      tags: "2d",
      vimeoID: "",
      width: 324,
      height: 500,
      nftURL: ""
    },
    {
      image: "Ballz-and-Holez",
      title: "Ballz & Holez",
      tags: "2d",
      vimeoID: "",
      width: 366,
      height: 500,
      nftURL: ""
    },
    {
      image: "Time-Lines",
      title: "Time Lines",
      tags: "2d code",
      vimeoID: "",
      width: 376,
      height: 500,
      nftURL: ""
    },
    {
      image: "Sonic-Curtain",
      title: "Sonic Curtain",
      tags: "2d code",
      vimeoID: "",
      width: 500,
      height: 281,
      nftURL: ""
    },
    {
      image: "Shiny-Celestial-Dust",
      title: "Shiny Celestial Dust",
      tags: "2d code",
      vimeoID: "",
      width: 285,
      height: 500,
      nftURL: ""
    },
    {
      image: "Data-Waves",
      title: "Data Waves",
      tags: "2d code",
      vimeoID: "",
      width: 500,
      height: 395,
      nftURL: ""
    },
    // {
    //   image: "They-are-Watching",
    //   title: "THEY’RE WATCHING",
    //   tags: "2d procreate",
    //   vimeoID: "",
    //   width: 374,
    //   height: 500,
    //   nftURL: ""
    // },
    {
      image: "Somewhere-on-Venus",
      title: "Somewhere on Venus",
      tags: "code 2d animation",
      vimeoID: "202356093",
      width: 720,
      height: 720,
      nftURL: ""
    },
    {
      image: "Data-Channels",
      title: "Data Channels",
      tags: "code 2d animation",
      vimeoID: "201782970",
      width: 720,
      height: 720,
      nftURL: ""
    },
    {
      image: "Drop",
      title: "Drop",
      tags: "code 2d animation",
      vimeoID: "201779758",
      width: 720,
      height: 720,
      nftURL: ""
    }
  ]