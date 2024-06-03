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


// Make sure that after clicking on menu item the chosen one is highlighted, the dropdown aswell
// Highlight menu while scrolling

document.addEventListener('DOMContentLoaded', (event) => {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const contactButtons = document.querySelectorAll('a[href="#contact"]');
    const sections = document.querySelectorAll('div[id]'); // Select all divs with an id attribute

    // Function to remove the active class from all navigation links and dropdown items
    function removeActiveClasses() {
        navLinks.forEach(nav => nav.classList.remove('active'));
        dropdownItems.forEach(item => item.classList.remove('active'));
    }

    // Event listeners for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            removeActiveClasses();
            this.classList.add('active');
        });
    });

    // Event listeners for dropdown items
    dropdownItems.forEach(item => {
        item.addEventListener('click', function () {
            removeActiveClasses();

            // Highlight the main dropdown link
            const parentDropdown = this.closest('.nav-item.dropdown').querySelector('.nav-link');
            parentDropdown.classList.add('active');

            // Highlight the clicked dropdown item
            this.classList.add('active');
        });
    });

    // Event listeners for contact buttons
    contactButtons.forEach(button => {
        button.addEventListener('click', function () {
            removeActiveClasses();
        });
    });

    // Intersection Observer to highlight navigation links on scroll
    const observerOptions = {
        threshold: 0.5 // Adjust this value to determine when a section is considered in view
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                removeActiveClasses();
                const id = entry.target.id;
                let activeLink;

                if (id === 'team') {
                    // Special case for #team section
                    activeLink = document.querySelector('a[href="#about"]');
                } else if (id === 'contact') {
                    // No corresponding nav link for contact, do nothing
                    return;
                } else {
                    activeLink = document.querySelector(`a[href="#${id}"]`);
                }

                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});