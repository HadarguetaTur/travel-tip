import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;

function onInit() {

    mapService.initMap()
        .then(() => {
            addMapEventListeners()
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
    
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
        then(res => (console.log(res)))
    })
}


function addMapEventListeners() {
    const map = mapService.getMap();
    map.addListener("click", mapsMouseEvent => {
        let clickedPos = mapsMouseEvent.latLng;
        console.log(clickedPos)

    })
}


function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            //to do save user pos
            //render det to brauser 
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}


function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}