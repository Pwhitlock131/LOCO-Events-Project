var sgAPI = "a2cc90604895d8502a57823b96d8268669aa7a1d0e757f97cd311e3200deb9b9";
var mqAPI = "uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7";
//Seat Geek API and CLient ID
// fetch('https://api.seatgeek.com/2/events?client_id=Mzc1Nzk2MDZ8MTY5NzUwMTk2Mi45MTIwODYy&client_secret=a2cc90604895d8502a57823b96d8268669aa7a1d0e757f97cd311e3200deb9b9')
//   .then(function (response) {
//     return response.json()
//   }).then(function (data) {
//     console.log(data)
//   });
L.mapquest.key = "uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7";
L.mapquest.map("map", {
  center: [37.7749, -122.4194],
  layers: L.mapquest.tileLayer("map"),
  zoom: 12,
});
placeSearch({
  key: "uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7",
  container: document.querySelector("#place-search-input"),
});
// map quest API
// fetch('https://www.mapquestapi.com/geocoding/v1/address?key=uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7&location=Washington,DC')
//   .then(function (event) {
//     return event.json()
//   }).then(function (data) {
//     console.log(data)
//   });
// fetch.curl - X; GET - H; 'x-mq-user-id: ABC-123'; 'https://www.mapquestapi.com/search/v3/prediction?key=KEY&limit=5&feedback=true&collection=airport&q=den';
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".parallax");
  var instances = M.Parallax.init(elems);
});
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems);
});
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".tooltipped");
  var instances = M.Tooltip.init(elems);
});

function searchEvent() {
  var eventInput = document.getElementById("place-search-input");
  var eventName = eventInput.value;

  // if(!eventName) {
  //     alert ("Please enter a event");
  //     return;
  // }
  // q=${eventName} does a broad search with the user input through the api
  var eventsApiURL = `https://api.seatgeek.com/2/events?q=${eventName}&client_id=Mzc1Nzk2MDZ8MTY5NzUwMTk2Mi45MTIwODYy&client_secret=a2cc90604895d8502a57823b96d8268669aa7a1d0e757f97cd311e3200deb9b9`;

  fetch(eventsApiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(eventName);

      // following variables are pathed to certain things in the api like the title of game, type of sport and date it is on.

      var { title, type, datetime_local } = data.events[0];
      var { name, url } = data.events[0].venue;
      var { lat, lon } = data.events[0].venue.location;

      console.log(title, type, datetime_local);
      console.log(name, url);
      console.log(lat, lon);

      // this function will be called at the same time as the nav bar after the user clicks an icon on the map to see more information

      renderSearchedEventInformation(data);

      // first attempt at adding an icon to the map where ever the venue for the users search is
      // use mapquest api inside of findLocationOfSearch to pinpoint location of event and place an icon on the location of event.

      // findLocationOfSearch(lat,lon);

      //save to local storage
      // position where this function is called is not set yet

      saveSearchValue();

      // second attempt at adding an icon to the map where ever the venue for the users search is
      // add icon to map after user searches

      // addIconToMap(lat,lon);
    });
}

// last function added

// second attempt at adding an icon to the map where ever the venue for the users search is

//currently working on adding icons to the corresponding lat and lon from user

// function addIconToMap(lat,lon) {
//   var addedIcon = L.icon({
//     iconURL: 'https://assets.mapquestapi.com/icon/v2/marker@2x.png',
//     iconSize: [32,32],
//   });

//   L.marker([lat,lon], {icon: addedIcon}).addTo(map)
// }

// connect this to corresponding IDs on the nav bar
function renderSearchedEventInformation(data) {
  document
    .querySelector("#eventIcon")
    .setAttribute("src", `${data.events[0].performers[0].image}`);
  document.querySelector("#eventTitle").textContent = data.events[0].title;
  document.querySelector("#eventDate").textContent =
    data.events[0].datetime_local;
  document.querySelector("#eventVenueName").textContent =
    data.events[0].venue.name;
  document.querySelector("#eventVenueAddress").textContent =
    data.events[0].venue.address;
  document.querySelector("#eventURL").textContent = data.events[0].url;
  document
    .querySelector("#eventURL")
    .setAttribute("href", `${data.events[0].url}`);
}

// first attempt at adding an icon to the map where ever the venue for the users search is

// function findLocationOfSearch(lat,lon) {

//     search results lat and lon is coming back. now need to create function to add icons to the coordinates the user searched
//     var mapQuestGeocodeApiURL = `https://www.mapquestapi.com/geocoding/v1/reverse?key=${mqAPI}&location=${lat},${lon}`

//     fetch(mapQuestGeocodeApiURL)
//     .then(function(response){
//         return response.json();
//     }).then (function(data){
//         console.log(data);
//     });
// }

// save to local storage
function saveSearchValue() {
  const inputValue = document.getElementById("place-search-input").value;
  if (inputValue) {
    if (typeof Storage !== "undefined") {
      localStorage.setItem("searchValue", inputValue);
      displaySavedSearchValue();
    } else {
      alert("Local storage is not available in your browser.");
    }
  }
}
// get item from local storage and display into console
function displaySavedSearchValue() {
  const savedSearchValue = localStorage.getItem("searchValue");

  if (savedSearchValue) {
    console.log("Saved Search Value:", savedSearchValue);
  }
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
    listItem.addEventListener('click', function() {

    });
    recentSearchList.appendChild(listItem);
  }
}

window.onload = function() {
  displayRecentSearches();
};

displaySavedSearchValue();

document.getElementById("baseball").addEventListener("click", () => {
  
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;

      L.mapquest.key = mapQuestApiKey;
      var map = L.mapquest.map("map", {
        center: [latitude, longitude],
        layers: L.mapquest.tileLayer("map"),
        zoom: 12,
      });

    
      var radius = 10;// miles radius
      var url = `https://api.seatgeek.com/2/events?geoip=true&lat=${latitude}&lon=${longitude}&range=${radius}mi&client_id=${sgAPI}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
        
          data.events.forEach((event) => {
            var marker = L.mapquest
              .marker([event.venue.location.lat, event.venue.location.lon], {
                icon: "marker",
              })
              .addTo(map);
            marker.bindPopup(
              `<b>${event.title}</b><br>${event.venue.name}<br>${event.venue.city}`
            );
          });
        })
        .catch((error) => console.error("Error fetching SeatGeek data", error));
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
});
