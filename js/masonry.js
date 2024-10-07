'use strict';

import initFilter from './modules/filter';

document.addEventListener('DOMContentLoaded', () => {
    initFilter('.gallery_masonry', '.gallery_filters-filter', {
        itemSelector: '.gallery_masonry-item'
    });
});