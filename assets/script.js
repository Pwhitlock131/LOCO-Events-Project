var sgAPI = 'a2cc90604895d8502a57823b96d8268669aa7a1d0e757f97cd311e3200deb9b9';
var mqAPI = 'uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7';


document.getElementById("baseball").addEventListener("click", function() {
  // Use the SeatGeek API to fetch sports events (baseball in this case)
  fetch("https://api.seatgeek.com/2/events?performers.slug=baseball&client_id=Mzc1Nzk2MDZ8MTY5NzUwMTk2Mi45MTIwODYy")
    .then(response => response.json())
    .then(data => {
      console.log("SeatGeek API Results:", data)
      // Extract and display event data on the map
      if (data.events && data.events.length > 0) {
        const firstEvent = data.events[0];
        const venueLocation = firstEvent.venue.location;
        const venueName = firstEvent.venue.name;

        // Use MapQuest to display the event location on the map
        L.mapquest.key = 'uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7';
        const map = L.mapquest.map('map', {
          center: [venueLocation.lat, venueLocation.lon],
          layers: L.mapquest.tileLayer('map'),
          zoom: 12
        });

        // Add a marker for the event location
        L.mapquest.textMarker([venueLocation.lat, venueLocation.lon], {
          text: venueName,
          position: 'right',
          type: 'marker',
          icon: {
            primaryColor: '#FF5733',
            secondaryColor: '#333',
            size: 'sm'
          }
        }).addTo(map);
      }
    })
    .catch(error => {
      console.error(error);
    });
});



// second attempt at creating map using MQ leaflet plugins
// https://developer.mapquest.com/documentation/leaflet-plugins/geocoding

window.onload = function() {

    var map = L.map('map', {
      center: [32.7473, -97.0945],
      layers: MQ.mapLayer(),
      zoom: 10
  });
}
