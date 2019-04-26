import {Form as Base} from "react-generic-form";
import Rule from "./rule";
import Text from "src/component/input/text";
import React from "react";
import styled from "styled-components";
import FormFieldErrors from "./form-field-errors";

// These two are purely visual components, nothing important here
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`

const FieldWrapper = styled.div`
  flex-grow: 1;
  flex-basis: 130px;
  box-sizing: border-box;
  &+div{
    flex-basis:2px;
  }
`

class Name extends Base{
  constructor(props){
    super(props);
  }
  // customazing props which this.Field will provide by default
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
      // mergin together default fieldProps + prop which changes color of the input
      ...super.fieldProps(name),
      error:error && visited && !focus
    }
  }

  // using this methods you can customize coresponding wrappers
  // keep in mind that by default they are usually providing
  // required props, so that's better to just add custom props
  // instead of complete overriding
  errorProps(name){
    return super.errorProps(name);
  }

  warningProps(name){
    return super.warningProps(name);
  }

  formProps(name){
    return super.formProps(name);
  }

  // using this method instead of render give an ability to provide
  // custom arguments to this method. In future
  form(){
    // these are wrapper components which will provide additional props
    // to inputs and error components to make them working automatically
    const {Form, Field, Errors, Warnings} = this;
    return (
      <Container>
        <FieldWrapper>
          <Field>
            {/*
              name props is required
              because wrapper uses it find coresponding field props
            */}
            <Text name="first" label="First" placeholder="First name"/>
          </Field>
          <Errors>
            {/*
              name props is required for any form wrapper component
              which provides additional props. Name is only key
              to find coresponding values
            */}
            <FormFieldErrors name="first"/>
          </Errors>
        </FieldWrapper>
        <div/>
        <FieldWrapper>
          <Field>
            <Text name="last" label="Last" placeholder="Last name"/>
          </Field>
          <Errors>
            <FormFieldErrors name="last"/>
          </Errors>
        </FieldWrapper>
      </Container>
    );
  }
}

Name.updateDefaultProps({
  name:"name",
  value:{
    first:"",
    last:"",
  },
  rule:{
    // Error rules for each field. If test is not passed
    // they will return message.
    // good thing about external rules management is that they are not
    // hardcoded.
    error:{
      // field rules list must be placed under field name key
      // Each message builder function can use all params described below
      // to customize error message. Really usefull for localization
      first:[
        Rule.string.not.empty(({name, value, params, state, props})=>`${name} name should not be empty.`)
      ],
      last:[
        Rule.string.not.empty(()=>"Last name should not be empty.")
      ]
    },
    // warnings acts just like errors but don't affect validation
    // they can be used to provide valuable information
    warning:{
      first:[
        Rule.string.len.min(()=>"Your name probably should be longer than 1 char").params({size:2})
      ],
      last:[
        Rule.string.len.min(()=>"Your name probably should be longer than 1 char").params({size:2})
      ]
    }
  }
});

export default Name;
