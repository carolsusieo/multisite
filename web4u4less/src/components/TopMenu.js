import React, {Component} from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import * as Scroll from 'react-scroll';


export default class TopMenu extends React.Component {

    state = { isTopOfPage: true };


    constructor (props){
        super(props);
        this.state = {
          title:props.title,
        }
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(e) {
        const currentYScroll = window.scrollY;

        if (this.state.isTopOfPage && currentYScroll < 10) {
            return;
        }
        if (currentYScroll < 10) {
          this.setState({ isTopOfPage: true });
        } else {
            this.setState({ isTopOfPage: false });
        }
      }

    render() {


      let read  = require("../res/myconfig.json");
      const topmenu = read.landing.topmenu;

      return <Navbar fixed="top" className={"topmenu-navbar " + (this.state.isTopOfPage ? '' : 'navbar-shrink')} expand="sm"> {/* missing id mainNav */}
                <Container>
                    <Scroll.Link className="navbar-brand" smooth={true} duration={500} spy={true} href="#scroll-to-top" to="scroll-to-top">{this.state.title}</Scroll.Link>
                    <Navbar.Toggle className="navbar-toggler-right" aria-controls="responsive-navbar-nav" aria-expanded="false" aria-label="Toggle navigation" />
                    <Navbar.Collapse id="navbarResponsive">
                    <Nav className="ml-auto">

                    {topmenu.map(menuitem =>(
                        <Scroll.Link smooth={true} duration={500} spy={true} className="nav-link" href={menuitem.href} to={menuitem.menu}>{menuitem.menutitle}</Scroll.Link>
                      ))}
                    </Nav>
                    </Navbar.Collapse>
                </Container>
             </Navbar>
    }
  }
