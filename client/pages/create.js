import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

//LOAD MAP
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    straitsLayer
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

//MARKER TYPES
var pastMarkerStyle = new ol.style.Style({
  image: new ol.style.Icon({
    src: '../markers/default.png'
  })
});

var upMarkerStyle = new ol.style.Style({
  image: new ol.style.Icon({
    src: '../markers/default.png'
  })
});

// var upcomingMarkerLayer = new ol.layer.Vector({
//   source: new ol.source.Vector(),
//   style: new ol.style.Style({
//     image: new ol.style.Icon({
//       src: '../markers/default.png'
//     })
//   })
// });
// map.addLayer(upcomingMarkerLayer);

// function addPastMarker(long,lat){
//   var marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([long, lat])));
//   pastMarkerLayer.getSource().addFeature(marker);
// }

//Add Markers
function addPastMarker(long,lat,event){
  var iconFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([long,lat], 'EPSG:4326','EPSG:3857')),
    type: 'Past',
    data: event
  })

  iconFeature.setStyle(pastMarkerStyle);
  straitSource.addFeature(iconFeature);
}

function addUpMarker(long,lat,event){
  var iconFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([long,lat], 'EPSG:4326','EPSG:3857')),
    type: 'Upcoming',
    data: event
  })

  iconFeature.setStyle(upMarkerStyle);
  straitSource.addFeature(iconFeature);
}

//Usage Ex
addPastMarker(28.229271,-25.747868,"hey");
addUpMarker(27.229271,-21.747868,"hey bitch");

// document.getElementById("createEvent").onclick = function() {
//   map.on('click', function(evt){
//     alert(ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'));
//   });
// };

// map.on('click', function (evt) {
//   var feature = map.forEachFeatureAtPixel(evt.pixel, function (feat, layer) {
//       return feat;
//   }
//   );

//   if (feature && feature.get('type')=='Past') {
//       alert(feature.get('data'));
      
//   }
//   else {

//   }
// });


