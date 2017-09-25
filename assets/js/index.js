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
            document.documentElement.scrollTop + document.body.scrollTop > 200 ?
                scrollerToTop.fadeIn() :
                scrollerToTop.fadeOut();
            document.documentElement.scrollTop + document.body.scrollTop > 250 ?
                scrollerTOC.addClass("widget-toc-fixed") :
                scrollerTOC.removeClass("widget-toc-fixed");
        });

        // #backTop Button Event
        $("#backTop").on("click", function() {
            scrollToTop();
        });

        // highlight config
        hljs.initHighlightingOnLoad();

        // numbering for pre>code blocks
        $(function() {
            $('pre code').each(function() {
                var lines = $(this).text().split('\n').length - 1;
                var $numbering = $('<ul/>').addClass('pre-numbering');
                $(this).addClass('has-numbering').parent().append($numbering);
                for (var i = 1; i <= lines; i++) {
                    $numbering.append($('<li/>').text(i));
                }
            });
        });

        var toc = $('.toc');
        // toc config
        toc.toc({
            content: ".post-content",
            headings: "h2,h3,h4,h5"
        });

        if (toc.children().length == 0) $(".widget-toc").hide();

        var tocHieght = toc.height();
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
            console.log(target);
            // scroll to each target
            $(target).velocity('scroll', {
                duration: 500,
                easing: 'ease-in-out'
                //easing: 'spring'
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
        var yearArray = new Array();
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
