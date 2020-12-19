import React, { useState, useEffect } from 'react';
import './signup.css'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import { ROUTEPATH } from '../../common/appConstants';
import { API_URL } from '../../common/appConstants';
import { httpPost } from '../../httpClient/httpClient';


const Signup = (props) => {

    let [emailid, setEmail] = useState('');
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    function inputChange(value, type) {
        if (type == 'username') {
            setUsername(value)
        } else if (type == 'email') {
            setEmail(value)
        } else if (type == 'password') {
            setPassword(value)
        }
    }


    async function doSignin() {
        if (!username || !password || !emailid) {
            alert("please fill all the details");
        }
        if (emailid && !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailid))) {
            alert("Entered email was invalid");
        }

    
        let savedData = await httpPost(API_URL.SAVEUSER, { username: username, password: password, emailid: emailid });
        if (savedData) {
            props.history.push(ROUTEPATH.INDEX);
        }
       
    }

    function goToLogin() {
        props.history.push(ROUTEPATH.INDEX);
    }

    return (
        <MDBContainer>
            <MDBRow className="justify-content-center align-items-center">
                <MDBCol md="6">
                    <MDBCard className="Carddiv">
                        <MDBCardBody className="mx-4">
                            <div className="text-center">
                                <h3 className="dark-grey-text mb-5">
                                    <strong>Sign Up</strong>
                                </h3>
                            </div>
                            <MDBInput
                                label="Your email"
                                group
                                type="email"
                                validate
                                error="wrong"
                                success="right"
                                value={emailid}
                                onChange={(e) => inputChange(e.target.value, 'email')}
                            />
                            <MDBInput
                                label="Your Username"
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"
                                value={username}
                                onChange={(e) => inputChange(e.target.value, 'username')}
                            />
                            <MDBInput
                                label="Your password"
                                group
                                type="password"
                                validate
                                containerClass="mb-0"
                                value={password}
                                onChange={(e) => inputChange(e.target.value, 'password')}
                            />
                            <div className="text-center mb-3">
                                <MDBBtn
                                    type="button"
                                    gradient="blue"
                                    rounded
                                    className="btn-block z-depth-1a"
                                    onClick={() => { doSignin() }}
                                >
                                    Sign Up
                            </MDBBtn>
                            </div>
                        </MDBCardBody>
                        <MDBModalFooter className="mx-5 pt-3 mb-1">
                            <p className="font-small grey-text d-flex justify-content-end" onClick={() => { goToLogin() }}>
                                Already an member?
                            <a href="#!" className="blue-text ml-1">

                                    Sign In
                            </a>
                            </p>
                        </MDBModalFooter>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )

}
export default Signup;