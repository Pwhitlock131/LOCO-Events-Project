var sgAPI = 'a2cc90604895d8502a57823b96d8268669aa7a1d0e757f97cd311e3200deb9b9';
var mqAPI = 'uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7';

window.onload = function () {
  var map = L.map('map', {
    center: [32.7473, -97.0945],
    layers: MQ.mapLayer(),
    zoom: 10
  });

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
      // data is the seat geak api
      // console logging it allows us to look inside of the api
      console.log(data);

      // eventName is user search
      console.log(eventName);
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

document.getElementById('comedy').addEventListener('click', function () {
    var searchCategory = 'comedy';
    console.log(searchCategory);



})



// document.getElementById('comedy').addEventListener('click', function () {
//   const searchCategory = "comedy";
//   console.log(searchCategory)

//   performMapQuestSearch(searchCategory);
// });

// document.getElementById('sports').addEventListener('click', function () {
//   const searchCategory = "sports";
//   performMapQuestSearch(searchCategory);
// });

// document.getElementById('concerts').addEventListener('click', function () {
//   const searchCategory = "concerts";
//   performMapQuestSearch(searchCategory);
// });

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