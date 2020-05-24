import React, { Component } from 'react';
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Checkbox } from 'primereact/checkbox';
import { Panel } from 'primereact/panel';
import {InputText} from "primereact/inputtext";

class MainPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      shoppingList: [],
      Name: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getShoppingList = this.getShoppingList.bind(this);
  }

  getShoppingList() {
    axios.get(`http://localhost:5000/api/TODO`)
    .then(res => {
      this.setState({ 'shoppingList': res.data });
    })
  }

  componentDidMount() {
    this.getShoppingList()
  }


  handleSubmit = event => {
    event.preventDefault();

    axios.post(`http://localhost:5000/api/TODO`, { Name: this.state.newItem,
    Status: false })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.getShoppingList()
      })

      
  }

  render() {
    return (
      <div>
        <Panel header="Godfather I">

        <div className="p-grid" style={{width:'500px'}}>

        {this.state.shoppingList.map((shoppingItem,i) => {
        return (

          <div className="p-col-12"> <Checkbox key={i} ></Checkbox>
          <label htmlFor="cb1" className="p-checkbox-label">{shoppingItem.name}</label>
           </div> 
        
        )
       
        
      })}

</div>
      <br></br>
  

      <div className="p-col-12 p-md-4">
                            <div className="p-inputgroup">
                                <InputText  placeholder="add a new item" 	value={this.state.newItem} onChange={e => this.setState({ newItem: e.target.value })}/>
                                <Button icon="pi pi-plus-circle" className="p-button-secondary" onClick={this.handleSubmit}/>

                            </div>
                        </div>
          
        </Panel>
        
      </div>
    )
  }
}

export default MainPage;