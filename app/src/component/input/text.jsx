import React from "react";
import {Input as Base} from "react-generic-form";
import PropTypes from "prop-types";
import styled from "styled-components";

const getFocusColor=({error, theme:{color:{focus}}})=>error?focus.error:focus.primary;
const getFontColor=({error, theme:{color:{font}}})=>error?font.error:font.primary;

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


class Text extends Base{
  constructor(props){
    super(props);
  }

  onChange(e){
    super.onChange(e.target.value);
  }

  render(){
    const {
      props:{
        onFocusChange,
        label,
        error,
        underline,
        ...rest
      },
      onChange,
      onFocus,
      onBlur,
    } = this;
    const props = {
      ...rest,
      onFocus,
      onChange,
      onBlur,
    }
    return (
      <Container error={error} underline={underline}>
        <input {...props}></input>
        <div><div/></div>
        <label>{label}</label>
      </Container>
    )
  }
}

Text.updatePropTypes({
  value:PropTypes.string.isRequired,
  label:PropTypes.string.isRequired,
  placeholder:PropTypes.string.isRequired,
  underline:PropTypes.number.isRequired
});

Text.updateDefaultProps({
  value:"",
  label:"NoLabel",
  placeholder:" ",
  underline:2
});


export default Text;
