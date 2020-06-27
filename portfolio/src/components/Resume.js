import React, { Component } from 'react';
/*import "bootstrap/dist/css/bootstrap.min.css";*/
import Work from './Work'
//import References from './References'
import Education from './Education'
import Skills from './Skills';

class Resume extends Component {
  render() {
    return (
     <section id="resume">
 		<div id="colorlib-main">
			<Work></Work>
  			<Skills></Skills>
			<Education></Education>
	        </div>
    </section>
);
  }
}

export default Resume;
