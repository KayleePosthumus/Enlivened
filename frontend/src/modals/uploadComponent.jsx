import React from 'react';
import {Modal} from 'react-bootstrap';

const UploadComponent = ({setShow}) => {
    return (
        <Modal show={true} onHide={()=>{setShow(false)}}>
            <Modal.Header closeButton></Modal.Header>
            <div class="card text-center">
                <div class="card-body">
                    <h5 class="card-title mb-2">Upload Images</h5>
                    <input id="upload" type="file" onChange="readURL(this);" class="form-control border-0"/>
                    <div class="input-group-append mt-3">
                        <button type="button" class="btn btn-primary text-white mx-1" onClick={()=>{setShow(false)}}>Submit</button>
                    </div>   
                </div>
            </div>
        </Modal>
    );
}

export default UploadComponent;
