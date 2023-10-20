var sgAPI = 'a2cc90604895d8502a57823b96d8268669aa7a1d0e757f97cd311e3200deb9b9';
var mqAPI = 'uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7';
var sportGames
var concerts
var dates
var location


//Need to get search bar working for the map
//Need to figure out how to have the geekseat and mapquest work together
//Need to show time and place for seached event






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


    placeSearch({
        key: 'uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7',
        container: document.querySelector('#place-search-input')
    });
// map quest API 
   fetch ('https://www.mapquestapi.com/geocoding/v1/address?key=uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7&location=Washington,DC')
   .then(function(event) {
    return event.json()
   }).then(function(data) {
    console.log(data)
   });

   fetch.curl -X; GET -H; 'x-mq-user-id: ABC-123'; 'https://www.mapquestapi.com/search/v3/prediction?key=KEY&limit=5&feedback=true&collection=airport&q=den';
