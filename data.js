queryLaunches();
function queryLaunches(){
    $.get("https://api.spacexdata.com/v4/launches").then(function(response) {
        // for each flight in response array, creates an option in dropdown menu with flight num, date and time
        for (var i = 0; i < response.length; i++) {
            var dateString = moment.unix(response[i].date_unix).format("YYYY-MM-DD HH:mm");
            var dropdownOpt = $('<option>');
            dropdownOpt.text("Flight Number: " + response[i].flight_number + "  Date: " + dateString);
            dropdownOpt.val(response[i].id);
            $('#flightNum').append(dropdownOpt);
        };
    })
}

$('.submitSpacexBtn').click( function() {
    userChoice = (flightNum.value);

    //query launch data
    $.get("https://api.spacexdata.com/v4/launches/" + userChoice).then(function(response) {

       $('#flightNumber').empty();
       $('#flightNumber').text(response.flight_number)

       $('#name').empty();
       $('#name').text(response.name)

       $('#date').empty();
       $('#date').text(moment.unix(response.date_unix).format("YYYY-MM-DD HH:mm"))
       var unixDate = response.date_unix

        var lat;
        var lon;
       //query launchpad information for 'location' field
       $.get("https://api.spacexdata.com/v4/launchpads/" + response.launchpad).then(function(response) {
       $('#location').empty();
       $('#location').text(response.full_name)
       lat = response.latitude;
       lon = response.longitude;
       //query for Dark Sky historic weather info
       var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://dark-sky.p.rapidapi.com/"+ lat +"," + lon + "," + unixDate,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "dark-sky.p.rapidapi.com",
            "x-rapidapi-key": ""
        }
    }

    $.ajax(settings).done(function (response) {

        $('#temperature').empty();
        $('#temperature').text(response.project.temperature)

        $('#humidity').empty();
        $('#humidity').text(response.project.humidity)

        $('#wind-speed').empty();
        $('#wind-speed').text(response.project.windSpeed)

        })
    }); 
    
        })
       $('#details').empty();
       $('#details').text(response.details)
        //possibly add if, else for null values
       $('#article').empty();
       $('#article').html("<a href = '" + response.links.article + "'>" +response.links.article + "</a>"+ "<br>" +
       "<a href = '" + response.links.webcast + "'>" +response.links.webcast + "</a>" )
       
       var rocketID = response.rocket
       $.get("https://api.spacexdata.com/v4/rockets/" + rocketID).then(function(response) { 
            $('#rocketPicture').empty();
           for (var i = 0; i < response.flickr_images.length; i++) {
            $('#rocketPicture').append("<img src = '" + response.flickr_images[i] + "'>");
           }              
           }); 
       })

$('.submitNasaBtn').click( function() {

var nasaAPIKey = "l80wySp5TfuYjJnbHX16YApnaaudSSnfitERu55z";
var nasaURL = "https://api.nasa.gov/techport/api/projects?api_key=" + nasaAPIKey;
$.ajax({
url: nasaURL,
method: "GET"
})
.then(function(response) {   
    var nasaProject = Math.floor(Math.random() * response.projects.projects.length);
    var selectedProject = response.projects.projects[nasaProject].id
    var nasaProjectURL = "https://api.nasa.gov/techport/api/projects/" + selectedProject + "?api_key="+ nasaAPIKey;
  
    $.ajax({
        url: nasaProjectURL,
        method: "GET"
        }).then(function(response) {
        console.log(response);
        $('#id').empty();
        $('#id').text(response.project.id)

        $('#startDate').empty();
        $('#startDate').text(response.project.startDate)

        $('#endDate').empty();
        $('#endDate').text(response.project.endDate)

        $('#description').empty();
        $('#description').text(response.project.description)

        $('#status').empty();
        $('#status').text(response.project.status)
        })
});
})


