import React, {Component} from 'react';
import Section from './Section';


export default class Projects extends Component {


  constructor(props){
    super(props);
    this.state = {
      props:props,
    }
  }

// todo need to add links to the apps I'm currently creating
  render(){
    const projects = this.state.props.projects;
    return (
      <Section name="projects" classList="bg-light" html={
        <div className="container">
        {projects.map(project =>(
          <div className="row justify-content-center no-gutters mb-5 mb-lg-0">
          <div className="col-lg-6">
            <img className="img-fluid" src={project.img} alt=""></img>
          </div>
          <div className="col-lg-6">
            <div className="bg-black text-center h-100 project">
              <div className="d-flex h-100">
                <div className="project-text w-100 my-auto text-center text-lg-left">
                  <h4 className="text-white">{project.header}</h4>
                  <p className="mb-0 text-white-50">{project.text}</p>
                  <hr className="d-none d-lg-block mb-0 ml-0"></hr>
                </div>
              </div>
            </div>
          </div>
          </div>
        ))}
        </div>
      }>
      </Section>

      );
    }
  }
