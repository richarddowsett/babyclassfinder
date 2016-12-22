import React from 'react';
import {Tabs, Tab, Accordion, Panel} from 'react-bootstrap';
import {createLoadAllClasses} from './ActionTypes';
import './App.css';
/*import 'leaflet/dist/leaflet.js';*/
import L from 'leaflet/dist/leaflet.js'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-search/dist/leaflet-search.min.css'
import {connect} from 'react-redux'
import {MyMarkersList, MyPopupMarker} from './Marker'

const resultsTabsFunc = ({classes, categoryFilter, activityFilter, location}) => {
  return <ResultsTabs categoryFilter={categoryFilter} activityFilter={activityFilter} classes={classes} location={location}/>
}

class ResultsTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      key: 'map'
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.classPopup = this.classPopup.bind(this)
  }

  handleSelect(newKey) {
    this.setState({key: newKey});
  }

/*
    L.Icon.Default.imagePath = 'images/'
  }*/



  classPopup(clazz) {
    <Marker position={[clazz.location.lat, clazz.location.lng]}>
      <Popup>
        <Accordion eventKey="description">
          <Panel header="Description">one</Panel>
          <Panel eventKey="schedule" header="Schedule">Two</Panel>

          </Accordion>
      </Popup>
    </Marker>
  }

  render() {
    /* move this to mapStateToProps */
    var categoryFilter = this.props.categoryFilter
    var activityFilter = this.props.activityFilter
    var filtered = this.props.classes.filter(function(c) {
      if (categoryFilter === undefined || categoryFilter.length === 0)
        return true;
      return categoryFilter.indexOf(c.category) > -1
    })
    filtered = filtered.filter(function(c) {
      if (activityFilter === undefined || activityFilter.length === 0)
        return true;
      return activityFilter.indexOf(c.activity) > -1
    })
    console.log('filtered -> ' + filtered)
    return (
      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
        <Tab eventKey={"map"} title="Map">
          <Map center={[this.props.location.lat, this.props.location.lng]} zoom={13}>
            <TileLayer url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
            <MyMarkersList markers={this.props.classes} />
          </Map>
        </Tab>
        <Tab eventKey={"list"} title="List"><ListOfClasses classes={filtered}/></Tab>
      </Tabs>
    );
  }
}

class ListOfClasses extends React.Component {
  render() {
    var rows = []
    var count = 1
    this.props.classes.forEach(function(clazz) {
      rows.push( < tr key = {
        count
      } > <td>{clazz.activity}</td> < td > {
        clazz.category
      } < /td></tr >)
      count += 1
    })
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Activity</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {classes: state.babyClasses, categoryFilter: state.categoryFilter, activityFilter: state.activityFilter, location: state.location}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const ResultsTabsComponent = connect(mapStateToProps, mapDispatchToProps)(resultsTabsFunc)

export default ResultsTabsComponent
