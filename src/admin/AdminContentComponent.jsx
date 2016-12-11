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
  NavDropdown,
  FormControl,
  FormGroup,
  Button,ControlLabel,HelpBlock
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
    this.state = {
      value: ''
    }
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  render(){
    return (
      <Col lgPush={2} lg={8} lgPull={2} md={8} mdPush={2} mdPull={2}>


        <Row className="show-grid">

<Col>
          <div><form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <ControlLabel>Working example with validation</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
        <Button type="submit">Submit</Button>
      </form></div></Col>
        </Row>
      </Col>
    )
  }
}

export default AdminContentComponent
