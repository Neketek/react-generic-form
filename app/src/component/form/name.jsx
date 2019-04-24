import {Form as Base} from "react-generic-form";
import Rule from "./rule";
import Text from "src/component/input/text";
import React from "react";
import styled from "styled-components";
import FormFieldErrors from "./form-field-errors";

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
    const {Form, Field, Errors} = this;
    return (
      <Container>
        <FieldWrapper>
          <Field>
            <Text name="first" label="First" placeholder="First name"/>
          </Field>
          <Errors>
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
    error:{
      first:[
        Rule.string.not.empty(()=>"First name should not be empty.")
      ],
      last:[
        Rule.string.not.empty(()=>"Last name should not be empty.")
      ]
    },
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
