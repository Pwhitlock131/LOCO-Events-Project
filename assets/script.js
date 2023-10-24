var sgAPI = 'a2cc90604895d8502a57823b96d8268669aa7a1d0e757f97cd311e3200deb9b9';
var mqAPI = 'uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7';

var map;

window.onload = function () {
    map = L.map('map', {
    center: [32.7473, -97.0945],
    layers: MQ.mapLayer(),
    zoom: 10

  });

  displayRecentSearches();
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

      renderSearchedEventInformation(data);
      saveSearchValue();
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
}

// save to local storage
function saveSearchValue() {
  const inputValue = document.getElementById('place-search-input').value;
  if (inputValue) {
    if (typeof Storage !== 'undefined') {
      let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
      recentSearches.push(inputValue);
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    } else {
      alert('Local storage is not available in your browser.');
    }
  }
}
// get item from local storage and display into console
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

// asks the user if its ok to share location
document.getElementById('comedy').addEventListener('click', function() {
  if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var userLat = position.coords.latitude;
      var userLong = position.coords.longitude;
      var name = 'comedy'
    
      // sends users lat/long to set the distance and name of the type of event to send into the api broad search
      setRangeApiURL(userLat,userLong, name);
    })
  }
})

document.getElementById('sports').addEventListener('click', function() {
  if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var userLat = position.coords.latitude;
      var userLong = position.coords.longitude;
      var name = 'sports'

      console.log(userLat,userLong)
       
      // sends users lat/long to set the distance
      setRangeApiURL(userLat,userLong, name);
    })
  }
})

document.getElementById('concerts').addEventListener('click', function() {
  if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var userLat = position.coords.latitude;
      var userLong = position.coords.longitude;
      var name = 'concerts'
       
      // sends users lat/long to set the distance
      setRangeApiURL(userLat,userLong, name);
    })
  }
})

// trying to search through seat geak event api with a 50 mile radiuis of their lat / lon
function setRangeApiURL(userLat,userLong,name) {

  var setRangeApiURL = `https://api.seatgeek.com/2/events?q=${name}&lat=${userLat}&lon=${userLong}&range=50mi&client_id=Mzc1Nzk2MDZ8MTY5NzUwMTk2Mi45MTIwODYy&client_secret=a2cc90604895d8502a57823b96d8268669aa7a1d0e757f97cd311e3200deb9b9`

  fetch(setRangeApiURL)
  .then(function(response){
    return response.json();
  }).then(function(data){

    var {lat,lon} = data.events[0].venue.location;
    var{name} = data.events[0].venue
    var{url} = data.events[0].venue

    addIconsToMap(lat,lon,name,url);
  })
}
// adds icons to map using parameters passed down from setRangeApiURL
function addIconsToMap(lat,lon,name,url) {

  MQ.geocode().search("lat,lon").on('success', function (e) {

        map.setView([lat,lon], 12);
    
        L.marker([lat, lon])
          .addTo(map)
          .bindPopup(`<a href=${url}>` + name + ', ' + '</a> is located here.')
          .openPopup()
      });
}


// click event for whenever user clicks on the hyper link venue name 
document.getElementById('sendUserToVenue').addEventListener('click', function(){
  var eventInput = document.getElementById('place-search-input');
  var eventName = eventInput.value;

  // q=${eventName} does a broad search with the user input through the api
  var eventsApiURL = `https://api.seatgeek.com/2/events?q=${eventName}&client_id=Mzc1Nzk2MDZ8MTY5NzUwMTk2Mi45MTIwODYy&client_secret=a2cc90604895d8502a57823b96d8268669aa7a1d0e757f97cd311e3200deb9b9`;

  fetch(eventsApiURL)
  .then(function(response){
    return response.json();
  }).then(function(data){

    var {lat, lon} = data.events[0].venue.location;
    var {name, url} = data.events[0].venue;

    addSideNavIconToMap (lat,lon,name,url);

    
  })
})
// added side nav icons to map 
function addSideNavIconToMap(lat,lon,name,url) {

  MQ.geocode().search("lat,lon").on('success', function (e) {

    console.log(e)

    map.setView([lat,lon], 12);

    L.marker([lat, lon])
      .addTo(map)
      .bindPopup(`<a href=${url}>` + name + ', ' + '</a> is located here.')
      .openPopup()
  });
}