import React from "react";
import PropTypes from "prop-types";
import Component from "./component";


class Input extends Component{

  constructor(props){
    super(props);
    this.onChange=this.onChange.bind(this);
    this.onFocus=this.onFocus.bind(this);
    this.onBlur=this.onBlur.bind(this);
  }
  
  onChange(value){
    const {props:{onChange, name}} = this;
    onChange({name,value});
  }

  onFocus(e){
    const {props:{onFocusChange, name}} = this;
    onFocusChange({name, focus:true});
  }

  onBlur(e){
    const {props:{onFocusChange, name}} = this;
    onFocusChange({name, focus:false});
  }

  render(){
    return this.constructor.name;
  }

}

Input.updatePropTypes({
  name:PropTypes.string.isRequired,
  value:PropTypes.any.isRequired,
  onChange:PropTypes.func.isRequired,
  onFocusChange:PropTypes.func.isRequired
});

Input.updateDefaultProps({
  onChange:e=>console.log(e),
  onFocusChange:e=>console.log(e)
});

export default Input;
