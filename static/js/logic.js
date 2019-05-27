// Creating map object
var myMap = L.map("map", {
  center: [38.717067, -99.875015],
  zoom: 5
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 10,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// Store API query variables
var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Assemble API query URL
var url = baseURL

// Function that will determine the color of a neighborhood based on the borough it belongs to
function chooseColor(intensity) {
  var color="red";
  if (intensity<1) { color="#00FF00"; 
    
  } else {if (intensity<2) {color="#32C800";
    
  } else {if (intensity<3) {color="#649600";
    
  } else {if (intensity<4) {color="#966400";
    
  } else {if (intensity<5) {color="#C83200"
    
  } else {color="#FF0000";}}}}}

  return color;

  }

// Grabbing our GeoJSON data..

d3.json(url,function(data) {
  
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    
    pointToLayer: function (feature,latlng) {                    
      return new L.CircleMarker(latlng, {
          radius: (feature.properties.mag)*7,
          fillColor: chooseColor(feature.properties.mag),
          color: "black",
          weight: .5,
          opacity: 0.4,
          fillOpacity: 0.4
      });
  },
    onEachFeature: function(feature, layer) {
      
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.mag + "</h1> <hr> <h2>" + feature.properties.place + "</h2>");

    }
  }).addTo(myMap);
});
// Grab the data with d3
// d3.json(url, function(response) {

//   // Create a new marker cluster group
//   var markers = L.markerClusterGroup();

//   // Loop through data
//   for (var i = 0; i < response.length; i++) {

//     // Set the data location property to a variable
//     var location = response[i].location;

//     // Check for location property
//     if (location) {

//       // Add a new marker to the cluster group and bind a pop-up
//       markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
//         .bindPopup(response[i].descriptor));
//     }

//   }

//   // Add our marker cluster layer to the map
//   myMap.addLayer(markers);

// });
