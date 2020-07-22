queryLaunches();
function queryLaunches(){
    $.get("https://api.spacexdata.com/v4/launches").then(function(response) {
                   // for each flight in response array, creates an option in dropdown menu with flight num, date and time
                    for (var i = 0; i < response.length; i++) {
                        var dateString = moment.unix(response[i].date_unix).format("YYYY-MM-DD HH:mm");
                        var dropdownOpt = $('<option>');
                        dropdownOpt.text("Flight Number: " + response[i].flight_number + "  Date: " + dateString)
                        dropdownOpt.val(response[i].flight_number);
                        $('#flightNum').append(dropdownOpt)
                   };
                })
}