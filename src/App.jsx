import React, {Component} from 'react';
import {Grid, Row, Col, Navbar, Jumbotron, Button, Nav, NavItem, MenuItem, NavDropdown, ButtonGroup,Accordion,
  Panel, FormGroup, FormControl, Tabs, Tab} from 'react-bootstrap';
import './App.css';
import 'leaflet/dist/leaflet.js';
import L from 'leaflet/dist/leaflet.js'
import 'leaflet/dist/leaflet.css';

var classes = [
  {category: 'Pregnancy', activity: 'yoga', postcode: 'CM1'},
  {category: 'Baby', activity: 'massage', postcode: 'CM2'},
  {category: 'Baby', activity: 'sensory', postcode: 'blah'},
  {category: 'Toddler', activity: 'swimming', postcode: 'CM3'},
  {category: 'Toddler', activity: 'music', postcode: '123'}
]

function unique(value, index, self){
  return self.indexOf(value) === index;
}

class App extends Component {
  render() {
    return (
      <div>
        <AppNav/>
        <Row className="show-grid">
          <Col xs={3} md={3}></Col>
          <Col xs={12} md={8} lg={8} lgPull={1} mdPull={1}><AppJumbotron/>

          </Col>
        </Row>
        <Content classes={classes}/>
      </div>
     );
  }
}

class Content extends React.Component{
  constructor(props){
    super(props);
    var tempCategories = []
    var tempActivities = []
    this.props.classes.forEach(function(c){
      tempCategories.push(c.category)
      tempActivities.push(c.activity)
    })
    this.state = {
      searchCategories: [],
      searchActivities: [],
      location: '',
      allCategories: tempCategories.filter(unique),
      allActivities: tempActivities.filter(unique)
    }
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
    this.handleActivityChange = this.handleActivityChange.bind(this)
  }

  handleActivityChange(activity){
    console.log('handle activty search change -> ' + activity)
    console.log('activities before' + this.state.searchActivities.toString())
    var activities = this.state.searchActivities
    var contains = false
    this.state.searchActivities.forEach(function(c){
      contains = contains || c == activity
    })
    if(contains){
      var index = activities.indexOf(activity)
      activities.splice(index, 1)
    } else{
      activities.push(activity.toString())
    }
    console.log('activities: ' + activities.toString())
    this.setState({searchActivities: activities})
  }

  handleCategoryChange(category){
    console.log('handle content search change -> ' + category)
    console.log('categories before' + this.state.searchCategories.toString())
    var categories = this.state.searchCategories
    var contains = false
    this.state.searchCategories.forEach(function(c){
      contains = contains || c == category
    })
    if(contains){
      var index = categories.indexOf(category)
      categories.splice(index, 1)
    } else{
      categories.push(category.toString())
    }
    console.log('categories: ' + categories.toString())
    this.setState({searchCategories: categories})
  }

  render() {
    return (
      <Col lgPush={2} lg={8} lgPull={2} md={8} mdPush={2} mdPull={2}>
        <SearchForm allCategories={this.state.allCategories}
          allActivities={this.state.allActivities} locationValue={this.state.location}  onCategoryChange={this.handleCategoryChange}
          onActivityChange={this.handleActivityChange}/>
      <Row className="show-grid">

        <ResultsTabs categoryFilter={this.state.searchCategories} activityFilter={this.state.searchActivities} classes={this.props.classes}/>
      </Row>
    </Col>
  )}
}

class SearchForm extends React.Component {
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleActivityChange = this.handleActivityChange.bind(this);
  }

  handleChange(e) {
    console.log('handle searchform change' + e)
    this.props.onCategoryChange(e)
  }

  handleActivityChange(e){
    console.log('handle activity change' + e)
    this.props.onActivityChange(e)
  }

  handleLocationChange(e){
    console.log('location change')
  }



  render() {
    var categoryButtonList = []
    function createButton(changeFunc, category){
      console.log("category -> " + category + " -> "+ "changeFunc" + changeFunc)
      categoryButtonList.push(<FilterButton key={category} text={category} buttonClick={changeFunc}/>)
    }
    this.props.allCategories.forEach(createButton.bind(null, this.handleChange))
    var activityButtonList = []
    function createActivityButton(changeFunc, activity){
      console.log("activity -> " + activity + " -> " + "changeFunc" + changeFunc)
      activityButtonList.push(<FilterButton key={activity} text={activity} buttonClick={changeFunc}/>)
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
  constructor(props){
    super(props)
    this.state = {
      active: true,
      style: "primary"
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(){
    if(this.state.active){
      this.setState({active: false, style: "info"})
    }else{
      this.setState({active: true, style: "primary"})
    }
    this.props.buttonClick(this.props.text)
  }

render(){
  return(
    <Button onClick={this.handleChange}>{this.props.text}</Button>
  )
}

}

class ResultsTabs extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      key: 'list'
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(newKey) {
    this.setState({key: newKey});
  }

  componentDidMount() {
    var mymap = L.map('mapid').setView([51.505, -0.09], 13);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(mymap);
  }

  render() {
    var categoryFilter = this.props.categoryFilter
    var activityFilter = this.props.activityFilter
    var filtered = this.props.classes.filter(function(c){
      if(categoryFilter === undefined || categoryFilter.length === 0)
      return true;
        return categoryFilter.indexOf(c.category) > -1
      })
    filtered = filtered.filter(function(c){
      if(activityFilter === undefined || activityFilter.length == 0)
      return true;
      return activityFilter.indexOf(c.activity) > -1
    })
    console.log('filtered -> ' + filtered)
    return (
      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
        <Tab eventKey={"list"} title="List"><ListOfClasses classes={filtered}/></Tab>
        <Tab eventKey={"map"} title="Map"><div id="mapid"></div></Tab>
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

class AppJumbotron extends Component {
  render() {
    return (
      <Jumbotron>
        <Grid>
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
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="#">Link</NavItem>
        <NavItem eventKey={2} href="#">Link</NavItem>
        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
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
