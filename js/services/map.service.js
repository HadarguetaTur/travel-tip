import { locService } from './loc.service.js'

const API_KEY = 'AIzaSyBJjAyWTrWXXBwMp1Azjy0aCTETJMrULAI' //TODO: Enter your API Key

export const mapService = {
    initMap,
    addMarker,
    panTo,
    convertCityToCords,
    MapBack,
    addMarker,
    convertCordsToCity,
    
}

var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi().then(() => {
        console.log('google available')
        gMap = new google.maps.Map(document.querySelector('#map'), {
            center: { lat, lng },
            zoom: 15
        })

    })
}

function getMap(){
	return _connectGoogleApi().then(() => {
		console.log('google available')
		gMap = new google.maps.Map(document.querySelector('#map'), {
			center: { lat, lng },
			zoom: 10
		})
		renderLocByQueryStringParams()
	})
}

function MapBack(){
    return gMap
}




function addMarker(loc) {
    console.log('hi')
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    return marker
}

// function panTo(lat, lng) {
//     // var laLatLng = new google.maps.LatLng(lat, lng)
//     // gMap.panTo(laLatLng)
// 	var marker = new google.maps.Marker({
// 		position: loc,
// 		map: gMap,
// 		title: 'Hello World!'
// 	})
// 	return marker
// }

function panTo(lat, lng) {
	var laLatLng = new google.maps.LatLng(lat, lng)
	gMap.panTo(laLatLng)
	setQueryStringParams(lat, lng)
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function convertCityToCords(city) {
	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${API_KEY}`
	axios
		.get(url)
		.then(({ data }) => data.results[0].geometry.location)
		.then(({ lat, lng }) => {
			panTo(lat, lng)
            addMarker({lat:lat,lng:lng})
			locService.addLoc(city, lat, lng)
		})
}

function convertCordsToCity(lat, lng) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
    axios
        .get(url)
        .then(({ data }) => data.results[0].address_components[2].long_name)
        .then(city => locService.addLoc(city, lat, lng))
}

function setQueryStringParams(lat, lng) {
	if (!lat) lat = -18.7669
	if (!lng) lng = 46.8691
	const queryStringParams = `?lat=${lat}&lng=${lng}`
	const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${queryStringParams}`
	window.history.pushState({ path: newUrl }, '', newUrl)
}

function renderLocByQueryStringParams() {
	console.log('hi')
	const params = new Proxy(new URLSearchParams(window.location.search), {
		get: (searchParams, prop) => searchParams.get(prop)
	})
	panTo(params.lat, params.lng)
}
