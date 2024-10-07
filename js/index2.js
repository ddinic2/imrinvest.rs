'use strict';

import {initFeedbackSlider, initHeroSlider} from './modules/slider';
import drawProcessSteps from "./modules/steps";
import initMap from './modules/map';

document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    initFeedbackSlider();
    drawProcessSteps();
    initMap('#map');
})
