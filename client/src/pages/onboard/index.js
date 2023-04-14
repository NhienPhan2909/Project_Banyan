import React from 'react';
import { Carousel, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTree, faSearch, faSeedling } from '@fortawesome/free-solid-svg-icons';

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
              <h1 className="text-center">Welcome to</h1>
              <div id='header'>
                <img id='logo'  src="BanyanText_Transparent.png" />
              </div>
            </Col>
          </Row>
          <Row>
            <Row>
              <Carousel>
                <Carousel.Item className='custom-item'>
                  <div id="specialDiv" >
                    <img 
                    id="specialImg"
                    className="d-block w-100"
                    src="/slides/banyan_slide1.png"
                    alt="First slide"
                    />
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://picsum.photos/800/400?text=Slide%202"
                    alt="Second slide"
                  />
                  <Carousel.Caption>
                    <h3>Make an Account</h3>
                    <p>
                      Click on the button to signup with your email! Once you verify your email you can start using
                      our product. (Maybe a cool looking security thing?)
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://picsum.photos/800/400?text=Slide%203"
                    alt="Third slide"
                  />
                  <Carousel.Caption>
                    <h3>Enter Your Idea!</h3>
                    <p>
                      Give us a name and a description of your vision. The more detailed you are the better!
                      Once you submit your idea, we utilize OpenAIs GPT-3.5 to generate Agile-style Epics and Stories
                      to give you a plan to start executing. (GIF of entering into prompt page)
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://picsum.photos/800/400?text=Slide%204"
                    alt="Fourth slide"
                  />
                  <Carousel.Caption>
                    <h3>Grow Your Tree</h3> 
                    <p>
                      Expand you tree, edit your leafs, modify your stories! The power is now in your hands to evolve
                      the project however you see fit, or call upon GPT-3.5 to break it down even further! (GIF of expanding/editing tree)
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://picsum.photos/800/400?text=Slide%205"
                    alt="Fifth slide"
                  />
                  <Carousel.Caption>
                    <h3>Repeat!</h3>
                    <p>
                      Now the world is your oyster :). Repeat the process with as many different projects as you'd like!
                      (Dashboard image)
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Row>
            <Row>
              {/* <div className="features">
                <h2>Features</h2>
                <ul>
                  <li>Lorem ipsum dolor sit amet</li>
                  <li>Consectetur adipiscing elit</li>
                  <li>Sed do eiusmod tempor incididunt</li>
                </ul> */}
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
