'use strict';

import { CountUp } from 'countup.js';
import ProgressBar from 'progressbar.js/dist/progressbar';

export function initCounterAnimation(numSelector = '.countNum', animationDuration = 3, startVal = 0) {
    const numArr = document.querySelectorAll(numSelector);
    for (let i = 0; i < numArr.length; i++) {
        let num = numArr[i];
        let value = +num.dataset.value;
        let options = {
            prefix: num.dataset.prefix ? num.dataset.prefix : '',
            suffix: num.dataset.suffix ? num.dataset.suffix : '',
            separator: num.dataset.separator ? num.dataset.separator : '',
            duration: animationDuration,
            startVal: startVal
        };
        let animatedNum = new CountUp(num, value, options);

        const observer = new IntersectionObserver(handleIntersection);
        observer.observe(num);

        function handleIntersection(entries, observer) {
            entries.forEach(entry => {
                if (entry.intersectionRatio > 0) {
                    animatedNum.start();
                    observer.unobserve(entry.target);
                }
            });
        }
    }
}

export function initProgressbar(container = '.skills') {
    const progressBars = document.querySelectorAll('.progressLine');
    const rootEl = document.querySelector(container);
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';

    if (rootEl) {
        progressBars.forEach(bar => {
            let id = bar.getAttribute('id');
            let value = bar.dataset.value;
            let color = bar.dataset.fill;
            let limit = value / 100;

            let lineBar = new ProgressBar.Line(`#${id}`, {
                strokeWidth: 7.5,
                trailWidth: 7.5,
                from: {color: '#f8f8f8'},
                to: {color: color},
                text: {
                    value: '0',
                    className: 'progress-text',
                    style: {
                        position: 'absolute',
                        right: !isRTL ? '0' : 'unset',
                        left: !isRTL ? 'unset' : '0',
                        padding: 0,
                        margin: 0,
                        transform: null
                    }
                },
                step: (state, shape) => {
                    shape.path.setAttribute("stroke", state.color);
                    shape.setText(`${value}%`);
                }
            });

            const observer = new IntersectionObserver(handleIntersection);
            observer.observe(bar);

            function handleIntersection(entries, observer) {
                entries.forEach(entry => {
                    if (entry.intersectionRatio > 0) {
                        lineBar.animate(limit, {
                            duration: 500
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }
        })
    }
}