import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


  class AddEmployee extends React.Component  {
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


    addemployee(e){
      var EmpId = document.getElementById("EmpId").value;
      var EmpFirstName = document.getElementById("EmpFirstName").value;
      var EmpLastName = document.getElementById("EmpLastName").value;
      var EmpMail = document.getElementById("EmpMail").value;
      var contact = document.getElementById("contact").value;
      var Location = document.getElementById("Location").value;
      var Designation = document.getElementById("Designation").value;
      var Manager = document.getElementById("Manager").value;
      var LWD = document.getElementById("LWD").value;
      var DOJ = document.getElementById("DOJ").value;
      var EmpNmae = EmpFirstName+' '+ EmpLastName;
      var Account= "strategics account";
      var project = "F&A";
      var ManagerMail =  "suresh.B@outlook";
      var ManagerContact = "289382989";
      var Hold = false ;

      var newempdata ={};
      newempdata["EmpId"]= EmpId;
      newempdata["EmpFirstName"]= EmpFirstName;
      newempdata["EmpLastName"]= EmpLastName;
      newempdata["EmpNmae"]= EmpNmae;
      newempdata["EmpMail"]= EmpMail;
      newempdata["LWD"]= LWD;
      newempdata["Designation"]= Designation;
      newempdata["contact"]= contact;
      newempdata["Location"]= Location;
      newempdata["DOJ"]= DOJ;
      newempdata["Account"]= Account;
      newempdata["project"]= project;
      newempdata["Manager"]= Manager;
      newempdata["ManagerMail"]= ManagerMail;
      newempdata["ManagerContact"]= ManagerContact;
      newempdata["Hold"]= Hold;

      var empdetls = this.state.empdetails;
      empdetls.push(newempdata);
      //console.log("empdetails",empdetls);
      var EmployeeList=[];
      empdetls.map((emp)=>{
           EmployeeList.push(emp.EmpFirstName);
       });
      this.setState({empdetails:empdetls,employeelist:EmployeeList})
      var tempfulljson = {};
      Object.assign(tempfulljson, {"Employee": empdetls})
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
        //console.log("this.state.empdetails",this.state.empdetails)
  
    return (
    <div className="App">

                  <div> <h5>add</h5>
                     <table>
                          <tr>  <td> <label><b>Employee Id :</b></label></td> <td>  <input type="text" id="EmpId"/>       </td>
                            <td> <label><b>First Name :</b></label></td> <td>  <input type="text" id="EmpFirstName"/></td></tr>
                          <tr>  <td> <label><b>Last Name :</b></label></td> <td>  <input type="text" id="EmpLastName"/></td>
                            <td> <label><b>Mail id :</b></label></td><td>  <input type="text" id="EmpMail"/>  </td></tr> 
                          <tr>  <td> <label><b>Contact Number :</b></label></td><td>  <input type="text" id="contact"/> </td>
                            <td> <label><b>Location :</b></label></td><td>  <input type="text" id="Location"/>  </td></tr>
                          <tr>  <td> <label><b>Designation :</b></label></td><td>  <input type="text" id="Designation"/>  </td>
                            <td> <label><b>Manager :</b></label></td><td>  <input type="text" id="Manager" value="Suresh" disabled={true}/>  </td></tr> 
                          <tr>  <td> <label><b>Last working day :</b></label></td><td>  <input type="text" id="LWD"/> </td>
                          <td> <label><b>Date of joining :</b></label></td><td>  <input type="text" id="DOJ"/>  </td></tr>
                      </table>
                      <button className="empaddsubmit btn btn-primary" onClick={(e)=>this.addemployee(e)}  >Submit</button>
                 </div>
                

               
    </div>
  )}
}

export default AddEmployee;



