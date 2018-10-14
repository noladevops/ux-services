import React from 'react';
import './Dashboard.css';


class Dashboard extends React.Component {

  constructor(props,context) {
    super(props,context);

  }

  componentWillUnmount() {

  }

  componentDidMount() {

  }

  render() {
    return( <div>
      {this.props.selectedDevice.deviceName}
      </div>)
  }

}

export default Dashboard;
