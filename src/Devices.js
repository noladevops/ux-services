import React from 'react';
import ReactDataGrid from 'react-data-grid';
import Device from './Device'
import Modal from 'react-modal'
import './Devices.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Devices extends React.Component {




  constructor(props,context) {
    super(props,context);
    this.state = {
     modalIsOpen: false
     ,devices: [{"id":-1,"name":"ghost-device"}]
     ,selectedDevice: {}
   };

   this.openModal = this.openModal.bind(this);
   this.afterOpenModal = this.afterOpenModal.bind(this);
   this.closeModal = this.closeModal.bind(this);
    this._columns = [
      { key: 'deviceName', name: 'Device'}
      ,{key: 'lastSeen', name: 'Last Seen'}
    ]
  }






  rowGetter = (i) => {
    return this.state.devices[i];
  };

  componentDidMount() {
    this.columns = [{key: 'deviceName', name: 'Device'},{key: 'lastSeen', name: 'Last Seen'}];

   //engage the callback loop
   //this.interval = setInterval( ()=> {mqttConnection.phoneHome()},mqttConnection.deviceArgs.callbackInterval);

  fetch("api/devices/",
  {credentials: 'include'})
  .then( response => {
    if (!response.ok) { throw response }
    return response.json()  //we only get here if there is no error
  })
  .then( (json) => {
      let devices = json.data.map( (device) => {
        device.key = device._id;
        return device;
      } );
      //var devices = JSON.parse(json.data);
      //console.log(devices);
      //this.state.devices = devices;
      this.setState({"devices": devices});
    }
  )

  .catch( (err) => {
      console.log(err)
  })
}

openModal() {
  console.log("Open Modal")
   this.setState({modalIsOpen: true});
 }

 afterOpenModal() {
   // references are now sync'd and can be accessed.
   //this.subtitle.style.color = '#f00';
 }

 closeModal() {
   this.setState({modalIsOpen: false});
 }

 onRowsSelected = (rowIndex) => {
    console.log("Row Selected" + "\n" + this.rowGetter(rowIndex) );
    // lazy-load a devices messages before setting state
    fetch("api/devices/telemetry/" + this.rowGetter(rowIndex)._id)
    .then( (response)=>{
      return response.json();
    })
    .then( (json)=> {
      this.rowGetter(rowIndex).messages = json.data.messages;
      this.setState({selectedDevice: this.rowGetter(rowIndex)});
      //this.setState({selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx))});
      this.openModal();
    })

  };

  onRowsDeselected = (rows) => {

    //let rowIndexes = rows.map(r => r.rowIdx);
    //this.setState({selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1 )});
  };


// componentWillUnmount() {
//   clearInterval(this.interval);
// }

render() {
  return (
    <div className="app-container" >
      Devices <br />
      Count: {this.state.devices.length}
      <div className="device-container">
          <ReactDataGrid
            columns={this._columns}
            rowGetter={this.rowGetter}
            rowsCount={this.state.devices.length}
            minHeight={500}
            enableRowSelect="single"
            onRowClick={this.onRowsSelected}
            rowSelection={{
            showCheckbox: false,
              selectBy: {
                isSelectedKey: 'isSelected'
            }}}
            />
      </div>
      <div>
        <Modal
         isOpen={this.state.modalIsOpen}
         onAfterOpen={this.afterOpenModal}
         onRequestClose={this.closeModal}
         style={customStyles}
         ariaHideApp={false}
         contentLabel="Device Details">
           <Device  selectedDevice={this.state.selectedDevice} />
        </Modal>
      </div>
    </div>

  )
}

}

export default Devices;
