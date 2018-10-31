import React from 'react';
import ReactDataGrid from 'react-data-grid';
import Customer from './Customer'
import Modal from 'react-modal'
import './Customers.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    maxWidth             : '800px',
    maxHeight            : '700px'
  }
};

class Customers extends React.Component {

  constructor(props,context) {
    super(props,context);
    this.state = {
     modalIsOpen: false
     ,customers: [{"id":-1,"name":"Ghost","contact":"Mr Ghost","email":"ghost@ghost.ghost"}]
     ,selectedCustomer: {}
   };

   this.openModal = this.openModal.bind(this);
   this.afterOpenModal = this.afterOpenModal.bind(this);
   this.closeModal = this.closeModal.bind(this);
   this.columns = [
      { key: 'name', name: 'Customer'}
      ,{key: 'contact', name: 'Contact'}
      ,{key: 'email', name: 'Email'}
    ]
  }

  rowGetter = (i) => {
    return this.state.customers[i];
  };

  componentDidMount() {
   fetch("api/customers",{
  credentials: "include"
})
  .then( response => {
    if (!response.ok) { throw new Error(response) }
    return response.json()  //we only get here if there is no error
  })
  .then( (json) => {
      // let customers = json.data.map( (customer) => {
      //   console.log(customer);
      //   return customer;
      // } );
      this.setState({"customers": json.data});
    }
  )

  .catch( (err) => {
      console.log(err)
  })
}

openModal() {
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
    // lazy-load a devices messages before setting state
    fetch("api/customers/" + this.rowGetter(rowIndex)._id)
    .then( (response)=>{
      console.log(response);
      return response.json();
    })
    .then( (json)=> {
      //this.rowGetter(rowIndex).messages = json.data.messages;
      console.log(json);
      this.setState({selectedCustomer: json.customer});
      // console.log(this.state.selectedCustomer)
      this.openModal();
      // this.state.selectedCustomer.addressObjects = [];
      // this.state.selectedCustomer.addresses.map( (address)=>{
      //   .fetch("api/addresses" + address)
      //   .then( (response)=> {
      //      this.state.selectedCustomer.addressObjects.push(response.json());
      //   })
      // })
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
    <div className="operations-container" >
      Customers <br />
      Count: {this.state.customers.length}
      <div className="customer-container">
          <ReactDataGrid
            columns={this.columns}
            rowGetter={this.rowGetter}
            rowsCount={this.state.customers.length}
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
         contentLabel="Customer Details">
           <Customer  selectedCustomer={this.state.selectedCustomer} />
        </Modal>
      </div>
    </div>


  )
}

}

export default Customers;
