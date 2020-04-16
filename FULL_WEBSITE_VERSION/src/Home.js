import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';
import { Jumbotron } from './components/Jumbotron';
import { Layout } from './components/Layout';

export const Home = () => (
  <Layout>
	<NavigationBar />
    <Jumbotron />
     <header class="masthead text-center text-white">
    <div class="masthead-content">
      <div class="container">
        <Link to="/Chat" class="btn btn-primary btn-xl rounded-pill mt-5">Begin Chat</Link>
      </div>
    </div>

  </header>

  <section>
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 order-lg-2">
          <div class="p-5">
            <img class="img-fluid rounded-circle" src={require('./assets/img-diet.jpg')} alt="" />
          </div>
        </div>
        <div class="col-lg-6 order-lg-1">
          <div class="p-5">
            <h2 class="display-4">Get Dietary information</h2>
            <p>Enter your patient's diagnosis and find dietary advice</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6">
          <div class="p-5">
            <img class="img-fluid rounded-circle" src={require('./assets/img-lang.png')} alt="" />
          </div>
        </div>
        <div class="col-lg-6">
          <div class="p-5">
            <h2 class="display-4">Work in English, Spanish, or Dutch</h2>
            <p>Type your language in the chat to use it instead!</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 order-lg-2">
          <div class="p-5">
            <img class="img-fluid rounded-circle" src={require('./assets/img-diet.jpg')} alt="" />
          </div>
        </div>
        <div class="col-lg-6 order-lg-1">
          <div class="p-5">
            <h2 class="display-4">Try our WebExtension</h2>
            <p>Opens chat straight away if you need to find advice quick</p>
          </div>
        </div>
      </div>
    </div>
  </section>

</Layout>
)
