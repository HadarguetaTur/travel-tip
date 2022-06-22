import { storageService } from './storage.service.js'
import { weatherService } from './services/weather.service.js'

const STORAGE_KEY = 'locDB'

export const locService = {
	getLocs,
	addLoc,
	loadSavedLocations,
	getLocationById,
	deleteLoc
}

const gLocs = []

function getLocs() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(gLocs)
		}, 200)
	})
}

function addLoc(name, lat, lng, weather = 'nice') {
	//add loc to gLocs
	let pos = {
		name,
		lat,
		lng,
		weather: weatherService.getWeather(lat, lng).then(({ temp, feels_like }) => ({ temp, feels_like }))
	}
	console.log(pos)
	gLocs.push(pos)
	storageService.save(STORAGE_KEY, pos)
}

function loadSavedLocations() {
	//load loc from storage
	gLocs = storageService.load(STORAGE_KEY) || []
	
}

function getLocationById(id) {
	//get object and push it to gLoc
	return gLocs.find(loc => id === loc.id)
}

function deleteLoc(id) {
	//delete loc from gLocs
	const Idx = gLocs.findIndex(loc => id === loc.id)
	gLocs.splice(locIdx, 1)
}
