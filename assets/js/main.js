(function ($) {
    "use strict";
    var windowOn = $(window);

    /* Windows Load */
    $(window).on('load', function () {
        wowAnimation();
    });


    // rtl setting start
    function rs_rtl_settings() {
        $('#rs-dir-toggler').on("change", function () {
            toggle_rtl();
            location.reload(true);
        });

        function rs_set_scheme(rs_dir) {
            localStorage.setItem('rs_dir', rs_dir);
            document.documentElement.setAttribute("dir", rs_dir);

            if (rs_dir === 'rtl') {
                $('body').addClass('rtl');
            } else {
                $('body').removeClass('rtl');
            }

            var list = $("[href='assets/vendor/css/bootstrap.min.css']");
            $(list).attr("href", rs_dir === 'rtl' ? "assets/vendor/css/bootstrap.rtl.min.css" : "assets/vendor/css/bootstrap.min.css");
        }

        function toggle_rtl() {
            if (localStorage.getItem('rs_dir') === 'rtl') {
                rs_set_scheme('ltr'); /* change ltr to rtl */
            } else {
                rs_set_scheme('rtl');
            }
        }

        function rs_init_dir() {
            var savedDir = localStorage.getItem('rs_dir');
            rs_set_scheme(savedDir || 'ltr'); /* change ltr to rtl */
            document.getElementById('rs-dir-toggler').checked = savedDir === 'rtl';
        }

        rs_init_dir();
    }

    /* Append settings HTML  */
    rs_settings_append(true); /* if you want to enable dark mode, send "true" */

    /* Event listeners  */
    $(".rs-theme-settings-open-btn").on("click", function () {
        $(".rs-theme-settings-area").toggleClass("settings-opened");
    });

    /* Initialize RTL settings if the element is present  */
    if ($("#rs-dir-toggler").length > 0) {
        rs_rtl_settings();
    }

    /* Initialize dark/light mode toggler if the element is present  */
    if ($("#rs-theme-toggler").length > 0) {
        rs_theme_toggler();
    }

    var rs_rtl = localStorage.getItem('rs_dir');
    let rtl_setting = rs_rtl === 'rtl' ? true : false;


    /* settings append in body Js */
    function rs_settings_append($x) {
        var settings = $('body');
        let dark;
        $x === true ? dark = 'd-block' : dark = 'd-none';
        /* no need switcher then add 'd-none' */
        var settings_html = `<div class="rs-theme-settings-area">
		<div class="rs-theme-wrapper">
		<div class="rs-theme-header text-center">
		   <h4 class="rs-theme-header-title">Color Settings</h4>
		</div>

		<!-- THEME TOGGLER -->
		<div class="rs-theme-toggle mb-20 ${dark}">
		   <label class="rs-theme-toggle-main" for="rs-theme-toggler">
		   <span class="rs-theme-toggle-dark"><i class="fa-light fa-moon"></i> Dark </span>
				 <input type="checkbox" id="rs-theme-toggler">
				 <i class="rs-theme-toggle-slide"></i>
				 <span class="rs-theme-toggle-light active"><i class="fa-light fa-sun-bright"></i> Light</span>
		   </label>
		</div>

		<!-- COLOR THEME OPTIONS -->
		<div class="rs-theme-colors mb-20">
		   <div class="rs-theme-header text-center mb-15">
			  <h4 class="rs-theme-header-title" style="font-size: 14px; margin: 0;">Color Theme</h4>
		   </div>
		   <div class="rs-theme-colors-wrapper" style="display: flex; gap: 10px; justify-content: center;">
			  <button class="rs-theme-color-btn active" data-theme="default" style="width: 40px; height: 40px; border-radius: 50%; background: #5777FF; border: 3px solid #fff; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" title="Default"></button>
			  <button class="rs-theme-color-btn" data-theme="green" style="width: 40px; height: 40px; border-radius: 50%; background: #008D84; border: 3px solid #fff; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" title="Green"></button>
			  <button class="rs-theme-color-btn" data-theme="orange" style="width: 40px; height: 40px; border-radius: 50%; background: #FF7140; border: 3px solid #fff; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" title="Orange"></button>
		   </div>
		</div>

        <div class="rs-theme-header text-center">
		   <h4 class="rs-theme-header-title">Template Settings</h4>
		</div>

		<!--  RTL SETTINGS  mb-20 -->
		<div class="rs-theme-dir">
		   <label class="rs-theme-dir-main" for="rs-dir-toggler">
			  <span class="rs-theme-dir-rtl"> RTL</span>
				 <input type="checkbox" id="rs-dir-toggler">
				 <i class="rs-theme-dir-slide"></i>
			  <span class="rs-theme-dir-ltr active"> LTR</span>
		   </label>
		</div>

		<div class="rs-theme-settings">
		   <div class="rs-theme-settings-wrapper">
			  <div class="rs-theme-settings-open">
				 <button class="rs-theme-settings-open-btn">
					<span class="rs-theme-settings-gear">
					   <i class="fa-light fa-gear"></i>
					</span>
					<span class="rs-theme-settings-close">
					   <i class="fa-regular fa-xmark"></i>
					</span>
				 </button>
			  </div>
		   </div>
		</div>
	 </div>
		 </div>`;
        settings.append(settings_html);
        
        // Initialize color theme switcher after a small delay to ensure DOM is ready
        setTimeout(function() {
            // Color theme switcher functionality
            $('.rs-theme-color-btn').off('click').on('click', function() {
                var theme = $(this).data('theme');
                $('.rs-theme-color-btn').removeClass('active');
                $(this).addClass('active');
                
                // Remove existing theme classes
                $('body').removeClass('theme-green theme-orange');
                
                // Apply selected theme
                if (theme === 'green') {
                    $('body').addClass('theme-green');
                    localStorage.setItem('rs_color_theme', 'green');
                } else if (theme === 'orange') {
                    $('body').addClass('theme-orange');
                    localStorage.setItem('rs_color_theme', 'orange');
                } else {
                    localStorage.setItem('rs_color_theme', 'default');
                }
            });
            
            // Load saved color theme
            var savedTheme = localStorage.getItem('rs_color_theme');
            if (savedTheme && savedTheme !== 'default') {
                $('.rs-theme-color-btn[data-theme="' + savedTheme + '"]').trigger('click');
            }
        }, 100);
    }
    // rtl setting end

    /* Preloader activation */
    $(window).on('load', function (event) {
        $("#pre-load").delay(600).fadeOut(500);
        $(".pre-loader").delay(600).fadeOut(500);
    });

    /* footer year */
    var yearElement = document.getElementById("year");
    if (yearElement) { yearElement.innerHTML = new Date().getFullYear(); }
    /* footer year */

    /* Wow Active */
    function wowAnimation() {
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: false,
            live: true
        });
        wow.init();
    }

    /*======================================
Sidebar Toggle
========================================*/
    $(".offcanvas-close,.offcanvas-overlay").on("click", function () {
        $(".offcanvas-area").removeClass("info-open");
        $(".offcanvas-overlay").removeClass("overlay-open");
    });
    $(".sidebar-toggle").on("click", function () {
        $(".offcanvas-area").addClass("info-open");
        $(".offcanvas-overlay").addClass("overlay-open");
    });

    /* Body overlay Js */
    $(".body-overlay").on("click", function () {
        $(".offcanvas-area").removeClass("opened");
        $(".body-overlay").removeClass("opened");
    });

    /* Sticky Header Js */

    $(window).on("scroll", function () {
        if ($(this).scrollTop() > 250) {
            $("#header-sticky").addClass("rs-sticky");
        } else {
            $("#header-sticky").removeClass("rs-sticky");
        }
    });

    /* Data Css js */
    $("[data-background").each(function () {
        $(this).css(
            "background-image",
            "url( " + $(this).attr("data-background") + "  )"
        );
    });

    $("[data-width]").each(function () {
        $(this).css("width", $(this).attr("data-width"));
    });

    $("[data-bg-color]").each(function () {
        $(this).css("background-color", $(this).attr("data-bg-color"));
    });

    /* MagnificPopup image view */
    $(".popup-image").magnificPopup({
        type: "image",
        gallery: {
            enabled: true,
        },
    });

    /* jarallax js */
    jarallax(document.querySelectorAll('.jarallax'), {
        speed: 0.4,
    });

    /* MagnificPopup video view */
    $(".popup-video").magnificPopup({
        type: "iframe",
    });

    /* Nice Select Js */
    $("select").niceSelect();

    /* PureCounter Js */
    new PureCounter();
    new PureCounter({
        filesizing: true,
        selector: ".filesizecount",
        pulse: 2,
    });

    /*  category slider active 01 */
    var commonCarousel = new Swiper(".category-slider-active", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        roundLengths: true,
        speed: 1000,
        autoplay: {
            delay: 3000,
        },
        pagination: {
            el: ".rs-swiper-dot",
            clickable: true,
        },
        breakpoints: {
            1400: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 5,
            },
            992: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });

    /*  category slider active 02 */
    var commonCarousel = new Swiper(".category-slider-active-02", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        roundLengths: true,
        speed: 1000,
        autoplay: {
            delay: 3000,
        },
        pagination: {
            el: ".rs-swiper-dot",
            clickable: true,
        },
        breakpoints: {
            1400: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 2,
            },
        },
    });

    $(document).ready(function () {
        /* Button scroll up js */
        var progressPath = document.querySelector(".backtotop-wrap path");
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = "none";
        progressPath.style.strokeDasharray = pathLength + " " + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = "stroke-dashoffset 10ms linear";
        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength) / height;
            progressPath.style.strokeDashoffset = progress;
        };
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 150;
        var duration = 550;
        jQuery(window).on("scroll", function () {
            if (jQuery(this).scrollTop() > offset) {
                jQuery(".backtotop-wrap").addClass("active-progress");
            } else {
                jQuery(".backtotop-wrap").removeClass("active-progress");
            }
        });
        jQuery(".backtotop-wrap").on("click", function (event) {
            event.preventDefault();
            jQuery("html, body").animate({
                scrollTop: 0
            }, parseInt(duration, 10)); /* Fixing parseInt call with radix parameter */
            return false;
        });


        // Menu Active
        const currentPath = window.location.pathname.split('/').pop();
        const menuLinks = document.querySelectorAll('.multipage-menu a');
        menuLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
                link.classList.add('active');
                let parentLi = link.parentElement;
                while (parentLi) {
                    if (parentLi.tagName === 'LI') {
                        parentLi.classList.add('active');
                    }
                    parentLi = parentLi.parentElement;
                }
            }
        });


        /* Mobile Menu Js */
        $("#mobile-menu").meanmenu({
            meanMenuContainer: ".mobile-menu",
            meanScreenWidth: "1199",
            meanExpand: ['<i class="fa-regular fa-plus"></i>'],
        });

        /* radial-progress activation */
        $(window).scroll(function () {
            $('.radial-progress').each(function (i) {
                var bottom_of_object = $(this).offset().top + $(this).outerHeight();
                var bottom_of_window = $(window).scrollTop() + $(window).height();

                if (bottom_of_window > bottom_of_object) {
                    $(this).easyPieChart({
                        lineWidth: 10,
                        scaleLength: 0,
                        rotate: 0,
                        trackColor: false,
                        lineCap: 'round',
                        size: 180,
                        onStep: function (from, to, percent) {
                            $(this.el).find('.count').text(Math.round(percent));
                        }
                    });
                }
            });
        });
        $(window).scroll();

        /*======================================
          One Page overlay close
        ========================================*/
        function scrollNav() {
            $(".onepage-menu li a").on('click', function () {
                $(".onepage-menu li a.active").removeClass("active");
                $(this).addClass("active");
                $(".offcanvas-area").removeClass("info-open");
                $(".offcanvas-overlay").removeClass("overlay-open");
            });
        }
        scrollNav();

        /* countdown activation start */
        function makeTimer(endTime, countdownElementId) {
            var now = new Date();
            now = (Date.parse(now) / 1000);
            var timeLeft = endTime - now;
            if (timeLeft <= 0) {
                clearInterval(timerInterval); // Stop the timer
                $("#" + countdownElementId + " [data-unit='days']").html("00<span>Days</span>");
                $("#" + countdownElementId + " [data-unit='hours']").html("00<span>Hours</span>");
                $("#" + countdownElementId + " [data-unit='minutes']").html("00<span>Minutes</span>");
                $("#" + countdownElementId + " [data-unit='seconds']").html("00<span>Seconds</span>");
                return;
            }
            var days = Math.floor(timeLeft / 86400);
            var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
            var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
            var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
            if (hours < "10") { hours = "0" + hours; }
            if (minutes < "10") { minutes = "0" + minutes; }
            if (seconds < "10") { seconds = "0" + seconds; }
            $("#" + countdownElementId + " [data-unit='days']").html(days + "<span>Days</span>");
            $("#" + countdownElementId + " [data-unit='hours']").html(hours + "<span>Hours</span>");
            $("#" + countdownElementId + " [data-unit='minutes']").html(minutes + "<span>Minutes</span>");
            $("#" + countdownElementId + " [data-unit='seconds']").html(seconds + "<span>Seconds</span>");
        }
        var endTime = new Date("5 August 2025 14:00:00 GMT+06:00");
        endTime = (Date.parse(endTime) / 1000);
        var timerInterval = setInterval(function () {
            makeTimer(endTime, "countdown1");
            makeTimer(endTime, "countdown2");
            makeTimer(endTime, "countdown3");
            makeTimer(endTime, "countdown4");
            makeTimer(endTime, "countdown5");
        }, 1000);
    });
    /* countdown activation end */

    /* pralax image */
    if ($('.prallax-parent').length) {
        $(".prallax-parent").each(function () {
            var prallaxParent = $(this).get(0);
            var parallaxInstance = new Parallax(prallaxParent);
        });
    }

    /* Brand Active 01  start*/
    var brandActivation = new Swiper(".brand_active_one", {
        slidesPerView: 5,
        spaceBetween: 30,
        loop: true,
        roundLengths: true,
        autoplay: true,
        speed: 1000,
        breakpoints: {
            1400: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 5,
            },
            992: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });
    /* Brand Active 01 end */

    /* Brand Active 02  start*/
    var brandActivation = new Swiper(".brand_active_two", {
        slidesPerView: 5,
        spaceBetween: 30,
        loop: true,
        roundLengths: true,
        autoplay: true,
        speed: 1000,
        breakpoints: {
            1400: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 5,
            },
            992: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 2,
            },
            450: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });
    /* Brand Active 02 end */

    /* Brand Active 03  start*/
    var brandActivation = new Swiper(".brand_active_three", {
        slidesPerView: 5,
        spaceBetween: 30,
        loop: true,
        roundLengths: true,
        autoplay: true,
        speed: 1000,
        breakpoints: {
            1400: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 5,
            },
            992: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 2,
            },
            450: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });
    /* Brand Active 03 end */

    /* testimonial Active 01  start*/
    var testimonialactiveone = new Swiper(".testimonial_active_one", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        roundLengths: true,
        autoplay: true,
        speed: 1200,
        breakpoints: {
            1400: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
        //slider dots
        pagination: {
            el: '.rs-pagination',
            clickable: true,
        },
    });
    /* testimonial Active 01  end*/

    /* testimonial Active 02  start*/
    var testimonialSlider = new Swiper('.testimonial_active_two', {
        slidesPerView: 1,
        spaceBetween: 30,
        observeParents: true,
        observer: true,
        loop: true,
        speed: 1200,
        autoplay: {
            delay: 9500,
        },
        //slider dots
        pagination: {
            el: '.rs-pagination',
            clickable: true,
        },
        breakpoints: {
            '1200': {
                slidesPerView: 1,
            },
            '992': {
                slidesPerView: 1,
            },
            '768': {
                slidesPerView: 1,
            },
            '576': {
                slidesPerView: 1,
            },
        },
    });
    /* testimonial Active 02  end*/



    /* blog Active 01  start*/
    var blogslider = new Swiper(".blog_active_one", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        roundLengths: true,
        autoplay: true,
        speed: 1200,
        breakpoints: {
            1400: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
        //slider dots
        pagination: {
            el: '.rs-blog-pagination',
            clickable: true,
        },
    });

    /* portfolio Active 01  start*/
    var blogactiveone = new Swiper(".portfolio_active_one", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        roundLengths: true,
        autoplay: true,
        speed: 1200,
        breakpoints: {
            1400: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
        //scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
        },
    });

    /* portfolio Active 02  start*/
    var blogactiveone = new Swiper(".portfolio_active_two", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        roundLengths: true,
        autoplay: true,
        speed: 1200,
        breakpoints: {
            1400: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
        //slider dots
        pagination: {
            el: '.rs-pagination',
            clickable: true,
        },
    });

    // Portfolio Details active 01 start
    var PortfolioDetails = new Swiper('.portfolio_details_active_one', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 1200,
        autoplay: {
            delay: 3000,
        },
        //slider dots
        pagination: {
            el: '.rs-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: ".rs-slider-button-next",
            prevEl: ".rs-slider-button-prev",
        },
        breakpoints: {
            '1200': {
                slidesPerView: 1,
            },
            '992': {
                slidesPerView: 1,
            },
            '768': {
                slidesPerView: 1,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });
    // Portfolio Details active 01 end

    /* portfolio tab */
    if ($('.portfolio-load-more').length > 0) {
        $('.grid').imagesLoaded(function () {
            // init Isotope
            var $grid = $('.grid').isotope({
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: '.grid-item',
                }
            });


            // filter items on button click
            $('.rs-portfolio-tab').on('click', 'button', function () {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({ filter: filterValue });
            });

            //for menu active class
            $('.rs-portfolio-tab button').on('click', function (event) {
                $(this).siblings('.active').removeClass('active');
                $(this).addClass('active');
                event.preventDefault();
            });

            var show_item = $('.portfolio-load-more').attr('data-show');
            var count_item = show_item;
            var isotop_call = $grid.data('isotope');

            loadMore(show_item);

            function loadMore(showing) {
                $grid.find(".hidden").removeClass("hidden");

                var hidden = isotop_call.filteredItems.slice(showing, isotop_call.filteredItems.length).map(function (item) {
                    return item.element;
                });

                $(hidden).addClass('hidden');
                $grid.isotope('layout');
            }

            $(".rs-portfolio-tab").on('click', function () {
                $(this).data('clicked', true);

                loadMore(show_item);
            });

        });
    } else {
        $('.grid').imagesLoaded(function () {
            // init Isotope
            var $grid = $('.grid').isotope({
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: '.grid-item',
                }
            });


            // filter items on button click
            $('.featured-menu').on('click', 'button', function () {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({ filter: filterValue });
            });

            //for menu active class
            $('.featured-menu button').on('click', function (event) {
                $(this).siblings('.active').removeClass('active');
                $(this).addClass('active');
                event.preventDefault();
            });

        });

        var show_item_2 = $('.featured-load-item-count').attr('data-show');
        $(".featured-load-item").hide();
        $(".featured-load-item").slice(0, show_item_2).show();
        $("body").on('click touchstart', '.load-more', function (e) {
            e.preventDefault();
            $(".featured-load-item:hidden").slice(0, show_item_2).slideDown();
            if ($(".featured-load-item:hidden").length == 0) {
                $(".load-more").css('display', 'none');
            }

        });
    }

    document.addEventListener('mousemove', function (event) {
        // Get the mouse position
        let x = event.clientX;
        let y = event.clientY;

        // Calculate the percentage of the mouse position relative to the window size
        let xPercent = (x / window.innerWidth) - 0.5;
        let yPercent = (y / window.innerHeight) - 0.5;

        // Select all the shapes
        let shapes = document.querySelectorAll('.shape-move img');

        // Loop through each shape and apply a transform based on mouse position
        shapes.forEach(function (shape, index) {
            // Modify the multiplier values to control the movement intensity
            let multiplierX = 40 + index * 2;
            let multiplierY = 40 + index * 2;

            let translateX = xPercent * multiplierX;
            let translateY = yPercent * multiplierY;

            shape.style.transform = `translate(${translateX}px, ${translateY}px)`;
        });
    });


    // Smooth Scroling
    if ($('.rs-smoother-yes').length) {
        const lenis = new Lenis({
            smoothWheel: true,
            wheelMultiplier: 1.4,
            duration: 1.5,
            lerp: 0.1,
        });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // image scale active
    if ($('.rs-scale-item').length) {
        // Get all menu items
        const portfolio_items = document.querySelectorAll('.rs-scale-item');
        // Add event listeners to each item
        portfolio_items.forEach((item) => {
            item.addEventListener('mouseenter', () => {
                // Remove the 'active' class from all items
                portfolio_items.forEach((portfolio_item) => {
                    portfolio_item.classList.remove('active');
                });
                // Add the 'active' class to the hovered item
                item.classList.add('active');
            });
        });
        portfolio_items[1].classList.add("active");
    };

    // button style
    jQuery(document).ready(function ($) {
        $('.rs-button-wrapper .rs-btn').mouseenter(function () {
            $(this).find('.rs-icon').css('animation', 'btnHoverEffect 0.5s');
        });
        $('.rs-button-wrapper .rs-btn').mouseleave(function () {
            $(this).find('.rs-icon').css('animation', 'btnHoverEffectReverse 0.5s');
        });
    });

    $(document).ready(function () {
        // circle text slide
        if ($('.rs-text-circle').length) {
            $(".rs-text-circle").each(function () {
                // Wrap all charecter inside a span
                var sentence = $(this).text().replace(/\s+/g, ' ').trim();
                var wrappedSentence = '';
                for (var i = 0; i < sentence.length; i++) {
                    wrappedSentence += '<span>' + sentence[i] + '</span>';
                }
                $(this).html(wrappedSentence);

                // Give a rotate value for each span
                var rotateDegree = parseInt($(this).data("rotate-degree")) || 20;
                $(this).find("span").each(function (index) {
                    $(this).css("transform", "rotate(" + ((index + 1) * rotateDegree) + "deg)");
                });
            });
        }
        // Contact Form Activation - Email Client Integration
        $(document).on('submit', '#contactForm', function(e) {
            console.log('Contact form submit event triggered');
            e.preventDefault();
            e.stopPropagation();
            
            // Get form data
            var name = $('#name').val();
            var email = $('#email').val();
            var phone = $('#phone').val();
            var company = $('#company').val();
            var subject = $('#subject').val();
            var message = $('#message').val();
            
            console.log('Form data:', {name, email, phone, company, subject, message});
            
            // Validate required fields
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return false;
            }
            
            // Create email content
            var emailSubject = 'Portfolio Inquiry: ' + subject;
            var emailBody = 'Hi Joe,\n\n';
            emailBody += 'I would like to discuss working with you on: ' + subject + '\n\n';
            emailBody += 'Details:\n';
            emailBody += 'Name: ' + name + '\n';
            emailBody += 'Email: ' + email + '\n';
            if (phone) emailBody += 'Phone: ' + phone + '\n';
            if (company) emailBody += 'Company: ' + company + '\n';
            emailBody += '\nMessage:\n' + message + '\n\n';
            emailBody += 'Best regards,\n' + name;
            
            // Create mailto link
            var mailtoLink = 'mailto:biohackerjoe@gmail.com' +
                '?subject=' + encodeURIComponent(emailSubject) +
                '&body=' + encodeURIComponent(emailBody);
            
            console.log('Opening mailto link:', mailtoLink);
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            alert('Your email client should now open with the message pre-filled. Please review and send the email.');
            
            // Reset form
            this.reset();
            
            return false;
        });
    });



})(jQuery);

// Additional contact form handler - runs after all other scripts
$(document).ready(function() {
    // Remove any existing handlers and add our own
    $('#contactForm').off('submit').on('submit', function(e) {
        console.log('Contact form submit event triggered (backup handler)');
        e.preventDefault();
        e.stopImmediatePropagation();
        
        // Get form data
        var name = $('#name').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var company = $('#company').val();
        var subject = $('#subject').val();
        var message = $('#message').val();
        
        console.log('Form data:', {name, email, phone, company, subject, message});
        
        // Validate required fields
        if (!name || !email || !subject || !message) {
            alert('Please fill in all required fields.');
            return false;
        }
        
        // Create email content
        var emailSubject = 'Portfolio Inquiry: ' + subject;
        var emailBody = 'Hi Joe,\n\n';
        emailBody += 'I would like to discuss working with you on: ' + subject + '\n\n';
        emailBody += 'Details:\n';
        emailBody += 'Name: ' + name + '\n';
        emailBody += 'Email: ' + email + '\n';
        if (phone) emailBody += 'Phone: ' + phone + '\n';
        if (company) emailBody += 'Company: ' + company + '\n';
        emailBody += '\nMessage:\n' + message + '\n\n';
        emailBody += 'Best regards,\n' + name;
        
        // Create mailto link
        var mailtoLink = 'mailto:biohackerjoe@gmail.com' +
            '?subject=' + encodeURIComponent(emailSubject) +
            '&body=' + encodeURIComponent(emailBody);
        
        console.log('Opening mailto link:', mailtoLink);
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Your email client should now open with the message pre-filled. Please review and send the email.');
        
        // Reset form
        this.reset();
        
        return false;
    });
});