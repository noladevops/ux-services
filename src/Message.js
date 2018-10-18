import React from 'react';
import './Message.css';


class Message extends React.Component {

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
      <div>
        {this.props.messageData.messageTopic}
      </div>
      <div>
        {this.props.messageData.messageBody}
      </div>
      <div>
        {this.props.messageData.messageStatus}
      </div>
      </div>
    )

  }

}

export default Message;
