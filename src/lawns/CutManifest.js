import React from 'react';
import './CutManifest.css';
import Calendar from 'react-big-calendar';
import {Row,Col, InputGroup,Input,InputGroupAddon} from 'reactstrap';
import {Alert,Dropdown,DropdownMenu,DropdownItem,DropdownToggle, Card, CardBody, Button} from 'reactstrap'
import moment from 'moment';
import lodash from 'lodash'

const localizer =  Calendar.momentLocalizer(moment);

import "react-big-calendar/lib/css/react-big-calendar.css";

class CutManifest extends React.Component {
  constructor(props,context) {
      super(props,context);
      this.toggle = this.toggle.bind(this);
      this.selectCrewLead = this.selectCrewLead.bind(this);
      this.addressFilterChange = this.addressFilterChange.bind(this);
      this.customerFilterChange = this.customerFilterChange.bind(this);
    }

  state = {
      dropdownOpen: false,
      crewLeads: [],
      addresses: [],
      activeAddresses: [],
      selectedAddress: [],
      activeCustomers: [],
      selectedCustomer: [],
      customerSearchText: [],
      addressSearchText: [],
      days: [],
      selectedCrewLead: {
        name: "(select a crew lead)"
      },
      events: [
        {
          start: new Date(),
          end: new Date(moment().add(1, "hours")),
          title: "Some title"
        }
      ]
    };

  componentWillUnmount() {

  }

  componentDidMount() {
      fetch("/api/addresses", {credentials: "include" })
      .then( response => {
        if (!response.ok) { throw new Error(response) }
        return response.json()  //we only get here if there is no error
      })
      .then( (json) => {
        console.log(json.data);
        var timedAddresses = json.data.map( (address)=> {
          address.start = new Date(moment().day(address.day));
          address.end = new Date(moment().day(address.day));
          return address;
        })
          this.setState({addresses: timedAddresses});
      });
      fetch("/api/customers", {credentials: "include" })
      .then( response => {
        if (!response.ok) { throw new Error(response) }
        return response.json()  //we only get here if there is no error
      })
      .then( (json) => {
        console.log(json.data);
          this.setState({customers: json.data});
      });
      fetch("/api/days", {credentials: "include" })
      .then( response => {
        if (!response.ok) { throw new Error(response) }
        return response.json()  //we only get here if there is no error
      })
      .then( (json) => {
        console.log(json.data);
          this.setState({days: json.data});
      });
      fetch("/api/crew/leads", {credentials: "include" })
      .then( response => {
        if (!response.ok) { throw new Error(response) }
        return response.json()  //we only get here if there is no error
      })
      .then( (json) => {
        console.log(json.data);
          this.setState({crewLeads: json.data});
      });



  }

  //dropdown methods
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  selectCrewLead(event) {
    var crewLead = lodash.filter(this.state.crewLeads, x => x.name === event.target.innerText)[0];
    console.log(crewLead);
    this.setState( {selectedCrewLead:  crewLead });
    var crewAddresses = lodash.filter(this.state.addresses, x => x.lead === crewLead._id);
    console.log(crewAddresses);
    this.setState( {activeAddresses: crewAddresses});
  }

  addressFilterChange(event) {

    console.log(event.target.value);
    // console.log(this.state.addresses);
    var activeAddresses = lodash.filter(this.state.addresses, x => x.originalText.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0 );
    console.log(activeAddresses);
    this.setState({activeAddresses: activeAddresses});
  }

  customerFilterChange(event){
    console.log(event.target.value);
    var activeCustomers = lodash.filter(this.state.customers, x => x.name.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0 );
    console.log(activeCustomers);
    this.setState({activeCustomers: activeCustomers});

  }

  render() {
    let dropdownItems = this.state.crewLeads.map( (crewLead)=>{
      if (crewLead.name !== 'crew'){
        return <DropdownItem onClick={this.selectCrewLead} key={crewLead._id}>{crewLead.name}</DropdownItem>
      } else { return}
    })
    return(
      <div>
      <Card>
          <CardBody>
            <Row>
                <Col>
                    <Dropdown size="sm"  isOpen={this.state.dropdownOpen} toggle={this.toggle} >
                    <DropdownToggle caret>
                      Crew Lead
                    </DropdownToggle>
                    <DropdownMenu left>
                      {dropdownItems}
                    </DropdownMenu>
                  </Dropdown>
                </Col>
                <Col>
                  <Alert color="primary">
                      {this.state.selectedCrewLead.name}
                  </Alert>
                </Col>
                <Col>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">Address:</InputGroupAddon>
                      <Input  onChange={this.addressFilterChange} />
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">Customer:</InputGroupAddon>
                      <Input onChange={this.customerFilterChange}  />
                    </InputGroup>
                </Col>

              </Row>
                <Card>
                  <CardBody>

                    Echo Selection
                    <Button> Create </Button>
                  </CardBody>
              </Card>
            <Row>
            <Col>
              <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="week"
                events={this.state.activeAddresses}
                style={{ height: "100vh" }}
              />
            </Col>
            </Row>
          </CardBody>
      </Card>

      </div>);
  }

}


export default CutManifest;
