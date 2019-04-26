import React from "react";
import styled, {ThemeProvider} from "styled-components";
import {Provider} from "react-redux";
import Text from "src/component/input/text";
import Name from "src/component/form/name";
import Profile from "src/component/form/profile";
import theme from "src/common/theme/default";


const FormContainer = styled.div`
  background: ${({theme})=>theme.color.background.secondary};
  font-family: ${({theme})=>theme.font.primary};
  font-size:1em;
  padding: 4px;
  border: 2px solid;
  box-sizing: border-box;
`

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: ${({theme})=>theme.color.background.primary}
`

class Root extends React.Component{
  render(){
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <FormContainer>
            <Profile/>
          </FormContainer>
        </Container>
      </ThemeProvider>
    )
  }
}


export default Root;
