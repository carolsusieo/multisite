import React, { Component } from 'react';
import ContactSpecifics from './ContactSpecifics'
import PropTypes from 'prop-types';
//import resume from './Resume.pdf'
/*import "bootstrap/dist/css/bootstrap.min.css";*/

/**
 * Component that alerts if you click outside of it
 */

 /* SPA - if this is added in any component it will consume the events for the entire app

this could be used for ma           <br/ ><br/ ><br/ ><br/ ><br/ >
king changes?  Starting changes?  but... 
 */
export default class OutsideAlerter extends Component {
    constructor(props) {
        super(props);

        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
          // was it a left click?
          if (event.type === 'click') {
            console.log('Left click');
          } else if (event.type === 'contextmenu') {
            alert('You clicked outside of me! right click');
          }
          else{
            alert('You clicked outside of me!');

          }
          }
    }
    /**
         * Set the wrapper ref
         */
        setWrapperRef(node) {
          this.wrapperRef = node;
        }

    render() {
        return <div ref={this.wrapperRef}>{this.props.children}</div>;
    }
}
/*
OutsideAlerter.propTypes = {
    children: PropTypes.element.isRequired,
};
*/
