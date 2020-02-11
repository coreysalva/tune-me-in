console.log("hello ryan");


//the console log of said events
$("#search-btn").on("click", function () {
    $("#tk-content").empty();
    var artistName = $("#artist_name").val().trim();

    var apikey = "QifHTCzvGSMfbaKm1TL6YGiFOvY3s2W9";

    $("#search-btn").on("click", function () {
        $("#tk-content").empty();
        var stateCode = $("#eventState").val().trim();
        var artistName = $("#artist_name").val().trim();
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&keyword=" + artistName + "&size=5&stateCode=" + stateCode + "&apikey=" + apikey;

        $.ajax({
            type: "GET",
            url: queryURL,
            async: true,
            dataType: "json",
            success: function (json) {
                console.log(json);
                // Parse the response.
                // Do other things.

                var newDiv = $('<div>');
                for (i = 0; i < 5; i++) {


                    var titleDiv = $('<h5>');
                    var linkDiv = $('<a>');
                    var embedDiv = '<div class="ticket-container"></div>'
                    console.log(embedDiv);
                    var eventImage = $('<img>').attr('src', json._embedded.events[i].images[0]);

                    $('#tk-content').append(titleDiv);
                    $('#tk-content').append(embedDiv);
                    titleDiv.html(json._embedded.events[i].name);
                    newDiv.append(titleDiv);
                    newDiv.append(embedDiv);
                    newDiv.append();
                    $("#tk-content").append(newDiv);
                }
            },
            error: function (xhr, status, err) {
                // This time, we do not end up here!
            }



        })

    })
})