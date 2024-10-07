'use strict';

import {initSwiperSlider, initReviewsSlider} from "./modules/slider";

document.addEventListener('DOMContentLoaded', () => {
    initSwiperSlider('.services_slider', '.services_slider-pagination', {
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 1500,
        autoplay: true
    })

    initReviewsSlider();
})