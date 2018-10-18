import React from 'react';
import './User.css';



class User extends React.Component {

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
    <div >
      <div>
        Username: {this.props.selectedUser.username}
      </div>
      <div>
          Auth Provider:  {this.props.selectedUser.authProvider}
      </div>
      <div>
        Last Request: { this.props.selectedUser.lastSeen }
      </div>
    </div>)
  }

}

export default User;
