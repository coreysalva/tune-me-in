$("#text").on("click", function (event) {
    var apikey = "QifHTCzvGSMfbaKm1TL6YGiFOvY3s2W9"
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=" + apikey;

    $.ajax({
        type: "GET",
        url: queryURL,
        async: true,
        dataType: "json",
        success: function (json) {

            console.log(json);
