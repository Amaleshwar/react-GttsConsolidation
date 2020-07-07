import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import AddEmployee from './AddEmployee.js';
import UpdatedeleteEmp from './UpdatedeleteEmp.js';
import ViewEmployees from './ViewEmployees.js';
import Activity from './Activity.js';

  class UpdateEmployee extends React.Component  {
    constructor(props) {
      super(props);
      this.state = { 
                  empdetails: [],
                  activitydetails:[],
                  showadd:true,
                  showupdate:false,
                  showview:false,
                  showactivity:false,
       }
       
  }
    

    componentDidMount(){
    

    }

    handleadd(e){
      this.setState({showupdate:false,showview:false,showadd:true,showactivity:false})

    }
    handleupdate(e){
      this.setState({showadd:false,showview:false,showupdate:true,showactivity:false})

    }
    handleview(e){
      this.setState({showupdate:false,showadd:false,showview:true,showactivity:false})

    }
    handleactivity(e){
      this.setState({showupdate:false,showadd:false,showview:false,showactivity:true})

    }
    
   
  
      render(){
       
    return (
    <div className="App">
      
                <h1>Update Employee </h1>

                <button className="add btn btn-secondary" onClick={(e)=>this.handleadd(e)}  >Add</button>
                <button className="update btn btn-secondary" onClick={(e)=>this.handleupdate(e)}  >Update/Delete</button>
                <button className="viewall btn btn-secondary" onClick={(e)=>this.handleview(e)}  >View All</button>
                <button className="viewall btn btn-secondary" onClick={(e)=>this.handleactivity(e)}  >Activity</button>

                {this.state.showadd && 
                  <AddEmployee />
                }

                {this.state.showupdate && <UpdatedeleteEmp/>
                }

                {this.state.showview &&  <ViewEmployees />
                }
                {this.state.showactivity &&  <Activity />
                }


      
               
    </div>
  )}
}

export default UpdateEmployee;



