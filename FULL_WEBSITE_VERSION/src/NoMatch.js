import React from 'react';
import { NavigationBar } from './components/NavigationBar';
import { Jumbotron } from './components/Jumbotron';
import { Layout } from './components/Layout';

export const NoMatch = () => (
  <Layout>
	<NavigationBar />
	<Jumbotron />
    <h2>No Match</h2>
  </Layout>
)
