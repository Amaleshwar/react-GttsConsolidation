import React from 'react';
import logo from './logo.svg';
import ExcelViewExport from './ExcelViewExport.js'; 
import './App.css';

import DataGrid from './DataGrid.js'; 
import axios from 'axios';
// import Select, { components } from 'react-select';
// import makeAnimated from 'react-select/animated';


// import { Multiselect } from 'multiselect-react-dropdown';


import MultiSelect from "react-multi-select-component";


// var json =[{
    
// "SNO" : 1,
// "EmployeeName" : "Chai",
// "Week1TaskName" : 1,
// "Week1Totalhours" : 1,
// "Week2TaskName" : 1,
// "Week2Totalhours" : 1,
// "Week3TaskName" : 1,
// "Week3Totalhours" : 1,
// "Week4TaskName" : 1,
// "Week4Totalhours" : 1,
// "1" : 1,
// "2" : 1
    
// }, {
    
// "SNO" : 1,
// "EmployeeName" : "Chai",
// "Week1TaskName" : 1,
// "Week1Totalhours" : 1,
// "Week2TaskName" : 1,
// "Week2Totalhours" : 1,
// "Week3TaskName" : 1,
// "Week3Totalhours" : 1,
// "Week4TaskName" : 1,
// "Week4Totalhours" : 1,
// "1" : 1,
// "2" : 1
// }];
var json =[
];
var fs = require('fs');



  class App extends React.Component  {
    constructor(props) {
      super(props);
      this.state = {  jsondata: [],
        header:[],
        presentweekno:'',
        presentweek:[],
        selectoptions:[],
        optionSelected:[],
        selected:null,           
       }

       this.style={ chips: { background: "red" }, searchBox: { border: "none", "border-bottom": "1px solid blue", "border-radius": "0px" }}
 
         
  }
    

    componentDidMount(){
      var empnames=['amal','raj'];
      var  date = new Date();
      var   persentYear = date.getFullYear();
      var persentMonth = date.getMonth();
      var persentDate = date.getDate();     
      console.log("persentDate",persentDate);
      var firstDate = new Date(persentYear, persentMonth, 1);
      var lastDate = new Date(persentYear, persentMonth + 1, 0);
      var numDays = lastDate.getDate();
      console.log("firstdgetFullYearay",persentYear,"||| getMonth",persentMonth,date);
      var weeks=  this.getWeeksStartAndEndInMonth('monday',firstDate,numDays);
      console.log("res",weeks);
      var weekends=  this.getWeekendsInMonth(persentYear,persentMonth,numDays);
      console.log("res",weekends);

  
var filename = persentYear+''+persentMonth;
console.log(filename)

   // file check
  // 
let filecehckformdata =new FormData();
filecehckformdata.append('filename',filename);
axios.post("http://localhost:8002/checkfileexists",filecehckformdata)
  .then(res=>{  
                var fileexisits = res.data;
                  console.log("status data",fileexisits);
   
    console.log("file exists: ",fileexisits)
    if(!fileexisits){
       //  create json 
       for(var i=0; i<empnames.length;i++){
        var  employee = {}
         employee ["sno"] = i;
         employee ["EmployeeName"] = empnames[i];
   
         for(var j=1; j<=weeks.length;j++){
           employee [`Week${j}TaskName`] = 0;
           employee [`Week${j}Totalhours`] = 0;
         }
         for(var x=1; x<=numDays;x++){
           employee [`day${x}`] = 0;
         }
         json.push(employee)
       }

        var result;
      let formdata =new FormData();  
    formdata.append('filename',filename);
    formdata.append('jsondata',JSON.stringify(json));
    axios.post("http://localhost:8002/createjsonfile",formdata)
        .then(res=>{  
          result=   res.data;
          console.log("status text",res.statusText);

        })
   
  
 }else{
var presentweekno =''; 
var presentweek =[];
  weeks.map((week,i)=>{ if(week.start<= persentDate && week.end>= persentDate){
   // console.log(week,"week ",i+1); 
   presentweekno = "week "+ (i+1) +" : ["+(week.start) + " to "+ (week.end)+"]"  ;
   for(var i=week.start; i<=week.end;i++ ) {    presentweek.push(i) }

   // console.log("presentweek is :",presentweek); 
  }
  })


  let formdata =new FormData();  
  formdata.append('filename',filename);
  axios.post("http://localhost:8002/getjsondata",formdata)
      .then(res=>{  
        result=   res.data;
        console.log("status text",res.data);
        // result =JSON.parse(res.data)
       console.log("keys :", Object.keys(result[0]))
      var options= presentweek.map((key, index) => {
         return            { label: key , value: key } })   // { name: key.toString() , id: key  }  

     
     console.log("options : ",options)
        this.setState({jsondata:result,header:Object.keys(result[0]),presentweek:presentweek,presentweekno:presentweekno,selectoptions:options});
        //console.log("options : ",options)
      })
 }

  })



   
    }
  

  

    getWeekendsInMonth = function(persentYear,persentMonth,numDays) {
      let weekends = [];
   //  for(var i=1 ; i>=numDays; i++){
    for(var i=1;i<=numDays;i++){    //looping through days in month
      var newDate = new Date(persentYear,persentMonth,i)
      if(newDate.getDay()==0){   //if Sunday
        weekends.push(i);
      }
      if(newDate.getDay()==6){   //if Saturday
        weekends.push(i);
      }
     }
      return weekends;
    }
 
  
   getWeeksStartAndEndInMonth = function(_start,firstDate,numDays) {
    let weeks = [];
 
    let start = 1;
    let end = 7 - firstDate.getDay();
    if (_start === 'monday') {
        if (firstDate.getDay() === 0) {
            end = 1;
        } else {
            end = 7 - firstDate.getDay() + 1;
        }
    }
    while (start <= numDays) {
        weeks.push({start: start, end: end});
        start = end + 1;
        end = end + 7;
        end = start === 1 && end === 8 ? 1 : end;
        if (end > numDays) {
            end = numDays;
        }
    }
  
    return weeks;
}


updatetojson(){
  
}

viewtojson(){
  console.table(json)
 
}
addtojson(){

  
}
deletetojson(){
 
}

renderTableHeader() {
 // let header = Object.keys(this.state.jsondata)
  this.state.header.map((key, index) => {
    return <th key={index}>{key}</th>
 }) 
}
renderTableData() {
  return this.state.jsondata.map((emp, index) => {
    let col = Object.keys(emp)
    return (
        
    
       <tr key={emp.EmployeeName}>
         {col.map((val, index) => {
             return <td key={index}>{emp[col[index]]}</td>
          })}

       </tr>
    )
  })
}


handleInputChange(value){
      this.setState({optionSelected:value});
  
}
onSelect(selectedList, selectedItem) {
  console.log("event ",selectedItem)
  console.log("event ",selectedList)
  this.setState({optionSelected:selectedList});
}

onRemove(selectedList, removedItem) {
 // this.setState({optionSelected:selectedList});
}

 
      render(){
//console.log("present week no:",this.state.presentweekno )
       // console.log("got value :",this.state.jsondata )
        console.log("optionSelected :",this.state.optionSelected )
  
    return (
    <div className="App">
          {/* <ExcelViewExport /> */}
         {/* <DataGrid /> */}


         <button className="add" onClick={()=>this.viewtojson()}>View</button>
                <button className="add" onClick={()=>this.addtojson()}>Add</button>
                <button className="delete" onClick={()=>this.deletetojson()}>delete</button>
                <button className="update" onClick={()=>this.updatetojson()}>update</button>
              <h1 id='title'>{this.state.presentweekno}</h1>
              select dates id any holidays/leaves on this week :


              {/* <Multiselect 
                  options={this.state.selectoptions} // Options to display in the dropdown
                  selectedValues={this.state.selected} // Preselected value to persist in dropdown
                  onSelect={(selectedList, selectedItem)=>this.onSelect(selectedList, selectedItem)} // Function will trigger on select event
                  onRemove={this.onRemove} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                  closeOnSelect={false}
                  avoidHighlightFirstOption
                  style={ { chips: { background: "green" },
                  optionContainer: {   border: '2px solid',width:'300px'}, 
                  searchBox: { border: "none", "border-bottom": "1px solid blue", "border-radius": "0px",width:'300px' }}}

              /> */}
                   <pre>{JSON.stringify(this.state.selected)}</pre>
      <MultiSelect className=""
        options={this.state.selectoptions}
        value={this.state.optionSelected}
        onChange={(value)=>this.handleInputChange(value)}
        labelledBy={"Select"}
        hasSelectAll={true}
      />
 
 
        
    </div>
  );
    }
}

export default App;
