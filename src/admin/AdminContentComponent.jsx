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
import {createAddClass} from '../ActionTypes'

function contentFunc(props) {
  return <AdminContent dispatchAddClass={props.dispatchAddClass}/>
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      dispatchAddClass: (clazz) => {
        console.log("firing add class event: $clazz")
        dispatch(createAddClass(clazz))
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
      }
    }
    this.addClass = this.addClass.bind(this)
  }

  handleChange(key,e) {
    var newState = {}
    newState[key] = e.target.value
    this.setState(newState);
  }

  handleAddressChange(key, e){
    var newAddress = this.state.address
    newAddress[key] = e.target.value
    this.setState({address: newAddress})
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
              onChange={this.handleAddressChange.bind(this, "house")}
            />
            <FormControl.Feedback />
              <FormControl.Feedback />
            <ControlLabel>Town</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="Town"
                  onChange={this.handleAddressChange.bind(this, "town")}
                />
                <FormControl.Feedback />
                  <FormControl.Feedback />
                <ControlLabel>City</ControlLabel>
                    <FormControl
                      type="text"
                      value={this.state.value}
                      placeholder="City"
                      onChange={this.handleAddressChange.bind(this, "city")}
                    />
                    <FormControl.Feedback />
          <FormControl.Feedback />
            <ControlLabel>Postcode</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Postcode"
              onChange={this.handleAddressChange.bind(this, "postcode")}
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
