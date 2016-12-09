import React from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import {createLoadAllClasses} from './ActionTypes';
import './App.css';
import 'leaflet/dist/leaflet.js';
import L from 'leaflet/dist/leaflet.js'
import 'leaflet/dist/leaflet.css';
import 'leaflet-search/dist/leaflet-search.min.css'
import {connect} from 'react-redux'




const resultsTabsFunc = ({classes, categoryFilter, activityFilter}) => {
return  <ResultsTabs categoryFilter={categoryFilter} activityFilter={activityFilter} classes={classes}/>
}

class ResultsTabs extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      key: 'map'
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(newKey) {
    this.setState({key: newKey});
  }

  componentDidMount() {

    var mymap = new L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(mymap);

  }

  render() {
    /* move this to mapStateToProps */
    var categoryFilter = this.props.categoryFilter
    var activityFilter = this.props.activityFilter
    var filtered = this.props.classes.filter(function(c){
      if(categoryFilter === undefined || categoryFilter.length === 0)
      return true;
        return categoryFilter.indexOf(c.category) > -1
      })
    filtered = filtered.filter(function(c){
      if(activityFilter === undefined || activityFilter.length === 0)
      return true;
      return activityFilter.indexOf(c.activity) > -1
    })
    console.log('filtered -> ' + filtered)
    return (
      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
        <Tab eventKey={"map"} title="Map"><div id="mapid"></div></Tab>
        <Tab eventKey={"list"} title="List"><ListOfClasses classes={filtered}/></Tab>
      </Tabs>
    );
  }
}

class ListOfClasses extends React.Component {
  render() {
    var rows = []
    var count = 1
    this.props.classes.forEach(function(clazz){
      rows.push(<tr key={count}><td>{clazz.activity}</td><td> {clazz.category}</td></tr>)
      count += 1
    })
    return(
    <div>
      <table className="table table-striped">
          <thead>
            <tr><th>Activity</th><th>Category</th></tr>
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
  return {
    classes: state.babyClasses,
    categoryFilter: state.categoryFilter,
    activityFilter: state.activityFilter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      }
}

const ResultsTabsComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(resultsTabsFunc)

export default ResultsTabsComponent
