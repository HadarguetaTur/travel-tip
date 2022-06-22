import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onSearchCity = onSearchCity

function onInit() {
	mapService
		.initMap()
		.then(() => {
			console.log('Map is ready')
			addMapEventListeners()
		})
		.catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
	console.log('Getting Pos')
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	})
}

function onAddMarker() {
	console.log('Adding a marker')
	mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
	locService.getLocs().then(locs => {
		console.log('Locations:', locs)
		const elLocations = document.querySelector('.locs')
		elLocations.innerText = ''
		locs.forEach(loc => {
			const { name, lat, lng } = loc
			elLocations.innerText += `\n ${name}: ${lat} ,${lng}`
		})
	})
}

function onGetUserPos() {
	getPosition()
		.then(pos => {
			console.log('User position is:', pos.coords)
			document.querySelector('.user-pos').innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
			mapService.panTo(pos.coords.latitude, pos.coords.longitude)
			//to do save user pos
			//render det to brauser
		})
		.catch(err => {
			console.log('err!!!', err)
		})
}

function onPanTo() {
	console.log('Panning the Map')
	mapService.panTo(35.6895, 139.6917)
}

function onSearchCity(ev) {
	ev.preventDefault()
	const city = document.querySelector('.search-input').value
	mapService.convertCityToCords(city)
}
