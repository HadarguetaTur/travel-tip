import { locService } from './loc.service.js'

const API_KEY = 'AIzaSyBql8NtvemaSSebnbC50kSwewJhu7HM7l4' //TODO: Enter your API Key

export const mapService = {
	initMap,
	addMarker,
	panTo,
	convertCityToCords
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
		// gMap.addListener('click', ev => console.log(ev.latLng.lat(), ev.latLng.lng()))
		gMap.addListener('click', handleClickEvent)
	})
}

function handleClickEvent({ latLng }) {
	addMarker({ lat: latLng.lat(), lng: latLng.lng() })
	// locService.addLoc('city', latLng.lat(), latLng.lng())
	convertCordsToCity(latLng.lat(), latLng.lng())
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

function panTo(lat, lng) {
	var laLatLng = new google.maps.LatLng(lat, lng)
	gMap.panTo(laLatLng)
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
