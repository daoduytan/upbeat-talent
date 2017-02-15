$(function() {
    // $('#slide-eshop').owlCarousel({
    //     items: 3, //10 items above 1000px browser width
    //     // itemsDesktop : [1000,5], //5 items between 1000px and 901px
    //     // itemsDesktopSmall : [900,3], // betweem 900px and 601px
    //     // itemsTablet: [600,2], //2 items between 600 and 0
    //     // itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
    // });


    $(document).ready(function() {

        var sync1 = $("#sync1");
        var sync2 = $("#sync2");

        sync1.owlCarousel({
            singleItem: true,
            // slideSpeed: 1000,
            navigation: true,
            pagination: false,
            autoPlay: 5000,
            slideSpeed: 3000,
            paginationSpeed : 1000,
            afterAction: syncPosition,
            responsiveRefreshRate: 200,
        });

        sync2.owlCarousel({
            items: 4,
            itemsDesktop      : [1199,4],
            itemsDesktopSmall     : [979,4],
            itemsTablet       : [768,4],
            itemsMobile       : [479,4],
            pagination: false,
            responsiveRefreshRate: 100,
            afterInit: function(el) {
                el.find(".owl-item").eq(0).addClass("synced");
            }
        });

        function syncPosition(el) {
            var current = this.currentItem;
            $("#sync2")
                .find(".owl-item")
                .removeClass("synced")
                .eq(current)
                .addClass("synced")
            if ($("#sync2").data("owlCarousel") !== undefined) {
                center(current)
            }
        }

        $("#sync2").on("click", ".owl-item", function(e) {
            e.preventDefault();
            var number = $(this).data("owlItem");
            sync1.trigger("owl.goTo", number);
        });

        function center(number) {
            var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
            var num = number;
            var found = false;
            for (var i in sync2visible) {
                if (num === sync2visible[i]) {
                    var found = true;
                }
            }

            if (found === false) {
                if (num > sync2visible[sync2visible.length - 1]) {
                    sync2.trigger("owl.goTo", num - sync2visible.length + 2)
                } else {
                    if (num - 1 === -1) {
                        num = 0;
                    }
                    sync2.trigger("owl.goTo", num);
                }
            } else if (num === sync2visible[sync2visible.length - 1]) {
                sync2.trigger("owl.goTo", sync2visible[1])
            } else if (num === sync2visible[0]) {
                sync2.trigger("owl.goTo", num - 1)
            }

        }

    });

    $('#slider-multimedia').slick({
      centerMode: true,
      // centerPadding: '60px',
      slidesToShow: 3,
      speed: 1000,
      autoplay: true,
      nextArrow: '<i class="fa fa-angle-right slick-next"></i>',
      prevArrow: '<i class="fa fa-angle-left slick-prev"></i>',
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }

        }
      ]
    });

    $('#slide-eshop').slick({
      infinite: true,
      // autoplay: true,
      arrows: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      // responsive: [
      //   {
         
      //     breakpoint: 767,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 1
      //     }
      //   }
      // ]

    })

    // menu
    $('.btn-nav').click(function() {
      $('.header .main-nav').toggleClass('showMenu');
    })

    // search form 
    $('.header_search').on('click', function(event) {
      event.preventDefault();
      /* Act on the event */
      showSearch()

      event.stopPropagation();

      $('.close-search').click(function() {
        closeSearch() 
      })
    });

     $(document).click(function(e) {
        if (!$(e.target).is('.header, .header *')) {
           closeSearch();
        }
    });

    $(window).scroll(function() {
      var HeightTop =  $(window).scrollTop();

      if (HeightTop > 70) {
        closeSearch()
      }
    })

    function showSearch() {
      // body...
       $('.header .search-form').addClass('showSearch');
    }
    function closeSearch() {
      // body...
       $('.header .search-form').removeClass('showSearch');
    }
});
