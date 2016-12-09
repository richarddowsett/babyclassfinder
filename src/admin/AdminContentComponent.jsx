import React, {Component} from 'react';
import {connect} from 'react-redux'
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

function contentFunc() {
  return <AdminContent/>
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

const AdminContentComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(contentFunc)

class AdminContent extends Component {
  constructor(props, context){
    super(props, context)
  }

  render(){
    return (
      <Col lgPush={2} lg={8} lgPull={2} md={8} mdPush={2} mdPull={2}>


        <Row className="show-grid">

<Col>
          <div>blah admin row</div></Col>
        </Row>
      </Col>
    )
  }
}

export default AdminContentComponent
