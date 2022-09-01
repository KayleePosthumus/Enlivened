import React from 'react';
import Navbar from '../pages/navbar';
import {Modal} from 'react-bootstrap';

const EventComponent = ({setShow,lat,long}) => {
    return (
        <Modal show={true} onHide={()=>{setShow(false)}}>
            <Modal.Header closeButton></Modal.Header>
            <div class="justify-content-center m-3">
                    <div class="card">
                        <div class="card-body">
                            <h2 class="card-title text-center">Create Event</h2>
                            <p class="card-text text-center">Provide information on the event you would like to create.</p>
                        
                            <div class="row d-flex justify-content-center">
                                <div class="flex-row d-flex mb-3">

                                    <select class="form-select mx-1">
                                        <option selected>Category</option>
                                        <option value="1">Support</option>
                                        <option value="2">Education</option>
                                        <option value="3">Sport</option>
                                    </select>

                                    <select class="form-select mx-1">
                                        <option selected>League</option>
                                        <option value="1">All Woman</option>
                                        <option value="2">Mixed</option>
                                    </select>
                                    
                                </div>

                                <div class="form-group row mb-2" >
                                    <label for="inputPassword" class="col-sm-3 col-form-label">Title</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control" placeholder="Title"/>
                                    </div>
                                </div>

                                <div class="form-group row mb-2" >
                                    <label for="inputPassword" class="col-sm-3 col-form-label">Capacity</label>
                                    <div class="col-sm-9">
                                        <input type="number" class="form-control" placeholder="8"/>
                                    </div>
                                </div>

                                <h5 class="col-sm-3 mb-2">Location</h5>

                                <div class="form-group row mb-2">
                                    <label for="inputPassword" class="col-sm-3 col-form-label">Latitude</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control" placeholder={lat}/>
        
                                    </div>
                                </div>

                                <div class="form-group row mb-2">
                                    <label for="inputPassword" class="col-sm-3 col-form-label">Longitude</label>
                                    <div class="col-sm-9">
                 
                                        <input type="text" class="form-control" placeholder={long}/>
                                    </div>
                                </div>

                                <button type="button" id="createEvent" class="btn btn-dark mt-3" onclick="successful()">Create Event</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
        </Modal>
    );
}

export default EventComponent;
