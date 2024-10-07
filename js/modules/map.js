'use strict';

const _KEY = 'AIzaSyCCek6jsfOYOK2lAtNP8I5Fuy4FOvBgghk';

import { Loader } from "@googlemaps/js-api-loader";
import {mapNightTheme} from "./map-theme";

export default function initMap(containerSelector) {
    const loader = new Loader({
        apiKey: _KEY,
        version: "weekly",
    });
    const mapContainer = document.querySelector(containerSelector);
    const defaultMarker = { lat: 40.74881584652125, lng: -73.98561648634562 };

    if (mapContainer) {
        loader.load().then(() => {
            const icon = {
                url: "./svg/pin.svg", // url
                scaledSize: new google.maps.Size(34, 34), // scaled size
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            };

            const map = new google.maps.Map(mapContainer, {
                center: { lat: 40.74956081164776, lng: -73.98700531672688 },
                zoom: 12,
                styles: [...mapNightTheme],
                disableDefaultUI: true
            });

            const marker = new google.maps.Marker({
                position: defaultMarker,
                map: map,
                icon: icon
            });
        });
    }
}