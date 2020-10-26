import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import BackspaceIcon from '@material-ui/icons/Backspace';
import classes from './Calculator.module.css'
import Display from './../../components/Display/Display'
import { evaluate } from 'mathjs'

const style = {
  cursor: 'pointer',
  fontSize: '2.4rem',
  borderRadius: 0,
  border: '1px solid rgb(0, 0, 0, 0.5)',
  outline: 'none',
  background: '#bcc0cf',
  boxSizing: 'border-box'
  };


  const calcStyle ={
    width: '100%',
    height: '100%',
    display: 'grid',
    margin: 'auto',
    gridTemplateColumns: 'repeat(4, 100px)',
    gridTemplateRows: 'minmax(120px, auto) repeat(5, 100px)'
  }



class Calculator extends Component {
  
    
  state = {
    abovetext: '',
    belowtext: '0'
  }


  clear = () => {
    this.setState({
      belowtext: "0",
      abovetext: ""
    });
  }

  delete =() => {
    if(this.state.abovetext.match(/[+\-*\/]$/)){ //eslint-disable-line
      let val= this.state.abovetext.toString().slice(0, -1)
      this.setState({
        abovetext: val
      });
    }else if(this.state.abovetext.match(/[0-9\.]$/)){ //eslint-disable-line
      let val= this.state.abovetext.toString().slice(0, -1)
      let val2= this.state.belowtext.toString().slice(0, -1)
      if(val ===''){
        this.setState({
          belowtext: "0",
          abovetext: ""
        });
      } else{
      this.setState({
        belowtext: val2,
        abovetext: val
      });
    }
    }else if(this.state.abovetext.includes("=")){
      
    }else{
      this.setState({
        belowtext: "0",
        abovetext: ""
      });
    }
  
    }


  percentage =() =>{

  }


  numInput= (e) =>{
    if(this.state.abovetext.match(/[0-9\.]$/) && !this.state.abovetext.includes("=")){ //eslint-disable-line
      if(this.state.abovetext.match(/[+\-*\/]/) === null){  //eslint-disable-line
        let val = this.state.abovetext + e.currentTarget.value;
        this.setState({
          belowtext: val,
          abovetext: val
        });
      } else {
        this.setState({
          belowtext: this.state.belowtext + e.currentTarget.value,
          abovetext: this.state.abovetext + e.currentTarget.value
        });
      }
    } else if(this.state.abovetext.match(/[+\-*\/]$/)){  //eslint-disable-line
      let val = this.state.abovetext + e.currentTarget.value;
      this.setState({
        belowtext: e.currentTarget.value,
        abovetext: val
      });
    } else if((this.state.belowtext === "0" && e.currentTarget.value !== "0") || this.state.abovetext.includes("=")) {
      this.setState({
        belowtext: e.currentTarget.value,
        abovetext: e.currentTarget.value
      });
    }
  }

  operInput= (e) =>{
    if(this.state.abovetext.includes("=")){
      let val = this.state.belowtext;
      val += e.currentTarget.value;
      this.setState({
        abovetext: val
      });
    } else {
      if(this.state.abovetext !== "" && this.state.abovetext.match(/[*\-\/+]$/) === null){ //eslint-disable-line
        let val = this.state.abovetext;
        val += e.currentTarget.value;
        this.setState({
          abovetext: val
        });
      } else if(this.state.abovetext.match(/[*\-\/+]$/) !== null){ //eslint-disable-line
        let val = this.state.abovetext;
        val = val.substring(0, (val.length-1));
        val += e.currentTarget.value;
        this.setState({
          abovetext: val
        });
      }
    }
  }

  decInput= (e) =>{
    if(this.state.abovetext === "" || this.state.abovetext.includes("=")){
      let val = '0.';
      this.setState({
        belowtext: val,
        abovetext: val
      }); 
    } else if(this.state.abovetext.match(/[+\-*\/]$/)){ //eslint-disable-line
      let val = '0.';
      this.setState({
        belowtext: val,
        abovetext: this.state.abovetext + val
      });
    } else if(!this.state.belowtext.includes(".")){
      this.setState({
        belowtext: this.state.belowtext + e.currentTarget.value,
        abovetext: this.state.abovetext + e.currentTarget.value
      });
    }
  }


  calculate = () => {
    if(this.state.abovetext.includes("=")){
      let val = `${this.state.belowtext} =`;
      this.setState({
        abovetext: val
      });
    } else if(this.state.abovetext !== "" && this.state.abovetext.match(/[+\-*\/]/) !== null && this.state.abovetext.match(/[+\-*\/]$/) === null) { //eslint-disable-line
      let result = Number.isInteger(evaluate(this.state.abovetext)) ? evaluate(this.state.abovetext) : parseFloat(evaluate(this.state.abovetext).toFixed(5));
      let val = this.state.abovetext;
      val += `=`;
      this.setState({
        belowtext: result,
        abovetext: val
      });
    }
  }


      render() {

        return (
       <div className={classes.size} style={calcStyle}>
         <Display abovetext={this.state.abovetext} belowtext={this.state.belowtext}  />
          
          <Button onClick={this.clear} style={style} variant="contained" value='clear' className={`${classes.twospace} ${classes.other}`} >AC</Button>
          <Button onClick={this.delete} style={style} variant="contained" value='bc' className={classes.other} ><BackspaceIcon /></Button>
          <Button onClick={this.operInput} style={style} variant="contained" value='/' className={classes.operate} >/</Button>
          <Button onClick={this.numInput} style={style} variant="contained" value='7' >7</Button>
          <Button onClick={this.numInput} style={style} variant="contained" value='8' >8</Button>
          <Button onClick={this.numInput} style={style} variant="contained" value='9'>9</Button>
          <Button onClick={this.operInput} style={style} variant="contained" value='*' className={classes.operate} >*</Button>
          <Button onClick={this.numInput} style={style} variant="contained" value='4' >4</Button>
          <Button onClick={this.numInput} style={style} variant="contained" value='5' >5</Button>
          <Button onClick={this.numInput}style={style} variant="contained" value='6' >6</Button>
          <Button onClick={this.operInput} style={style} variant="contained" value='-' className={classes.operate} >-</Button>
          <Button onClick={this.numInput} style={style} variant="contained" value='1' >1</Button>
          <Button onClick={this.numInput} style={style} variant="contained" value='2' >2</Button>
          <Button onClick={this.numInput} style={style} variant="contained" value='3' >3</Button>
          <Button onClick={this.operInput} style={style} variant="contained" value='+' className={classes.operate} >+</Button>
          <Button onClick={this.numInput} style={style} variant="contained" value='0' >0</Button>
          <Button onClick={this.decInput} style={style} variant="contained" value='.' >.</Button>
          <Button onClick={this.calculate} style={style} value='=' className={`${classes.twospace} ${classes.equal}`} variant="contained" >=</Button>
     
        </div>
        );

      }
    }


export default Calculator;
