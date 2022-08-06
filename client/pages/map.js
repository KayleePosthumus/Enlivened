import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

//LOAD MAP
const map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: new View({
      center: [0, 0],
      zoom: 2
    })
  });

//MARKER TYPES
var pastMarkerLayer = new ol.layer.Vector({
  source: new ol.source.Vector(),
  style: new ol.style.Style({
    image: new ol.style.Icon({
      src: '../markers/default.png'
    })
  })
});
map.addLayer(pastMarkerLayer);

var upcomingMarkerLayer = new ol.layer.Vector({
  source: new ol.source.Vector(),
  style: new ol.style.Style({
    image: new ol.style.Icon({
      src: '../markers/default.png'
    })
  })
});
map.addLayer(upcomingMarkerLayer);

//Add Markers

function addPastMarker(long,lat){
  var marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([long, lat])));
  pastMarkerLayer.getSource().addFeature(marker);
}

function addUpMarker(long,lat){
  var marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([long, lat])));
  upcomingMarkerLayer.getSource().addFeature(marker);

  marker.events.register('click', marker, function (evt) {
    alert("lon: "+evt.object.lonlat.lon+" , lat: "+evt.object.lonlat.lon);
  });
}

//Usage Ex

addPastMarker(28.229271,-25.747868);
addUpMarker(27.229271,-21.747868);

// map.on('click', function(evt){
//   alert(ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'));
// });