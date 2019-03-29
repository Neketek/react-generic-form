import {Form as Base} from "react-generic-form";
import Rule from "./rule";
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
      Rule.string.len.min(({params:{size}})=>`Password should be longer or equal ${size} chars`).params({size:10})
    ]
  }
})

export default Login;
