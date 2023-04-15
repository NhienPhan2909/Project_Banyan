import React from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTree, faSeedling } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import './onboard.css'
function Onboard() {
  return (
    <div id="onboard-container" className="onboarding">
      <div id="onboard-main">
        {/* <div id='header'>
            <img id='logo'  src="BanyanText_Transparent.png" />
        </div> */}
        <Container>
          <Row>
            <Col>
              <h1 className="text-center text">Welcome to</h1>
              <div id='header'>
                <img id='logo'  src="BanyanText_Transparent.png" />
              </div>
            </Col>
          </Row>
          <Row>
            <Row>
              <Carousel>
                <Carousel.Item className='custom-item'>
                  <div className="ImgDiv" >
                    <img 
                    id="slide-1-Img"
                    className="d-block w-100 customImg"
                    src="/slides/banyan_slide1.png"
                    alt="First slide"
                    />
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="ImgDiv">
                    <img
                      className="d-block w-100 customImg"
                      src="/slides/signup_slide.png"
                      alt="Second slide"
                    />
                  </div>
                  <Carousel.Caption>
                    <h3 className='caption-title' id='slide-2-title'>Make an Account</h3>
                    <p className='caption-text' id='slide-2-text'>
                      Click on the button to signup with your email! Once you verify your email you can start using
                      our product.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <div className='ImgDiv'>
                    <img
                      className="d-block w-100 customImg"
                      src="/slides/Prompt.gif"
                      alt="Third slide"
                    />
                  </div>
                  <Carousel.Caption>
                    <h3 className='caption-title'>Enter Your Idea!</h3>
                    <p className='caption-text' id='slide-3-text'>
                      Give us a name and a description of your vision. The more detailed you are the better!
                      Once you submit your idea, we utilize OpenAIs GPT-3.5 to generate Agile-style Epics and Stories
                      to give you a plan to start executing.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <div className='ImgDiv'>
                    <img
                      className="d-block w-100 customImg"
                      src="/slides/Tree.gif"
                      alt="Fourth slide"
                    />
                  </div>
                  <Carousel.Caption>
                    <h3 className='caption-title'>Grow Your Tree</h3> 
                    <p className='caption-text' id='slide-4-text'>
                      Expand you tree, edit your leafs, modify your stories! The power is now in your hands to evolve
                      the project however you see fit, or call upon GPT-3.5 to break it down even further!
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <div className='ImgDiv'>
                    <img
                      className="d-block w-100 customImg"
                      src="/slides/dashboard_slide.png"
                      alt="Fifth slide"
                    />
                  </div>
                  <Carousel.Caption>
                    <h3 className='caption-title' id='slide-5-title'>Repeat!</h3>
                    <p className='caption-text' id='slide-5-text'>
                      Now the world is your oyster :) Repeat the process with as many different projects as you'd like!
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Row>
            <Row>
                <div id="buttons">
                  <Link id='signup' to="/signup">
                    <Button className='signupButton' variant="dark" type="submit" block>
                      Sign up
                      {' '}
                      <FontAwesomeIcon icon={faSeedling} style={{color: "#1f5125",}} />
                    </Button>
                  </Link>
                  {' '}
                  <Link id='login' to="/login">
                    <Button className='loginButton' variant="dark" type="submit" block>
                      Login
                      {' '}
                      <FontAwesomeIcon icon={faTree} bounce style={{color: "#1f5125",}} />
                    </Button>
                  </Link>
                  
                </div>
              {/* </div> */}
            </Row>
          </Row>
        </Container> 
      </div> 
    </div>
  ); 
}

export default Onboard;
