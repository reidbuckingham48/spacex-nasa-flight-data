queryLaunches();
function queryLaunches(){
    $.get("https://api.spacexdata.com/v4/launches").then(function(response) {
        // for each flight in response array, creates an option in dropdown menu with flight num, date and time
        for (var i = 0; i < response.length; i++) {
            var dateString = moment.unix(response[i].date_unix).format("YYYY-MM-DD HH:mm");
            var dropdownOpt = $('<option>');
            dropdownOpt.attr('class','flightBtn');
            dropdownOpt.text("Flight Number: " + response[i].flight_number + "  Date: " + dateString);
            dropdownOpt.val(response[i].flight_number);
            $('#flightNum').append(dropdownOpt);
        };
    })
}

// $('.flightBtn').click( function() {
//     userChoice = $(this).val();
//     console.log(userChoice);
// })

// var flightDetails = response[0].details;
// var launchDate = response[0].launch_date_local;
// var launchYear = response[0].launch_year;
// var articleLink = response[0].links.article_link;
// var launchSite = response[0].launch_site.site_name_long;
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