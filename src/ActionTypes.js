const LOAD_ALL_CLASSES = 'LOAD_ALL_CLASSES'

const UPDATE_LOCATION = 'UPDATE_LOCATION'

function createLoadAllClasses() {
  return {
    type: LOAD_ALL_CLASSES
  }
}

function createUpdateLocation(_lat, _lng){
  return {
    type: UPDATE_LOCATION,
    lat: _lat,
    lng: _lng
  }
}
