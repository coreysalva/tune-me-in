var APIKey = "AIzaSyAU1fAk-8WcXwrIryta0wlz5iYnRE_c2ZA";
var searchTerm = "hello world";
searchTerm = searchTerm.replace(/ /g, "+");


var queryURL = "https://www.googleapis.com/youtube/v3/search?part=id&q=twiddle&type=video&key=" + APIKey;
$.ajax({
    url: queryURL,
    method: "GET"
})
    // FIGURE OUT LINK FOR CHANNELS AND PLAYLISTS
    .then(function (response) {

        // Log the queryURL
        var videoID = response.items[0].id.videoId;
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
                newDiv.append(linkDiv);
                imgDiv.attr("src", imgSrc);
                console.log(imgDiv)
                linkDiv.append(imgDiv);


                $(".videoList").append(newDiv);

                var videoLink = "https://www.youtube.com/watch?v=" + videoID;
                console.log(videoLink);

            });



    });