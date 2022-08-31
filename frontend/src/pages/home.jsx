import React, {useEffect, useState} from 'react';
import { Map, Marker } from "pigeon-maps"
import Navbar from './navbar';
import { useNavigate } from "react-router-dom";
import EventComponent from '../modals/eventComponent';
import axios from 'axios';

const Home = () => {     
    
    const [markers,setMarkers] = useState(undefined);
    const [showEventComp,setShowEventComp] = useState(false);
    const navigate = useNavigate();

    // React.useEffect(() => {
    //   axios
    //       .post('http://197.245.137.83:8728/event/find')
    //       .then(function (response) {
    //           console.log(response);
    //       })
    //       .catch(function (error) {
    //           console.log(error);
    //       });
    // });

    useEffect(() =>{
      const requestOptions = {
        method: 'POST',
        body: {}
      };
      fetch("http://197.245.137.83:8728/event/find",requestOptions).then(
        response => response.json()
      ).then(
        data => 
          console.log(data)
      )
    }, [])

      return (
        <div className="bg-light">
            <Navbar/>
            <div className="position-relative">
                <Map height={500} defaultCenter={[50.879, 4.6997]} defaultZoom={11}>

                {(typeof markers === 'undefined') ? (
                    <h5 className="mt-5"> LOADING ...</h5>
                ) : (
                    markers.map((event, i) => (
                        <Marker width={50} anchor={[event.latitude, event.longitude]} onClick={
                            alert("you clicked on"+event.name)
                        } />
                    ))
                    ) 
                } 
                </Map>

                <div class="position-absolute w-100">
                  {/*onClick={() => navigate("/event")} */}
                    <button class="btn btn-dark w-75 py-2" onClick={() => setShowEventComp(!showEventComp)}> Create Event</button>
                </div>
            </div>

            {/* <EventComponent show={showEventComp} /> */}
            
        </div>
      );
}

export default Home;
