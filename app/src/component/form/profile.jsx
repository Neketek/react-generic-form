// Here is an example of nested form usage
// Story is pretty much the same as with regular
// fields. Only thing which change is wrapper.
// Instead of Field wrapper now you need to be using Form
import React from "react";
import styled from "styled-components";
import {Form as Base} from "react-generic-form";
import Rule from "./rule";
import NameForm from "./name";
import AddressForm from "./address";


const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

class Profile extends Base{
  constructor(props){
    super(props);
  }

  form(){
    const {Form} = this;
    // Just wrap forms in Form wrapper and that's it. Everything
    // should work perfectly. Forms values stored as nested values
    // stored under name key. Same thing is correct for warning, error
    // and focus state fields of the nested forms.
    // Wrapper will add nested prop to the nested forms
    // which will disable their ability to trigger render
    // because for nested render is triggered by props change
    return (
      <Container>
        <Form>
          <NameForm name="name"/>
        </Form>
        <Form>
          <AddressForm name="address"/>
        </Form>
      </Container>
    );
  }
}

Profile.updateDefaultProps({
  name:"profile",
});

export default Profile;
