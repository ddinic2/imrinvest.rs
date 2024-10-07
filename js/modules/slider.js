'use strict';

import Swiper, {Navigation, Autoplay, Pagination, EffectFade, Thumbs} from 'swiper';
import {setEdgePadding} from './helpers';

Swiper.use([Navigation, Autoplay, Pagination, EffectFade, Thumbs]);

// basic swiper initialization
export function initSwiperSlider(container, parentClass, options) {
    const containerEL = document.querySelector(container);
    if (containerEL) {
        const swiper = new Swiper(container, {
            pauseOnMouseEnter: true,
            loop: true,
            autoplay: {
                disableOnInteraction: false,
            },
            speed: 1200,
            keyboard: {
                enabled: true,
                onlyInViewport: false,
            },
            pagination: {
                el: `${parentClass}.swiper-pagination`,
                type: 'bullets',
                clickable: true,
            },
            navigation: {
                nextEl: `${parentClass} .swiper-button-next`,
                prevEl: `${parentClass} .swiper-button-prev`,
            },
            ...options,
        });
    }
}

export function initHeroSlider() {
    const config = {
        loop: true,
        autoplay: {
            disableOnInteraction: false,
        },
        speed: 1500,
    }
    const thumbsSlider = new Swiper('.hero_slider--thumbs', {
        ...config,
        slidesPerView: 1,
        spaceBetween: 30,
        breakpoints: {
            767.98: {
                slidesPerView: 2,
            },
            1023.98: {
                slidesPerView: 3,
            },
            1365.98: {
                slidesPerView: 'auto',
            }
        }
    });

    const mainSlider = new Swiper('.hero_slider--main', {
        ...config,
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        pagination: {
            el: '.hero_slider-nav.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        thumbs: {
            swiper: thumbsSlider
        },
    });

    const container = document.querySelector('.hero');

    const setBackground = index => {
        const slides = document.querySelectorAll('.hero_slider--main .swiper-slide');
        let bgLinks = [];
        slides.forEach(el => {
            bgLinks.push(el.dataset.bg);
        });
        let sortedArr = Array.from(new Set(bgLinks)).sort();
        container.style.backgroundImage = sortedArr[index] !== undefined ? `url(${sortedArr[index]})` : 'url("img/placeholder.jpg")';
    };
    setBackground(0)

    mainSlider.on('slideChange', () => {
        const currentSlide = mainSlider.slides[mainSlider.activeIndex].dataset.swiperSlideIndex;
        setBackground(currentSlide);
    });

    // edge padding for hero thumb slider
    const regularContainer = document.querySelector('.container_regular'),
        thumbsContainer = document.querySelector('.container_thumbs');

    const setEdge = () => {
        const isRTL = document.documentElement.dir === 'rtl';
        if (window.innerWidth > 1365.98) {
            const value = `${setEdgePadding(regularContainer)}px`;
            isRTL ? thumbsContainer.style.marginRight = value : thumbsContainer.style.marginLeft = value;
        } else {
            thumbsContainer.style.margin = '0 auto';
        }
    }

    setEdge();
    window.addEventListener('resize', setEdge);
    document.documentElement.addEventListener('dirchange', setEdge);
}

export function initGallerySlider() {
    const selector = '.presentation.swiper';

    if (document.querySelector(selector)) {
        initSwiperSlider(selector, '.presentation', {
            autoplay: true,
            speed: 1600,
            breakpoints: {
                567.98: {
                    slidesPerView: 2,
                },
                1023.98: {
                    slidesPerView: 3,
                },
                1279.98: {
                    slidesPerView: 4,
                }
            }
        })
    }
}

export function initReviewsSlider() {
    initSwiperSlider('.reviews_slider', '.reviews_slider-controls', {
        slidesPerView: 1,
        spaceBetween: 30,
        breakpoints: {
            767.98: {
                slidesPerView: 2,
            }
        },
        speed: 2000,
        autoplay: true
    })
}

export function initFeedbackSlider() {
    initSwiperSlider('.feedback_slider', '.feedback_slider-pagination', {
        slidesPerView: 1,
        spaceBetween: 30,
        breakpoints: {
            767.98: {
                slidesPerView: 2,
            },
            1023.98: {
                slidesPerView: 1,
            }
        }
    })
}