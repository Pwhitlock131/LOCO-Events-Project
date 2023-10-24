var sgAPI = 'a2cc90604895d8502a57823b96d8268669aa7a1d0e757f97cd311e3200deb9b9';
var mqAPI = 'uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7';


https://www.mapquestapi.com/search/v2/radius?key=uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7&maxMatches=4&origin=39.750307,-104.999472


// second attempt at creating map using MQ leaflet plugins
// https://developer.mapquest.com/documentation/leaflet-plugins/geocoding

window.onload = function () {
  displayRecentSearches();

  var map = L.map('map', {
    center: [32.7473, -97.0945],
    layers: MQ.mapLayer(),
    zoom: 10
  });

  // need to create a function with this code inside of it. once the user clicks on the hyper link venue name or the buttons in the header on the html then it will display venue location on map
  // will delete once function and addeventlistner is set up
  // pass lat and lon


  document.getElementById('comedy').addEventListener('click', function() {
    const searchCategory = this.querySelector('i').getAttribute('data-tooltip');
    performMapQuestSearch(searchCategory);
  });

  document.getElementById('sports').addEventListener('click', function() {
    const searchCategory = this.querySelector('i').getAttribute('data-tooltip');
    performMapQuestSearch(searchCategory);
  });

  document.getElementById('concerts').addEventListener('click', function() {
    const searchCategory = this.querySelector('i').getAttribute('data-tooltip');
    performMapQuestSearch(searchCategory);
  });

  function performMapQuestSearch(searchTerm) {
    const apiKey = 'uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7';
    const location = '32.7473,-97.0945';
    const radius = 10;
    const format = 'json'
    const apiUrl = 'https://www.mapquestapi.com/search/v2/radius';

    fetch(apiUrl) 
    .then(response => response.json())
    .then(data => {
      console.log(data);
      
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


  MQ.geocode().search('32.7473, -97.0945').on('success', function (e) {
    console.log(e);
    var best = e.result.best,
      latlng = best.latlng;

    map.setView(latlng, 12);

    L.marker([latlng.lat, latlng.lng])
      .addTo(map)
      .bindPopup('<strong>' + best.adminArea5 + ', ' + best.adminArea3 + '</strong> is located here.')
      .openPopup()
  });
}

function searchEvent() {
  var eventInput = document.getElementById('place-search-input');
  var eventName = eventInput.value;

  // q=${eventName} does a broad search with the user input through the api
  var eventsApiURL = `https://api.seatgeek.com/2/events?q=${eventName}&client_id=Mzc1Nzk2MDZ8MTY5NzUwMTk2Mi45MTIwODYy&client_secret=a2cc90604895d8502a57823b96d8268669aa7a1d0e757f97cd311e3200deb9b9`;

  fetch(eventsApiURL)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      // data is the seat geak api
      // console logging it allows us to look inside of the api
      console.log(data);

      // eventName is user search
      console.log(eventName);

      // following variables are pathed to certain things in the api like the title of game, type of sport and date it is on.
      // not needed in the actual code just used for example in console

      // var {title, type, datetime_local} = data.events[0]
      // var {name, url} = data.events[0].venue;
      // var {lat, lon} = data.events[0].venue.location;

      // console.log(title, type, datetime_local);
      // console.log(name,url);
      // console.log(lat,lon);

      // this function will be called at the same time as the nav bar after the user clicks an icon on the map to see more information

      renderSearchedEventInformation(data);

      //save to local storage
      // position where this function is called is not set yet
      // need to put another function inside of saveSearchValue() to display the recent search list to the left of the map in white space area

      saveSearchValue();
    });
}

// when user clicks on the hyper link that is the venue name in the side nav it puts an icon on the lat and lon of the searched event venue
function displayVenueFromSidenav(lat, lng) {
  MQ.geocode().search('dallas tx').on('success', function (e) {
    console.log(e);
    var best = e.result.best,
      latlng = best.latlng;

    map.setView(latlng, 12);

    L.marker([latlng.lat, latlng.lng])
      .addTo(map)
      .bindPopup('<strong>' + best.adminArea5 + ', ' + best.adminArea3 + '</strong> is located here.')
      .openPopup()
  });
}

// connect this to corresponding IDs on the nav bar
function renderSearchedEventInformation(data) {
  // sets the side nav bar text to text from the api that is related to the user search
  document.querySelector("#eventIcon").setAttribute("src", `${data.events[0].performers[0].image}`)
  document.querySelector("#eventTitle").textContent = data.events[0].title;
  document.querySelector("#eventDate").textContent = data.events[0].datetime_local;
  document.querySelector("#eventVenueName").textContent = data.events[0].venue.name;
  document.querySelector("#eventVenueAddress").textContent = data.events[0].venue.address;
  document.querySelector("#eventURL").textContent = data.events[0].url;

  // changes the href from href="#" to href="url of event user searched up"
  document.querySelector("#eventURL").setAttribute("href", `${data.events[0].url}`);
  document.querySelector("#eventIcons").setAttribute("href", `${data.events[0].url}`);
  document.querySelector("#eventTitles").setAttribute("href", `${data.events[0].url}`);
  document.querySelector("#eventDates").setAttribute("href", `${data.events[0].url}`);
  document.querySelector("#sendUserToVenue").setAttribute("href", `${data.events[0].venue.url}`);
}

// save to local storage
function saveSearchValue() {
  const inputValue = document.getElementById('place-search-input').value;
  if (inputValue) {
    if (typeof Storage !== 'undefined') {
      let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
      recentSearches.push(inputValue);
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
      displaySavedSearchValue();
    } else {
      alert('Local storage is not available in your browser.');
    }
  }
}

function displayRecentSearches() {
  const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
  const recentSearchList = document.getElementById('recent-search-list');

  recentSearchList.innerHTML = '';

  for (const searchValue of recentSearches) {
    const listItem = document.createElement('li');
    listItem.textContent = searchValue;
    listItem.addEventListener('click', function () {

    });
    recentSearchList.appendChild(listItem);
  }
}

// window.onload = function () {
//   displayRecentSearches();
// };
// get item from local storage and display into console
function displaySavedSearchValue() {
  const savedSearchValue = localStorage.getItem('searchValue');

  if (savedSearchValue) {
    console.log('Saved Search Value:', savedSearchValue);
  }
}



// commented out because not sure what it does
// fetch.curl - X; GET - H; 'x-mq-user-id: ABC-123'; 'https://www.mapquestapi.com/search/v3/prediction?key=KEY&limit=5&feedback=true&collection=airport&q=den';

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.parallax');
  var instances = M.Parallax.init(elems,);
});
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.tooltipped');
  var instances = M.Tooltip.init(elems);
});

// commented out because it is not in use anymore
// only used to console.log the api to look inside of it

//Seat Geek API and CLient ID
// fetch('https://api.seatgeek.com/2/events?client_id=Mzc1Nzk2MDZ8MTY5NzUwMTk2Mi45MTIwODYy&client_secret=a2cc90604895d8502a57823b96d8268669aa7a1d0e757f97cd311e3200deb9b9')
//   .then(function (response) {
//     return response.json()
//   }).then(function (data) {
//     console.log(data)
//   });

// map quest API
// fetch('https://www.mapquestapi.com/geocoding/v1/address?key=uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7&location=Washington,DC')
//   .then(function (event) {
//     return event.json()
//   }).then(function (data) {
//     console.log(data)
//   });

// original map from preston

// L.mapquest.key = 'uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7';
// L.mapquest.map('map', {
//   center: [32.7473, -97.0945],
//   layers: L.mapquest.tileLayer('map'),
//   zoom: 12
// });

// commented out for now because it displayed wierd over the side nav

// placeSearch({
//   key: 'uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7',
//   container: document.querySelector('#place-search-input')
// });