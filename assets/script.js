//Seat Geek API and CLient ID
fetch ('https://api.seatgeek.com/2/events?client_id=Mzc1Nzk2MDZ8MTY5NzUwMTk2Mi45MTIwODYy&client_secret=a2cc90604895d8502a57823b96d8268669aa7a1d0e757f97cd311e3200deb9b9')
    .then(function(response) {
        return response.json()
    }).then(function(data) {
        console.log(data)
    });

// map quest API 
   fetch ('https://www.mapquestapi.com/geocoding/v1/address?key=uRBFSZH5aWUxJrwjDWnkDuoSnTEQxMd7&location=Washington,DC')
   .then(function(event) {
    return event.json()
   }).then(function(data) {
    console.log(data)

