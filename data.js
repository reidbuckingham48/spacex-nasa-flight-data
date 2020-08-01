queryLaunches();
function queryLaunches(){
    $.get("https://api.spacexdata.com/v4/launches").then(function(response) {
        // for each flight in response object, creates an option in dropdown menu with flight number, date and time
        for (var i = 0; i < response.length; i++) {
            var dateString = moment.unix(response[i].date_unix).format("YYYY-MM-DD HH:mm");
            var dropdownOpt = $('<option>');
            dropdownOpt.text("Flight Number: " + response[i].flight_number + "  Date: " + dateString);
            dropdownOpt.val(response[i].id);
            $('#flightNum').append(dropdownOpt);
        };
    })
}
// keylistener on submit button for nasa
$('.submitNasaBtn').click( function() {
    var nasaAPIKey = "l80wySp5TfuYjJnbHX16YApnaaudSSnfitERu55z";
    var nasaURL = "https://api.nasa.gov/techport/api/projects?api_key=" + nasaAPIKey;
    //query API for projects
    $.ajax({
    url: nasaURL,
    method: "GET"
    })
//choose random project from response object
.then(function(response) {   
    var nasaProject = Math.floor(Math.random() * response.projects.projects.length);
    var selectedProject = response.projects.projects[nasaProject].id
    var nasaProjectURL = "https://api.nasa.gov/techport/api/projects/" + selectedProject + "?api_key="+ nasaAPIKey;
    $.ajax({
        url: nasaProjectURL,
        method: "GET"
        }).then(function(response) {
        //populate fields for NASA project
        $('#id').empty();
        $('#id').text(response.project.id + "  " + response.project.title)

        $('#startDate').empty();
        $('#startDate').text(response.project.startDate)

        $('#endDate').empty();
        $('#endDate').text(response.project.endDate)

        $('#description').empty();
        $('#description').html(response.project.description)

        $('#status').empty();
        $('#status').text(response.project.status)
        })
    });
})

//submit button keylistener
$('.submitSpacexBtn').click( function() {
    userChoice = (flightNum.value);

    //query SpaceX api for launch data then populate associated table data & links
    $.get("https://api.spacexdata.com/v4/launches/" + userChoice).then(function(response) {

       $('#flightNumber').empty();
       $('#flightNumber').text(response.flight_number)

       $('#name').empty();
       $('#name').text(response.name)

       $('#date').empty();
       $('#date').text(moment.unix(response.date_unix).format("YYYY-MM-DD HH:mm"))
        var unixDate = response.date_unix // <-- this is used in the DarkSky API call below

        var lat;
        var lon;

        $('#details').empty();
        $('#details').text(response.details)
        
        $('#article').empty();
        $('#article').html("<a href = '" + response.links.article + "'>" +response.links.article + "</a>"+ "<br>" +
        "<a href = '" + response.links.webcast + "'>" + response.links.webcast + "</a>" )

        //query SpaceX for launchpad data for use in 'location' field as well as DarkSky API call
        $.get("https://api.spacexdata.com/v4/launchpads/" + response.launchpad).then(function(response) {
        $('#location').empty();
        $('#location').text(response.full_name)
        lat = response.latitude;
        lon = response.longitude;

      // query DarkSky for historic weather info table   
      
      // --- UNCOMMENT AND ADD API KEY FROM COMMENTS FOR HISTORIC WEATHER FUNCTIONALITY ---
       var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://dark-sky.p.rapidapi.com/"+ lat +"," + lon + "," + unixDate,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "dark-sky.p.rapidapi.com",
            "x-rapidapi-key": "67813d1ab1msh20677efa01c90afp193f66jsnc2e4e263c434"  //  <--- add API key here
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response)
        $('#temperature').empty();
        $('#temperature').html(response.currently.temperature + '&deg' + "F")

        $('#humidity').empty();
        $('#humidity').text(response.currently.humidity*100 + '%')

        $('#wind-speed').empty();
        $('#wind-speed').text(response.currently.windSpeed + ' mph')
        })
    // --- END of historic weather functionality ---

        })
        // query SpaceX API for rocket information and pictures to append
       var rocketID = response.rocket
       $.get("https://api.spacexdata.com/v4/rockets/" + rocketID).then(function(response) { 
            $('#rocketPicture').empty();
           for (var i = 0; i < response.flickr_images.length; i++) {
            $('#rocketPicture').append("<img class = 'rocketPicture' src = '" + response.flickr_images[i] + "'>");
           }              
        }); 
    })
}); 


