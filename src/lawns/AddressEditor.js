import React from 'react';
import './CutManifest.css';
import {Row,Col, InputGroup,Input,InputGroupAddon} from 'reactstrap';
import Modal from 'react-modal';
import Address from './Address';
import Customer from './Customer';
import {Alert,Dropdown,DropdownMenu,DropdownItem,DropdownToggle, Card, CardBody, Button} from 'reactstrap'


class AddressEditor extends React.Component {
  constructor(props,context) {
    super(props,context);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleDayDropdown = this.toggleDayDropdown.bind(this);
    this.selectDay = this.selectDay.bind(this);
    this.selectCrewLead = this.selectCrewLead.bind(this);

    this.state = {dayDropdownOpen: false,
    dropdownOpen: false,
    crewLeads:[],
    days:[],
    selectedAddress: {
      lat: 0,
      lng: 0,
      lead: {
        name:""
      },
      cutDay:{
        name:""
      }

    }
  }
}

componentDidMount(){
  fetch("/api/days", {credentials: "include" })
  .then( response => {
    if (!response.ok) { throw new Error(response) }
    return response.json()  //we only get here if there is no error
  })
  .then( (json) => {
      this.setState({days: json.data});
  });
  fetch("/api/crew/leads", {credentials: "include" })
  .then( response => {
    if (!response.ok) { throw new Error(response) }
    return response.json()  //we only get here if there is no error
  })
  .then( (json) => {
      this.setState({crewLeads: json.data});
  });
}

componentWillReceiveProps(newProps) {
      if(!newProps.selectedAddress.cutDay) newProps.selectedAddress.cutDay = {name: "Not Active"}
      this.setState({selectedAddress: newProps.selectedAddress});
  }

  //dropdown methods
  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  toggleDayDropdown() {
    this.setState(prevState => ({
      dayDropdownOpen: !prevState.dayDropdownOpen
    }));
  }

selectDay(obj,evt){
  console.log(obj);

}
selectCrewLead(obj,evt){
  console.log(obj);
}

render(){
  let dropdownItems = this.state.crewLeads.map( (crewLead)=>{
    if (crewLead.name !== 'crew'){
      return <DropdownItem onClick={this.selectCrewLead.bind(null,crewLead)} key={crewLead._id}>{crewLead.name}</DropdownItem>
    } else { return}
  })
  let dayDropdownItems = this.state.days.map( (day)=>{
    if (day.name !== 'crew'){
      return <DropdownItem onClick={this.selectDay.bind(null,day)} key={day._id}>{day.name}</DropdownItem>
    } else { return}
  })
  return(
    <div>
    <Row>
      <Col>
        <Alert color="primary">
        Cut Day: {this.state.selectedAddress.cutDay.name}
        <Dropdown size="sm"  isOpen={this.state.dayDropdownOpen} toggle={this.toggleDayDropdown} >
          <DropdownToggle caret>
            Change
          </DropdownToggle>
          <DropdownMenu left>
            {dayDropdownItems}
          </DropdownMenu>
        </Dropdown>
        </Alert>
      </Col>
      <Col>
        <Alert color="primary">Crew Lead: {this.state.selectedAddress.lead.name}
        <Dropdown size="sm"  isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} >
          <DropdownToggle caret>
            Change
          </DropdownToggle>
          <DropdownMenu left>
            {dropdownItems}
          </DropdownMenu>
        </Dropdown>
        </Alert>
      </Col>
    </Row>
   <Row>
     <Col>
       <Address  selectedAddress={this.state.selectedAddress} />
     </Col>
   </Row>
   <Row>
     <Col>

     </Col>
   </Row>
   </div>
 )}

}

module.exports = AddressEditor
