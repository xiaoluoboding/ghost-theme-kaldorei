/**
 * Main JS file for kaldorei behaviours
 */

/* globals jQuery, document */
(function($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function() {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e) {
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

        $(window).scroll(function() {
            var scrollerToTop = $('.backTop');
            var scrollerTOC = $('.widget-toc');
            document.documentElement.scrollTop + document.body.scrollTop > 200 ? scrollerToTop.fadeIn() : scrollerToTop.fadeOut();
            document.documentElement.scrollTop + document.body.scrollTop > 250 ? scrollerTOC.addClass("widget-toc-fixed") : scrollerTOC.removeClass("widget-toc-fixed");
        });

        // #backTop Button Event
        $("#backTop").on("click", function() {
            scrollToTop();
        });

        //highlight config
        hljs.initHighlightingOnLoad();

        //toc config
        $("#toc").toc({
            content: ".post-content",
            headings: "h2,h3,h4,h5"
        });

        if ($("#toc").children().length == 0) $(".widget-toc").hide();

        //toc animate effect
        // bind click event to all internal page anchors
        $('a.data-scroll').on('click', function(e) {
            // prevent default action and bubbling
            e.preventDefault();
            e.stopPropagation();
            // set target to anchor's "href" attribute
            var target = $(this).attr('href');
            // scroll to each target
            $(target).velocity('scroll', {
                duration: 500,
                easing: 'ease-in-out'
                    //easing: 'spring'
            });
        });

        $('[data-rel=tooltip]').tooltip();

        // var postReveal = {
        //     delay: 1000,
        //     scale: 0.9
        // }
        // var widgetReveal = {
        //     delay: 400,
        //     distance: '90px',
        //     easing: 'ease-in-out',
        //     rotate: {
        //         z: 10
        //     },
        //     scale: 1.1
        // };
        // window.sr = ScrollReveal();
        // sr.reveal('.post');
        // sr.reveal('.widget', widgetReveal);

    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function(options) {

        var defaults = {
                elem: $(this),
                speed: 500
            },

            allOptions = $.extend(defaults, options);

        allOptions.elem.click(function(event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({
                    scrollTop: ($(this.hash).offset().top + toMove)
                }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({
                    scrollTop: toMove
                }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({
                    scrollTop: ($(this.hash).offset().top)
                }, allOptions.speed);
            }
        });

    };
})(jQuery);

function scrollToTop(name, speed) {
    if (!speed) speed = 300
    if (!name) {
        $('html,body').animate({
            scrollTop: 0
        }, speed)
    } else {
        if ($(name).length > 0) {
            $('html,body').animate({
                scrollTop: $(name).offset().top
            }, speed)
        }
    }
}
