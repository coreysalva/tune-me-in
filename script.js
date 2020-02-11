// Copy to clipboard function
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


var APIKey = "AIzaSyDbWRn-vHKFAxqPw4rJqZ6_zkKnpiaowI4";

// Event listener for search button
$("#search-btn").on("click", function () {
    $("#yt-content").empty();
    $("#tk-content").empty();

    var songName = $("#song_name").val().trim();
    var artistName = $("#artist_name").val().trim();
    var albumName = $("#album_name").val().trim();

    // Combine all search terms for youtube search
    var searchTerm = songName + "+" + artistName + "+" + albumName;

    // replace blanks with "+"s
    searchTerm = searchTerm.replace(/ /g, "+");
    artistName = artistName.replace(/ /g, "+");

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

        // query to find video ID based on search term
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=id&q=" + searchTerm + "&type=video&key=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {

                // creates loop for 5 results
                for (var i = 0; i < 5; i++) {

                    const videoId = response.items[i].id.videoId;
                    const buttonId = ("button" + i);

                    // query to get video details
                    var queryURL2 = "https://www.googleapis.com/youtube/v3/videos?key=" + APIKey + "&part=snippet&id=" + videoId;

                    $.ajax({
                        url: queryURL2,
                        method: "GET"
                    })

                        .then(function (response) {

                            // create new div for title/video
                            var newDiv = $("<div>");
                            var titleDiv = $("<h5>");
                            var linkDiv = $("<a>");
                            var videoLink = "https://www.youtube.com/watch?v=" + videoId;
                            var imgDiv = $("<img>");
                            // var embedDiv = '<div class="video-container"><iframe width="853" height="480" src="http://www.youtube.com/embed/' + videoId + '?rel=0" frameborder="0" allowfullscreen></iframe></div>';
                            var buttonCode = '<br><a id="' + buttonId + '" class="waves-effect waves-light btn" data-url="' + videoLink + '" ><i class="fas fa-clipboard" aria-hidden="true"></i> Copy Link</a>';

                            var imgSrc = response.items[0].snippet.thumbnails.medium.url;
                            console.log(imgSrc);

                            titleDiv.text(response.items[0].snippet.title);
                            newDiv.append(titleDiv);
                            linkDiv.attr("href", videoLink);
                            linkDiv.attr("target", "_blank");
                            newDiv.append(linkDiv);
                            imgDiv.attr("src", imgSrc);
                            linkDiv.append(imgDiv);
                            // newDiv.append(embedDiv);
                            newDiv.append(buttonCode);

                            // copy to clipboard
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

                            // append to existing div
                            $("#yt-content").append(newDiv);

                            // console.log($("#button0").data("url"));
                        });

                }

            });

    }


    // WHEN A USER SEARCHES FOR CHANNEL
    else if ($("select[id=searchType] option:selected").val() == "channels") {

        // query for channel ID based on search term
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=id&q=" + searchTerm + "&type=channel&key=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        })



            .then(function (response) {

                // creates loop for 5 results
                for (var i = 0; i < 5; i++) {

                    const channelId = response.items[i].id.channelId;
                    const buttonId = ("button" + i);

                    // query to get video details
                    var queryURL2 = "https://www.googleapis.com/youtube/v3/channels?key=" + APIKey + "&part=snippet&id=" + channelId;

                    $.ajax({
                        url: queryURL2,
                        method: "GET"
                    })

                        .then(function (response) {

                            // create new div for title/description/image w/ link
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

                            // append to existing div
                            $("#yt-content").append(newDiv);



                        });

                }

            });


    }

    // WHEN A USER SEARCHES FOR A PLAYLIST
    else {

        // query to find playlist ID based on search term
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=id&q=" + searchTerm + "&type=playlist&key=" + APIKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                for (var i = 0; i < 5; i++) {

                    const playlistId = response.items[i].id.playlistId;
                    const buttonId = ("button" + i);

                    // query to get playlist details
                    var queryURL2 = "https://www.googleapis.com/youtube/v3/playlists?key=" + APIKey + "&part=snippet&id=" + playlistId;

                    $.ajax({
                        url: queryURL2,
                        method: "GET"
                    })

                        .then(function (response) {

                            // create new div for title/video
                            var newDiv = $("<div>");
                            var titleDiv = $("<h5>");
                            var linkDiv = $("<a>");

                            var videoLink = "https://www.youtube.com/playlist?list=" + playlistId;
                            var imgDiv = $("<img>");
                            var imgSrc = response.items[0].snippet.thumbnails.medium.url;
                            // var embedDiv = '<div class="video-container"><iframe width="853" height="480" src="http://www.youtube.com/embed/videoseries?list=' + playlistId + '?rel=0" frameborder="0" allowfullscreen></iframe></div>';
                            var buttonCode = '<br><a id="' + buttonId + '" class="waves-effect waves-light btn" data-url="' + videoLink + '" ><i class="fas fa-clipboard" aria-hidden="true"></i> Copy Link</a>';

                            titleDiv.text(response.items[0].snippet.title);
                            newDiv.append(titleDiv);
                            linkDiv.attr("href", videoLink);
                            linkDiv.attr("target", "_blank");
                            newDiv.append(linkDiv);
                            imgDiv.attr("src", imgSrc);
                            linkDiv.append(imgDiv);
                            // newDiv.append(embedDiv);
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

                            // append to existing div
                            $("#yt-content").append(newDiv);


                        });

                }

            });
    };




    var lastFmApiKey = "57fffbb92b9278298f1b78c87983014b"
    var sharedSecret = "7a7564505d37a6b2f3572896ce7d994a"
    var queryURL5 = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artistName + "&api_key=" + lastFmApiKey + "&format=json";
    $.ajax({
        url: queryURL5,
        method: "GET"
    })

        .then(function (response) {
            // console.log(response.artist);

            var newDiv = $("<div>");
            var artistNameDiv = $("<h4>");
            var artistBioTitle = $("<h5>");
            var artistBioText = $("<p>");
            var similarDivTitle = $("<h5>");
            var similarDivText = $("<p>");
            var albumDivHeader = $("<h5>");
            var genreDivTitle = $("<h5>");
            var genreDivText = $("<p>");


            var simArtist1 = response.artist.similar.artist[0].name;
            var simArtist2 = response.artist.similar.artist[1].name;
            var simArtist3 = response.artist.similar.artist[2].name;
            var simArtist4 = response.artist.similar.artist[3].name;
            var simArtist5 = response.artist.similar.artist[4].name;

            var genre1 = response.artist.tags.tag[0].name;
            var genre2 = response.artist.tags.tag[1].name;
            var genre3 = response.artist.tags.tag[2].name;
            var genre4 = response.artist.tags.tag[3].name;
            var genre5 = response.artist.tags.tag[4].name;

            artistNameDiv.text(response.artist.name);
            genreDivTitle.text("Genres:");
            genreDivText.append(genre1, ", ", genre2, ", ", genre3, ", ", genre4, ", ", genre5);
            similarDivTitle.text("Similar Artists:");
            similarDivText.append(simArtist1, ", ", simArtist2, ", ", simArtist3, ", ", simArtist4, ", ", simArtist5);
            artistBioTitle.text("Artist Biography:");
            artistBioText.text(response.artist.bio.summary);
            newDiv.append(artistNameDiv);
            newDiv.append(artistBioTitle);
            newDiv.append(artistBioText);
            newDiv.append(genreDivTitle);
            newDiv.append(genreDivText);
            newDiv.append(similarDivTitle);
            newDiv.append(similarDivText);
            newDiv.append("<br>");
            albumDivHeader.text("Albums:");
            // newDiv.append(albumDivHeader);

            $("#tk-content").append(newDiv);

        });


    var consumerKey = "gzWAlJdZuJtEWPZkzhui";
    var consumerSecret = "PMLUKaQuCUoGBmQBXcRLDyqzltgJxUHH";
    var queryURL4 = "https://api.discogs.com/database/search?artist=" + artistName + "&format=album&key=" + consumerKey + "&secret=" + consumerSecret;



    // $.ajax({
    //     url: queryURL4,
    //     method: "GET"
    // })

    //     .then(function (response) {
    //         for (var i = 0; i < 10; i++) {
    //             // console.log(response);

    //             var newDiv = $("<div>");
    //             var albumTitleDiv = $("<p>");
    //             var imgDiv = $("<img>");
    //             var imgSrc = response.results[i].cover_image;

    //             imgDiv.attr("src", imgSrc);
    //             albumTitleDiv.text(response.results[i].title);
    //             newDiv.append(albumTitleDiv);
    //             newDiv.append(imgDiv);
    //             newDiv.append("<br>");
    //             newDiv.append("<br>");

    //             $("#tk-content").append(newDiv);
    //         };

    //     });



});