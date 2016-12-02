import React, {PropTypes} from 'react';
import {Row,Col,Button,ButtonGroup,Accordion,
  Panel} from 'react-bootstrap';
import './App.css';
import 'leaflet/dist/leaflet.js';
import 'leaflet/dist/leaflet.css';
import {connect} from 'react-redux'
import {toggleCategory, toggleActivity} from './ActionTypes'

const filterBarFunc = ({allCategories, allActivities, location, handleCategoryChange, handleActivityChange}) => {
return <FilterBar allCategories={allCategories} allActivities={allActivities} locationValue={location} onCategoryChange={handleCategoryChange} onActivityChange={handleActivityChange}/>
}

class FilterBar extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleActivityChange = this.handleActivityChange.bind(this);
  }

  handleChange(e) {
    console.log('handle searchform change' + e)
    this.props.onCategoryChange(e)
  }

  handleActivityChange(e) {
    console.log('handle activity change' + e)
    this.props.onActivityChange(e)
  }

  handleLocationChange(e) {
    console.log('location change')
  }

  render() {
    var categoryButtonList = []
    function createButton(changeFunc, category) {
      console.log("category -> " + category + " -> " + "changeFunc" + changeFunc)
      categoryButtonList.push(< FilterButton key = {
        category
      }
      text = {
        category
      }
      buttonClick = {
        changeFunc
      } />)
    }
    this.props.allCategories.forEach(createButton.bind(null, this.handleChange))
    var activityButtonList = []
    function createActivityButton(changeFunc, activity) {
      console.log("activity -> " + activity + " -> " + "changeFunc" + changeFunc)
      activityButtonList.push(< FilterButton key = {
        activity
      }
      text = {
        activity
      }
      buttonClick = {
        changeFunc
      } />)
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
  constructor(props) {
    super(props)
    this.state = {
      active: true,
      style: "primary"
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange() {
    if (this.state.active) {
      this.setState({active: false, style: "info"})
    } else {
      this.setState({active: true, style: "primary"})
    }
    this.props.buttonClick(this.props.text)
  }

  render() {
    return (
      <Button onClick={this.handleChange}>{this.props.text}</Button>
    )
  }

}

FilterButton.propTypes = {
  buttonClick: PropTypes.func.isRequired
}

function unique(value, index, self) {
  return self.indexOf(value) === index;
}

const mapStateToProps = (state) => {
  var tempCategories = []
  var tempActivities = []
  state.babyClasses.forEach(function(c) {
    tempCategories.push(c.category)
    tempActivities.push(c.activity)
  })
  return {
    allCategories: tempCategories.filter(unique),
    allActivities: tempActivities.filter(unique),
    location: state.location
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleCategoryChange: (category) => {
      dispatch(toggleCategory(category))
    },
    handleActivityChange: (activity) => {
      dispatch(toggleActivity(activity))
    }
  }
}

const FilterBarComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(filterBarFunc)

export default FilterBarComponent
