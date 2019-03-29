import {Form as Base} from "react-generic-form";
import Rule from "./rule";
import Text from "src/component/input/text";
import Select from "src/component/input/select";
import React from "react";
import styled from "styled-components";
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
    const {Field, Form} = this;
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
