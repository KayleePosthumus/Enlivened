import React, {useEffect, useState} from 'react';
import { Map, Marker } from "pigeon-maps"
import Navbar from './navbar';
import { useNavigate } from "react-router-dom";
import EventComponent from '../modals/eventComponent';

const Home = () => {     
    
    const [markers,setMarkers] = useState([]);
    const [showEventComp,setShowEventComp] = useState(false);
    const navigate = useNavigate();

    useEffect(() =>{
      fetch("localhost:8080/events").then(
        response => response.json()
      ).then(
        data => 
          setMarkers(data)
      )
    }, [])

      return (
        <div class="bg-light">
            <Navbar/>
            <div class="position-relative">
                <Map height={500} defaultCenter={[50.879, 4.6997]} defaultZoom={11}>

                {(markers.length === 0) ? (
                    <h5 class="mt-5"> LOADING ...</h5>
                ) : (
                    markers.map((event, i) => (
                        <Marker width={50} anchor={[event.lat, event.long]} onClick={
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

            <EventComponent show={showEventComp} />
            
        </div>
      );
}

export default Home;
