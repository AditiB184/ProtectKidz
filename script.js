var userid="Aditi";
var Distance_unit = "";

var firebaseConfig = {
  apiKey: "AIzaSyCcSVKS5j77_1zVVQQKTTqT4pHT3kbB49w",
    authDomain: "kidsafe-f994e.firebaseapp.com",
    databaseURL: "https://kidsafe-f994e-default-rtdb.firebaseio.com",
    projectId: "kidsafe-f994e",
    storageBucket: "kidsafe-f994e.appspot.com",
    messagingSenderId: "353214780153",
    appId: "1:353214780153:web:cf1a69ebe0f0f976450828",
    measurementId: "G-WM9E6GB96H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var database = firebase.database;


function ProfileUpdate(){

firebase.database().ref('users/' + userid + '/Profile').set({
    Parent_Name: document.getElementById("PName").value,
  Parent_Phone: document.getElementById("PPhone").value,
  Parent_Address: document.getElementById("PAddress").value,
  Kid_Name: document.getElementById("KName").value,
  Kid_Phone: document.getElementById("KPhone").value,
  Kid_Address: document.getElementById("KAddress").value
});
};


function AlertsUpdate(){

  firebase.database().ref('users/' + userid + '/Alert').set({
      drown: document.getElementById('switch1').checked,
      weather: document.getElementById("switch2").checked,
      accidents: document.getElementById("switch3").checked,
      fast: document.getElementById("switch4").checked,
      boundary: document.getElementById("switch5").checked,
      webapp: document.getElementById("switch6").checked
  });
};

  function SettingsUpdate(){

    firebase.database().ref('users/' + userid + '/Settings').set({
        Good_Location1: document.getElementById('GL1').value,
        Good_Location2: document.getElementById("GL2").value,
        Good_Location3: document.getElementById("GL3").value,
        Good_Location4: document.getElementById("GL4").value,
        Bad_Location1: document.getElementById("BL1").value,
        Bad_Location2: document.getElementById("BL2").value,
        Bad_Location3: document.getElementById("BL3").value,
        Bad_Location4: document.getElementById("BL4").value,
        Distance_Unit: document.getElementById("MISC1").value,
        Geofence_Home: document.getElementById("MISC2").value,
        Geofence_School: document.getElementById("MISC3").value,
        Frequency_Minute: document.getElementById("MISC4").value
    });
 
  };
  



// function to initialize the map, get current position and mark it in the map

  function init() {

    if(navigator.geolocation) {
       
       // timeout at 120000 milliseconds (120 seconds or 2 minutes)
       var options = {timeout:120000};
       navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
    } else {
       alert("Sorry, browser does not support geolocation.");
    }
 }
  // Function to update map and marker

  function showLocation(position) {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          const UpdatePosition = { lat: latitude, lng: longitude };

  const map = new google.maps.Map(document.getElementById('map'), {
    center: UpdatePosition,
    zoom: 10
  });

  // Add code to store kids location in firebase for reporting purpose

  //  hardcoding the point of interest location coordinates for Silicon valley challenge but these locations can be configurable by the user from the UI

const schoolImage = "school.png";
  const schoolMarker = new google.maps.Marker({
    position: { lat: 33.18179420207936, lng: -96.75110613022123 },
    map,
    icon: schoolImage,
    title: "School"
  });

  const homeImage = "home.png";
  const homeMarker = new google.maps.Marker({
    position: { lat: 33.156271612857076, lng: -96.68231448702825 },
    map,
    icon: homeImage,
    title: "Home"
  });

  const tennisImage = "tennis.png";
  const tennisMarker = new google.maps.Marker({
    position: { lat:   33.17110309252967, lng: -96.728751897234475 },
    map,
    icon: tennisImage,
    title: "Tennis Court"
  });

  const parkImage = "park.png";
  const parkMarker = new google.maps.Marker({
    position: { lat:   33.15807764005282, lng: -96.81413573941492 },
    map,
    icon: parkImage,
    title: "Park"
  });


//Update Current location of the device in the map

  const DeviceMarker = new google.maps.Marker({ map, position: UpdatePosition, title: 'Current Location of the App' });
  DeviceMarker.setMap(map);
 /* Display Latitude and Longitude
         alert("Latitude : " + latitude + " Longitude: " + longitude);

  */
// Updating the Profile values in UI, so that when I reload, it still is there.
  firebase.database().ref('/users/' + userid + '/Profile').once('value').then((snapshot) => {
  document.getElementById("PName").value = (snapshot.val() && snapshot.val().Parent_Name) || '';
  document.getElementById("PPhone").value = (snapshot.val() && snapshot.val().Parent_Phone) || '';
  document.getElementById("PAddress").value = (snapshot.val() && snapshot.val().Parent_Address) || '';
  document.getElementById("KName").value = (snapshot.val() && snapshot.val().Kid_Name) || '';
  document.getElementById("KPhone").value = (snapshot.val() && snapshot.val().Kid_Phone) || '';
  document.getElementById("KAddress").value = (snapshot.val() && snapshot.val().Kid_Address) || '';
});
 
// Updating the Alert values in UI, so that when I reload, it still is there.
firebase.database().ref('/users/' + userid + '/Alert').once('value').then((snapshot) => {
  document.getElementById("switch1").checked = (snapshot.val() && snapshot.val().drown) || false;
  document.getElementById("switch2").checked= (snapshot.val() && snapshot.val().weather) || false;
  document.getElementById("switch3").checked = (snapshot.val() && snapshot.val().accidents) || false;
  document.getElementById("switch4").checked = (snapshot.val() && snapshot.val().fast) || false;
  document.getElementById("switch5").checked = (snapshot.val() && snapshot.val().boundary) || false;
  document.getElementById("switch6").checked = (snapshot.val() && snapshot.val().webapp) || false;
  
});

// Updating the Settings values in UI, so that when I reload, it still is there.
firebase.database().ref('/users/' + userid + '/Settings').once('value').then((snapshot) => {
  document.getElementById("GL1").value = (snapshot.val() && snapshot.val().Good_Location1) || '';
  document.getElementById("GL2").value= (snapshot.val() && snapshot.val().Good_Location2) || '';
  document.getElementById("GL3").value = (snapshot.val() && snapshot.val().Good_Location3) || '';
  document.getElementById("GL4").value = (snapshot.val() && snapshot.val().Good_Location4) || '';
  document.getElementById("BL1").value = (snapshot.val() && snapshot.val().Bad_Location1) || '';
  document.getElementById("BL2").value = (snapshot.val() && snapshot.val().Bad_Location2) || '';
  document.getElementById("BL3").value = (snapshot.val() && snapshot.val().Bad_Location3) || '';
  document.getElementById("BL4").value = (snapshot.val() && snapshot.val().Bad_Location4) || '';  
  document.getElementById("MISC1").value = (snapshot.val() && snapshot.val().Distance_Unit) || '';
  document.getElementById("MISC2").value = (snapshot.val() && snapshot.val().Geofence_Home) || '';
  document.getElementById("MISC3").value = (snapshot.val() && snapshot.val().Geofence_School) || '';
  document.getElementById("MISC4").value = (snapshot.val() && snapshot.val().Frequency_Minute) || '';  
  
  Distance_unit=(snapshot.val() && snapshot.val().Distance_Unit) || 'kms'
});

       } //init() ends here

       function errorHandler(err) {
          if(err.code == 1) {
             alert("Error: Access is denied!");
          } else if( err.code == 2) {
             alert("Error: Position is unavailable!");
          }
       }
    
function PanicUpdate() {
// Get Panic settings and send text message using Twilio API 
alert("Panic mode Text message sent to your Parent");
}

function SafeUpdate() {
  // Get Panic settings and send text message using Twilio API 
  alert("Safe mode Text message sent to your Parent");
  }


var PAddresslatitude;
var PAddresslongitude;
var KidAddresslatitude;
var KidAddresslongitude;

// This function lookup coordinates based on user input address

function LookupCoordinates() {
  var geocoder = new google.maps.Geocoder();
  var Kidaddress = document.getElementById('KAddress').value;
  var Parentaddress = document.getElementById('PAddress').value;

  geocoder.geocode({
    'address': Kidaddress
  }, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {
      KidAddresslatitude = results[0].geometry.location.lat();
      KidAddresslongitude = results[0].geometry.location.lng();
    //  alert(latitude);
    }
    else {
      alert('Kid School Address Geocode was not successful for the following reason: ' + status);
    }
  });

  geocoder.geocode({
    'address': Parentaddress
  }, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {
      PAddresslatitude = results[0].geometry.location.lat();
      PAddresslongitude = results[0].geometry.location.lng();
    //  alert(latitude);
    }
    else {
      alert('Parent Address Geocode was not successful for the following reason: ' + status);
    }
  });
}

// This function calculates Distance between two co-ordinates (locations)

function getdistance() {


  // Hardcoded the coordinates for distance calculation as geocoding API require billing/credit card

var PAddresslatitude=42.3601;
var PAddresslongitude=-71.0589;
var KidAddresslatitude=59.325;
var KidAddresslongitude=18.069;

  if ((PAddresslatitude == KidAddresslatitude) && (PAddresslongitude == KidAddresslongitude)) {
    return 0;
      }
  else {
    var radlat1 = Math.PI * PAddresslatitude/180;
    var radlat2 = Math.PI * KidAddresslatitude/180;
    var theta = PAddresslongitude-KidAddresslongitude;
    var radtheta = Math.PI * theta/180;
    
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    if (Distance_unit=="kms") { dist = dist * 1.609344 }
    if (Distance_unit=="miles") { dist = dist * 0.8684 }
    alert('Distance: ' + dist.toFixed(2) +  ' ' + Distance_unit);
    return dist;
      }
}
