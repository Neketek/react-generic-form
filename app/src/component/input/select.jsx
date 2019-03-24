import Base from "src/common/base/input";
import React from "react";
import PropTypes from "prop-types";

const renderOptions=options=>{
  return options.map(e=><option key={e.label} value={e.value}>{e.label}</option>)
}


class Select extends Base{
  constructor(props){
    super(props);
  }

  valueFromEvent(e){
    const {target:{value}} = e;
    try{
      return JSON.parse(value);
    }catch(e){
      return value;
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
        {renderOptions(options)}
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
