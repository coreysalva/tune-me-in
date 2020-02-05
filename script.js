// ISSUES - FOR CHANNEL AND VIDEO ALL RESULTS LINK OUT TO LAST RESULT & PLAYLIST LINK WON'T WORK BECAUSE I CAN'T GET 1ST VIDEO ID FROM JSON


var APIKey = "AIzaSyAU1fAk-8WcXwrIryta0wlz5iYnRE_c2ZA";

$("#search-btn").on("click", function () {
    $("#yt-content").empty();
    var songName = $("#song_name").val().trim();
    var artistName = $("#artist_name").val().trim();
    var albumName = $("#album_name").val().trim();

    var searchTerm = songName + "+" + artistName + "+" + albumName;
    // replace blanks with "+"s
    searchTerm = searchTerm.replace(/ /g, "+");
    // replace ++ with +
    searchTerm = searchTerm.replace("++", "+");
    // remove + from beginning of search term
    while (searchTerm.charAt(0) === '+') {
        searchTerm = searchTerm.substr(1);
    };
    // remove + from end of search term
    if (searchTerm.charAt(searchTerm.length - 1) == '+') {
        searchTerm = searchTerm.substr(0, searchTerm.length - 1);
    };

    if ($("select[id=searchType] option:selected").val() == "videos") {
        // WHEN USER DOES A VIDEO KEYWORD SEARCH..........

        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=id&q=" + searchTerm + "&type=video&key=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {

                for (var i = 0; i < 5; i++) {

                    var videoId = response.items[i].id.videoId;

                    var queryURL2 = "https://www.googleapis.com/youtube/v3/videos?key=" + APIKey + "&part=snippet&id=" + videoId;

                    $.ajax({
                        url: queryURL2,
                        method: "GET"
                    })

                        .then(function (response) {

                            var newDiv = $("<div>");
                            var titleDiv = $("<h5>");
                            var linkDiv = $("<a>");
                            var videoLink = "https://www.youtube.com/watch?v=" + videoId;
                            var imgDiv = $("<img>");

                            var imgSrc = response.items[0].snippet.thumbnails.medium.url;

                            titleDiv.text(response.items[0].snippet.title);
                            newDiv.append(titleDiv);
                            // console.log(i);


                            linkDiv.attr("href", videoLink);
                            linkDiv.attr("target", "_blank");
                            newDiv.append(linkDiv);

                            imgDiv.attr("src", imgSrc);
                            linkDiv.append(imgDiv);
                            $("#yt-content").append(newDiv);

                        });

                }

            });

    }



    else if ($("select[id=searchType] option:selected").val() == "channels") {


        // WHEN A USER SEARCHES FOR CHANNEL



        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=id&q=" + searchTerm + "&type=channel&key=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        })



            .then(function (response) {

                for (var i = 0; i < 5; i++) {

                    var channelId = response.items[i].id.channelId;

                    var queryURL2 = "https://www.googleapis.com/youtube/v3/channels?key=" + APIKey + "&part=snippet&id=" + channelId;

                    $.ajax({
                        url: queryURL2,
                        method: "GET"
                    })

                        .then(function (response) {

                            var newDiv = $("<div>");
                            var titleDiv = $("<h5>");
                            var descriptionDiv = $("<p>");
                            var linkDiv = $("<a>");
                            var channelLink = "https://www.youtube.com/channel/" + channelId;
                            var imgDiv = $("<img>");
                            var imgSrc = response.items[0].snippet.thumbnails.medium.url;

                            titleDiv.text(response.items[0].snippet.title);
                            newDiv.append(titleDiv);
                            descriptionDiv.append(response.items[0].snippet.description);
                            newDiv.append(descriptionDiv);


                            linkDiv.attr("href", channelLink)
                            linkDiv.attr("target", "_blank")
                            newDiv.append(linkDiv);

                            imgDiv.attr("src", imgSrc);
                            linkDiv.append(imgDiv);

                            $("#yt-content").append(newDiv);



                        });

                }

            });


    }


    else {

        // WHEN A USER SEARCHES FOR A PLAYLIST
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=id&q=" + searchTerm + "&type=playlist&key=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                for (var i = 0; i < 5; i++) {
                    var firstVideo = "";
                    var playlistId = response.items[i].id.playlistId;
                    var queryURL2 = "https://www.googleapis.com/youtube/v3/playlists?key=" + APIKey + "&part=snippet&id=" + playlistId;

                    $.ajax({
                        url: queryURL2,
                        method: "GET"
                    })

                        .then(function (response) {

                            var newDiv = $("<div>");
                            var titleDiv = $("<h5>");
                            var linkDiv = $("<a>");
                            var videoLink = "https://www.youtube.com/watch?v=" + playlistId;
                            var imgDiv = $("<img>");
                            var imgSrc = response.items[0].snippet.thumbnails.medium.url;

                            titleDiv.text(response.items[0].snippet.title);
                            newDiv.append(titleDiv);



                            linkDiv.attr("href", videoLink);
                            linkDiv.attr("target", "_blank");
                            newDiv.append(linkDiv);

                            imgDiv.attr("src", imgSrc);
                            linkDiv.append(imgDiv);

                            $("#yt-content").append(newDiv);


                        });

                }

            });
    };
});