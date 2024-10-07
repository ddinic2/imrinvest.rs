'use strict';

import Swal from 'sweetalert2';

function drawNotification(settings, alertText) {
    Swal.fire({
        showConfirmButton: false,
        html: `
            <p class="main">${alertText}</p>`,
        ...settings
    })
}

export default drawNotification;