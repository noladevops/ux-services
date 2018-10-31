import React from 'react';
import './Address.css';
import {Button, Card, CardText, CardBody,
  CardTitle, CardSubtitle} from 'reactstrap'

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: props.selectedAddress.latitiude, lng: props.selectedAddress.longitude }}
  >
    <Marker
      position={{ lat: props.selectedAddress.latitiude, lng: props.selectedAddress.longitude }}
    />
  </GoogleMap>
));




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
    return(

      <div >
      <Card>
      <div>
        <br /><CardTitle>
         {this.props.selectedAddress.originalText}
      </CardTitle>
      </div>
      <div>
        Customer: <br />
        {this.props.selectedAddress.customerText}
      </div>
      <div>
        Address: <br />
        {this.props.selectedAddress.formattedAddress}
      </div>
      <div>
        Crew Lead: <br />
        {this.props.selectedAddress.crewLead}
      </div>
      <div>
        Day: <br />
        {this.props.selectedAddress.day}
      </div>
      <div style={{width:"500px", border: "solid 1px black"}}>
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDoVv74fnXToA81zD74jroKIsBtWuuoqgY&v=3.exp&libraries=geometry,drawing,places"
          selectedAddress = {this.props.selectedAddress}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `200px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
      </Card>
    </div>)
  }

}

export default Address;
