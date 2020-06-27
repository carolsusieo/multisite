import React, { Component } from 'react';
/*import "bootstrap/dist/css/bootstrap.min.css";*/
//import api from '../api'


export default class Work extends Component {

      constructor(props) {
            super(props)
            this.state = {
                work: [],
                isLoading: false,
  //              apiError: false,
            }
        }


        componentDidMount = async () => {
            let test = require('../myconfig.json');
            this.setState({
              work: test.work,
              isLoading: false,
            });
        }



  render() {

    if(this.state.isLoading){
      return <p>Work Loading ...</p>;
    }

    const works = this.state.work;
    if(works)  {
        return (

          <div className="row work">
            <div className="three columns header-col">
              <h1><span>Work</span></h1>
            </div>


            <div className="nine columns main-col">
            {works.map(test =>(

              <div className="row item">
              <div className="row work">
                <div className="twelve columns">
                  <h3>{test.company}</h3>
                  <p className="info">{test.position}<span>•</span> <em className="date">{test.years}</em></p>
                  <p className="info">
                    {test.desc}

                  </p>
                  {test.subdesc.map(subdesc =>(
                  <li className="info">{subdesc}</li>
                   ))}


                </div>
              </div>
              </div>
            ))}

            </div>
          </div>


        )
      }
      return(<p>"error"</p>);

    }



  }
