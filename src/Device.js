import React from 'react';
import './Device.css';
import Message from './Message'


class Device extends React.Component {

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
        Device Id: {this.props.selectedDevice._id}
      </div>
      <div>
          Device Name:  {this.props.selectedDevice.deviceName}
      </div>
      <div>
        Device Type: { this.props.selectedDevice.deviceType}
      </div>
      <div>
        Last Seen:
        <br/> {new Date(this.props.selectedDevice.lastSeen).toTimeString()}
        <br /> {new Date(this.props.selectedDevice.lastSeen).toDateString()}
      </div>
      <fieldset>
        <legend>Messages</legend>
        <ul>
          {this.props.selectedDevice.messages.map( (message)=>{
            return <li><Message messageData={message} /></li>
          })}
        </ul>
      </fieldset>
    </div>)
  }

}

export default Device;
