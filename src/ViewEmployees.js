import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


  class ViewEmployees extends React.Component  {
    constructor(props) {
      super(props);
      this.state = { 
                  empdetails: [],
                  activitydetails:[],
                  showadd:true,
                  showupdate:false,
                  showview:false,
                  employeelist:[],
                  errormsg:'',
                  viewupdate:false,
                  labellist:["Employee Id :","First Name :","Last Name :","Mail id :","Contact Number :","Location :","Designation :","Manager :","Last working day :","Date of joining :"],
                  inptidlist:["EmpId","EmpFirstName","EmpLastName","EmpMail","contact","Location","Designation","Manager","LWD","DOJ"],

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
           result.Employee.map((emp)=>{
               EmployeeList.push(emp.EmpFirstName);
              // EmpEmailList[emp.EmpFirstName]=emp.EmpMail;

           });
          result.Activity.map((act)=>{
              ActivityList.push(act);
          });

            this.setState({empdetails:result.Employee,activitydetails:ActivityList,employeelist:EmployeeList});

          })

    }

    
   
  
      render(){
        //console.log("this.state.empdetails",this.state.empdetails)
  
    return (
    <div className="App">
      
            


                               <div> <h5>view</h5>
                               {/* {this.state.empdetails.map((emp)=>{ 
                               return   <table>
                                         <td> <label><b></b></label></td><td>  
                                         </table>
                                
                               }) }  */}
                               </div>
                


      
               
    </div>
  )}
}

export default ViewEmployees;



