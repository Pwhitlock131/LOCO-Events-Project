var sgAPI = 'a2cc90604895d8502a57823b96d8268669aa7a1d0e757f97cd311e3200deb9b9';
var mqAPI = 'uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7';


//Seat Geek API and CLient ID
fetch ('https://api.seatgeek.com/2/events?client_id=Mzc1Nzk2MDZ8MTY5NzUwMTk2Mi45MTIwODYy&client_secret=a2cc90604895d8502a57823b96d8268669aa7a1d0e757f97cd311e3200deb9b9')
    .then(function(response) {
        return response.json()
    }).then(function(data) {
        console.log(data)
    });

    L.mapquest.key = 'uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7';

    L.mapquest.map('map', {
        center: [37.7749, -122.4194],
        layers: L.mapquest.tileLayer('map'),
        zoom: 12 
    });



// map quest API 
   fetch ('https://www.mapquestapi.com/geocoding/v1/address?key=uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7&location=Washington,DC')
   .then(function(event) {
    return event.json()
   }).then(function(data) {
    console.log(data)
   });


   var map = L.mapquest.map

   // after clicking a event icon, icons representing the event display on the interactive map
   function showPlacesOnMap(lat,lng) {
        fetch("https://www.mapquestapi.com/geocoding/v1/address?key=uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7&location=Washington,DC")
        .then (response => response.json())
        .then(data => {
            data.events.forEach(event =>{
                L.marker([event.lattitude, event.longitude]).addTo(map)
                .bindPopup(event.type)


            });   
        })
   }