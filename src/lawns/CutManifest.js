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
    }

  state = {
      dropdownOpen: false,
      crewLeads: [],
      addresses: [],
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
          this.setState({addresses: json.data});
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
                      <Input  />
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">Customer:</InputGroupAddon>
                      <Input  />
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
                events={this.state.events}
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
