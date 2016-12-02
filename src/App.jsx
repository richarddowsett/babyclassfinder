import React, {Component} from 'react';
import {
  Grid,
  Row,
  Col,
  Navbar,
  Jumbotron,
  Nav,
  NavItem,
  MenuItem,
  NavDropdown
} from 'react-bootstrap';
import ReactCollapse from 'react-collapse';
import './App.css';
import 'leaflet/dist/leaflet.css';
import {toggleCategory, toggleActivity} from './ActionTypes'
import {createLoadAllClasses} from './ActionTypes'
import ResultsTabsComponent from './ResultsTabComponent'
import FilterBarComponent from './FilterBarComponent'



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

  componentDidMount(){
    this.store.dispatch(createLoadAllClasses())
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
      <Col lgPush={2} lg={8} lgPull={2} md={8} mdPush={2} mdPull={2}>
        <Row>
          <Col>
            <a href="#" onClick={this.toggleFilter}>Filter</a>
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
