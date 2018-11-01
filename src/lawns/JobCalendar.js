import React from 'react';
import './JobCalendar.css';
import Calendar from 'react-big-calendar';
import {Dropdown,DropdownMenu,DropdownItem,DropdownToggle, Card, CardBody} from 'reactstrap'
import moment from 'moment';


const localizer =  Calendar.momentLocalizer(moment);

import "react-big-calendar/lib/css/react-big-calendar.css";

class JobCalendar extends React.Component {

  state = {
      events: [
        {
          start: new Date(),
          end: new Date(moment().subtract(4, "hours")),
          title: "Some title"
        }
      ]
    };
  // constructor(props,context) {
  //   super(props,context);
  //
  // }

  componentWillUnmount() {

  }

  componentDidMount() {

  }

  render() {
    return(
      <div>
      <Card>
          <CardBody>
              <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={this.state.events}
                style={{ height: "100vh" }}
              />
          </CardBody>
      </Card>

      </div>);
  }

}


export default JobCalendar;
