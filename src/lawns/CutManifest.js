import React from 'react';
import './CutManifest.css';
import {Row,Col, InputGroup,Input,InputGroupAddon} from 'reactstrap';
import {Modal,Alert,Dropdown,DropdownMenu,DropdownItem,DropdownToggle, Card, CardBody, Button} from 'reactstrap'
import moment from 'moment';
import lodash from 'lodash'





const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    maxWidth             : '800px',
    maxHeight            : '700px'
  }
};


class CutManifest extends React.Component {
  constructor(props,context) {
      super(props,context);
      this.toggleDropdown = this.toggleDropdown.bind(this);

      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.toggleDayDropdown = this.toggleDayDropdown.bind(this);
      this.selectDay = this.selectDay.bind(this);
      this.selectCrewLead = this.selectCrewLead.bind(this);
      this.addressFilterChange = this.addressFilterChange.bind(this);
      this.customerFilterChange = this.customerFilterChange.bind(this);

    }



  state = {
    modalIsOpen: false,
      dropdownOpen: false,
      dayDropdownOpen: false,
      crewLeads: [],
      addresses: [],
      selectedDay: {name: "all days"},
      addressFilter: "",
      customerFilter: "",
      filterEchoText: "",
      filteredAddresses:[],
      activeAddresses: [],
      selectedAddress: [],
      filteredCustomers:[],
      activeCustomers: [],
      selectedCustomer: [],
      crewAddresses: [],
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
          this.setState({addresses: timedAddresses,activeAddresses: timedAddresses,filteredAddresses:timedAddresses, filterEchoText: "loaded " + timedAddresses.length + " addresses"});
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

  toggleDayDropdown() {
    this.setState(prevState => ({
      dayDropdownOpen: !prevState.dayDropdownOpen
    }));
  }

  openModal(){
    this.setState({modalIsOpen: true});
  }

  closeModal(){
    this.setState({modalIsOpen: false});
    }

    afterOpenModal(){

    }

  selectCrewLead(event) {

    var crewLead = lodash.filter(this.state.crewLeads, x => x.name === event.target.innerText)[0];
    this.setState( {selectedCrewLead:  crewLead });
    var crewAddresses = lodash.filter(this.state.activeAddresses, x => x.lead === crewLead._id);
    this.setState( {customerFilter: "", addressFilter:"",crewAddresses: crewAddresses,filteredAddresses: crewAddresses,filterEchoText: event.target.innerText + " - " + crewAddresses.length + " addresses",selectedDay: {name: "all days"}});

  }

  selectDay(event){
    var day = lodash.filter(this.state.days, x => x.name === event.target.innerText)[0];
    this.setState( {selectedDay:  day });
    var dayAddresses = lodash.filter(this.state.crewAddresses, x => x.cutDay === day._id);
    this.setState( {customerFilter: "", addressFilter:"",filteredAddresses: dayAddresses,filterEchoText: event.target.innerText + " - " + dayAddresses.length + " addresses"});
  }

  addressFilterChange(event) {

    var activeAddresses = lodash.filter(this.state.activeAddresses, x => x.originalText.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0 );
    this.setState({addressFilter: event.target.value,customerFilter:"",filteredAddresses: activeAddresses, filterEchoText: this.state.selectedCrewLead.name + " - " + event.target.value + " " + activeAddresses.length  });
  }

  customerFilterChange(event){
    var activeCustomers = lodash.filter(this.state.customers, x => x.name.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0 );
    //todo: shove customer's addresses into state here as filteredAddresses,
    var addressIdArrays = activeCustomers.map( (customer)=> {
      return customer.addresses;
    });
    var mergedIds = [].concat.apply([], addressIdArrays);
    this.setState({})
    this.setState({customerFilter: event.target.value,addressFilter:"",filteredAddresses: this.getAddresses(mergedIds),filteredCustomers: activeCustomers, filterEchoText: event.target.value + " - " + activeCustomers.length + " customers" });
  }



  getAddresses(idArray){
    // console.log(this.state.activeAddresses);
    var addressArrays = idArray.map( id=>{
      return lodash.filter(this.state.activeAddresses, x => x._id === id)
    });
    var addressArray = [].concat.apply([], addressArrays);
    return addressArray;
  }

  render() {
    let dropdownItems = this.state.crewLeads.map( (crewLead)=>{
      if (crewLead.name !== 'crew'){
        return <DropdownItem onClick={this.selectCrewLead} key={crewLead._id}>{crewLead.name}</DropdownItem>
      } else { return}
    })
    let dayDropdownItems = this.state.days.map( (day)=>{
      if (day.name !== 'crew'){
        return <DropdownItem onClick={this.selectDay} key={day._id}>{day.name}</DropdownItem>
      } else { return}
    })
    return(
      <div>
      <div>
      <Modal
       isOpen={this.state.modalIsOpen}
       onRequestClose={this.closeModal}
       ariaHideApp={false}
       style={customStyles}
       contentLabel="Address Details">

       Hey
         </Modal>

      </div>
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
                <Dropdown size="sm"  isOpen={this.state.dayDropdownOpen} toggle={this.toggleDayDropdown} >
                  <DropdownToggle caret>
                    Cut Day
                  </DropdownToggle>
                  <DropdownMenu left>
                    {dayDropdownItems}
                  </DropdownMenu>
                </Dropdown>
                </Col>
                <Col>
                  <Alert color="primary">
                      {this.state.selectedCrewLead.name + " - " + this.state.selectedDay.name}
                  </Alert>
                </Col>
                <Col>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">Address:</InputGroupAddon>
                      <Input  value={this.state.addressFilter} onChange={this.addressFilterChange} />
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">Customer:</InputGroupAddon>
                      <Input value={this.state.customerFilter} onChange={this.customerFilterChange}  />
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
                  {this.state.filteredAddresses.map((address)=>{
                    return <li>

                    <Alert onClick={this.openModal} color="secondary"> {address.formattedAddress} - {address.customer} - {address.day}</Alert></li>
                  })}
                </ul>
            </Col>
            </Row>
          </CardBody>
      </Card>

      </div>);
  }

}


export default CutManifest;
