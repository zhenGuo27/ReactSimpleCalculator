import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';


let str = "";
const numbers = [1, 2, 3, "+", 4, 5, 6, "-", 7, 8, 9, "×", "C", 0 , "=", "÷"];
let cal = [];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: "",
      current: 0
    };
  }

  getInput(input) {
    if(input === "C") {
      this.clear();
      return;
    }

    if(this.isOperatorPlusOrMinus(input)) {
      cal.push(str);
      cal.push(input);
      str = "";
    } else if(input === "=") {
      if(str.length == 0) return;
      
      cal.push(str);
      str = "";
      this.calculate();
      return;
    } else if(str === "0") {
      str = input;
    } else {
      str+= input;
    }

    this.setState({record: cal.join("")});
    this.setState({current: str});
  }

  add(a, b) {
    return parseInt(a, 10) + parseInt(b, 10);
  }

  minus(a, b) {
    return parseInt(a, 10) - parseInt(b, 10);
  }

  multiply(a, b) {
    return parseInt(a, 10) * parseInt(b, 10);
  }

  divided(a, b) {
    return parseInt(a, 10) / parseInt(b, 10);
  }

  clear() {
    str = "";
    cal = [];
    this.setState({record: str});
    this.setState({current: 0});
  }

  calculate() {
    debugger;

    for(let c=0; c < cal.length; c++) {
      let temp = [];
      if(this.isOperatorPlusOrMinus(cal[c])) continue;

      if(cal[c].indexOf("×")!=-1) {
        temp = cal[c].split("×");
        cal[c] = this.multiply(temp[0], temp[1]);
      } else if(cal[c].indexOf("÷")!=-1) {
        temp = cal[c].split("÷");
        cal[c] = this.divided(temp[0], temp[1]);
      }
    }

    let sum = 0;
    for(let s=0; s< cal.length; s++) {
      if(cal[s] === "+") {
        cal[s+1] = this.add(cal[s-1], cal[s+1]);
      } else if(cal[s] === "-") {
        cal[s+1] = this.minus(cal[s-1], cal[s+1]); 
      }
    }
    sum = cal[cal.length-1];

    this.setState({record: ""});
    this.setState({current: sum});
    str = sum.toString();
    cal = [];
  }

  isOperatorPlusOrMinus(str) {
    if(str === "+" || str === "-") {
      return true;
    }
    return false;
  }

  render() {
    const listItems = numbers.map((number) => 
      <div className="calcItem" key={number.toString()} onClick={(e) => { this.getInput(number.toString())}}>
        {number}
      </div>   
    );

    return (
      <div className="calcWrapper">
        <div className="resultBlock">
          <div>{this.state.record}</div>
          <div>{this.state.current}</div>
        </div>
        <div className="calc">
          {listItems}
        </div>
      </div>     
    );
  }
}

export default App;