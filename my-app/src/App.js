import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';


let str = "";
const numbers = [1, 2, 3, "+", 4, 5, 6, "-", 7, 8, 9, "×", "C", 0 , "=", "÷"];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: "",
      current: 0,
      isAfterOper: false
    };
  }

  getInput(input) {
    //debugger;
    str+=input;
    console.log(str);

    if(input === "C") {
      this.clear();
      return;
    }

    if(input === "=") {
      this.calculate();
      return;
    }

    if(this.isOperator(input)){
      this.setState({record: str});
      this.setState({isAfterOper: true});
    } else {
      let temp = (this.state.current === 0 || this.state.isAfterOper) ? input: this.state.current + input;
      this.setState({current: temp});
      this.setState({isAfterOper: false});
    }
  }

  add(a, b) {
    return a + b;
  }

  minus(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divided(a, b) {
    return a / b;
  }

  clear() {
    str = "";
    this.setState({record: str});
    this.setState({isAfterOper: false});
    this.setState({current: 0});
  }

  calculate() {
    debugger;

    str = str.replace("=", "");
    let split = str.split("+");
    this.insertOper("+", split, 0, split.length);

    for(let j=1; j<split.length; j++) {
      if(split[j].indexOf("-")!==-1 && split[j].length > 1) {
        let t = split[j];
        let sp = t.split("-");
        for(let m=0; m < sp.length; m++) {
          split[j+m] = sp[m];
        }
        this.insertOper("-", split, j, sp.length);
      } 
      
      /*if(split[j].indexOf("×")!==-1) {
        let temp = split[j].split("×");
        split[j] = this.multiply(temp[0], temp[1]).toString();
      } 
      
      if(split[j].indexOf("÷")!==-1) {
        let temp2 = split[j].split("÷");
        split[j] = this.divided(temp2[0], temp2[1]).toString();
      }*/

      split[j] = this.splitOper("×", split[j]);
      split[j] = this.splitOper("÷", split[j]);
    }

    let b = 0;
    let oper = "";
    let sum=split[0];
    for(let r=1; r < split.length; r++) {
      if(this.isOperator(split[r])) {
        oper = split[r];
      } else if(b === 0) {
        b = split[r];
        sum = this.switchOper(oper, parseInt(sum, 10), parseInt(b, 10));
        b = 0;
        oper = "";
      } 
    }

    str = "";
    this.setState({current: sum});
    this.setState({record: str});
  }

  splitOper(target, item) {
    let temp = [];
    if(item.indexOf(target)!==-1) {
      temp = item.split(target);
      if(target === "×") {
        item = this.multiply(temp[0], temp[1]).toString();
      } else {
        item = this.divided(temp[0], temp[1]).toString();
      }
    } 
    return item;
  }

  insertOper(oper, array, index, len) {
    for(let i=1; i < len; i+=2) {
      array.splice(i+index, 0, oper);
    }
    return array;
  }

  switchOper(oper, a, b) {
    let r = 0;
    if(oper === "+") { r = this.add(a, b); }
    if(oper === "-") { r = this.minus(a, b); }
    if(oper === "×") { r = this.multiply(a, b); }
    if(oper === "÷") { r = this.divided(a, b); } 
    return r;
  }

  isOperator(str) {
    if(str === "+" || str === "-" || str === "×" || str === "÷") {
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