import {Form as Base, Rule} from "react-generic-form";
import Text from "src/component/input/text";
import React from "react";
import styled from "styled-components";
import FormFieldErrors from "./form-field-errors";

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const FieldWrapper = styled.div`
  flex-grow: 1;
  flex-basis: 130px;
`

const Gap = styled.div`
  flex-basis: 4px;
`

class Address extends Base{


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
    const {Field, Form, Errors} = this;
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
      </Container>
    );
  }
}

Address.updateDefaultProps({
  rule:{
    country:[
      Rule.string.not.empty(props=>"You must provide country!")
    ],
    city:[
      Rule.string.not.empty(props=>"You must provide city!")
    ],
    street:[
      Rule.string.not.empty(props=>"You must provide street address!")
    ]
  }
});

export default Address;
