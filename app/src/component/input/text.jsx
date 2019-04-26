// This is a simple demonstration of custom input wrapping
// which will make them usable by the forms
// Don't pay too much attention to SCSS components they are
// purely visual, but they also serve a purpose and require
// some props to work correctly. This is done to simulate
// relatively complex situations.

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// First things first. Import Input base component
import {Input as Base} from "react-generic-form";

const getFocusColor=({error, theme:{color:{focus}}})=>error?focus.error:focus.primary;
const getFontColor=({error, theme:{color:{font}}})=>error?font.error:font.primary;

// Some visual tricks to make example look not so ugly.
// This component requires two props to work correctly.
// {error, underline}
const Container = styled.div`
  width: 100%;
  display: flex;
  margin: .75em 0 0 0;
  flex-flow: column;
  position: relative;
  font-family: ${({theme})=>theme.font.primary};
  font-size: 1em;
  transition-duration: .15s;
  transition-timing-function: ease-in-out;
  color:${getFontColor};
  &>input{
    padding: 0 0 0 .25em;
    ::placeholder{
      transition: inherit;
      color:transparent;
      opacity: .5;
    }
    width: 100%;
    outline: none;
    border: none;
    background: transparent;
    font:inherit;
    color:${getFontColor};
    :not(:placeholder-shown){
      &~label{
        font-size: 0.75em;
        top: -1em;
      }
    }
    :focus{
      color:${getFocusColor};
      ::placeholder{
        color:${getFocusColor}
      }
      &~label{
        color:${getFocusColor};
        font-size: 0.75em;
        top:-1em;
      }
      &~div{
        &>div{
          width: 100%;
        }
      }
    }
  }
  &>label{
    transition: inherit;
    pointer-events: none;
    position: absolute;
    font:inherit;
    left: 0;
    top: 0;
  }
  &>div{
    transition: inherit;
    width: 100%;
    background:${getFontColor};
    height:${({underline=2})=>underline}px;
    &>div{
      transition: inherit;
      width: 0;
      height: 100%;
      background-color: ${getFocusColor};
    }
  }
`

// Here we go, important part
class Text extends Base{
  // Constuctor is required
  constructor(props){
    super(props);
  }

  // overriding predefined handler
  // base class expects onChange to receive
  // pure value. Therefore it should be overridden to extract
  // value from event
  // 99% you need to override it to wrap your component.
  onChange(e){
    //parent class handler uses props.onChange to propagate
    //{name, value} event.
    super.onChange(e.target.value);
  }

  // these handlers can be overridden if needed.
  // When it may be important? When input is REALLY custom.
  onBlur(e){
    //parent class handler uses props.onFocusChange to propagate
    //{name, focus:false}
    super.onBlur(e);
  }

  onFocus(e){
    //parent class handler uses props.onFocusChange to propagate
    //{name, focus:true}
    super.onFocus(e);
  }

  // Here is the most important part
  // All props must be redirected to correct places
  render(){
    const {
      props:{
        //here we filter all unnesessary props
        onFocusChange,
        label, // prop not related to input
        error, // prop not related to input
        underline,
        ...rest // should contain value, name props
      },
      onChange, // predefined handler
      onFocus, // predefined handler
      onBlur, // predefined handler
    } = this;
    const props = {
      ...rest,
      // overriding any onChange, onBlur, onFocus
      // by predefined handlers which
      onFocus,
      onChange,
      onBlur,
    }
    return (
      // Pass error and underline to container
      <Container error={error} underline={underline}>
        {/* Pass all required props to actual input */}
        <input {...props}></input>
        <div><div/></div>
        {/* Pass label to label component */}
        <label>{label}</label>
      </Container>
    )
  }
}

// Use to update only things which matter
// but still have coverage of parent class propTypes
// you still have an ability to replace propTypes completely
Text.updatePropTypes({
  value:PropTypes.string.isRequired, // required for any input
  label:PropTypes.string.isRequired, // required for any input
  placeholder:PropTypes.string.isRequired, // specific to this input
  underline:PropTypes.number.isRequired // specific to this input
  // onChange:(e)=>console.log(e), required for any input
  // onFocusChange:(e)=>console.log(e) // required for any input
});

// Use to update default props
// You still have an ability to replace defaultProps completely
Text.updateDefaultProps({
  value:"",
  label:"NoLabel",
  placeholder:" ",
  underline:2
});


export default Text;
