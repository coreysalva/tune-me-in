var APIKey = "AIzaSyAU1fAk-8WcXwrIryta0wlz5iYnRE_c2ZA";


// WHEN PULLING SEARCH TERM....ADD .TRIM() TO REMOVE SPACES AT BEG AND END



// WHEN USER DOES A VIDEO KEYWORD SEARCH..........

$("#search-btn").on("click", function () {
    $("#yt-content").empty();
    var searchTerm = $("#album_name").val();
    searchTerm = searchTerm.replace(/ /g, "+");
    var queryURL = "https://www.googleapis.com/youtube/v3/search?part=id&q=" + searchTerm + "&type=video&key=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // FIGURE OUT LINK FOR CHANNELS AND PLAYLISTS


        // WHEN USER DOES A VIDEO KEYWORD SEARCH..........
        .then(function (response) {

            for (var i = 0; i < 5; i++) {

                var videoId = response.items[i].id.videoId;

                var queryURL2 = "https://www.googleapis.com/youtube/v3/videos?key=" + APIKey + "&part=snippet&id=" + videoId;
                console.log(videoId);
                $.ajax({
                    url: queryURL2,
                    method: "GET"
                })

                    .then(function (response) {

                        // console.log(response)
                        var newDiv = $("<div>");
                        var titleDiv = $("<h5>");
                        var linkDiv = $("<a>");
                        var videoLink = "https://www.youtube.com/watch?v=" + videoId;
                        var imgDiv = $("<img>");
                        // console.log(response)
                        // console.log(response.items[0].id)
                        var imgSrc = response.items[0].snippet.thumbnails.medium.url;

                        titleDiv.text(response.items[0].snippet.title);
                        newDiv.append(titleDiv);



                        linkDiv.attr("href", videoLink);
                        linkDiv.attr("target", "_blank");
                        newDiv.append(linkDiv);

                        imgDiv.attr("src", imgSrc);
                        linkDiv.append(imgDiv);

                        $("#yt-content").append(newDiv);

                        // console.log(videoLink);

                    });

            }

        });








    // WHEN A USER SEARCHES FOR CHANNEL



    // var queryURL = "https://www.googleapis.com/youtube/v3/search?part=id&q=twiddle&type=channel&key=" + APIKey;
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // })
    //     // FIGURE OUT LINKS FOR CHANNELS AND PLAYLISTS


    //     .then(function (response) {

    //         for (var i = 0; i < 5; i++) {
    //             // console.log(response);
    //             var channelId = response.items[i].id.channelId;
    //             console.log(channelId);
    //             var queryURL2 = "https://www.googleapis.com/youtube/v3/channels?key=" + APIKey + "&part=snippet&id=" + channelId;

    //             $.ajax({
    //                 url: queryURL2,
    //                 method: "GET"
    //             })

    //                 .then(function (response) {
    //                     // console.log(response);
    //                     var newDiv = $("<div>");
    //                     var titleDiv = $("<h5>");
    //                     var descriptionDiv = $("<p>");
    //                     var linkDiv = $("<a>");
    //                     var channelLink = "https://www.youtube.com/channel/" + channelId;
    //                     var imgDiv = $("<img>");
    //                     var imgSrc = response.items[0].snippet.thumbnails.medium.url;

    //                     titleDiv.text(response.items[0].snippet.title);
    //                     newDiv.append(titleDiv);
    //                     descriptionDiv.append(response.items[0].snippet.description);
    //                     newDiv.append(descriptionDiv);

    //                     // console.log(channelId);

    //                     linkDiv.attr("href", channelLink)
    //                     linkDiv.attr("target", "_blank")
    //                     newDiv.append(linkDiv);

    //                     imgDiv.attr("src", imgSrc);
    //                     linkDiv.append(imgDiv);

    //                     $(".videoList").append(newDiv);



    //                 });

    //         }

    //     });




    // WHEN A USER SEARCHES FOR A PLAYLIST
    // var queryURL = "https://www.googleapis.com/youtube/v3/search?part=id&q=phish&type=playlist&key=" + APIKey;
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // })

    //     .then(function (response) {
    //         // console.log(response);
    //         for (var i = 0; i < 5; i++) {
    //             var firstVideo = "";
    //             var playlistId = response.items[i].id.playlistId;
    //             // console.log(playlistId)
    //             var queryURL2 = "https://www.googleapis.com/youtube/v3/playlists?key=" + APIKey + "&part=snippet&id=" + playlistId;

    //             $.ajax({
    //                 url: queryURL2,
    //                 method: "GET"
    //             })

    //                 .then(function (response) {

    //                     console.log(response)
    //                     var newDiv = $("<div>");
    //                     var titleDiv = $("<h5>");
    //                     var linkDiv = $("<a>");
    //                     var videoLink = "https://www.youtube.com/watch?v=" + playlistId;
    //                     var imgDiv = $("<img>");
    //                     // console.log(response)
    //                     // console.log(response)
    //                     var imgSrc = response.items[0].snippet.thumbnails.medium.url;

    //                     titleDiv.text(response.items[0].snippet.title);
    //                     newDiv.append(titleDiv);



    //                     linkDiv.attr("href", videoLink);
    //                     linkDiv.attr("target", "_blank");
    //                     newDiv.append(linkDiv);

    //                     imgDiv.attr("src", imgSrc);
    //                     linkDiv.append(imgDiv);

    //                     $("#yt-content").append(newDiv);

    //                     // console.log(videoLink);

    //                 });

    //         }

    //     });
});