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
        var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=5&keywork&stateCode=" + stateCode + "&apikey=" + apikey;

        $.ajax({
            type: "GET",
            url: queryURL,
            async: true,
            dataType: "json",
            success: function (json) {
                console.log(json);
                // Parse the response.
                // Do other things.
            },
            error: function (xhr, status, err) {
                // This time, we do not end up here!
            }
        })
        if ()
            $("#tk-content").append()

    })


    // find events (below will)
    function getEvents(page) {

        $('#events-panel').show();

        if (page < 0) {
            page = 0;
            return;
        }
        if (page > 0) {
            if (page > getEvents.json.page.totalPages - 1) {
                page = 0;
            }
        }

        $.ajax({
            type: "GET",
            url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=" + apikey + "&size=5&page=" + page,
            async: true,
            dataType: "json",
            success: function (json) {
                getEvents.json = json;
                showEvents(json);
            },
            error: function (xhr, status, err) {
                console.log(err);
            }
        });
    }
    //To show the events
    function showEvents(json) {
        var items = $('#events .list-group-item');
        items.hide();
        var events = json._embedded.events;
        var item = items.first();
        for (var i = 0; i < events.length; i++) {
            item.children('.list-group-item-heading').text(events[i].name);
            item.children('.list-group-item-text').text(events[i].dates.start.localDate);
            try {
                item.children('.venue').text(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name);
            } catch (err) {
                console.log(err);
            }
            item.show();
            item.off("click");
            item.click(events[i], function (eventObject) {
                console.log(eventObject.data);
                try {
                    getAttraction(eventObject.data._embedded.attractions[0].id);
                } catch (err) {
                    console.log(err);
                }
            });
            item = item.next();
        }
    }
})