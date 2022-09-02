import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import {ImTrophy} from 'react-icons/im';
import {BiCategory} from 'react-icons/bi';
import {BsCalendarDateFill,BsFillPeopleFill} from 'react-icons/bs';
import Navbar from './navbar';
import UploadComponent from '../modals/uploadComponent';
import one from '../logo/one.jpg';
import two from '../logo/two.jpg';
import three from '../logo/three.JPG';
import four from '../logo/four.JPG';

const Event = () => {
    const {id} = useParams();
    const [event,setEvent] = useState(undefined);
    const [showUpload,setShowUpload] = useState(false);

    useEffect(() =>{
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({"id":id})
          };
          fetch("http://197.245.137.83:8728/event/find",requestOptions).then(
            response => response.json()
          ).then(
            data => 
              setEvent(JSON.parse(JSON.stringify(data))[0])
          )
      }, [])
    
    return (
        <div className="bg-light">
        <Navbar/>
        <div className='justify-content-center'>

            {/* <div class="cont ">
                <img src="https://images.pexels.com/photos/2097521/pexels-photo-2097521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width="100%" alt="First slide"/>
                <div className='abs w-100 justify-content-center'>
                    <h2 class="centered">event.description</h2>
                    <p class="paragraph">event.location</p>   
                </div>
            </div> */}

            {(typeof event === 'undefined') ? (
                <div></div>
            ):(
                <div>
                    <h1 className='mt-3'>Learn to change a Tyre</h1>

                    <button className='btn btn-success rounded px-3 py-2 mt-3 text-center' onClick={()=>{alert("success")} }>Register for event</button>

                    <div className='row bg-success rounded py-2 px-3 mt-4 mx-5'>
                        <div className="col-sm text-white mx-2">
                            <ImTrophy className="mt-2" size={30}/>
                            <p className="mt-2">{event.league}</p>   
                        </div>
                        <div className="col-sm text-white mx-2">
                            <BiCategory className="mt-2" size={30}/>
                            <p className="mt-2">{event.category}</p>
                        </div>
                        <div className="col-sm text-white mx-2">
                            <BsCalendarDateFill className="mt-2" size={28}/>
                            <p className="mt-2">2022-09-02</p>
                        </div>
                        <div className="col-sm text-white mx-2">
                            <BsFillPeopleFill className="mt-2" size={30}/>
                            <p className="mt-2">{event.capacity}</p>
                        </div>
                    </div>

                    <button className='w-75 btn btn-dark rounded px-3 py-2 text-center mt-3' onClick={()=>{setShowUpload(true)} }>Upload Images</button>

                    <div class="row mx-5 mt-3">
                    <img class="col-sm img-thumbnail rounded w-25 m-2" src={one} alt="" />
                    <img class="col-sm img-thumbnail img-fluid rounded w-25 m-2" src={two} alt=""/>
                    <img class="col-sm img-thumbnail img-fluid rounded w-25 m-2" src={three} alt=""/>
                    <img class="col-sm img-thumbnail img-fluid rounded w-25 m-2" src={four} alt=""/>
                    </div>
                    

                    { showUpload? (
                    <UploadComponent setShow={setShowUpload}/>
                    ):(
                    <div></div>
                    )}
                    </div>
            )}
            
        </div>
        
        </div>
    );
}

export default Event;
