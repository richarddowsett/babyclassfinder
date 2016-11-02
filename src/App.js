import React, {Component} from 'react';
import logo from './logo.svg';
import {Grid, Row, Col, Navbar, Jumbotron, Button, Nav, NavItem, MenuItem, NavDropdown,
FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <AppNav/>
        <Row className="show-grid">
          <Col xs={3} md={3} lg={3}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
          <Col xs={9} md={9} lg={8} lgPull={1}><AppJumbotron/>
          <SearchForm/>
          </Col>

        </Row>

      </div>
    );
  }
}

const SearchForm = React.createClass( {
  getInitialState() {
    return {
      value: '',
      locationValue: ''

    };
  },

  handleChange(e) {
    this.setState({value: e.target.value});
  },
  handleLocationChange(e){
    this.setState({locationValue: e.target.value})
  },

  render() {
    return (
      <form>
              <FormGroup
                controlId="searchForm"
              >
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="Class names"
                  onChange={this.handleChange}
                />
              <FormControl
                type="text"
                value={this.state.locationValue}
                placeholder="Location"
                onChange={this.handleLocationChange}
                />
                <FormControl.Feedback />
              </FormGroup>
            </form>


    )
  }
})

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
