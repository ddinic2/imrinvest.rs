'use strict';

import baguetteBox from 'baguettebox.js';

export function initGallery(container = '[data-role="gallery"]', options) {
    const gallery = document.querySelector(container);
    if (gallery) {
        baguetteBox.run(container, options ? {...options} : {});
    }
}
