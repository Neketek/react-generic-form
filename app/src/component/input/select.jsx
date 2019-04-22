import {Input as Base} from "react-generic-form";
import React from "react";
import PropTypes from "prop-types";

const Options=options=>{
  return options.map(e=><option key={e.label} value={e.value}>{e.label}</option>)
}


class Select extends Base{
  constructor(props){
    super(props);
  }

  onChange(e){
    const {target:{value}} = e;
    try{
      super.onChange(JSON.parse(value));
    }catch(e){
      super.onChange(value);
    }
  }

  render(){
    const {
      onChange,
      onBlur,
      onFocus,
      props:{
        onFocusChange,
        options,
        ...rest
      }
    } = this;
    return (
      <select {...rest} onChange={onChange} onBlur={onBlur} onFocus={onFocus}>
        {Options(options)}
      </select>
    );
  }
}

Select.updatePropTypes({
  options:PropTypes.arrayOf(PropTypes.shape({
    value:PropTypes.any.isRequired,
    label:PropTypes.string,
  })),
  value:PropTypes.any,
});

export default Select;
