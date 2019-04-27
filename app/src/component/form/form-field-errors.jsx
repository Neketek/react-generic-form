import styled from "styled-components";
import React from "react";

/*
This is just a presentational component which use props
which form.Error wrapper provides
*/

const Container = styled.ul`
  font-size: 0.5em;
  font-family: ${({theme})=>theme.font.primary};
  color:${({show,theme})=>show?theme.color.font.error:"transparent"};
  list-style: none;
`


const FormFieldErrors=props=>{
  const {error, visited, focus, show}=props;
  const visible = error && (visited && !focus || show);
  const errors = show?error.map((v,i)=><li key={i}>{v}</li>):"E";
  return (
    <Container show={visible}>
      {errors}
    </Container>
  )
}

export default FormFieldErrors;
