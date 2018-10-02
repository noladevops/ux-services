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
  .then( response =>{
    if (!response.ok) {
      throw Error( {"message":"Unexpected response from server","data":response} );
    }
    return response
   })
  .then(
    res => res.json())
  .then( (response) => {
     if (!response.data) {
       throw Error({"message":"did not find data in response object","data":response});
     }
      var devices = JSON.parse(response.data);
      console.log(devices);
      //this.state.devices = devices;
      this.setState({"devices": devices});
  })
  .catch( (error)=> {
    console.log("Could not load device data" + error.message);
  //  this.setState( { error: "Could not communicate with backend" } );
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
