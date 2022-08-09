
// import { MarkerClusterer } from "@googlemaps/markerclusterer";

function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: {
            lat: 46.619261,
            lng: -33.134766
        }
    });

    // Create an array of alphabetical characters used to label the markers
    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    //Create an array of object. Each object will contain a latitude and a longitude of the different places Rosie has visited
    var locations = [
        { lat: 40.785091, lng: -73.968285 },
        { lat: 41.084045, lng: -73.874245 },
        { lat: 40.754932, lng: -73.984016 }
    ];

    //Now, we need to iterate through that array and create a new marker that has the label from our string
    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
}

    /*
    The map method in JavaScript works similar to a forEach() function. 
    The difference is that this returns an array with the results 
    of looping through each item in our locations array.

    The map method can take up to three arguments. But we use two in our example here.
    1. 1st argument that we're going to pass into our function is location, 
    which is the current value of where we are in the array as we're looping through.
    2. 2nd one is i, which is the index number of where we currently are in the array.

    The reason for using the modulo (%) operator is so that if we have more than 26 locations, 
    then it will loop around to the start of our string again and go from Z back to 
    A, instead of throwing an error.
    */

    
