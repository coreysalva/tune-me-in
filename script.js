function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}


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

    // WHEN USER DOES A VIDEO KEYWORD SEARCH..........
    if ($("select[id=searchType] option:selected").val() == "videos") {

        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=id&q=" + searchTerm + "&type=video&key=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {

                for (var i = 0; i < 5; i++) {

                    const videoId = response.items[i].id.videoId;
                    const buttonId = ("button" + i);

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
                            var buttonCode = '<br><a id="' + buttonId + '" class="waves-effect waves-light btn" data-url="' + videoLink + '" ><i class="fas fa-clipboard" aria-hidden="true"></i> Copy</a>'

                            var imgSrc = response.items[0].snippet.thumbnails.medium.url;

                            titleDiv.text(response.items[0].snippet.title);
                            newDiv.append(titleDiv);
                            linkDiv.attr("href", videoLink);
                            linkDiv.attr("target", "_blank");
                            newDiv.append(linkDiv);
                            imgDiv.attr("src", imgSrc);
                            linkDiv.append(imgDiv);
                            newDiv.append(buttonCode);
                            $(".btn").click(function () {

                                var dummy = document.createElement("textarea");
                                // to avoid breaking orgain page when copying more words
                                // cant copy when adding below this code
                                // dummy.style.display = 'none'
                                document.body.appendChild(dummy);
                                //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
                                dummy.value = $(this).data("url");

                                dummy.select();
                                document.execCommand("copy");
                                document.body.removeChild(dummy);
                            });
                            $("#yt-content").append(newDiv);

                            // console.log($("#button0").data("url"));
                        });

                }

            });

    }


    // WHEN A USER SEARCHES FOR CHANNEL
    else if ($("select[id=searchType] option:selected").val() == "channels") {


        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=id&q=" + searchTerm + "&type=channel&key=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        })



            .then(function (response) {

                for (var i = 0; i < 5; i++) {

                    const channelId = response.items[i].id.channelId;
                    const buttonId = ("button" + i);
                    var queryURL2 = "https://www.googleapis.com/youtube/v3/channels?key=" + APIKey + "&part=snippet&id=" + channelId;

                    $.ajax({
                        url: queryURL2,
                        method: "GET"
                    })

                        .then(function (response) {

                            var newDiv = $("<div>");
                            var titleDiv = $("<h5>");
                            var descriptionDiv = $("<p>");
                            var channelDescription = response.items[0].snippet.description;
                            channelDescription = channelDescription.substring(0, 200) + "...";
                            var linkDiv = $("<a>");
                            var channelLink = "https://www.youtube.com/channel/" + channelId;
                            var imgDiv = $("<img>");
                            var imgSrc = response.items[0].snippet.thumbnails.medium.url;
                            var buttonCode = '<br><a id="' + buttonId + '" class="waves-effect waves-light btn" data-url="' + channelLink + '" ><i class="fas fa-clipboard" aria-hidden="true"></i> Copy</a>'

                            titleDiv.text(response.items[0].snippet.title);
                            newDiv.append(titleDiv);
                            descriptionDiv.append(channelDescription);
                            newDiv.append(descriptionDiv);


                            linkDiv.attr("href", channelLink)
                            linkDiv.attr("target", "_blank")
                            newDiv.append(linkDiv);

                            imgDiv.attr("src", imgSrc);
                            linkDiv.append(imgDiv);
                            newDiv.append(buttonCode);
                            $(".btn").click(function () {

                                var dummy = document.createElement("textarea");
                                // to avoid breaking orgain page when copying more words
                                // cant copy when adding below this code
                                // dummy.style.display = 'none'
                                document.body.appendChild(dummy);
                                //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
                                dummy.value = $(this).data("url");

                                dummy.select();
                                document.execCommand("copy");
                                document.body.removeChild(dummy);
                            });

                            $("#yt-content").append(newDiv);



                        });

                }

            });


    }

    // WHEN A USER SEARCHES FOR A PLAYLIST
    else {


        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=id&q=" + searchTerm + "&type=playlist&key=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                for (var i = 0; i < 5; i++) {

                    const playlistId = response.items[i].id.playlistId;
                    const buttonId = ("button" + i);
                    var queryURL2 = "https://www.googleapis.com/youtube/v3/playlists?key=" + APIKey + "&part=snippet&id=" + playlistId;

                    $.ajax({
                        url: queryURL2,
                        method: "GET"
                    })

                        .then(function (response) {

                            var newDiv = $("<div>");
                            var titleDiv = $("<h5>");
                            var linkDiv = $("<a>");

                            var videoLink = "https://www.youtube.com/playlist?list=" + playlistId;

                            var imgDiv = $("<img>");
                            var imgSrc = response.items[0].snippet.thumbnails.medium.url;
                            var buttonCode = '<br><a id="' + buttonId + '" class="waves-effect waves-light btn" data-url="' + videoLink + '" ><i class="fas fa-clipboard" aria-hidden="true"></i> Copy</a>'

                            titleDiv.text(response.items[0].snippet.title);
                            newDiv.append(titleDiv);
                            linkDiv.attr("href", videoLink);
                            linkDiv.attr("target", "_blank");
                            newDiv.append(linkDiv);
                            imgDiv.attr("src", imgSrc);
                            linkDiv.append(imgDiv);
                            newDiv.append(buttonCode);
                            $(".btn").click(function () {

                                var dummy = document.createElement("textarea");
                                // to avoid breaking orgain page when copying more words
                                // cant copy when adding below this code
                                // dummy.style.display = 'none'
                                document.body.appendChild(dummy);
                                //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
                                dummy.value = $(this).data("url");

                                dummy.select();
                                document.execCommand("copy");
                                document.body.removeChild(dummy);
                            });

                            $("#yt-content").append(newDiv);


                        });

                }

            });
    };
});