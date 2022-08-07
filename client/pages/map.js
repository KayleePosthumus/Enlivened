import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

var straitSource = new ol.source.Vector({ wrapX: true });
var straitsLayer = new ol.layer.Vector({
  source: straitSource
});

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
    center: ol.proj.transform([28.229271,-25.747868], 'EPSG:4326','EPSG:3857'),
    zoom: 5
  })
});

//MARKER TYPES
var sportMarkerStyle = new ol.style.Style({
  image: new ol.style.Icon({
    src: '../img/pin_sport.png'
  })
});

var supportMarkerStyle = new ol.style.Style({
  image: new ol.style.Icon({
    src: '../img/pin_car.png'
  })
});

var carMarkerStyle = new ol.style.Style({
  image: new ol.style.Icon({
    src: '../img/pin_support.png'
  })
});

var support2MarkerStyle = new ol.style.Style({
  image: new ol.style.Icon({
    src: '../img/pin_support2.png'
  })
});

var islamMarkerStyle = new ol.style.Style({
  image: new ol.style.Icon({
    src: '../img/pin_islam.png'
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
function addSportMarker(long,lat,event){
  var iconFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([long,lat], 'EPSG:4326','EPSG:3857')),
    type: 'Past',
    data: event
  })

  iconFeature.setStyle(sportMarkerStyle);
  straitSource.addFeature(iconFeature);
}

function addCarMarker(long,lat,event){
  var iconFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([long,lat], 'EPSG:4326','EPSG:3857')),
    type: 'Car',
    data: event
  })

  iconFeature.setStyle(carMarkerStyle);
  straitSource.addFeature(iconFeature);
}

function addSupportMarker(long,lat,event){
  var iconFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([long,lat], 'EPSG:4326','EPSG:3857')),
    type: 'Upcoming',
    data: event
  })

  iconFeature.setStyle(supportMarkerStyle);
  straitSource.addFeature(iconFeature);
}

function addSupport2Marker(long,lat,event){
  var iconFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([long,lat], 'EPSG:4326','EPSG:3857')),
    type: 'Upcoming',
    data: event
  })

  iconFeature.setStyle(support2MarkerStyle);
  straitSource.addFeature(iconFeature);
}

function addIslamMarker(long,lat,event){
  var iconFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([long,lat], 'EPSG:4326','EPSG:3857')),
    type: 'Upcoming',
    data: event
  })

  iconFeature.setStyle(islamMarkerStyle);
  straitSource.addFeature(iconFeature);
}

//Usage Ex
addSportMarker(28.229271,-25.747868,"hey");
addSupportMarker(27.229271,-21.747868,"hey bitch");
addCarMarker(20.187,-25.4,"hey");

addIslamMarker(17.229271,-29.747868,"hey bitch");
addSupport2Marker(18.229271,-23.747868,"hey bitch");

// document.getElementById("createEvent").onclick = function() {
//   map.on('click', function(evt){
//     alert(ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'));
//   });
// };

map.on('click', function (evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel, function (feat, layer) {
      return feat;
  }
  );

  if (feature && feature.get('type')=='Past') {
      alert(feature.get('data'));
      
  }
  else {

  }
});


