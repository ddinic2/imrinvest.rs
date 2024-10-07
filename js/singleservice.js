'use strict';

import drawProcessSteps from './modules/steps';
import {initReviewsSlider} from './modules/slider';
import drawTabs from './modules/tabs';

document.addEventListener('DOMContentLoaded', () => {
    drawTabs();
    drawProcessSteps();
    initReviewsSlider();
})