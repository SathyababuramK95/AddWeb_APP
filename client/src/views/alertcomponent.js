import React, { useState, useEffect } from 'react';

const AlertComponent = (props) => {

    let [errorText, setErrorText] = useState('');
    return (
        <MDBContainer>
            <MDBModal isOpen={props.modal} centered>
                <MDBModalHeader>Alert</MDBModalHeader>
                <MDBModalBody>
                    {errorText}
                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>
    );
}