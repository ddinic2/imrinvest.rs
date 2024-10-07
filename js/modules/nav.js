'use strict';

import Headroom from "headroom.js";

export function drawNav() {
    const header = document.querySelector('.header');
    const menuTrigger = document.querySelector('.header_trigger');
    const menuWrapper = document.querySelector('.header_nav');
    const menuDropdowns = document.querySelectorAll('.header_nav .dropdown-menu');
    const triggers = document.querySelectorAll('.dropdown-toggle');

    menuTrigger.addEventListener('click', e => {
        e.stopPropagation();
        menuTrigger.classList.toggle('active');
        if (menuTrigger.classList.contains('active')) {
            openMenu();
        } else {
            closeMenu();
        }
    })

    function openMenu() {
        menuWrapper.classList.add('active');
        header.classList.add('opened', 'sticky');
        document.documentElement.classList.add('fixed');
    }

    function closeMenu() {
        menuTrigger.classList.remove('active');
        menuWrapper.classList.remove('active', 'show');
        header.classList.remove('opened');
        if (window.scrollY === 0) {
            header.classList.remove('sticky');
        }
        menuDropdowns.forEach(el => {
            el.classList.remove('show');
        })
        triggers.forEach(el => {
            el.ariaExpanded = "false";
        })
        document.documentElement.classList.remove('fixed');
    }

    initHeadroom(header);
    setActivePageClass(header);
    setDropdownMenu();

    window.addEventListener('load', () => makeNavSticky(header, menuTrigger));
    window.addEventListener('scroll', () => makeNavSticky(header, menuTrigger));
    window.addEventListener('resize', closeMenu);
    window.addEventListener('resize', setDropdownMenu);
}

// hide header on scroll
function initHeadroom(headerEl) {
    let headroom = new Headroom(headerEl, {
        offset: 500,
        classes: {
            pinned: "header--pinned",
            unpinned: "header--unpinned",
        }
    });
    headroom.init();
}

// set activity class for the current page
function setActivePageClass(headerEl) {
    const menuListItems = document.querySelectorAll('.nav-link');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    menuListItems.forEach((item) => {
        if (item.dataset.page === headerEl.dataset.page || item.dataset.mainLink && item.dataset.pageParent === headerEl.dataset.pageParent) {
            item.classList.add('current');
        }
    })

    dropdownItems.forEach((item) => {
        if (item.dataset.page === headerEl.dataset.page) {
            item.classList.add('current');
        }
    })
}

// change header on scroll

// dropdown menus (mobile/desktop)
function setDropdownMenu() {
    const dropdownElems = document.querySelectorAll('.dropdown');
    const triggers = document.querySelectorAll('.dropdown-toggle');
    const menuLists = document.querySelectorAll('.dropdown-menu');

    triggers.forEach((el, i) => {

        function closeMenu() {
            el.classList.remove('active');
            menuLists[i].classList.remove('active');
        }

        if (window.innerWidth > 1023.98) {
            el.style.pointerEvents = 'default';
            el.dataset.bsToggle = '0';
            menuLists[i].classList.remove('collapse');
            window.addEventListener('resize', closeMenu)
        } else {
            el.dataset.bsToggle = 'collapse';
            menuLists[i].classList.add('collapse');
            el.addEventListener('click', () => {
                el.classList.toggle('active');
                menuLists[i].classList.toggle('active');
            })
            window.addEventListener('resize', closeMenu);
            window.addEventListener('scroll', closeMenu)
        }

    })

    dropdownElems.forEach(el => {

        el.addEventListener('mouseover', function (e) {
            let trigger = this.querySelector('a[data-trigger="dropdown"]');
            let menu = trigger.nextElementSibling;
            trigger.classList.add('active');
            menu.classList.add('active');
        });

        el.addEventListener('mouseleave', function (e) {
            let trigger = this.querySelector('a[data-trigger="dropdown"]');
            let menu = trigger.nextElementSibling;
            trigger.classList.remove('active');
            menu.classList.remove('active');
        })
    })

}

function makeNavSticky(headerEl, triggerEL) {
    if (window.scrollY > 0 || triggerEL.classList.contains('active')) {
        headerEl.classList.add('sticky');

    } else if (!triggerEL.classList.contains('opened')) {
        headerEl.classList.remove('sticky');
    }
}

export function scrollToTop() {
    const btn = document.querySelector('#scrollTrigger');
    if (btn) {
        btn.addEventListener('click', () => {
            window.scrollTo(0, 0);
        })
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
}

export function scrollToContactForm() {
    console.log('FIRE')
    const btn = document.querySelector('#scrollToContactForm');
    if (btn) {
        btn.addEventListener('click', () => {
            alert('scrolling')
            window.scrollTo(0, 800);
        })
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
}