import React from 'react';
import './Dashboard.css';


class Dashboard extends React.Component {

  state =  {
    "devices": [{"id":-1,"name":"ghost-device"}]
  }

  componentDidMount() {

   //engage the callback loop
   //this.interval = setInterval( ()=> {mqttConnection.phoneHome()},mqttConnection.deviceArgs.callbackInterval);

  fetch('/devices/all-devices')
  .then( response => {
    if (!response.ok) { throw response }
    return response.json()  //we only get here if there is no error
  })
  .then( json => {
    this.props.dispatch( (json)=> {
      var devices = JSON.parse(json);
      console.log(devices);
      //this.state.devices = devices;
      this.setState({"devices": devices});
    }
  )
  .catch( err => {
    err.text().then( errorMessage => {
      this.props.dispatch(console.log(errorMessage))
    })
  })
})
}




// componentWillUnmount() {
//   clearInterval(this.interval);
// }

render() {
  return (
    <div>
      nolab.io device-status
      <ul className="device-list"> {this.state.devices.map((device) => <li key={device.id}>{device.name} </li>)} </ul>
    </div>
  )
}

}

export default Dashboard;
