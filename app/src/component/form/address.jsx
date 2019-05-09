// Look for explanation of everything what is happening here in
// src/component/form/name.jsx

import {Form as Base} from "react-generic-form";
import Rule from "./rule";
import Text from "src/component/input/text";
import React from "react";
import styled from "styled-components";
import FormFieldErrors from "./form-field-errors";

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
`;

const FieldWrapper = styled.div`
  flex-grow: 1;
  flex-basis: 130px;
`

const Gap = styled.div`
  flex-basis: 4px;
`
const Button = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;

  user-select:none;

  border: solid 2px;
  border-color: ${({theme})=>theme.color.font.primary};

  width: 100%;
  height: 30px;

  font-size: 1em;
  font-family: ${({theme})=>theme.font.primary};
  color:${({theme})=>theme.color.background.secondary};
  background-color: ${({theme})=>theme.color.background.primary};

  transition-duration: .1s;
  &:hover{
    background-color: ${({theme})=>theme.color.focus.primary};
  }
  &:active{
    transform: scale(.99);
  }
`

function SubmitButton(){

  const {
    props:{
      onSubmit
    },
    state:{
      error,
      value
    }
  } = this;

  if(this.constructor.isValid(error)){
    return (
      <Button onClick={()=>onSubmit(value)}>Submit</Button>
    );
  }

  return null;
}




class Address extends Base{

  constructor(props){
    super(props);
    this.SubmitButton=props.onSubmit?SubmitButton.bind(this):()=>null;
  }

  fieldProps(name){
    const {
      state:{
        error:{
          [name]:error
        },
        visited:{
          [name]:visited
        },
        focus:{
          [name]:focus
        }
      }
    } = this;
    return {
      ...super.fieldProps(name),
      error:error && visited && !focus
    }
  }

  form(){
    const {Field, Form, Errors, SubmitButton} = this;
    return (
      <Container>
        <FieldWrapper>
          <Field>
            <Text label="Country" name="country" placeholder="Enter your country"/>
          </Field>
          <Errors>
            <FormFieldErrors name="country"/>
          </Errors>
        </FieldWrapper>
        <Gap/>
        <FieldWrapper>
          <Field>
            <Text label="City" name="city" placeholder="Enter your city"/>
          </Field>
          <Errors>
            <FormFieldErrors name="city"/>
          </Errors>
        </FieldWrapper>
        <Field>
          <Text label="Street" name="street" placeholder="Enter your street address"/>
        </Field>
        <Errors>
          <FormFieldErrors name="street"/>
        </Errors>
        <SubmitButton/>
      </Container>
    );
  }
}

Address.updateDefaultProps({
  rule:{
    error:{
      country:[
        Rule.string.not.empty(({props})=>"You must provide country!"),
        Rule.string.len.min(({params:{size}})=>`Country should be longer than or equal to ${size} chars`).params({size:2})
      ],
      city:[
        Rule.string.not.empty(({props})=>"You must provide city!")
      ],
      street:[
        Rule.string.not.empty(({props})=>"You must provide street address!")
      ]
    }
  }
});

export default Address;
