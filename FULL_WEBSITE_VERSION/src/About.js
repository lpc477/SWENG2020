import React from 'react'
import { NavigationBar } from './components/NavigationBar';
import { Jumbotron } from './components/Jumbotron';
import { Layout } from './components/Layout';

export const About = () => (
  <Layout>
	<NavigationBar />
	<Jumbotron />
    <h2 class="display-3" style = {{paddingLeft:"2%"}}>About Us!</h2>
    <br/>
      <p class="display-5"style = {{paddingLeft:"2%"}}>Nothin really....</p>
      <p class="display-5"style = {{paddingLeft:"2%"}}>Thank You!</p>
      <br/>
      <br/>
  </Layout>
)
