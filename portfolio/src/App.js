import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import About from './components/About'
import Resume from './components/Resume'
import Footer from './components/Footer'
import Contact from './components/Contact'


class App extends Component {

  constructor(props) {
        super(props);
        const dotenv = require('dotenv');
        dotenv.config();

    }


  render() {


    return (
      <div id="colorlib-page">
        <div id="container-wrap">


		<Header></Header>
		<div id="colorlib-main">
			<About></About>
			<Resume></Resume>

    <div style={{textAlign: "center"}}><Contact></Contact></div>
      <Footer></Footer>

          	</div>
      	</div>
      </div>
    );
  }
}

export default App;
