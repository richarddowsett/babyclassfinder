import React, {Component} from 'react';
import {Grid, Row, Col, Navbar, Jumbotron, Button, Nav, NavItem, MenuItem, NavDropdown,
FormGroup, FormControl, Tabs, Tab} from 'react-bootstrap';
import './App.css';

var classes = [
  {category: 'Pregnancy', activity: 'yoga', postcode: 'CM1'},
  {category: 'Baby', activity: 'massage', postcode: 'CM2'}
]

class App extends Component {
  render() {
    return (
      <div>
        <AppNav/>
        <Row className="show-grid">
          <Col xs={3} md={3} lg={3}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
          <Col xs={9} md={9} lg={8} lgPull={1}><AppJumbotron/>

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
    this.state = {
      searchCategories: '',
      location: ''
    }
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  handleSearchChange(categories){
    console.log('handle content search change -> ' + categories)
    this.setState({searchCategories: categories})
  }

  render() {
    console.log('content state => ' + this.state)
    return (
      <div>
      <Row className="show-grid">
        <Col lg={4} lgPush={4} lgPull={4}><SearchForm searchValue={this.state.searchCategories} locationValue={this.state.location}
           onUserInput={this.handleSearchChange}/></Col>
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
  }

  handleChange(e) {
    console.log('handle searchform change' + e.target.value)
    this.props.onUserInput(e.target.value)
  }
  handleLocationChange(e){
    console.log('location change')
  }


  render() {
    console.log('search props: ' + this.props.searchValue)
    return (
      <form>
              <FormGroup
                controlId="classNames"
              >
                <FormControl
                  type="text"
                  value={this.props.searchValue}
                  placeholder="Class names"
                  onChange={this.handleChange}
                />
            </FormGroup>
            <FormGroup controlId="location">
              <FormControl
                type="text"
                value={this.props.locationValue}
                placeholder="Location"
                onChange={this.handleLocationChange}
                />
                <FormControl.Feedback />
              </FormGroup>
            </form>


    )
  }
}

class ResultsTabs extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      key: 'list'
    }
  }

  handleSelect(key) {
    this.setState({key});
  }

  render() {
    console.log('filter => ' + this.props.filter)
    var filter = this.props.filter
    var filtered = []
     this.props.classes.forEach(function(c){
      console.log(c.category + ' === ' + filter + ' = ' + (c.category === filter).toString())
      if(c.category.toString() === filter.toString()){
        filtered.push(c)
      }
    })
    console.log('classes -> ' + this.props.classes)
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
    console.log(this.props)
    var rows = []
    var count = 1
    this.props.classes.forEach(function(clazz){
      rows.push(<div key={count}><p>{clazz.activity} -> {clazz.category}</p></div>)
      count += 1
    })
    return(
      <div>{rows}</div>
    )
  }
}

class AppJumbotron extends Component {
  render() {
    return (
      <Jumbotron>
        <Grid>
          <h1>Welcome to React</h1>
          <p>
            <Button bsStyle="success" bsSize="large" href="http://react-bootstrap.github.io/components.html" target="_blank">
              View React Bootstrap Docs
            </Button>
          </p>
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
