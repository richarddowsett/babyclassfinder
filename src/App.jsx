import React, {Component} from 'react';
import {Grid, Row, Col, Navbar, Jumbotron, Button, Nav, NavItem, MenuItem, NavDropdown, ButtonGroup,
FormGroup, FormControl, Tabs, Tab} from 'react-bootstrap';
import './App.css';

var classes = [
  {category: 'Pregnancy', activity: 'yoga', postcode: 'CM1'},
  {category: 'Baby', activity: 'massage', postcode: 'CM2'},
  {category: 'Toddler', activity: 'swimming', postcode: 'CM3'}
]

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
    this.props.classes.forEach(function(c){
      tempCategories.push(c.category)
    })
    this.state = {
      searchCategories: [],
      location: '',
      allCategories: tempCategories
    }
    this.handleSearchChange = this.handleSearchChange.bind(this)

  }

  handleSearchChange(category){
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
      <div>
      <Row className="show-grid">
        <Col lg={4} lgPush={4} lgPull={4} md={4} mdPush={4} mdPull={2}><SearchForm allCategories={this.state.allCategories} locationValue={this.state.location}  onUserInput={this.handleSearchChange}/></Col>
      </Row>
      <Row className="show-grid">
      <Col lgPush={2} lg={8} lgPull={2} md={8} mdPush={2} mdPull={2}><ResultsTabs filter={this.state.searchCategories} classes={this.props.classes}/></Col>
      </Row>
    </div>
  )}
}

class SearchForm extends React.Component {
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      handleChange: this.handleChange
    }
  }

  handleChange(e) {
    console.log('handle searchform change' + e)
    this.props.onUserInput(e)
  }
  handleLocationChange(e){
    console.log('location change')
  }



  render() {
    var buttonList = []
    function createButton(changeFunc, category){
      console.log("category -> " + category + " -> "+ "changeFunc" + changeFunc)
      buttonList.push(<FilterButton key={category} text={category} buttonClick={changeFunc}/>)
    }
    this.props.allCategories.forEach(createButton.bind(null, this.handleChange))
    return (
      <Row>
      <Col lgPush={2} lg={8} lgPull={2} md={8} mdPush={2} mdPull={2} xs={8} xsPush={2} xsPull={2}><ButtonGroup>
        {buttonList}</ButtonGroup></Col>
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
    <Button bsStyle={this.state.style} onClick={this.handleChange}>{this.props.text}</Button>
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

  render() {
    console.log(this.props.filter)
    var filtered = []
    var filter = this.props.filter
    if(filter === undefined || filter.length === 0){
      filtered = this.props.classes
    }else {
      this.props.classes.forEach(function(c){
        console.log(c.category + filter.indexOf(c.category))
        if(filter.indexOf(c.category) > -1){
          filtered.push(c)
        }
      })
    }

    console.log('filtered -> ' + filtered)
    return (
      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
        <Tab eventKey={"list"} title="List"><ListOfClasses classes={filtered}/></Tab>
        <Tab eventKey={"map"} title="Map"><p>Map of results</p></Tab>
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
