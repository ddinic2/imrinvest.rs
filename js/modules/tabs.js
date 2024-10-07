'use strict';

export default function drawTabs() {
    const tabTriggers = document.querySelectorAll('.tabs_nav-item');

    tabTriggers.forEach(el => {
        el.addEventListener('click', e => {
            const tabPanel = document.querySelector(el.getAttribute('data-bs-target'));
            const tabPanels = document.querySelectorAll('.tab-pane');
            tabTriggers.forEach(el => {
                el.classList.remove('active');
            })
            tabPanels.forEach(el => {
                el.classList.remove('show', 'active');
            })
            el.classList.add('active');
            tabPanel.classList.add('show', 'active');
        })
    })
}