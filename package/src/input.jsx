import React from "react";
import PropTypes from "prop-types";
import Component from "./component";


class BaseInput extends Component{

  constructor(props){
    super(props);
    this.onChange=this.constructor.prototype.onChange.bind(this);
    this.onFocus=this.constructor.prototype.onFocus.bind(this);
    this.onBlur=this.constructor.prototype.onBlur.bind(this);
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

BaseInput.updatePropTypes({
  name:PropTypes.string.isRequired,
  value:PropTypes.any.isRequired,
  onChange:PropTypes.func.isRequired,
  onFocusChange:PropTypes.func.isRequired
});

BaseInput.updateDefaultProps({
  onChange:e=>console.log(e),
  onFocusChange:e=>console.log(e)
});

export default BaseInput;
