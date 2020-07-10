import React ,{Component} from 'react';
import './EmployeeDetails.css';
import axios from 'axios';
import { Navbar, Nav, NavDropdown, Form,  FormControl, Button, Table} from 'react-bootstrap';

let Interval;
export default class Queue extends Component{

    constructor(props){
        super(props);
        this.state={
            displayQueue:""
        }

    }

    
componentDidMount(){

    Interval = setInterval(() => {

        this.handleQueue()
        console.log("called");
        
         
       }, 5000);
}
      
async handleQueue ( ){
    console.log("queue");
    let queue = await axios.get('http://localhost:8002/Addqueue');
    this.setState({displayQueue:queue.data });
    console.log(queue);
    
  }

  componentWillUnmount(){
      clearInterval(Interval);
  }

 render(){
     console.log("render");
     
    return(

        <div>
            
                        <div style= {{
                                        borderBottom:"1px solid #ffff ",
                                        color:"#282c34",
                                        marginBottom:"10px",
                                        marginTop:"10px"
                                        }}>
                                        <b> Queue ({this.state.displayQueue.length})</b>
                        </div>
                       <table>
                            {this.state.displayQueue   && this.state.displayQueue.map(que => 
                            <tr >
                                        <td style={{textAlign:"center"}} onClick={() => this.props.onClick(que.empid)}>{que.empid}</td>
                                        <td style={{textAlign:"center"}} onClick={() => this.props.onClick(que.empid)}>{que.empName}</td>
                                        <td style={{textAlign:"center"}}> <button className="button2"  onClick={() => this.props.hold(que.empid)}>Hold</button></td>
                            </tr>)}
                       </table>

                   
        </div>
    )
}
}