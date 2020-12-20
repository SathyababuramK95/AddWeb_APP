import React, { useState, useEffect } from 'react';
import './dashboard.css'
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBIcon, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBView, MDBBtn, MDBContainer, MDBCardTitle, MDBInput,
} from 'mdbreact';
import { ROUTEPATH } from '../../common/appConstants';
import { API_URL } from '../../common/appConstants';
import { httpPost } from '../../httpClient/httpClient';
import Store from '../../state/store';
import AlertComponent from '../alertcomponent';



const Dashboard = (props) => {


    let storeData = Store.getState();

    let [userdetail, setUserdetail] = useState({
        name: storeData.Reducer && storeData.Reducer.userData && storeData.Reducer.userData.username || ''
    });
    let [firstname, setFirstName] = useState('');
    let [lastname, setLastName] = useState('');
    let [fathername, setFatherName] = useState('');
    let [emailid, setEmailId] = useState('');
    let [mobilenumber, setMobileNumber] = useState('');
    let [country, setCountry] = useState('');
    let [gender, setGender] = useState('');
    let [dateofbirth, setDate] = useState('');
    let [image, setImage] = useState('');
    let [address, setAddress] = useState('');
    let [model, setModel] = useState(false)
    let [errorValue, setErrorValue] = useState('');

    function inputChange(value, type) {
        if (type == 'firstname') {
            setFirstName(value)
        }
        else if (type == 'lastname') {
            setLastName(value)
        }
        else if (type == 'fathername') {
            setFatherName(value)
        }
        else if (type == 'emailid') {
            setEmailId(value)
        }
        else if (type == 'mobilenumber') {
            setEmailId(setMobileNumber)
        }
        else if (type == 'country') {
            setEmailId(setCountry)
        }
        else if (type == 'gender') {
            setEmailId(setGender)
        }
        else if (type == 'dateofbirth') {
            setEmailId(setDate)
        }
        else if (type == 'image') {
            setEmailId(setImage)
        }
        else if (type == 'address') {
            setEmailId(setAddress)
        }
    }

    function showAlertComponent(errorValue) {
        setErrorValue(errorValue);
        setModel(!model)
    }

    const doStudentRegistration = async () => {
        if (!firstname || !lastname || !emailid || !fathername) {
            showAlertComponent("please fill all the details");
        }
        if (emailid && !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailid))) {
            showAlertComponent("Entered email was invalid");
        }else{
            let savedData = await httpPost(API_URL.REGISTERSTUDENT, {
            });
            if (savedData && savedData.student) {
                props.history.push(ROUTEPATH.Dashboard);
            }
            else if(savedData.error){
                showAlertComponent("Error while adding new student")
            }
        }
    }


    return (
        <div>
            <AlertComponent model={model} errorText={errorValue} onChange={() => showAlertComponent()}>
            </AlertComponent>
            <MDBNavbar color="indigo" dark expand="md">
                <MDBNavbarBrand>
                    <strong className="white-text">Welcome</strong>
                </MDBNavbarBrand>
                <MDBCollapse id="navbarCollapse3" navbar>
                    <strong className="white-text">{userdetail.name}</strong>
                    <MDBNavbarNav right>
                        <MDBNavItem active>
                            <MDBNavLink to="#!">Add Student</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="#!">View Students</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink className="waves-effect waves-light" to="#!">
                                <MDBIcon icon="sign-out-alt" />
                            </MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>

            <MDBContainer>
                <MDBCard className="registerForm">
                    <MDBCardTitle className="titleText">
                        <strong>Student Registration</strong>
                    </MDBCardTitle>
                    <MDBCardBody>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <MDBInput type="text" label="Firstname" value={firstname}
                                    onChange={(e) => inputChange(e.target.value, 'firstname')} />
                            </div>
                            <div className="form-group col-md-4">
                                <MDBInput type="text" label="Lastname" value={lastname}
                                    onChange={(e) => inputChange(e.target.value, 'lastname')} />
                            </div>
                            <div className="form-group col-md-4">
                                <MDBInput type="text" label="Father Name" value={fathername}
                                    onChange={(e) => inputChange(e.target.value, 'fathername')} />
                            </div>
                            <div className="form-group col-md-4">
                                <MDBInput type="text" label="Email ID" value={emailid}
                                    onChange={(e) => inputChange(e.target.value, 'emailid')} />
                            </div>
                            <div className="form-group col-md-4">
                                <MDBInput type="number" label="Mobile Number" value={mobilenumber}
                                    onChange={(e) => inputChange(e.target.value, 'mobilenumber')} />
                            </div>
                            <div className="form-group col-md-4 selectBox">
                                <select className="browser-default custom-select" value={country}
                                    onChange={(e) => inputChange(e.target.value, 'country')}>
                                    <option>Select Country</option>
                                    <option value="India">India</option>
                                    <option value="Srilanka">Srilanka</option>
                                    <option value="America">America</option>
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <select className="browser-default custom-select" value={gender}
                                    onChange={(e) => inputChange(e.target.value, 'gender')}>
                                    <option>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <input type="date" className="form-control" value={dateofbirth}
                                    onChange={(e) => inputChange(e.target.value, 'dateofbirth')} />
                            </div>
                            <div className="form-group col-md-4">
                                <input type="file" className="form-control" value={image}
                                    onChange={(e) => inputChange(e.target.value, 'image')} />
                            </div>
                            <div className="form-group col-md-4">
                                <MDBInput type="textarea" label="Address" rows="5" value={address}
                                    onChange={(e) => inputChange(e.target.value, 'address')} />
                            </div>
                        </div>
                        <MDBBtn color="primary" onClick={() => { doStudentRegistration() }}>
                            Save
                        </MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        </div>
    )

}
export default Dashboard;