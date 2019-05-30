// Creating map object
var myMap = L.map("map", {
  center: [38.717067, -99.875015],
  zoom: 5
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 10,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(myMap);

// Store API query variables
var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Assemble API query URL
var url = baseURL


function chooseColor(intensity) {
  var color="red";
  if (intensity<1) { color="rgb(220,255,0)"; 
    
  } else {if (intensity<2) {color="rgb(220,200,0)";
    
  } else {if (intensity<3) {color="rgb(220,150,0)";
    
  } else {if (intensity<4) {color="rgb(220,100,0)";
    
  } else {if (intensity<5) {color="rgb(220,50,0)"
    
  } else {color="rgb(220,0,0)";}}}}}

  return color;

  }

// Grabbing our GeoJSON data..

d3.json(url,function(data) {
  
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    
    pointToLayer: function (feature,latlng) {                    
      return new L.CircleMarker(latlng, {
          // radius: (feature.properties.mag)*7,
          radius: (myMap.getZoom())*feature.properties.mag,
          fillColor: chooseColor(feature.properties.mag),
          color: "black",
          weight: .5,
          opacity: 0.4,
          fillOpacity: .8
      });
  },

  
    onEachFeature: function(feature, layer) {
      
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.mag + "</h1> <hr> <h2>" + feature.properties.place + "</h2>");

    }
  }).addTo(myMap);
});

var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'infolegend');
  labels = ['<strong>Categories</strong>'],
  categories = ['0-1','1-2','2-3','3-4','4-5','5+'];

  for (var i = 0; i < categories.length; i++) {

          div.innerHTML += 
          labels.push(
            '<span style="padding-left:5px;"></span>'+'<i class="colorLabel" style="size:10px;padding:3px 5px;border:1px solid #a1a1a1;background-color:'+chooseColor(Number(categories[i].substring(0,1)))+'"></i>'+
              '<span style="padding-left:10px;"></span>'+categories[i]);

      }
      div.innerHTML = labels.join('<br>');
  return div;
  };
legend.addTo(myMap);
