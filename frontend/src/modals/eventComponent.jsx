import React from 'react';
import Navbar from '../pages/navbar';
import {Modal} from 'react-bootstrap';

const EventComponent = (show) => {
    return (
        <Modal show={show}>
        <div class="row d-flex justify-content-center mt-3">
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <h2 class="card-title text-center">Create Event</h2>
                        <p class="card-text text-center">Provide information on the event you would like to create.</p>
                    
                        <div class="row d-flex justify-content-center">
                            <div class="flex-row d-flex ">

                                <select class="form-select" aria-label="Default select example">
                                    <option selected>Category</option>
                                    <option value="1">Support</option>
                                    <option value="2">Eductaion</option>
                                    <option value="3">Sport</option>
                                </select>

                                <select class="form-select" aria-label="Default select example" >
                                    <option selected>League</option>
                                    <option value="1">All Woman</option>
                                    <option value="2">Mixed</option>
                                </select>
                                
                            </div>

                            <h4 class="text-center">Location</h4>
                            <div id="map" class="map"></div>

                            <div class="form-group row" >
                                <label for="inputPassword" class="col-sm-2 col-form-label">Title</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputPassword" placeholder="Title"/>
                                </div>
                            </div>

                            <div class="form-group row" >
                                <label for="inputPassword" class="col-sm-2 col-form-label">Capacity</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control" id="inputPassword" placeholder="8"/>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="inputPassword" class="col-sm-2 col-form-label">Location</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="inputPassword" placeholder="Location"/>
                                </div>
                            </div>

                            <button type="button" id="createEvent" class="btn btn-dark" onclick="successful()">Create Event</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        </Modal>
    );
}

export default EventComponent;
