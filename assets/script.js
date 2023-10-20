var sgAPI = 'a2cc90604895d8502a57823b96d8268669aa7a1d0e757f97cd311e3200deb9b9';
var mqAPI = 'uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7';


//Seat Geek API and CLient ID
fetch('https://api.seatgeek.com/2/events?client_id=Mzc1Nzk2MDZ8MTY5NzUwMTk2Mi45MTIwODYy&client_secret=a2cc90604895d8502a57823b96d8268669aa7a1d0e757f97cd311e3200deb9b9')
  .then(function (response) {
    return response.json()
  }).then(function (data) {
    console.log(data)
  });

L.mapquest.key = 'uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7';

L.mapquest.map('map', {
  center: [37.7749, -122.4194],
  layers: L.mapquest.tileLayer('map'),
  zoom: 12
});

    L.mapquest.key = 'uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7';

    L.mapquest.map('map', {
        center: [37.7749, -122.4194],
        layers: L.mapquest.tileLayer('map'),
        zoom: 12 
    });


    placeSearch({
        key: 'uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7',
        container: document.querySelector('#place-search-input')
    });


// map quest API 
fetch('https://www.mapquestapi.com/geocoding/v1/address?key=uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7&location=Washington,DC')
  .then(function (event) {
    return event.json()
  }).then(function (data) {
    console.log(data)
   });

function searchEvent() {
    var eventInput = document.getElementById('place-search-input');
    var eventName = eventInput.value;

    // if(!eventName) {
    //     alert ("Please enter a event");
    //     return;
    // }

    var eventsApiURL = `https://api.seatgeek.com/2/events?q=${eventName}&client_id=Mzc1Nzk2MDZ8MTY5NzUwMTk2Mi45MTIwODYy&client_secret=a2cc90604895d8502a57823b96d8268669aa7a1d0e757f97cd311e3200deb9b9`;

    fetch(eventsApiURL)
        .then(function(response) {
            return response.json();
        }).then(function(data){
            console.log(data);
            console.log(eventName);

            var {title, type, datetime_local} = data.events[0]
            var {name, url} = data.events[0].venue;
            var {lat, lon} = data.events[0].venue.location;

            console.log(title, type, datetime_local);
            console.log(name,url);
            console.log(lat,lon);
            
            


            // this function will be called at the same time as the nav bar after the user clicks an icon on the map to see more information
            renderSearchedEventInformation(data);
            // use mapquest api inside of findLocationOfSearch to pinpoint location of event and place an icon on the location of event.
            findLocationOfSearch(lat,lon);
            
        });
}

function renderSearchedEventInformation(data) {
    // connect this to corresponding IDs on the nav bar
    // document.querySelector("#enterIDforEventName").textContent = data.events[0].title;
    // document.querySelector("#enterIDforEventType").textContent = data.events[0].type;
    // document.querySelector("#enterIDforDate").textContent = data.events[0].datetime_local;
    // document.querySelector("#enterIDforVenueName").textContent = data.events[0].venue.name;
    // document.querySelector("#enterIDforEventURL").textContent = data.events[0].venue.url;
}

function findLocationOfSearch(lat,lon) {

    // search results lat and lon is coming back. now need to create function to add icons to the coordinates the user searched
    var mapQuestGeocodeApiURL = `https://www.mapquestapi.com/geocoding/v1/address?key=${mqAPI}&location=${lat}${lon}`


    fetch(mapQuestGeocodeApiURL)
    .then(function(response){
        return response.json();
    }).then (function(data){
        console.log(data);
    });
}



