$(function ($) {

	"use strict";

         function lazy (){
			$(".lazy").Lazy({
				scrollDirection: 'vertical',
				effect: "fadeIn",
				effectTime:0,
				threshold: 0,
				visibleOnly: false,  
				onError: function(element) {
					console.log('error loading ' + element.data('src'));
				}
			});
		}

        
        style="height: 200vh; overflow-y: scroll; -ms-overflow-style: none; /* Internet Explorer 10+ */ scrollbar-width: none;"


		$(document).ready(function(){
			lazy();
		})

	// Flash Deal Area Start
    var $hero_slider_main = $(".hero-slider-main");
    $hero_slider_main.owlCarousel({
        navText: [],
        nav: true,
        dots: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 7000,
        items: 1,
    });

    // popular_category_slider
    var $popular_category_slider = $(".popular-category-slider");
    $popular_category_slider.owlCarousel({
        navText: [],
        nav: true,
        dots: false,
        loop: false,
        autoplayTimeout: 6000,
        smartSpeed: 1200,
        margin: 15,
        responsive: {
            0: {
                items: 2,
            },
            576: {
                items: 2,
            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
            },
            1200: {
                items: 4,
            },
            1400: {
                items: 5
            }
        },
    });



    // Flash Deal Area Start
    var $flash_deal_slider = $(".flash-deal-slider");
    $flash_deal_slider.owlCarousel({
        navText: [],
        nav: true,
        dots: false,
        autoplayTimeout: 6000,
        smartSpeed: 1200,
        margin: 15,
        responsive: {
            0: {
                items: 1,
                margin: 0,
            },
            576: {
                items: 2,
                margin: 0,
            },
            768: {
                items: 3,
                margin: 0,
            },
            992: {
                items: 4,
                margin: 0,
            },
            1200: {
                items: 4,
                margin: 0,
            },
            1400: {
                items: 1,
            },
        },
    });

    // col slider
    var $col_slider = $(".newproduct-slider");
    $col_slider.owlCarousel({
        navText: [],
        nav: true,
        dots: false,
        loop: false,
        autoplayTimeout: 6000,
        smartSpeed: 1200,
        margin: 15,
        responsive: {
            0: {
                items: 1,
            },
            530: {
                items: 1,
            },
        },
    });

    // col slider 2
    var $col_slider2 = $(".toprated-slider");
    $col_slider2.owlCarousel({
        navText: [],
        nav: true,
        dots: false,
        loop: true,
        autoplayTimeout: 6000,
        smartSpeed: 1200,
        margin: 15,
        responsive: {
            0: {
                items: 1,
            },
            530: {
                items: 1,
            },
        },
    });

    // newproduct-slider Area Start
    var $newproduct_slider = $(".features-slider");
    $newproduct_slider.owlCarousel({
        navText: [],
        nav: true,
        dots: false,
        autoplayTimeout: 6000,
        smartSpeed: 1200,
        loop: false,
        margin: 15,
        responsive: {
            0: {
                items: 2,
            },
            576: {
                items: 2,
            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
            },
            1200: {
                items: 4,
            },
            1400: {
                items: 5
            }
        },
    });

    // home-blog-slider
    var $home_blog_slider = $(".home-blog-slider");
    $home_blog_slider.owlCarousel({
        navText: [],
        nav: true,
        dots: false,
        autoplayTimeout: 6000,
        smartSpeed: 1200,
        loop: true,
        margin: 15,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            768: {
                items: 3,
            },
            992: {
                items: 3,
            },
            1200: {
                items: 3,
            },
            1400: {
                items: 4,
            }
        },
    });


    // brand-slider
    var $brand_slider = $(".brand-slider");
    $brand_slider.owlCarousel({
        navText: [],
        nav: true,
        dots: false,
        autoplayTimeout: 6000,
        smartSpeed: 1200,
        loop: true,
        margin: 0,
        responsive: {
            0: {
                items: 2,
            },
            575: {
                items: 3,
            },
            790: {
                items: 4,
            },
            1100: {
                items: 4,
            },
            1200: {
                items: 4,
            },
            1400: {
                items: 5,
            }
        },
    });

    // toprated-slider Area Start
    var $relatedproductsliderv = $(".relatedproductslider");
    $relatedproductsliderv.owlCarousel({
        nav: false,
        dots: true,
        autoplayTimeout: 6000,
        smartSpeed: 1200,
        margin: 15,
        responsive: {
            0: {
                items: 2,
            },
            576: {
                items: 2,
            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
            },
            1200: {
                items: 4,
            },
            1400: {
                items: 5
            }
        },
    });


$('.left-category-area .category-header').on('click', function(){
    $('.left-category-area .category-list').toggleClass("active")
});


$("[data-date-time]").each(function () {
    var $this = $(this),
        finalDate = $(this).attr("data-date-time");
    $this.countdown(finalDate, function (event) {
        $this.html(
            event.strftime(
                "<span>%D<small>Days</small></span></small> <span>%H<small>Hrs</small></span> <span>%M<small>Min</small></span> <span>%S<small>Sec</small></span>"
            )
        );
    });
});

// Subscriber Form Submit
$(document).on("submit", ".subscriber-form", function (e) {
    e.preventDefault();
    var $this = $(this);
    var submit_btn = $this.find("button");
    submit_btn.find(".fa-spin").removeClass("d-none");
    $this.find("input[name=email]").prop("readonly", true);
    submit_btn.prop("disabled", true);
    $.ajax({
        method: "POST",
        url: $(this).prop("action"),
        data: new FormData(this),
        contentType: false,
        cache: false,
        processData: false,
        success: function (data) {
            if (data.errors) {
                for (var error in data.errors) {
                    dangerNotification(data.errors[error]);
                }
            } else {
                if ($this.hasClass("subscription-form")) {
                    $(".close-popup").click();
                }
                successNotification(data);
                $this.find("input[name=email]").val("");
            }
            submit_btn.find(".fa-spin").addClass("d-none");
            $this.find("input[name=email]").prop("readonly", false);
            submit_btn.prop("disabled", false);
        },
    });
});


});


