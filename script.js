var APIKey = "AIzaSyAU1fAk-8WcXwrIryta0wlz5iYnRE_c2ZA";
var searchTerm = "";
// WHEN PULLING SEARCH TERM....ADD .TRIM() TO REMOVE SPACES AT BEG AND END
searchTerm = searchTerm.replace(/ /g, "+");


var queryURL = "https://www.googleapis.com/youtube/v3/search?part=id&q=phish&type=video&key=" + APIKey;
$.ajax({
    url: queryURL,
    method: "GET"
})
    // FIGURE OUT LINK FOR CHANNELS AND PLAYLISTS


    // WHEN USER DOES A VIDEO KEYWORD SEARCH..........
    .then(function (response) {

        for (var i = 0; i < 5; i++) {

            var videoID = response.items[i].id.videoId;
            console.log(videoID);
            var queryURL2 = "https://www.googleapis.com/youtube/v3/videos?key=" + APIKey + "&part=snippet&id=" + videoID;

            $.ajax({
                url: queryURL2,
                method: "GET"
            })

                .then(function (response) {

                    var newDiv = $("<div>");
                    var titleDiv = $("<h5>");
                    var linkDiv = $("<a>");
                    var videoLink = "https://www.youtube.com/watch?v=" + videoID;
                    var imgDiv = $("<img>");
                    var imgSrc = response.items[0].snippet.thumbnails.medium.url;

                    titleDiv.text(response.items[0].snippet.title);
                    newDiv.append(titleDiv);

                    console.log(response.items[0].snippet.thumbnails.medium.url);

                    linkDiv.attr("href", videoLink)
                    linkDiv.attr("target", "_blank")
                    newDiv.append(linkDiv);

                    imgDiv.attr("src", imgSrc);
                    linkDiv.append(imgDiv);

                    $(".videoList").append(newDiv);

                    console.log(videoLink);

                });

        }

    });