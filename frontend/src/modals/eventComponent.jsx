import React,{useState} from 'react';
import Navbar from '../pages/navbar';
import {Modal} from 'react-bootstrap';

const EventComponent = ({setShow,lat,long}) => {

    const [league,setLeague] = useState("SUPPORT");
    const [cat,setCat] = useState("WOMAN");
    const [cap,setCap] = useState(8);
    const [latit,setLatit] = useState("11.2");
    const [longit,setLongit] = useState("11.2");
    const [desc,setDesc] = useState("");

    const create = () =>{
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({"League":league, "Category":cat, "Capacity":cap, "Latitude":latit, "Longitude":longit})
        };
        fetch("http://197.245.137.83:8728/event/create",requestOptions).then(
            response => response.json()
        ).then(
            data => 
            console.log(data)
        )
    }

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

                                    <select class="form-select mx-1" onChange={(e)=>{setCat(e.target.value)}}>
                                        <option selected>Category</option>
                                        <option value="SUPPORT">Support</option>
                                        <option value="EDUCATION">Education</option>
                                        <option value="SPORT">Sport</option>
                                    </select>

                                    <select class="form-select mx-1" onChange={(e)=>{setLeague(e.target.value)}}>
                                        <option selected>League</option>
                                        <option value="WOMAN">All Woman</option>
                                        <option value="MIXED">Mixed</option>
                                    </select>
                                    
                                </div>

                                <div class="form-group row mb-2" >
                                    <label for="inputPassword" class="col-sm-3 col-form-label" onChange={(e)=>{setDesc(e.target.value)}}>Title</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control" placeholder="Title"/>
                                    </div>
                                </div>

                                <div class="form-group row mb-2" >
                                    <label for="inputPassword" class="col-sm-3 col-form-label" onChange={(e)=>{setCap(e.target.value)}}>Capacity</label>
                                    <div class="col-sm-9">
                                        <input type="number" class="form-control" placeholder="8"/>
                                    </div>
                                </div>

                                <div class="form-group row mb-2" >
                                    <label for="inputPassword" class="col-sm-3 col-form-label">Date</label>
                                    <div class="col-sm-9">
                                        <input type="date" class="form-control"/>
                                    </div>
                                </div>

                                <h5 class="col-sm-3 mb-2">Location</h5>

                                <div class="form-group row mb-2">
                                    <label for="inputPassword" class="col-sm-3 col-form-label">Latitude</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control" placeholder={lat} onChange={(e)=>{setLatit(e.target.value)}}/>
        
                                    </div>
                                </div>

                                <div class="form-group row mb-2">
                                    <label for="inputPassword" class="col-sm-3 col-form-label" onChange={(e)=>{setLongit(e.target.value)}}>Longitude</label>
                                    <div class="col-sm-9">
                 
                                        <input type="text" class="form-control" placeholder={long}/>
                                    </div>
                                </div>

                                <button type="button" id="createEvent" class="btn btn-dark mt-3" onClick={()=>{create()}}>Create Event</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
        </Modal>
    );
}

export default EventComponent;
