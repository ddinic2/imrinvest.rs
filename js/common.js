'use strict';

import {Tab, Collapse} from 'bootstrap';
import LazyLoad from 'vanilla-lazyload';
import AOS from 'aos';
import {setCurrentYear, preventDefault} from './modules/helpers';
import validate from './modules/forms';
import {drawNav, scrollToTop, scrollToContactForm} from './modules/nav';
import {initCounterAnimation} from './modules/effects';
import {initGallery} from './modules/gallery';
import {initGallerySlider} from './modules/slider';
import toggleVideo from './modules/video';
import {isRtlLang} from 'rtl-detect';

document.addEventListener('DOMContentLoaded', () => {
    const isRTL = isRtlLang(navigator.language);
    isRTL && document.documentElement.setAttribute('dir', 'rtl');
    preventDefault();
    const lazyload = new LazyLoad();
    AOS.init({
        offset: 0, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 550, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: true, // animation repeat
    });
    drawNav();
    scrollToTop();
    scrollToContactForm();
    initCounterAnimation();
    initGallery();
    initGallerySlider();
    toggleVideo();
    validate();
    setCurrentYear();
})