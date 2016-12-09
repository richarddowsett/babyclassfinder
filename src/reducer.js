import {REQUEST_CLASSES, RECEIVE_CLASSES} from './ActionTypes'
/*
sample state:
{
  location: {
  lat: 123,
  lng: 456
  },
  babyClasses: [],
  categoryFilter: [],
  activityFilter: [],
  react: {
    isLoading: false
}

}
*/

function location(state, action) {
  if (typeof state === 'undefined')
    return {
      lat: 123,
      lng: 456
    }
  switch (action.type) {
    case "UPDATE_LOCATION":
      return {
        lat: action.lat,
        lng: action.lng
      }
    default:
      return state
  }
}

function babyClassesFunc(state, action) {
  if (typeof state === 'undefined')
    return []
  switch (action.type) {
    case RECEIVE_CLASSES:
      console.log("received baby classes state: RECEIVE_CLASSES")
      return action.babyClasses
    case "LOAD_ALL_CLASSES":
      console.log('received a dispatched LOAD_ALL_CLASSES')
      return [{
        category: "Pregnancy",
        activity: "Yoga",
        postcode: "CM1"
      },{
        category: "Pregnancy",
        activity: "AquaFit",
        postcode: "CM3"
      },{
        category: "Baby",
        activity: "Massage",
        postcode: "CM3"
      }]
    default:
      return state
  }
}

function containsItem(arr, item){
  var contains = false
  arr.forEach(function(c){contains = contains || c === item})
  return contains
}

function copyAndRemove(arr, item){
  return arr.filter((i, index) => i !== item)
}

function copyAndAdd(arr, item){
return  [...arr, item]
}

function activityFilter(state, action){
  if(typeof state === 'undefined')
  return []
  switch(action.type){
    case 'TOGGLE_ACTIVITY_FILTER':
    var activity = action.activity
    var contains = containsItem(state, activity)
    if(contains){
      return copyAndRemove(state, activity)
    }else {
      return copyAndAdd(state, activity)
    }
    default:
    return state
  }
}

function categoryFilter(state, action) {
  if (typeof state === 'undefined')
    return []
  switch (action.type) {
    case "TOGGLE_CATEGORY_FILTER":
      var category = action.category
      var contains = containsItem(state, category)
      if(contains){
        return copyAndRemove(state, category)
      }else {
        return copyAndAdd(state, category)
      }
    default:
      return state
  }
}

function updateReact(state, action){
  if(typeof state === 'undefined')
  return {
    isLoading: false
  }
  switch (action.type){
    case REQUEST_CLASSES:
    console.log("requesting classes: REQUEST_CLASSES")
    return {
      isLoading: true
    }
    case RECEIVE_CLASSES:
    console.log("received classes in react object: RECEIVE_CLASSES")
    return {
      isLoading: false
    }
    default:
    return state
  }
}

function appReduce(state = {}, action) {
  console.log('reducer triggered')
  return {
    location: location(state.location, action),
    babyClasses: babyClassesFunc(state.babyClasses, action),
    categoryFilter: categoryFilter(state.categoryFilter, action),
    activityFilter: activityFilter(state.activityFilter, action),
    react: updateReact(state.react, action)
  }
}

export default appReduce
