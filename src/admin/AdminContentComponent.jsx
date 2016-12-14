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
      category: ''
    }
    this.addClass = this.addClass.bind(this)
  }

  handleChange(key,e) {
    var newState = {}
    newState[key] = e.target.value
    this.setState(newState);
  }

  addClass(){
    console.log(JSON.stringify({
      category: this.state.category,
      activity: this.state.activity,
      postcode: this.state.postcode
    }))
this.props.dispatchAddClass({
  category: this.state.category,
  activity: this.state.activity,
  postcode: this.state.postcode
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
          <FormControl.Feedback />
            <ControlLabel>Postcode</ControlLabel>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="Postcode"
              onChange={this.handleChange.bind(this, "postcode")}
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
