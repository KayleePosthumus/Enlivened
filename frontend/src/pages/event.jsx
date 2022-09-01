import React, {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import {ImTrophy} from 'react-icons/im';
import {BiCategory} from 'react-icons/bi';
import {BsCalendarDateFill,BsFillPeopleFill} from 'react-icons/bs';
import Navbar from './navbar';
import UploadComponent from '../modals/uploadComponent';

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
                    <h1 className='mt-3'>{event.description}</h1>

                    <button className='btn btn-success rounded px-3 py-2 mt-3 text-center' onClick={()=>{alert("success")} }>Register for event</button>

                    <div className='row bg-success rounded py-2 px-3 mt-5 mx-5'>
                        <div className="col-sm text-white mx-2">
                            <ImTrophy size={30}/>
                            <p>{event.league}</p>   
                        </div>
                        <div className="col-sm text-white mx-2">
                            <BiCategory size={30}/>
                            <p>{event.category}</p>
                        </div>
                        <div className="col-sm text-white mx-2">
                            <BsCalendarDateFill  size={28}/>
                            <p>event.date</p>
                        </div>
                        <div className="col-sm text-white mx-2">
                            <BsFillPeopleFill size={30}/>
                            <p>{event.capacity}</p>
                        </div>
                    </div>

                    <button className='w-75 btn btn-dark rounded px-3 py-2 text-center mt-3' onClick={()=>{setShowUpload(true)} }>Upload Images</button>


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
