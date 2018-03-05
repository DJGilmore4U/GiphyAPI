$(document).ready(function() {
//Array for searched topics to be added
var topics = [];

	//Function with AJAX call to GIPHY; Q parameter for API link set to search term, limit 12 results
  //Create div with respective still and animate image sources with "data-state", "data-still" and "data-animate" attributes
 	function displayGIFS() {

	var x = $(this).data("search");
	console.log(x);

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=12";

	console.log(queryURL);

	$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	var results = response.data;
        	console.log(results);
        	for (var i = 0; i < results.length; i++) {
        	
        	var gifDiv = $("<div class='col-md-4'>");

        	var rating = results[i].rating;
        	var defaultAnimatedSrc = results[i].images.fixed_height.url;
        	var staticSrc = results[i].images.fixed_height_still.url;
        	var gifImage = $("<img>");
        	var p = $("<p>").text("Rating: " + rating);

        	gifImage.attr("src", staticSrc);
        	gifImage.addClass("gifGiphy");
        	gifImage.attr("data-state", "still");
        	gifImage.attr("data-still", staticSrc);
        	gifImage.attr("data-animate", defaultAnimatedSrc);
        	gifDiv.append(p);
        	gifDiv.append(gifImage);
        	$("#gifArea").prepend(gifDiv);

        }
	});
}

  //Submit button click event takes search term from form input, trims and pushes to topics array, displays button
	$("#addGif").on("click", function(event) {
        event.preventDefault();
        var newGif = $("#gifInput").val().trim();
        topics.push(newGif);
        console.log(topics);
        $("#gifInput").val('');
        displayButtons();
      });

        //Reset button click event takes search term from form input, trims and pushes to topics array, displays button
      $("#clearGif").on("click", function(event) {
      
        $("#gifArea").empty();
      });

  //Function iterates through topics array to display button with array values in "myButtons" section of HTML
	function displayButtons() {
    $("#myButtons").empty();
    for (var i = 0; i < topics.length; i++) {
      var a = $('<button class="btn btn-primary">');
      a.attr("id", "display");
      a.attr("data-search", topics[i]);
      a.text(topics[i]);
      $("#myButtons").append(a);
    }
  }


  displayButtons();

  //Click event on button with id of "display" executes displayGIF function
  $(document).on("click", "#display", displayGIFS);

  //Click event on gifs with class of "gifGiphy" executes pausePlayGifs function
  $(document).on("click", ".gifGiphy", pausePlayGifs);

  //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
  function pausePlayGifs() {
  	 var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }
}

});