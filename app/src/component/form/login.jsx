import {Form as Base, Rule} from "react-generic-form";
import Text from "src/component/input/text";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`


class Login extends Base{
  form({render:{field, form}}){
    return (
      <Container>

      </Container>
    );
  }
}

Login.updateDefaultProps({
  name:"login",
  rule:{
    email:[
      Rule.string.not.empty(props=>"Email should not be empty")
    ],
    password:[
      Rule.string.not.empty(props=>"Password should not be empty"),
      Rule.string.len.min(props=>"Password should not be less than 6 chars")(6)
    ]
  }
})

export default Login;
