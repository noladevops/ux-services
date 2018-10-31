import React from 'react';
import './Address.css';



class Address extends React.Component {

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
        Customer: {this.props.selectedAddress.originalText}
      </div>
      <div>

      </div>
      <div>

      </div>
      <div>
      </div>
      <fieldset>
        <legend>Requests</legend>
        <ul>

        </ul>
      </fieldset>
    </div>)
  }

}

export default Session;
