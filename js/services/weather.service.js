const API_KEY = 'ab251322553d9ad77feb4f5960490e3b'

export const weatherService = {
	getWeather
}

function getWeather(lat, lng) {
	return axios
		.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`)
		.then(({ data }) => data.main)
	// .then(({ temp, feels_like }) => (temp, feels_like))
}
