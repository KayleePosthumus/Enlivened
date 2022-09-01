import React, {useEffect, useState} from 'react';
import { Map, Marker } from "pigeon-maps"
import Navbar from './navbar';
import { useNavigate } from "react-router-dom";
import EventComponent from '../modals/eventComponent';

const Home = () => {     
    
    const [markers,setMarkers] = useState(undefined);
    const [showEventComp,setShowEventComp] = useState(false);
    const navigate = useNavigate();

    useEffect(() =>{
      const requestOptions = {
        method: 'POST',
        body: JSON.stringify({})
      };
      fetch("http://197.245.137.83:8728/event/find",requestOptions).then(
        response => response.json()
      ).then(
        data => 
          setMarkers(data)
      )
    }, [])

      return (
        <div className="bg-light">
            <Navbar/>

            <Map height={500} defaultCenter={[11,11]} defaultZoom={5}>
                  
                {(typeof markers === 'undefined') ? (
                    <h5 className="mt-5"> LOADING ...</h5>
                ) : (
                    markers.map((event, i) => (
                      <Marker width={50} anchor={[parseInt(event.longitude),parseInt(event.latitude)]} onClick={()=>{ navigate("/event/"+event.id);}}
                      />
                    ))
                    ) 
                    }  
                </Map>


                {/*onClick={() => navigate("/event")} */}
                <button class="btn btn-dark w-75 py-2" onClick={() => {setShowEventComp(!showEventComp);}}> Create Event</button>


            {/* <EventComponent show={showEventComp} /> */}
            
        </div>
      );
}

export default Home;
