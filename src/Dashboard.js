import React from 'react';
import './Dashboard.css';


class Dashboard extends React.Component {

  state =  {
    devices: {}
  }

 componentDidMount() {

  fetch('/api/all-devices')
  .then( (response)=>{
    if (!response.ok) {
    throw Error(response.statusText);
    }
    return response;
   })
  .then(
    res => res.json())
  .then( (response) => {
    var devices = Array.from(new Map(JSON.parse(response.data)).values());
    this.setState({devices: devices});
  })
  .catch( (error)=> {
    console.log(error);
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
