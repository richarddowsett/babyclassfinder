import fetch from 'isomorphic-fetch'


export const TOGGLE_CATEGORY_FILTER = 'TOGGLE_CATEGORY_FILTER'
export const UPDATE_LOCATION = 'UPDATE_LOCATION'
export const TOGGLE_ACTIVITY_FILTER = 'TOGGLE_ACTIVITY_FILTER'
export const REQUEST_CLASSES = 'REQUEST_CLASSES'
export const RECEIVE_CLASSES = 'RECEIVE_CLASSES'
export const ADD_CLASS = 'ADD_CLASS'
export const CLASS_ADDED = 'CLASS_ADDED'

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
    .then( json => dispatch( createClassAdded(json) ))
    .catch( err => console.log(err) )
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
