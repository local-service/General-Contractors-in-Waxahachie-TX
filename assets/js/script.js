// JavaScript for Thompson & Boys Contractors Website

// Smooth scrolling for navigation links
$(document).ready(function() {
    $('.navigation a').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            let hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800);
        }
    });
});

// Scroll to Quote Section Functionality
function scrollToQuote() {
    $('html, body').animate({
        scrollTop: $('#contact').offset().top
    }, 800);
}

// Form Submission - AJAX request to backend PHP for form processing
$(document).ready(function() {
    $('form').on('submit', function(event) {
        event.preventDefault();
        let formData = $(this).serialize();

        $.ajax({
            url: 'process_form.php', // PHP file to handle form submissions
            type: 'POST',
            data: formData,
            success: function(response) {
                alert('Thank you for your message! We will get back to you shortly.');
            },
            error: function() {
                alert('There was an error submitting your message. Please try again later.');
            }
        });
    });
});

// Sticky Navigation on Scroll
$(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        $('.top-nav').addClass('sticky');
    } else {
        $('.top-nav').removeClass('sticky');
    }
});

// Dropdown Menu for Services
$(document).ready(function() {
    // Append dropdown menu items to the Services link
    $('.navigation a[href="#services"]').parent().append(`
        <div class="dropdown-menu">
            <a href="#kitchen-remodeling">Kitchen Remodeling</a>
            <a href="#bathroom-renovations">Bathroom Renovations</a>
            <a href="#custom-cabinetry">Custom Cabinetry</a>
            <a href="#flooring">Flooring</a>
            <a href="#painting-drywall">Painting & Drywall</a>
        </div>
    `);

    // Show/hide dropdown on hover
    $('.navigation a[href="#services"]').parent().hover(function() {
        $(this).find('.dropdown-menu').stop(true, true).slideDown(200);
    }, function() {
        $(this).find('.dropdown-menu').stop(true, true).slideUp(200);
    });
});

// Hamburger Menu Toggle Functionality
function toggleMenu() {
    $('.navigation').toggleClass('active');
    $('.hamburger-menu').toggleClass('open');
}

$(document).ready(function() {
    $('.hamburger-menu').on('click', function() {
        toggleMenu();
    });

    // Close the menu when a link is clicked (for better mobile experience)
    $('.navigation a').on('click', function() {
        if ($('.navigation').hasClass('active')) {
            toggleMenu();
        }
    });
});

// Parallax Scrolling Effect
$(window).on('scroll', function() {
    let scrollTop = $(this).scrollTop();
    $('.hero').css('background-position', 'center bottom' + (scrollTop * 0.5) + 'px');
});
