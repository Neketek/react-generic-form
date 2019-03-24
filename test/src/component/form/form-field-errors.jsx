import styled from "styled-components";
import React from "react";

const Container = styled.ul`
  font-size: 0.5em;
  font-family: ${({theme})=>theme.font.primary};
  color:${({show,theme})=>show?theme.color.font.error:"transparent"};
  list-style: none;
`


const FormFieldErrors=props=>{
  const {error, visited, focus}=props;
  const show = error && visited && !focus;
  const errors = show?error.map((v,i)=><li key={i}>{v}</li>):"E";
  return (
    <Container show={show}>
      {errors}
    </Container>
  )
}

export default FormFieldErrors;
