/*
  const iconBase =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
const icons = {
  parking: {
    icon: iconBase + "parking_lot_maps.png",
  },
  library: {
    icon: iconBase + "library_maps.png",
  },
  info: {
    icon: iconBase + "info-i_maps.png",
  },
};
const features = [  
  //hardcoding the important location for Silicon valley challenge but these important locations can be configurable by the user
  {
    position: new google.maps.LatLng(33.155373, -96.818733),
    type: "info",
  },
        {
    position: new google.maps.LatLng(33.1583, -96.9248),
    type: "parking",
  },
      {   
    position: new google.maps.LatLng(33.019844, -96.698883),
    type: "library",
  }

];


// Create markers.
for (let i = 0; i < features.length; i++) {
  const markerPlaces = new google.maps.Marker({
    position: features[i].position,
    icon: icons[features[i].type].icon,
    map: map
  });
}
*/

/* 
//Get map location based on Kids School address, Parent address and update marker in map - WORKING CODE

function AddressLookup(){

var geocoder;
geocoder = new google.maps.Geocoder();

//Kids Address lookup with coordinates
var KidSchoolAddress = document.getElementById('KSchoolAddress').value;
geocoder.geocode( { 'address': KidSchoolAddress}, function(results, status) {
if (status == 'OK') {
map.setCenter(results[0].geometry.location);
var KidAddressMarker = new google.maps.Marker({
  map: map,
  position: results[0].geometry.location
});
} else {
  alert(KidSchoolAddress);
alert('Kid School Address Geocode was not successful for the following reason: ' + status);
}
});

//Parent Address lookup with coordinates
var ParentSchoolAddress = document.getElementById('PAddress').value;
geocoder.geocode( { 'address': ParentSchoolAddress}, function(results, status) {
if (status == 'OK') {
map.setCenter(results[0].geometry.location);
var ParentAddressMarker = new google.maps.Marker({
  map: map,
  position: results[0].geometry.location
});
} else {
  alert('Parent Home Address Geocode was not successful for the following reason: ' + status);
}
});
}

*/

/*
function init() {
  const initialPosition = { lat: 42.3601, lng: -96.91136 };

  const map = new google.maps.Map(document.getElementById('map'), {
    center: initialPosition,
    zoom: 15
  });

  infoWindow = new google.maps.InfoWindow(); //info window

  const marker = new google.maps.Marker({ map, position: initialPosition });
  
  // Get user's location
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
    position => console.log(`Lat: ${position.coords.latitude} Lng: ${position.coords.longitude}`),
      err => alert(`Error (${err.code}): ${err.message}`)
    );

  } else {
    alert('Geolocation is not supported by your browser.');
  }

  //const initialPosition = { position.coords.latitude, position.coords.longitude};
  //const marker = new google.maps.Marker({ map, position: initialPosition });
}

*/
/* 

var curLat = null; //user location
var curLon = null;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
        alert("no location");
    }
}
function showPosition(position) {
    curLat = position.coords.latitude;
    curLon = position.coords.longitude;
}
function init(){
  getLocation() //finds out user location to format the map
  if (curLat == null){
    curLat = 42.3601;   //if the user location cannot be found, set default ones
    curLon = -71.0589;   // of boston
    // console.log("random locations");
    //alert("random location")
  }
  var options = {
    zoom:10,
    center:{lat:curLat, lng:curLon}
  }
    var map = new google.maps.Map(document.getElementById("map"),options);
}

*/

function init() {
    const initialPosition = { lat: 59.325, lng: 18.069 };
  
    const map = new google.maps.Map(document.getElementById('map'), {
      center: initialPosition,
      zoom: 15
    });
  
    const marker = new google.maps.Marker({ map, position: initialPosition });
  
    // Get user's location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => console.log(`Lat: ${position.coords.latitude} Lng: ${position.coords.longitude}`),
        err => alert(`Error (${err.code}): ${err.message}`)
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  }


  async getAddress (latitude, longitude, APIKEY) {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${APIKEY}`;
    try {
      let response = await fetch(url);
      let responseJson = await response.json();
      // do what you want with the responseJson here.
      return responseJson
    } catch (error) {
      console.warn(error); 
      // make sure you handle error and return something if an error occurs
    }
  }


var firebase = new Firebase("kidsafe-f994e.firebaseapp.com");

function writeprofile(userid, name, phone, address) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

var userId = firebase.auth().currentUser.uid;
return firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {
  var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  
});
const map = document.querySelector("#map1");


let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6,
  });
  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}


function getkidlocation() {
  const googleMap = new google.maps.Map(map, {
    center: { lat: 0, lng: 0 },
    zoom: 1
  });

  function onError() {
    map.textContent = "Unable to locate.";
  }
  function onSuccess(geo) {
    const position = {
      lat: geo.coords.latitude,
      lng: geo.coords.longitude
    };
    // Reposition the map to the detected location
    googleMap.setCenter(position);
    googleMap.setZoom(12);
    // Add a marker
    new google.maps.Marker({ position, map: googleMap });
  }

  if (!navigator.geolocation) {
    onError();
  } else {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
}

function getdistance(lat1, lon1, lat2, lon2, unit) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist;
  }
}


