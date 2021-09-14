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
    // To ScrollAnimation
    function scrollOpacity( elem, opacityMin, targetScroll, scroll ) {
        const opacity = (1 - (opacityMin * ( scroll / targetScroll)));
        if ( opacity >= opacityMin || elem.currentOpacity  > opacityMin ) {
            elem.currentOpacity = Math.max(opacityMin, opacity);
            elem.style.opacity = `${elem.currentOpacity}`;
        }
    }


    (function(){
      scrollOpacity(title, 0.2, 100, window.scrollY);
      setTimeout(arguments.callee, 1000);
    })();
  
    // ScrollAnimation User
    window.addEventListener('scroll', throttle(windowScroll, 200));  
    function windowScroll() {
        let scroll = window.scrollY;
        scrollTranslateXYZ(s3, -200, 500, 5000, 3, scroll);
        scrollTranslateXYZ(s4, 30, -300, 5000, 4, scroll);
        // text
        scrollOpacity(title, 0.2, 100, scroll);
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
        showTime('.artworks-button', 100);
        showTime('.filter-buttons', 2000);
        showTime('.bg-balls', 1500);
        showTime('.end', 3000);
        setTimeout(function () { showFilter(filter); }, 100);
        $("html, body").animate({ scrollTop: 0 }, 500, function() {
          windowScroll();
        });
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
        if ( filter == "nft" || (currentFilter == "nft" && filter != "nft" ) ) {
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

            if ($grid.data('masonry') != undefined) {
                $grid.masonry('destroy');
            }
            
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
            
            $grid.masonry({
                itemSelector: 'article'
            });
            $(window).trigger("resize");
            updateDuration();
            $end.addClass('showing');
            $grid.addClass('showing');
          }, delay);
    }

    function getCryptoMessage() {
      return `
      <div class="message">
        <img src="/assets/images/FirstDrop.png" width="800" height="800" />
        <span class="text">FIRST DROP<span><img class="spinner-cw" src="/assets/images/soon-hollow.svg"/></span></span>
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
        const id = sliderData.currentSlide;
        const dataSourceId = sliderData.dataSourceId;
        const maxSlides = sliderData.maxSlides;
        const preventDoubles = sliderData.preventDoubles;
        
        sliderData = {
            slideWidth: $slider.width(),
            currentSlide: id,
            scrollMax: $slider.width() * 2,
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
                setActiveSlide(0);
                return; 
            }
            if (sliderData.currentSlide == sliderData.maxSlides) {
                $slider.scrollLeft(sliderData.slideWidth * 2); 
                setActiveSlide(2);
                return; 
            }
            $slider.scrollLeft(sliderData.slideWidth);
            setActiveSlide(1);
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
            }  else {
                setActiveSlide(2);
            }
            return;
         }
    });

    function setActiveSlide(id) {
        $slider.children().removeClass('active');
        $slider.children().eq(id).addClass('active');
    }

    $('main.showcase .grid').on("click", "article", function (e) {
        e.preventDefault();
        e.stopPropagation();
        let dataSourceId = $('.filters-button-group .is-checked').attr('id');
        sliderData.dataSourceId = dataSourceId;
        sliderData.maxSlides = dataSources[dataSourceId].length-1;

        $slider.children().remove();
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
            content = `<iframe id="${obj.vimeoID}" class="video-content" src="https://player.vimeo.com/video/${obj.vimeoID}?color=b7b8b9&title=0&byline=0&portrait=0" width="${obj.width}" height="${obj.height}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`;
        }
        let collect = '';
        if (obj.nftURL) {
            collect = `<a class="nft-url" href="${obj.nftURL}"><span>COLLECT</span></a>`;
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
        let url = `<a class="nft-url"><span class="show">SHOW</span></a>`;
        if (obj.nftURL != '') {
            url = `<a class="nft-url" href="${obj.nftURL}"><span class="collect">COLLECT</span></a>`;
        }
        let playIcon = '';
        if (obj.vimeoID != '') {
            playIcon = `<span class="play-icon"><svg width="100%" height="100%" viewBox="0 0 73 73"><path d="M72.886,36.189l-72.886,36.189l0,-72.378l72.886,36.189Z" style="fill:#fffC;"/></svg></span>`;
        }
        //let xPos = randomPositiveOrNegative(-5, 5);
        //  let yPos = randomPositiveOrNegative(-3, 3);
        //let transform = makePrefixed('transform', `translate(${xPos}vh, ${yPos}vw)`);
        return `<article data-id="${id}" class="${obj.tags}">
                    <div class="card cursor-zoom">
                        ${playIcon}
                        <!--svg class="image-content placeholder" viewBox="0 0 ${obj.width} ${obj.height}"><rect x="0" y="0" width="${obj.width}" height="${obj.height}" style="fill:#0f7;"/></svg-->
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
    {
      image: "Peaks-and-Valleys",
      title: "Peaks and Valleys",
      tags: "3d",
      vimeoID: "",
      width: 392,
      height: 500,
      nftURL: ""
    },
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
    {
      image: "Gold-Landscapes-1",
      title: "Gold Landscapes 1 of 4",
      tags: "3d",
      vimeoID: "",
      width: 392,
      height: 500,
      nftURL: ""
    },
    {
      image: "Gold-Landscapes-2",
      title: "Gold Landscapes 2 of 4",
      tags: "3d",
      vimeoID: "",
      width: 392,
      height: 500,
      nftURL: ""
    },
    {
      image: "Gold-Landscapes-3",
      title: "Gold Landscapes 3 of 4",
      tags: "3d",
      vimeoID: "",
      width: 392,
      height: 500,
      nftURL: ""
    },
    {
      image: "Gold-Landscapes-4",
      title: "Gold Landscapes 4 of 4",
      tags: "3d",
      vimeoID: "",
      width: 392,
      height: 500,
      nftURL: ""
    },
    {
      image: "Diamonds-and-Chains-1",
      title: "Diamonds & Chains 2 of 2",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "Diamonds-and-Chains-2",
      title: "Diamonds & Chains 1 of 2",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "Gold-Mine",
      title: "Gold Mine",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
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
    {
      image: "Interconnected-Skies",
      title: "Interconnected Skies",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
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
    {
      image: "Keyless-Box",
      title: "Keyless Box",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "Welcome-to-the-Chain",
      title: "Welcome to the Chain",
      tags: "3d",
      vimeoID: "",
      width: 375,
      height: 500,
      nftURL: ""
    },
    {
      image: "The-Incubation-which-Preceded-the-Population-of-a-Futureverse",
      title: "The Incubation which Preceded the Population of a Futureverse",
      tags: "3d procreate",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "Valley-of-the-Rising-Stellar",
      title: "Valley of the Rising Stellar",
      tags: "3d procreate",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "Where-the-Mice-Went",
      title: "Where the Mice Went",
      tags: "3d procreate",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
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
      title: "Face It",
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
    {
      image: "Declining-Orbits",
      title: "Declining Orbits",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "The-Floating-Busts-of-an-Ancient-Museum-Built-at-a-Time-Once-Called-Modern",
      title: "The Floating Busts of an Ancient Museum Built at a Time Once Called Modern",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "Tide-Caused-by-the-Approaching-Planet-Over-a-Scarlet-Rose",
      title: "Tide Caused by the Approaching Planet Over a Scarlet Rose",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "Catching-a-Star-a-Moment-Before-Cosmic-Competition",
      title: "Catching a Star a Moment Before Cosmic Competition",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "Love-Star",
      title: "Love Star",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "Planet-Rainbow-Everywhere",
      title: "Planet Rainbow Everywhere",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "Planet-Pure-Gold",
      title: "Planet Pure Gold",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "Planet-Holo",
      title: "Planet Holo",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "Stairway-to-Vega",
      title: "Stairway to Vega",
      tags: "3d",
      vimeoID: "",
      width: 500,
      height: 500,
      nftURL: ""
    },
    {
      image: "8-Bit-Celestial",
      title: "8-Bit Celestial",
      tags: "3d",
      vimeoID: "",
      width: 374,
      height: 500,
      nftURL: ""
    },
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
    {
      image: "Summer-Garden",
      title: "Summer Garden",
      tags: "2d procreate",
      vimeoID: "",
      width: 329,
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
      image: "Shiny-Celestial-Dust",
      title: "Shiny Celestial Dust",
      tags: "2d code",
      vimeoID: "",
      width: 500,
      height: 285,
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
      image: "Data-Waves",
      title: "Data Waves",
      tags: "2d code",
      vimeoID: "",
      width: 500,
      height: 395,
      nftURL: ""
    },
    {
      image: "They-are-Watching",
      title: "THEY’RE WATCHING",
      tags: "2d procreate",
      vimeoID: "",
      width: 374,
      height: 500,
      nftURL: ""
    },
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