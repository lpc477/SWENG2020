import React from 'react';
import { NavigationBar } from './components/NavigationBar';
import { Jumbotron } from './components/Jumbotron';
import { Layout } from './components/Layout';

export const Contact = () => (
  <Layout>
	<NavigationBar />
	<Jumbotron />
    <h2 class="display-3">Contact Us!</h2>  
    <br/>
      <p class="display-5">You can reach us at XXXXXXXX@gmail.com</p>
      <p class="display-5">Thank You!</p>
    <br/>
    <br/>
  </Layout>
)
