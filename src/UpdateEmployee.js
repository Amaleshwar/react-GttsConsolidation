import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


  class Dashboard extends React.Component  {
    constructor(props) {
      super(props);
      this.state = { 
                  empdetails: [],
                  activitydetails:[],

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
            console.log("data from file text",result.Employee);

          var EmployeeList=[];
          var EmpEmailList={};
          var ActivityList=[];
          // result.Employee.map((emp)=>{
          //     EmployeeList.push(emp.EmpFirstName);
          //     EmpEmailList[emp.EmpFirstName]=emp.EmpMail;

          // });
          result.Activity.map((act)=>{
              ActivityList.push(act);
          });

            this.setState({empdetails:EmployeeList,activitydetails:ActivityList});

          })

    }


  
      render(){
        
  
    return (
    <div className="App">
      
                <h1>Update Employee </h1>
                
      
               
    </div>
  )}
}

export default Dashboard;



