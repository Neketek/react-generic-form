import React from "react";
import PropTypes from "prop-types";
import Component from "./component";


class BaseInput extends Component{

  constructor(props){
    super(props);

    this.onChange=e=>{
      const {props:{onChange, name}, valueFromEvent} = this;
      onChange({name,value:valueFromEvent(e)});
    }

    this.onFocus=()=>{
      const {props:{onFocusChange, name}} = this;
      onFocusChange({name, focus:true});
    }

    this.onBlur=()=>{
      const {props:{onFocusChange, name}} = this;
      onFocusChange({name, focus:false});
    }
  }


  valueFromEvent(e){return e}

  render(){
    return this.constructor.name;
  }

}


BaseInput.updatePropTypes({
  name:PropTypes.string.isRequired,
  value:PropTypes.any.isRequired,
  onChange:PropTypes.func.isRequired
});

BaseInput.updateDefaultProps({
  onChange:e=>console.log(e),
  onFocusChange:e=>console.log(e)
});

export default BaseInput;
