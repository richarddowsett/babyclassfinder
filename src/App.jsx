import React, {Component, PropTypes} from 'react';
import {
  Grid,
  Row,
  Col,
  Navbar,
  Jumbotron,
  Button,
  Nav,
  NavItem,
  MenuItem,
  NavDropdown,
  ButtonGroup,
  Accordion,
  Panel,
  FormGroup,
  FormControl,
  Tabs,
  Tab
} from 'react-bootstrap';
import ReactCollapse from 'react-collapse';
import createLoadAllClasses from './ActionTypes';
import './App.css';
import 'leaflet/dist/leaflet.js';
import L from 'leaflet/dist/leaflet.js'
import 'leaflet/dist/leaflet.css';
import {connect} from 'react-redux'
import {toggleCategory, toggleActivity} from './ActionTypes'

import ResultsTabsComponent from './ResultsTabComponent'



var classes = [
  {
    category: 'Pregnancy',
    activity: 'yoga',
    postcode: 'CM1'
  }, {
    category: 'Baby',
    activity: 'massage',
    postcode: 'CM2'
  }, {
    category: 'Baby',
    activity: 'sensory',
    postcode: 'blah'
  }, {
    category: 'Toddler',
    activity: 'swimming',
    postcode: 'CM3'
  }, {
    category: 'Toddler',
    activity: 'music',
    postcode: '123'
  }
]

function unique(value, index, self) {
  return self.indexOf(value) === index;
}

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.store = props.store || context.store

    console.log(
      `Could not find "store" in either the context or ` +
      `props of "App". ` +
      `Either wrap the root component in a <Provider>, ` +
      `or explicitly pass "store" as a prop to "App".`
    )
  }

  render() {
    return (
      <div>
        <AppNav/>
        <Row className="show-grid">
          <Col xs={3} md={3}></Col>
          <Col xs={12} md={8} lg={8} lgPull={1} mdPull={1}><AppJumbotron/>

          </Col>
        </Row>
        <Content classes={classes} store={this.store}/>
      </div>
    );
  }
}

class Content extends React.Component {
  constructor(props, context) {
    super(props, context);
    var tempCategories = []
    var tempActivities = []
    this.props.classes.forEach(function(c) {
      tempCategories.push(c.category)
      tempActivities.push(c.activity)
    })
    this.state = {
      searchCategories: [],
      searchActivities: [],
      location: '',
      allCategories: tempCategories.filter(unique),
      allActivities: tempActivities.filter(unique),
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
      <Col lgPush={2} lg={8} lgPull={2} md={8} mdPush={2} mdPull={2}>
        <Row>
          <Col>
            <a href="#" onClick={this.toggleFilter}>Filter</a>
          </Col>
        </Row>
        <ReactCollapse isOpened={this.state.filterOpen}>
          <SearchForm allCategories={this.state.allCategories} allActivities={this.state.allActivities} locationValue={this.state.location} onCategoryChange={this.handleCategoryChange} onActivityChange={this.handleActivityChange}/>
        </ReactCollapse>
        <Row className="show-grid">


          <ResultsTabsComponent/>
        </Row>
      </Col>
    )
  }
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleActivityChange = this.handleActivityChange.bind(this);
  }

  handleChange(e) {
    console.log('handle searchform change' + e)
    this.props.onCategoryChange(e)
  }

  handleActivityChange(e) {
    console.log('handle activity change' + e)
    this.props.onActivityChange(e)
  }

  handleLocationChange(e) {
    console.log('location change')
  }

  render() {
    var categoryButtonList = []
    function createButton(changeFunc, category) {
      console.log("category -> " + category + " -> " + "changeFunc" + changeFunc)
      categoryButtonList.push(< FilterButton key = {
        category
      }
      text = {
        category
      }
      buttonClick = {
        changeFunc
      } />)
    }
    this.props.allCategories.forEach(createButton.bind(null, this.handleChange))
    var activityButtonList = []
    function createActivityButton(changeFunc, activity) {
      console.log("activity -> " + activity + " -> " + "changeFunc" + changeFunc)
      activityButtonList.push(< FilterButton key = {
        activity
      }
      text = {
        activity
      }
      buttonClick = {
        changeFunc
      } />)
    }
    this.props.allActivities.forEach(createActivityButton.bind(null, this.handleActivityChange))

    return (
      <Row className="show-grid">
        <Col lg={8} md={8}>
          <Accordion>
            <Panel header="Categories" eventKey="1">
              <ButtonGroup>
                {categoryButtonList}
              </ButtonGroup>
            </Panel>
            <Panel header="Activity" eventKey="2">
              <ButtonGroup>
                {activityButtonList}
              </ButtonGroup>
            </Panel>
          </Accordion>
        </Col>
        <Col lg={4} md={4}>
          <Panel header="Days">
            blah
          </Panel>
        </Col>
      </Row>
    )
  }
}

class FilterButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: true,
      style: "primary"
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
    if (this.state.active) {
      this.setState({active: false, style: "info"})
    } else {
      this.setState({active: true, style: "primary"})
    }
    this.props.buttonClick(this.props.text)
  }

  render() {
    return (
      <Button onClick={this.handleChange}>{this.props.text}</Button>
    )
  }

}

FilterButton.propTypes = {
  buttonClick: PropTypes.func.isRequired
}

class AppJumbotron extends Component {
  render() {
    return (
      <Jumbotron>
        <Grid>systm
          <h1>Baby Class Finder</h1>
        </Grid>
      </Jumbotron>
    )
  }
}

class AppNav extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">React-Bootstrap</a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">Link</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider/>
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Link Right</NavItem>
            <NavItem eventKey={2} href="#">Link Right</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default App;
