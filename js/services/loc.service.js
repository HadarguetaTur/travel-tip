import { storageService } from './storage.service.js'

const STORAGE_KEY = 'locDB'

export const locService = {
	getLocs,
	addLoc,
	loadSavedLocations,
	getLocationById,
	deleteLoc
}

const gLocs = [
	{ name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
	{ name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
	//? why??
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(gLocs)
		}, 2000)
	})
}

function addLoc(name, lat, lng, weather = 'nice') {
	//add loc to gLocs
	let pos = {
		name,
		lat,
		lng,
		weather
	}
	gLocs.push(pos)
	storageService.save(STORAGE_KEY, gLocs)
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
