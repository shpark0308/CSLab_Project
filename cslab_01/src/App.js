import logo from './logo.svg';
import React, { useEffect, Component, useState } from 'react'
import './App.css';
import AnalyticsChart from './chartjs/Analytics';
// import axios from 'axios'

class App extends Component {
  state = {
    id : "",
    data_list : "",
  }

  handleChange =(e)=>{
    this.setState({
      [e.target.name] : e.target.value,
    });
    console.log(e.target.name, )
  }

  submitId = ()=>{
    const post ={
      index_id : this.state.id,
    };
   
    fetch("http://localhost:4000/insert", {
      method : "post", // 통신방법
      headers : {
        "content-type" : "application/json",
      },
      body : JSON.stringify(post),
    }).then((rest)=>rest.json())
    .then((json)=>{
      this.setState({
        id : json.text,
      });
    });
  };

  onCall =()=>{
    fetch("http://localhost:4000/list",{
      method:"post",
      headers : {
        "content-type" : "application/json",
      },
      body : JSON.stringify(),
    })
    .then((res)=>res.json())
    .then((json)=>{
      this.setState({
        data_list : json.date, // json.data 형식, ex. json.blockPerMin
      });
    });



  };
  
  render() {
    return (
      <div>
        <input onChange={this.handleChange} name ="id"/>
        <button onClick = {this.submitId}>Submit</button>
        <h1>{this.state.id}</h1>
        <br/><hr/><br/>
        <h2>** Data List **</h2>
        <h3>{this.state.data_list}</h3>
        <button onClick={this.onCall}>Data_List</button>
        <AnalyticsChart/>
      </div>
    )
  }
}

export default App;
