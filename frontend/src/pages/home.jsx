import React, {useEffect, useState} from 'react';
import { Map, Marker } from "pigeon-maps"
import Navbar from './navbar';

const Home = () => {     
    
    const [markers,setMarkers] = useState([])

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
                <Map height={750} defaultCenter={[50.879, 4.6997]} defaultZoom={11}>

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
                    <button class="btn btn-dark w-75 py-2"> Create Event</button>
                </div>
            </div>
            
        </div>
      );
}

export default Home;
