import React from 'react';
import './Session.css';



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
    return(<div >
      <div>
        Device Id: {this.props.selectedSession._id}
      </div>
      <div>
          User:  {this.props.selectedSession.user._id}
      </div>
      <div>
        Last Request: { this.props.selectedSession.lastRequest }
      </div>
      <div>
        Session Object:

        {this.props.selectedSession.sessionObject}
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
