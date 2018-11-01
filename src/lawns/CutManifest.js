import React from 'react';
import './CutManifest.css';
import Calendar from 'react-big-calendar';
import {Row,Col, InputGroup,Input,InputGroupAddon} from 'reactstrap';
import {Dropdown,DropdownMenu,DropdownItem,DropdownToggle, Card, CardBody, Button} from 'reactstrap'
import moment from 'moment';


const localizer =  Calendar.momentLocalizer(moment);

import "react-big-calendar/lib/css/react-big-calendar.css";

class CutManifest extends React.Component {
  constructor(props,context) {
      super(props,context);
      this.toggle = this.toggle.bind(this);

    }

  state = {
      dropdownOpen: false,
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

  render() {
    return(
      <div>
      <Card>
          <CardBody>
            <Row>
                <Col>
                    <Dropdown  isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                      Crew Lead
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Header</DropdownItem>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another Action</DropdownItem>
                      <DropdownItem>Another Action</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
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
