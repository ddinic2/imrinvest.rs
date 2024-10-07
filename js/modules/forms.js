'use strict';

import drawNotification from './notification';

const emailRegExp = /^\w+(-?\w+)*@\w+(-?\w+)*(\.\w{2,3})+$/;

async function sendForm(form) {
    let handler = form.getAttribute('action');
    if (handler !== '' && handler !== '#') {
        const response = await fetch(
            handler,
            {
                method: 'POST',
                body: new FormData(form)
            }
        );
        if(response.ok) {
            form.reset();
        }
    }
}

function validateForms(formSelector, fieldSelector = '.field') {
    const form = document.querySelector(formSelector);
    const inputsArr = document.querySelectorAll(`${formSelector} ${fieldSelector}`);

    let text = '';

    let notification = {
        title: "Hvala Vam!",
        showCloseButton: true,
        customClass: {
            popup: 'alert_popup',
            title: 'alert_popup-title',
            htmlContainer: 'alert_popup-content',
            closeButton: 'alert_popup-close'
        }
    };

    const valid = elem => !elem.classList.contains('error');


    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            for (let i = 0; i < inputsArr.length; i++) {
                const el = inputsArr[i];
                const value = el.value;
                if (el.classList.contains('required') && value === '') {
                    el.classList.add('error');
                } else if (el.dataset.type === 'email' && !emailRegExp.test(value)) {
                    el.classList.add('error');
                } else if (el.dataset.type === 'tel' && isNaN(+value)) {
                    el.classList.add('error');
                }

                el.addEventListener('input', () => {
                    el.classList.remove('error');
                });
            }

            if (Array.from(inputsArr).every(valid)) {
                inputsArr.forEach(el => {
                    el.classList.remove('error');
                })
                if (form.dataset.type === 'newsletter') {
                    text = 'Now you\'re subscribed to our newsletter.';
                } else if (form.dataset.type === 'feedback') {
                    text = 'Your message has been sent. We\'ll reply you as soon as possible.';
                } else if (form.dataset.type === 'reply') {
                    text = 'Your comment is awaiting moderation.';
                }
                sendForm(form);
                drawNotification(notification, text);
                form.reset();
            }
        })
    }
}

export default function validate() {
    validateForms('#newsletterForm');
    validateForms('#newsletterForm--widget');
    validateForms('[name="feedbackForm"]');
    validateForms('[name="replyForm"]');
}