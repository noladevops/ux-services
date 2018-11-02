import React from 'react';
import './CutManifest.css';
import {Row,Col, InputGroup,Input,InputGroupAddon} from 'reactstrap';
import {Alert,Dropdown,DropdownMenu,DropdownItem,DropdownToggle, Card, CardBody, Button} from 'reactstrap'
import moment from 'moment';
import lodash from 'lodash'






class CutManifest extends React.Component {
  constructor(props,context) {
      super(props,context);
      this.toggleDropdown = this.toggleDropdown.bind(this);
      this.selectCrewLead = this.selectCrewLead.bind(this);
      this.addressFilterChange = this.addressFilterChange.bind(this);
      this.customerFilterChange = this.customerFilterChange.bind(this);
    }

  state = {
      dropdownOpen: false,
      crewLeads: [],
      addresses: [],
      filterEchoText: "",
      filteredAddresses:[],
      activeAddresses: [],
      selectedAddress: [],
      filteredCustomers:[],
      activeCustomers: [],
      selectedCustomer: [],
      customerSearchText: [],
      addressSearchText: [],
      days: [],
      selectedCrewLead: {
        name: "all leads"
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
        var timedAddresses = json.data.map( (address)=> {
          address.start = new Date(moment().day(address.day));
          address.end = new Date(moment().day(address.day));
          return address;
        })
          this.setState({addresses: timedAddresses,activeAddresses: timedAddresses, filterEchoText: "loaded " + timedAddresses.length + " addresses"});
      });
      fetch("/api/customers", {credentials: "include" })
      .then( response => {
        if (!response.ok) { throw new Error(response) }
        return response.json()  //we only get here if there is no error
      })
      .then( (json) => {
          this.setState({customers: json.data});
      });
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

  //dropdown methods
  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  selectCrewLead(event) {
    var crewLead = lodash.filter(this.state.crewLeads, x => x.name === event.target.innerText)[0];
    this.setState( {selectedCrewLead:  crewLead });
    var crewAddresses = lodash.filter(this.state.addresses, x => x.lead === crewLead._id);
    this.setState( {activeAddresses: crewAddresses,filterEchoText: event.target.innerText + " - " + crewAddresses.length + " addresses"});
  }

  addressFilterChange(event) {
    var activeAddresses = lodash.filter(this.state.activeAddresses, x => x.originalText.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0 );
    this.setState({filteredAddresses: activeAddresses, filterEchoText: this.state.selectedCrewLead.name + " - " + event.target.value + " " + activeAddresses.length  });
  }

  customerFilterChange(event){
    var activeCustomers = lodash.filter(this.state.customers, x => x.name.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0 );
    //todo: shove customer's addresses into state here as filteredAddresses,

    this.setState({filteredCustomers: activeCustomers, filterEchoText: event.target.value + " - " + activeCustomers.length + " customers" });
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
                    <Dropdown size="sm"  isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} >
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
                      {this.state.filterEchoText}
                    <Button> Create </Button>
                  </CardBody>
              </Card>
            <Row>
            <Col>
                <ul>
                  <li> An address </li>
                </ul>
            </Col>
            </Row>
          </CardBody>
      </Card>

      </div>);
  }

}


export default CutManifest;
