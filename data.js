queryLaunches();
function queryLaunches(){
    $.get("https://api.spacexdata.com/v4/launches").then(function(response) {
        console.log(response)
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

$('.submitBtn').click( function() {
    userChoice = (flightNum.value);

    //query launch data
    $.get("https://api.spacexdata.com/v4/launches/" + userChoice).then(function(response) {

       $('#flightNumber').empty();
       $('#flightNumber').text(response.flight_number)

       $('#name').empty();
       $('#name').text(response.name)

       $('#date').empty();
       $('#date').text(moment.unix(response.date_unix).format("YYYY-MM-DD HH:mm"))

       //query launchpad information for 'location' field
       $.get("https://api.spacexdata.com/v4/launchpads/" + response.launchpad).then(function(response) {
       $('#location').empty();
       $('#location').text(response.full_name)
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
})



// var flightDetails = response[0].details; -
// var launchDate = response[0].launch_date_local;-
// var launchYear = response[0].launch_year; - could not find
// var articleLink = response[0].links.article_link; - links.article
// var launchSite = response[0].launch_site.site_name_long; - could not find
// var flightDetailsText= $("<p>");
// var launchDateText = $("<p>");
// var launchYearText= $("<p>");
// var articleLinkText= $("<p>");
// var launchSiteText = $("<p>");
// flightDetailsText.text(flightDetails);
// launchDateText.text(launchDate);
// launchYearText.text(launchYear);
// articleLinkText.text(articleLink);
// launchSiteText.text(launchSite);
// $("#text").append(flightDetailsText);
// $("#text").append(launchDateText);
// $("#text").append(launchYearText);
// $("#text").append(articleLinkText);
// $("#text").append(launchSiteText);