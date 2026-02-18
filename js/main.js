// Alveon Brand Strategy — Main Scripts

(function () {
    'use strict';

    // ---- Scroll-spy ----
    var sidebarLinks = document.querySelectorAll('.sidebar__link');
    var chapters = document.querySelectorAll('.chapter');

    function updateScrollSpy() {
        var scrollPos = window.scrollY + 120;
        var current = '';

        chapters.forEach(function (chapter) {
            if (chapter.offsetTop <= scrollPos) {
                current = chapter.id;
            }
        });

        sidebarLinks.forEach(function (link) {
            link.classList.remove('sidebar__link--active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('sidebar__link--active');
            }
        });
    }

    window.addEventListener('scroll', updateScrollSpy, { passive: true });
    updateScrollSpy();

    // ---- Reveal animations ----
    var revealElements = document.querySelectorAll('.reveal');
    var revealObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal--visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

    // ---- Mobile sidebar toggle ----
    var toggle = document.getElementById('sidebar-toggle');
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('sidebar-overlay');

    function openSidebar() {
        sidebar.classList.add('sidebar--open');
        overlay.classList.add('sidebar-overlay--visible');
        toggle.classList.add('mobile-header__toggle--open');
    }

    function closeSidebar() {
        sidebar.classList.remove('sidebar--open');
        overlay.classList.remove('sidebar-overlay--visible');
        toggle.classList.remove('mobile-header__toggle--open');
    }

    if (toggle) {
        toggle.addEventListener('click', function () {
            if (sidebar.classList.contains('sidebar--open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    // Close sidebar when clicking a link (mobile)
    sidebarLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.innerWidth < 768) {
                closeSidebar();
            }
        });
    });
})();
