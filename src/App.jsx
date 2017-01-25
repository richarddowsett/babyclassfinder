import React, {Component} from 'react';
import {
  Row,
  Col
} from 'react-bootstrap';
import ReactCollapse from 'react-collapse';
import './App.css';
import 'leaflet/dist/leaflet.css';
import {toggleCategory, toggleActivity} from './ActionTypes'
import {fetchClasses} from './ActionTypes'
import ResultsTabsComponent from './ResultsTabComponent'
import FilterBarComponent from './FilterBarComponent'
import {connect} from 'react-redux'
import {AppJumbotron} from './Util'

function appFunc(dispatchFetchClasses){
  return <App fetchClasses={dispatchFetchClasses}/>
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchFetchClasses: (lat,lng) => {
      console.log('sending dispatch for fetchClasses')
      dispatch(fetchClasses({lat: lat,lng:lng}))
    }
  }
}


const AppComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(appFunc)

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount(){
    this.props.fetchClasses.dispatchFetchClasses(123,456)
  }

  render() {
    return (
      <div>
        <Row className="show-grid">
          <Col xs={3} md={3}></Col>
          <Col xs={12} md={8} lg={8} lgPull={1} mdPull={1}><AppJumbotron/>

          </Col>
        </Row>
        <Content store={this.store}/>
      </div>
    );
  }
}

function contentFunc(dispatchToggleActivity,dispatchToggleCategory) {
  return <Content dispatchToggleActivity={dispatchToggleActivity} dispatchToggleCategory={dispatchToggleCategory}/>
}

const mapContentStateToProps = (state) => {
  return {
  }
}

const mapContentDispatchToProps = (dispatch) => {
  return {
    dispatchToggleActivity: (activity) => {
      console.log('sending dispatch for activity $activity')
      dispatch(toggleActivity(activity))
    },
    dispatchToggleCategory: (category) => {
      console.log('sending dispach for category $category')
      dispatch(toggleCategory(category))
    }
  }
}


const ContentComponent = connect(
  mapContentStateToProps,
  mapContentDispatchToProps
)(contentFunc)

class Content extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      searchCategories: [],
      searchActivities: [],
      location: '',
      filterOpen: false
    }
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleActivityChange = this.handleActivityChange.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
  }

  handleActivityChange(activity) {
    console.log('handle activty search change -> ' + activity)
    this.props.store.dispatch(toggleActivity(activity))
  }

  handleCategoryChange(category) {
    console.log('handle content search change -> ' + category)
    this.props.store.dispatch(toggleCategory(category))
  }

  toggleFilter() {
    this.state.filterOpen
      ? this.setState({filterOpen: false})
      : this.setState({filterOpen: true})
  }

  render() {
    return (
      <Col lgPush={1} lg={10} lgPull={1} md={10} mdPush={1} mdPull={1}>
        <Row>
          <Col>
            <a href="#" onClick={this.toggleFilter}><span className="glyphicon glyphicon-filter" aria-hidden="true"></span></a>
          </Col>
        </Row>
        <ReactCollapse isOpened={this.state.filterOpen}>
<FilterBarComponent/>
          </ReactCollapse>
        <Row className="show-grid">


          <ResultsTabsComponent/>
        </Row>
      </Col>
    )
  }
}




export default AppComponent;
