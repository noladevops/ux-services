import React from 'react';
import './Dashboard.css';
import Message from './Message'


class Session extends React.Component {

  // constructor(props,context) {
  //   super(props,context);
  //
  // }

  componentWillUnmount() {

  }

  componentDidMount() {

  }

  render() {
    return(<div>
      <div>
        Device Id: {this.props.selectedSession._id}
      </div>
      <div>
          User:  {this.props.selectedSession.user.username}
      </div>
      <div>
        Last Request: { this.props.selectedSession.lastRequest }
      </div>
      <div>
        Last Seen:
        <br/> {new Date(this.props.selectedSession.created).toTimeString()}
        <br /> {new Date(this.props.selectedDevice.lastSeen).toDateString()}
      </div>
      <fieldset>
        <legend>Requests</legend>
        <ul>
          {this.props.selectedSession.pastRequests.map( (request)=>{
            return <li> {request} </li>
          })}
        </ul>
      </fieldset>
    </div>)
  }

}

export default Session;
