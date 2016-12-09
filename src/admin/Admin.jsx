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
import '../App.css';
import 'leaflet/dist/leaflet.css';
import {toggleCategory, toggleActivity} from '../ActionTypes'
import {createLoadAllClasses, fetchClasses} from '../ActionTypes'
import {connect} from 'react-redux'
import {AppNav, AppJumbotron} from '../Util'
import AdminContentComponent from './AdminContentComponent'

function adminFunc(){
  return <Admin/>
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const AdminComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(adminFunc)


class Admin extends Component {
  constructor(props, context){
    super(props, context)
  }

  render(){
    return (
      <div>
        <AppNav/>
        <Row className="show-grid">
          <Col xs={3} md={3}></Col>
          <Col xs={12} md={8} lg={8} lgPull={1} mdPull={1}><AppJumbotron/>

          </Col>
        </Row>
        <AdminContentComponent/>
      </div>
    );
  }
}



export default AdminComponent;
