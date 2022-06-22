const API_KEY = 'AIzaSyBql8NtvemaSSebnbC50kSwewJhu7HM7l4' //TODO: Enter your API Key
export const mapService = {
	initMap,
	addMarker,
	panTo
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
		console.log('Map!', gMap)
	})
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

convertCityToCords()
function convertCityToCords() {
	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=tokyo&key=${API_KEY}`
	axios.get(url).then(({ data }) => {
		console.log(data)
	})
}

//maps.googleapis.com/maps/api/geocode/json?holon&key=AIzaSyBql8NtvemaSSebnbC50kSwewJhu7HM7l4

// convertToCordsTest()
// function convertToCordsTest() {
// 	console.log('hi')
// 	fetch('https://maps.googleapis.com/maps/api/js?key=AIzaSyBql8NtvemaSSebnbC50kSwewJhu7HM7l4')
// 		.then(data => data.json())
// 		.then(console.log)
// }

// convertToCords()
// function convertToCords() {
// const geoCoder = new google.maps.Geocoder()
// console.log(geoCoder)
// }
