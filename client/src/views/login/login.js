import React, { useState, useEffect } from 'react';
import './login.css'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import { ROUTEPATH } from '../../common/appConstants';
import { API_URL } from '../../common/appConstants';
import { httpPost } from '../../httpClient/httpClient';
import { connect } from 'react-redux';
import { changeLoginStatus, storeUserDetail } from '../../state/actions';


const Login = (props) => {

    let [emailid, setEmail] = useState('');
    let [password, setPassword] = useState('');


    function inputChange(value, type) {
        if (type == 'email') {
            setEmail(value)
        } else if (type == 'password') {
            setPassword(value)
        }
    }


    async function doLogin() {
        if (!password || !emailid) {
            alert("please fill all the details");
        }
        if (emailid && !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailid))) {
            alert("Entered email was invalid");
        }

        let userData = await httpPost(API_URL.GETUSER, { password: password, emailid: emailid });
        if (userData && userData.error) {
            alert("error while logging in");
        } else {
            props.changeLoginStatus(true);
            props.storeUserDetail(userData.userData);
            props.history.push(ROUTEPATH.DASHBOARD);
        }
    }

    function goToSignin() {
        props.history.push(ROUTEPATH.SIGNUP);
    }

    return (
        <MDBContainer>
            <MDBRow className="justify-content-center align-items-center">
                <MDBCol md="6">
                    <MDBCard className="Carddiv">
                        <MDBCardBody className="mx-4">
                            <div className="text-center">
                                <h3 className="dark-grey-text mb-5">
                                    <strong>Sign in</strong>
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
                                label="Your password"
                                group
                                type="password"
                                validate
                                containerClass="mb-0"
                                value={password}
                                onChange={(e) => inputChange(e.target.value, 'password')}
                            />
                            <p className="font-small blue-text d-flex justify-content-end pb-3">
                                Forgot
                            <a href="#!" className="blue-text ml-1">

                                    Password?
                            </a>
                            </p>
                            <div className="text-center mb-3">
                                <MDBBtn
                                    type="button"
                                    gradient="blue"
                                    rounded
                                    className="btn-block z-depth-1a"
                                    onClick={() => { doLogin() }}
                                >
                                    Sign in
                            </MDBBtn>
                            </div>
                        </MDBCardBody>
                        <MDBModalFooter className="mx-5 pt-3 mb-1">
                            <p className="font-small grey-text d-flex justify-content-end" onClick={() => { goToSignin() }}>
                                Not a member?
                            <a className="blue-text ml-1">
                                    Sign Up
                            </a>
                            </p>
                        </MDBModalFooter>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )

}
const mapDispatchToProps = (dispatch) => {
    return {
        changeLoginStatus: (s) => { dispatch(changeLoginStatus(s)) },
        storeUserDetail: (s) => { dispatch(storeUserDetail(s)) }
    };
};

export default connect(null, mapDispatchToProps)(Login);