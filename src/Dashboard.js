import React from 'react';
import './Dashboard.css';

class Dashboard extends React.Component {

  state =  {
    devices: {}
  }

 componentDidMount() {

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
      var devices = Array.from(new Map(JSON.parse(response.data)).values());
      this.setState({devices: devices});
  })
  .catch( (error)=> {
    console.log("Could not load device data" + error.message);
    this.setState( {devices : {}, error: "Could not communicate with backend" } );
  })




}

render() {
  return (
    <div>
      nolab.io device-status
      
    </div>
  )
}

}

export default Dashboard;
