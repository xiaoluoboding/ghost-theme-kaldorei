/**
 * Main JS file for kaldorei behaviours
 * @author: xiaoluoboding
 */

/* globals jQuery, document */
(function($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function() {
        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(window).scroll(function() {
            var scrollerToTop = $('.back-top');
            var scrollerTOC = $('.widget-toc');
            document.documentElement.scrollTop + document.body.scrollTop > 200 ?
                scrollerToTop.fadeIn() :
                scrollerToTop.fadeOut();
            document.documentElement.scrollTop + document.body.scrollTop > 250 ?
                scrollerTOC.addClass("widget-toc-fixed") :
                scrollerTOC.removeClass("widget-toc-fixed");
        });

        // #back-top Button Event
        $("#backTop").on("click", function() {
            scrollToTop();
        });

        // highlight config
        hljs.initHighlightingOnLoad();
        // dynamicInjectHljsStyle()

        // numbering for pre>code blocks
        // $(function() {
        //     $('pre code').each(function() {
        //         var lines = $(this).text().split('\n').length - 1;
        //         var $numbering = $('<ul/>').addClass('pre-numbering');
        //         $(this).addClass('has-numbering').parent().append($numbering);
        //         for (var i = 1; i <= lines; i++) {
        //             $numbering.append($('<li/>').text(i));
        //         }
        //     });
        // });

        // toc config
        var toc = $('.toc');
        toc.toc({
            content: ".post-content",
            headings: "h2,h3,h4,h5",
            highlightOffset: 100
        });

        if (toc.children().length == 0) $(".widget-toc").hide();

        var tocHieght = toc.height() ;
        var tocFixedHeight = $(window).height() - 192;
        tocHieght > tocFixedHeight ?
            toc.css('height', tocFixedHeight) :
            toc.css('height', tocHieght)

        $(window).resize(function() {
            var tocFixedHeight = $(this).height() - 192;
            tocHieght > tocFixedHeight ?
                toc.css('height', tocFixedHeight) :
                toc.css('height', tocHieght)
        })

        // toc animate effect
        // bind click event to all internal page anchors
        $('a.data-scroll').on('click', function(e) {
            // prevent default action and bubbling
            e.preventDefault();
            e.stopPropagation();
            // set target to anchor's "href" attribute
            // Thanks to @https://github.com/xiongchengqing fixed this bug.
            var target = document.getElementById($(this).attr('href').split('#')[1]);
            // scroll to each target
            $(target).velocity('scroll', {
                duration: 500,
                offset: -8,
                easing: 'ease-in-out'
            });
        });

        // tooltip config
        $('[data-rel=tooltip]').tooltip();

        // fancybox 3.1.25 config
        $('.post-content a:has(img)').addClass('fancybox');
        $(".fancybox").attr('data-fancybox', 'images').fancybox({
            selector       : '[data-fancybox="images"]',
            loop           : true,
            slidesToShow   : 3,
            slidesToScroll : 3,
            infinite       : true
        });

        // add archives year
        var yearArray = [];
        $(".archives-item").each(function() {
            var archivesYear = $(this).attr("date");
            yearArray.push(archivesYear);
        });
        var uniqueYear = $.unique(yearArray);
        for (var i = 0; i < uniqueYear.length; i++) {
            var html = "<div class='archives-item fadeInDown animated'>" +
                "<div class='archives-year'>" +
                "<h3><time datetime='" + uniqueYear[i] + "'>" + uniqueYear[i] + "</time></h3>" +
                "</div></div>";
            $("[date='" + uniqueYear[i] + "']:first").before(html);
        }
        
        // global search
        if (typeof searchSettings === "undefined") {
            window.searchSettings = {};
        }
        if (searchSettings && searchSettings.key && searchSettings.host) {
            $(".search-toggle").css("display", "block");
            $("#globalSearch").on("touchdown click", function () {
                var searchIconEl = $('.search-icon');
                if (searchIconEl.hasClass("fa-search")) {
                    searchIconEl.removeClass("fa-search").addClass('fa-times');
                } else {
                    searchIconEl.removeClass('fa-times').addClass("fa-search");
                }
                $("body").toggleClass("is-search");
                $(".site-search").toggleClass("is-hidden");
            });
            var ghostSearch = new GhostSearch({
                key: searchSettings.key,
                host: searchSettings.host
            })
        }
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

// function dynamicInjectHljsStyle() {
//     const $link = $('<link rel="stylesheet">')
//     console.log($link)
//     const href = `/assets/plugins/prism-latest/styles/okaidia.css`
//     $link.appendTo('head').attr({ href })
// }
