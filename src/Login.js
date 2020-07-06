import React from 'react';


import loginimg from './images/login-img.jpg';
import './Login.css';
import axios from 'axios';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { errormsg:'',
                        sucessmsg:'',
                        EmployeeList:[],
                        EmpEmailList:{},
                        Otp:null,
                        resendotpbtn: false,
                        activities:[],
                    }
         }
               
    componentDidMount(){
        this.loginpopup();
        
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
                EmpEmailList[emp.EmpFirstName]=emp.EmpMail;

            });
            result.Activity.map((act)=>{
                ActivityList.push(act);
            });
            console.log("EmployeeList",EmployeeList);
            console.log("EmpEmailList",EmpEmailList);
            console.log("EmpEmailList",ActivityList);
              this.setState({EmployeeList:EmployeeList,EmpEmailList:EmpEmailList,activities:ActivityList});

            })

    }
    loginpopup(){
        document.getElementById('LoginPopup').style.display='block';
    }

    validateUser(){
      
            let username = document.getElementById("getemp").value;
            let password = document.getElementById("password").value;
          //  console.log("otp",parseInt(password),this.state.Otp)
            if(this.state.Otp===parseInt(password)){  
                sessionStorage.setItem("loaded",true)
                this.sendData(username);
                this.setState({errormsg:''})
            }
            else
            {
                this.setState({errormsg:"Enter Correct OTP or Resend OTP"})            
            }
    }
    SendOtp(){
        setTimeout(()=>{
                    this.setState({resendotpbtn:true,Otp:null})
        },120000)      
         this.generateandsendotp();
    }
    ReSendOtp(){
        setTimeout(()=>{
            this.setState({Otp:null})
                    },120000)
            this.generateandsendotp();
    }
    generateandsendotp(){
        var empname = document.getElementById('getemp').value;

        if(empname==='Select Employee'){
            this.setState({errormsg:'Please Select User'});
            return;
          }
        else{
          console.log("selected EMP: ",empname)
          console.log("selected EMP: ",this.state.EmpEmailList[empname])
            
          var result;
          let formdata =new FormData();  
          formdata.append('empname',empname);
          formdata.append('empmailid',this.state.EmpEmailList[empname]);
          axios.post("http://localhost:8002/sendotp",formdata)
            .then(res=>{  
              result=   res.data;
              console.log("status text",res.data);
              this.setState({Otp:res.data});

            });
            
 
         
          }
        
    
    }
    sendData = (username) => {
        console.log("sending to app.js",this.state.EmployeeList)
        console.log("sending to app.js",JSON.stringify (this.state.EmployeeList))
        this.props.parentCallback("true",username,this.state.EmployeeList,this.state.activities);
        console.log("to_parent",username)
      }


    render() { 
        return ( 
        <div id="LoginPopup"  className="login-wrapper">
            
           <div className="Login-box row">
                    <div className="login-img col-sm-6 col-md-6 col-lg-6">
                            <img src={loginimg} className="login-img-tag" alt={"hi"} />
                    </div>
                <table className="login col-sm-6 col-md-6 col-lg-6">
                    <tr>
                    <select id="getemp" className="dropdown__select"  >
                        <option class="placeholder">Select Employee</option>
                            { this.state.EmployeeList.map((emp,index)=>  <option className="select-option" value={emp}>{emp}</option> )}
                        </select>
                        { !this.state.resendotpbtn && <button  id="submit" value="Login" onClick={(e) => this.SendOtp(e)}>Send OTP </button>}
                        { this.state.resendotpbtn && <button  id="submit" value="Login" onClick={(e) => this.ReSendOtp(e)}>Resend OTP </button> }
                    </tr>
                    <tr><input type="text" className="input100" name="password" id="password" placeholder="Enter OTP" /> </tr>
                    <tr><button  id="submit" value="Login" onClick={(e) => this.validateUser(e)}>Login </button></tr>
                    <tr><span style={{color:"red"}} > {this.state.errormsg} </span></tr>
                </table>

            </div > 
            
 

         
    </div> );
    }
}




