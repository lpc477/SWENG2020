import React from 'react';
import { Container } from 'react-bootstrap';

export const Layout = (props) => (
  <Container style = {{padding:"0px", maxWidth:"100%", backgroundSize:"auto"}}>
    {props.children}
  </Container>
)
