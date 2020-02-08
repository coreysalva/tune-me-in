var apikey = "QifHTCzvGSMfbaKm1TL6YGiFOvY3s2W9";

$("#search-btn").on("click", function () {
    $("#tk-content").empty();
    var artistName = $("#artist_name").val().trim();

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