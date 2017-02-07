import fetch from 'isomorphic-fetch'


export const TOGGLE_CATEGORY_FILTER = 'TOGGLE_CATEGORY_FILTER'
export const UPDATE_LOCATION = 'UPDATE_LOCATION'
export const TOGGLE_ACTIVITY_FILTER = 'TOGGLE_ACTIVITY_FILTER'
export const REQUEST_CLASSES = 'REQUEST_CLASSES'
export const RECEIVE_CLASSES = 'RECEIVE_CLASSES'
export const ADD_CLASS = 'ADD_CLASS'
export const CLASS_ADDED = 'CLASS_ADDED'
export const VERIFY_ADDRESS = 'VERIFY_ADDRESS'
export const ADDRESS_VERIFIED = 'ADDRESS_VERIFIED'
export const ADDRESS_VERIFIED_FAILED = 'ADDRESS_VERIFIED_FAILED'
export const ADMIN_CREATION_FAILED = 'ADMIN_CREATION_FAILED'

export function createVerifyAddress(address) {
	return function(dispatch) {
		var addressString = address.house + ',' + address.city + ',' + "essex,"+address.postcode // add county to address
		console.log('looking for ' + addressString)
		var requestBody = {
			address: addressString
		}
		var geocoder = new window.google.maps.Geocoder()
		geocoder.geocode({
			address: addressString
		}, function(results, status) {
			if (status === 'OK') {
				if (results.length === 1) {
					var tmp = createAddressVerified(results[0])
					dispatch(createAddressVerified(results[0]))
				} else {
					console.log("found more than one result for request: " + requestBody + " with status: " + status)
					console.log(results)
					dispatch(createAddressVerificationFailed())
				}
			} else {
				console.log("returned with status: " + status)
				dispatch(createAddressVerificationFailed())
			}
		})
	}
}

const createAdminCreationError = () => {
	return ({
		type: ADMIN_CREATION_FAILED
	})
}

const createAddressVerificationFailed = () => {
	return ({
		type: ADDRESS_VERIFIED_FAILED
	})
}

const createAddressVerified = (json) => {
	var lat = json.geometry.location.lat()
	var lng = json.geometry.location.lng()
	return ({
		type: ADDRESS_VERIFIED,
		success: true,
		location: {
			lat: lat,
			lng: lng
		}
	})
}

const createClassAdded = (json) => {
	return ({
		type: CLASS_ADDED,
		success: json.success
	})
}

export function createAddClass(clazz) {
	return function(dispatch) {
		dispatch(createDispatchAddClass(clazz))

		fetch('http://localhost:9000/classes', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(clazz)
			})
			.then(response => response.json())
			.then(json =>{
				if (json.success === false) {
					dispatch(createAdminCreationError())
				} else {
					dispatch(createClassAdded(json)				)}})
			.catch(err => dispatch(createAdminCreationError()))
	}
}

export const createDispatchAddClass = (clazz) => {
	return {
		type: ADD_CLASS,
		babyClass: clazz
	}
}


export const createRequestClasses = (location) => {
	return {
		type: REQUEST_CLASSES,
		location
	}
}

export const createReceiveClasses = (location, json) => {
	return {
		type: RECEIVE_CLASSES,
		location: location,
		babyClasses: json,
		receivedAt: Date.now()
	}
}

export function fetchClasses(location) {

	return function(dispatch) {

		dispatch(createRequestClasses(location))

		return fetch('http://localhost:9000').then(response => response.json())
			.then(json => dispatch(createReceiveClasses(location, json)))

	}

}

export const toggleCategory = (category) => {
	return {
		type: TOGGLE_CATEGORY_FILTER,
		category: category
	}
}

export const toggleActivity = (activity) => {
	return {
		type: TOGGLE_ACTIVITY_FILTER,
		activity: activity
	}
}

function createUpdateLocation(_lat, _lng) {
	return {
		type: UPDATE_LOCATION,
		lat: _lat,
		lng: _lng
	}
}
