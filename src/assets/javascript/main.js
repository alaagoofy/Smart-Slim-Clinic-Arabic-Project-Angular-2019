/**
* ResponsiveMenu
* HeaderFixed
* SlideTeam
* SearchButton
* CountDown
* GoogleMap
* SlideSearch
* LoadMore
* LoadMore_s2
* LoadMore_s3
* LoadMore_s4
* LoadMore_comment
* Parallax
* GoTop
* RemovePreloader
*/

;(function($) {

   'use strict'
        var isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        }; // is Mobile

        var responsiveMenu = function() {
            var menuType = 'desktop';

            $(window).on('load resize', function() {
                var currMenuType = 'desktop';

                if ( matchMedia( 'only screen and (max-width: 991px)' ).matches ) {
                    currMenuType = 'mobile';
                }

                if ( currMenuType !== menuType ) {
                    menuType = currMenuType;

                    if ( currMenuType === 'mobile' ) {
                        var $mobileMenu = $('#mainnav').attr('id', 'mainnav-mobi').hide();
                        var hasChildMenu = $('#mainnav-mobi').find('li:has(ul)');

                        $('.header').after($mobileMenu);
                        hasChildMenu.children('ul').hide();
                        hasChildMenu.children('a').after('<span class="btn-submenu"></span>');
                        $('.btn-menu').removeClass('active');
                    } else {
                        var $desktopMenu = $('#mainnav-mobi').attr('id', 'mainnav').removeAttr('style');

                        $desktopMenu.find('.submenu').removeAttr('style');
                        $('.header').find('.button-header').before($desktopMenu);
                        $('.btn-submenu').remove();
                    }
                }
            });

            $('.btn-menu').on('click', function() {         
                $('#mainnav-mobi').slideToggle(300);
                $(this).toggleClass('active');
                return false;
            });

            $(document).on('click', '#mainnav-mobi li .btn-submenu', function(e) {
                $(this).toggleClass('active').next('ul').slideToggle(300);
                e.stopImmediatePropagation();
                return false;
            });
        }; // Responsive Menu

        var headerFixed = function() {
            if ( $('body').hasClass('header_sticky') ) {
                var nav = $('.header');
                if ( nav.size() != 0 ) {
                    
                    var offsetTop = $('.header').offset().top,
                        headerHeight = $('.header').height(),
                        injectSpace = $('<div />', { height: headerHeight }).insertAfter(nav);   
                        injectSpace.hide();                 

                    $(window).on('load scroll', function(){
                        if ( $(window).scrollTop() > offsetTop + 100 ) {
                            injectSpace.show();
                            $('.header').addClass('downscrolled');
                            
                        } else {
                            $('.header').removeClass('downscrolled');
                            injectSpace.hide();
                        }

                        if ( $(window).scrollTop() > 500) {
                            $('.header').addClass('upscrolled');
                        } else {
                            $('.header').removeClass('upscrolled');
                        }
                    })
                }
            }
        }; // Header Fixed

        var slideTeam = function() {
            $(".owl-carousel").owlCarousel({
                autoplay:true,
                dots:false,
                nav: true,
                margin: 27,
                loop:true,
                items:4,
                responsive:{
                    0:{
                        items: 1
                    },

                    479:{
                        items: 2
                    },
                    768:{
                        items: 3
                    },
                    991:{
                        items: 4
                    },
                    1200: {
                        items: 4
                    }
                }
            });
        }; // Slide Team

        var searchButton = function() {
            var showsearch = $('.show-search button');
                showsearch.on('click',function() {
                $('.show-search .top-search').toggleClass('active');
                showsearch.toggleClass('active');
                if(showsearch.hasClass('active')) {
                    $(this).children('span').removeClass('ti-search');
                    showsearch.children('span').addClass('ti-close');
                } else {
                    showsearch.removeClass('active');
                    $(this).children('span').addClass('ti-search');
                    $(this).children('span').removeClass('ti-close');
                }
            });
        }; // Search Button

        var CountDown = function() {
            var before = '<div class="square"><div class="numb">',
                textday = '</div><div class="text">/ DAY',
                texthour = '</div><div class="text">/ HOURS',
                textmin = '</div><div class="text">/ MINS',
                textsec = '</div><div class="text">/ SECS';
                if ($().countdown) {
                    $(".countdown").countdown('2017/09/17', function(event) {
                      $(this).html(event.strftime(before + '%D' + textday + '</div></div>' + before + '%H' + texthour + '</div></div>' + before + '%M' + textmin + '</div></div>' + before + '%S' + textsec + '</div>'));
                    });
                }
        }; // Count Down

        var filterToggle = function() {
            $('.filter').each(function() {
                $(this).find('.filter-title').children('.ti-angle-down').on('click', function() {
                    $(this).closest('.filter').children('.select-filter').slideToggle(400);
                });
            });
        }; // Filter Toggle

        

        var slideSearch = function() {
            if ( $('body').hasClass('slider') ) {
                $("#ex8").slider({
                    tooltip: 'always'
                });

                // Without JQuery
                var slider = new Slider("#ex8", {
                    tooltip: 'always'
                });
            }
        }; // Slide Search

        var loadMore = function () {
            $(".wrap-imagebox.style1 .imagebox.style3").slice(0, 4).show();
            $(".wrap-imagebox.style1 .btn-more").on('click', function (e) {
                e.preventDefault();
                $(".wrap-imagebox.style1 .imagebox.style3:hidden").slice(0, 2).slideDown(600);
                if ($(".wrap-imagebox.style1 .imagebox.style3:hidden").length == 0) {
                    $(".wrap-imagebox.style1 .btn-more").fadeOut('slow');
                }
                $('html,body').animate({
                    scrollTop: $(this).offset().top - 150
                }, 1000);
            });
        }; // Load More

        var loadMore_s2 = function () {
            $(".wrap-imagebox.style2 .imagebox.style4").slice(0, 4).show();
            $(".wrap-imagebox.style2 .btn-more").on('click', function (e) {
                e.preventDefault();
                $(".wrap-imagebox.style2 .imagebox.style4:hidden").slice(0, 2).slideDown(600);
                if ($(".wrap-imagebox.style2 .imagebox.style4:hidden").length == 0) {
                    $(".wrap-imagebox.style2 .btn-more").fadeOut('slow');
                }
                $('html,body').animate({
                    scrollTop: $(this).offset().top - 150
                }, 1000);
            });
        }; // Load More S2

        var loadMore_s3 = function () {
            $(".wrap-imagebox.style3 .imagebox.style1").slice(0, 6).show();
            $(".wrap-imagebox.style3 .btn-more").on('click', function (e) {
                e.preventDefault();
                $(".wrap-imagebox.style3 .imagebox.style1:hidden").slice(0, 2).slideDown(600);
                if ($(".wrap-imagebox.style3 .imagebox.style1:hidden").length == 0) {
                    $(".wrap-imagebox.style3 .btn-more").fadeOut('slow');
                }
                $('html,body').animate({
                    scrollTop: $(this).offset().top - 150
                }, 1000);
            });
        }; // Load More S3

        var loadMore_s4 = function () {
            $(".wrap-imagebox.style3 .imagebox.style2").slice(0, 3).show();
            $(".wrap-imagebox.style3 .btn-more").on('click', function (e) {
                e.preventDefault();
                $(".wrap-imagebox.style3 .imagebox.style2:hidden").slice(0, 2).slideDown(600);
                if ($(".wrap-imagebox.style3 .imagebox.style2:hidden").length == 0) {
                    $(".wrap-imagebox.style3 .btn-more").fadeOut('slow');
                }
                $('html,body').animate({
                    scrollTop: $(this).offset().top - 150
                }, 1000);
            });
        }; // Load More S4

        var loadMore_comment = function () {
            $(".comment-area .comment-list .comment").slice(0, 2).show();
            $(".comment-area .load-more").on('click', function (e) {
                e.preventDefault();
                $(".comment-area .comment-list .comment:hidden").slice(0, 2).slideDown(600);
                if ($(".comment-area .comment-list .comment:hidden").length == 0) {
                    $(".comment-area .load-more").fadeOut('slow');
                }
                $('html,body').animate({
                    scrollTop: $(this).offset().top - 100
                }, 1000);
            });
        }; // Load More Comment

        var parallax = function() {
            if ( $().parallax && isMobile.any() == null ) {
                $('.parallax1').parallax("50%", 0.5);
            }
        }; // Parallax

        var goTop = function(){
            var gotop = $('.go-top');
            $(window).scroll(function() {
                if ($(this).scrollTop() > 500) {
                    gotop.addClass('show');
                } else {
                    gotop.removeClass('show');
                }
            });
            gotop.on('click', function() {
                $('html, body').animate({ scrollTop: 0}, 800, 'easeInOutExpo');
                return false;
            });
        }; // Go Top

        var removePreloader = function() { 
            $(window).load(function() { 
                setTimeout(function() {
                    $('.preloader').hide(); }, 500           
                ); 
            });  
        }; // Remove Preloader


    $(function() {
        responsiveMenu();
        headerFixed();
        slideTeam();
        searchButton();
        filterToggle();
        CountDown();
       
        slideSearch();
        loadMore();
        loadMore_s2();
        loadMore_s3();
        loadMore_s4();
        loadMore_comment();
        parallax();
        goTop();
        removePreloader();
    });

})(jQuery);