import React, {Component} from 'react';
import './App.scss';
import Header from './components/Header';
import Section from './components/Section';
import TopMenu from './components/TopMenu';
import About from './components/About';
import Signup from './components/Signup';
import Contact from './components/Contact';
import Projects from './components/Projects';
class App extends Component{
constructor(props){
  super(props);
  let config = require('./res/myconfig.json');

  this.state = {
    props:props,
    config: {},
  }

  const dotenv = require('dotenv');
  dotenv.config();
}

componentDidMount = async()=>{
  let test =    require('./res/myconfig.json');
  this.setState({
    config: test,
  })
}
render(){

//  const config = require('./res/myconfig.json');
  console.log("landing config: ", this.state.config.landing);
  const landing = this.state.config.landing;
  if(landing){
    const sections = landing.sections;
    const projects = sections.projects;
  return (

    <div id="home">
      <TopMenu title = {landing.lpage.toptitle}></TopMenu>
      <Header title = {landing.lpage.title} text = {landing.lpage.text} buttonLabel={landing.lpage.buttonLabel} ref = {landing.lpage.ref} mission = {landing.lpage.mission}>
      </Header>

     {sections.map(section =>{

       if(section.name == "about"){
         return(<About name = {section.name} header = {section.header} text = {section.text} img = {section.img} mission = {section.mission}> </About>)
     }
     else if(section.name == "signup"){
       return(<Signup name = {section.name} header = {section.header} input = {section.input} inputText = {section.inputText} inputId = {section.inputId} button = {section.button} buttonText = {section.buttonText}> classList = {section.classList}></Signup>)
     }
     else if(section.name == "contact"){
       return(<Contact name = {section.name} header = {section.header} items = {section.items} social = {section.social} classList = {section.classList}></Contact>)
     }
     else if(section.name == "projects"){
       return(<Projects name = {section.name}  projects = {section.projects}> </Projects>)
    }
    else {
         return(<Section name = {section.name} header = {section.header} text = {section.text} img = {section.img} mission = {section.mission}> </Section>)
    }

     })}

{

/* sections:
about
projects
signup
contact

      <Section name="projects" classList="bg-light">
        <div className="container">
        {projects.map(project =>(
          <div className="row justify-content-center no-gutters mb-5 mb-lg-0">
          <div className="col-lg-6">
            <img className="img-fluid" src={project.image} alt=""></img>
          </div>
          <div className="col-lg-6">
            <div className="bg-black text-center h-100 project">
              <div className="d-flex h-100">
                <div className="project-text w-100 my-auto text-center text-lg-left">
                  <h4 className="text-white">{project.header}</h4>
                  <p className="mb-0 text-white-50">{project.desc}</p>
                  <hr className="d-none d-lg-block mb-0 ml-0"></hr>
                </div>
              </div>
            </div>
          </div>
          </div>
        ))}
        </div>
      </Section>


      <Section name="contact" cldocumentassList="bg-black"
        html= {
          <div className="container">

          <div className="row">

            <div className="col-md-4 mb-3 mb-md-0">
              <div className="card py-4 h-100">
                <div className="card-body text-center">
                  <i className="fa fa-map text-primary mb-2"></i>
                  <h4 className="text-uppercase m-0">Address</h4>
                  <hr className="my-4"></hr>
                  <div className="small text-black-50">4923 Market Street, Orlando FL</div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3 mb-md-0">
              <div className="card py-4 h-100">
                <div className="card-body text-center">
                  <i className="fa fa-envelope text-primary mb-2"></i>
                  <h4 className="text-uppercase m-0">Email</h4>
                  <hr className="my-4"></hr>
                  <div className="small text-black-50">
                    <a href="#">hello@yourdomain.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3 mb-md-0">
              <div className="card py-4 h-100">
                <div className="card-body text-center">
                  <i className="fa fa-phone text-primary mb-2"></i>
                  <h4 className="text-uppercase m-0">Phone</h4>
                  <hr className="my-4"></hr>
                  <div className="small text-black-50">+1 (555) 902-8832</div>
                </div>
              </div>
            </div>
          </div>

          <div className="social d-flex justify-content-center">
            <a href="#" className="mx-2">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="#" className="mx-2">
              <i className="fa fa-facebook-f"></i>
            </a>
            <a href="#" className="mx-2">
              <i className="fa fa-github"></i>
            </a>
          </div>

        </div>
        }
      ></Section>
*/
}
      <footer className="bg-black small text-center text-white-50">
        <div className="container">
          Copyright &copy; {landing.lpage.toptitle} <span> </span> {landing.lpage.copyright_year}
        </div>
      </footer>

    </div>
  );
  }
  return(<div><p>Error in Config</p></div>);
}
}

export default App;
