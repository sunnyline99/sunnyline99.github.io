(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    // $(window).scroll(function () {
    //     if ($(this).scrollTop() > 45) {
    //         $('.navbar').addClass('sticky-top shadow-sm');
    //     } else {
    //         $('.navbar').removeClass('sticky-top shadow-sm');
    //     }
    // });


    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    const $navbar = $(".navbar")
    const $navbarToggler = $(".navbar-toggler")
    const $navbarCollapse = $(".navbar-collapse")

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );

        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });

    // Add click event to hide the dropdown on link click for both desktop and mobile views

    // $navbar.find("a").on("click", function () {
    //     $navbarToggler.addClass("collapsed")
    //     $navbarCollapse.removeClass(showClass);
    // })

    $(document).ready(function () {
        const $navbar = $(".navbar");
        const $navbarToggler = $(".navbar-toggler");
        const $navbarCollapse = $(".navbar-collapse");
        const $dropdownMenu = $(".dropdown-menu");
        const showClass = "show";

        // Toggle the dropdown on click
        $navbar.find(".dropdown-toggle").on("click", function (event) {
            const $dropdown = $(this).next(".dropdown-menu");
            $dropdown.toggleClass(showClass);
            const $dropdownShow = $(this).next(".show");
            $dropdown.toggleClass(showClass);
            return false; // Prevent default behavior and stop propagation
        });

        // Collapse the navbar when a non-dropdown link is clicked
        $navbar.find("a").not(".dropdown-toggle").on("click", function () {
            $navbarToggler.addClass("collapsed");
            $navbarCollapse.removeClass(showClass);
            $dropdownMenu.removeClass(showClass);
        });

        // Collapse the navbar when a dropdown item is clicked
        $navbar.find(".dropdown-item").on("click", function () {
            $navbarToggler.addClass("collapsed");
            $navbarCollapse.removeClass(showClass);
        });
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });

})(jQuery);
