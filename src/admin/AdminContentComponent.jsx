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
import {createAddClass, createVerifyAddress} from '../ActionTypes'

function contentFunc(props) {
  return <AdminContent dispatchAddClass={props.dispatchAddClass} dispatchVerifyAddress={props.dispatchVerifyAddress}/>
}

const mapStateToProps = (state) => {
  return {
addressVerified: state.admin.addressVerified,
addressVerificationError: state.admin.addressVerificationError,
location: state.admin.location
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      dispatchAddClass: (clazz) => {
        console.log("firing add class event: $clazz")
        dispatch(createAddClass(clazz))
      },
      dispatchVerifyAddress: (address) => {
        console.log("firing verify address")
        dispatch(createVerifyAddress(address))
      }
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
      activity: '',
      category: '',
      address: {
        house: '',
        town: '',
        city: '',
        postcode: ''
      },
      location: props.location
    }
    this.addClass = this.addClass.bind(this)
    this.verifyAddress  = this.verifyAddress.bind(this)
  }

  verifyAddress(){
    this.props.dispatchVerifyAddress(this.state.address)
  }

  handleChange(key,e) {
    var newState = {}
    newState[key] = e.target.value
    this.setState(newState);
  }

  handleObjectChange(obj,key, e){
    var object = this.state[obj]
    object[key] = e.target.value
    var newState = {}
    newState[obj] = object
    this.setState(newState)
  }

  addClass(){
    console.log(JSON.stringify({
      category: this.state.category,
      activity: this.state.activity,
      address: this.state.address
    }))
this.props.dispatchAddClass({
  category: this.state.category,
  activity: this.state.activity,
  address: this.state.address
})
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
          <div><form id="newClass">
        <FormGroup
          controlId="formBasicText"

        >
        <ControlLabel>Category</ControlLabel>
        <FormControl
          type="text"
          value={this.state.value}
          placeholder="Category"
          onChange={this.handleChange.bind(this, "category")}
        />
        <FormControl.Feedback />
          <ControlLabel>Activity</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Activity"
            onChange={this.handleChange.bind(this, "activity")}
          />
        </FormGroup>
        <FormGroup>
          <FormControl.Feedback />
        <ControlLabel>House/Building</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="House/Building"
              onChange={this.handleObjectChange.bind(this, "address","house")}
            />
            <FormControl.Feedback />
              <FormControl.Feedback />
            <ControlLabel>Town</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="Town"
                  onChange={this.handleObjectChange.bind(this,"address", "town")}
                />
                <FormControl.Feedback />
                  <FormControl.Feedback />
                <ControlLabel>City</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.value}
                      placeholder="City"
                      onChange={this.handleObjectChange.bind(this,"address", "city")}
                    />
                    <FormControl.Feedback />
          <FormControl.Feedback />
            <ControlLabel>Postcode</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Postcode"
              onChange={this.handleObjectChange.bind(this,"address", "postcode")}
            />
            <FormControl.Feedback />
            <Button onClick={this.verifyAddress}>Verify Address</Button>
            <p>{this.props.addressVerified}</p>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Lat</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Lat"
            onChange={this.handleObjectChange.bind(this,"location", "lat")}
          />
          <FormControl.Feedback />
            <ControlLabel>Lng</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Lng"
              onChange={this.handleObjectChange.bind(this,"location", "lng")}
            />
            <FormControl.Feedback />
        </FormGroup>
        <Button onClick={this.addClass}>Submit</Button>
      </form></div></Col>
        </Row>
      </Col>
    )
  }
}

export default AdminContentComponent
