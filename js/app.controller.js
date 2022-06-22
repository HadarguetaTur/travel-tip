import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.renderLoc = renderLoc
window.onGetUserPos = onGetUserPos
window.onSearchCity = onSearchCity
window.orenderLoc = renderLoc




function onInit() {
	mapService.initMap()
		.then((res) => {
			console.log(res)
			console.log('Map is ready');
			addEventLis()
			
		})
		.catch(() => console.log('Error: cannot init map'));
}

function addEventLis() {
	const map = mapService.MapBack()
	map.addListener("click", handleClickEvent)
}

function handleClickEvent({ latLng }) {
    mapService.addMarker({ lat: latLng.lat(), lng: latLng.lng() })
    mapService.convertCordsToCity(latLng.lat(), latLng.lng())
	renderLoc()
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
	console.log('Getting Pos')
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	})
}


function onAddMarker() {
	mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })

}


function onGetUserPos() {
	getPosition()
		.then(pos => {
			console.log('User position is:', pos.coords)
			locService.addLoc('your pos', pos.coords.latitude, pos.coords.longitude)
			renderLoc()
			mapService.panTo(pos.coords.latitude, pos.coords.longitude)

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
	renderLoc()
}


function renderLoc() {
	var sec = document.querySelector('.loc-save')
	sec.innerHTML = ''
	const prmLoc = locService.getLocs().then((locs) =>
		locs.forEach((loc) => {
			sec.innerHTML += `<div class="card-loc">
		<h3>${loc.name}</h3>
		<pre>${loc.weather}
		${loc.lat}${loc.lng}</pre>`
		})
	)
}

