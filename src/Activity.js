import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


  class Activity extends React.Component  {
    constructor(props) {
      super(props);
      this.state = { 
                  activitydetails:[],
                  empdetails:[],
                  viewupdate:false,
 
       }
       
  }
    

    componentDidMount(){
      var result;
      let formdata =new FormData();  
      formdata.append('filename',"EmployeeData");
      axios.post("http://localhost:8002/getempdata",formdata)
          .then(res=>{  
            result=   res.data;
            console.log("status text",res.data);
            console.log("data from file text",result.Activity);

          var ActivityList=[];
          result.Activity.map((act)=>{
              ActivityList.push(act);
          });
            this.setState({activitydetails:ActivityList,empdetails:result.Employee});

          })

    }


    addactivity(){
            var newact = document.getElementById("newactivity").value;
            if(newact===''){
                
            }
            else{
                var res = this.state.activitydetails
                res.push(newact);
                this.setState({activitydetails:res},()=>{
                    this.addtofile();
                })
            }

    }
    removeactivity(e,act){
        var activities = this.state.activitydetails
        var newactivities =   activities.filter((res)=> res!==act  )
        this.setState({activitydetails:newactivities},()=>{
            this.addtofile();
        })
    }
    addtofile(){
        var tempfulljson = {};
        Object.assign(tempfulljson, {"Employee": this.state.empdetails})
        Object.assign(tempfulljson, {"Activity": this.state.activitydetails})
        let formdata =new FormData();  
        var result;
        formdata.append('filename',"EmployeeData");
        formdata.append('jsondata',JSON.stringify(tempfulljson));
        axios.post("http://localhost:8002/addEmployee",formdata)
            .then(res=>{  
              result=   res.data;
              console.log("status text",res.statusText);
            
            })
    }


      render(){
  
  
    return (
    <div className="App">

                  <div> <h5>add</h5>

                      
                      <table>
                          <thead>
                          <tr><td> <input type="text" id="newactivity" placeholder="Add new Activity" /> </td> <td> <button className="empaddsubmit btn btn-primary" onClick={(e)=>this.addactivity(e)}  >Add</button></td> </tr>
                              <tr> <th>Activity</th><th>Action</th></tr>
                        </thead>
                        <tbody>
                      {this.state.activitydetails.map((act)=>{ return <tr><td> {act} </td> <td> <button className="viewall btn btn-secondary" onClick={(e)=>{ if (window.confirm('Are you sure you wish to remove this Activity?'))  this.removeactivity(e,act)}}  >Remove</button></td> </tr>} )}
                      </tbody>
                      </table>
                 </div>
                

               
    </div>
  )}
}

export default Activity;



