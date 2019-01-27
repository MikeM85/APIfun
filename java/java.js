// create an array of things to be displahyed
var apiThing = ["Stuff", "Thing", "Other"];

// creates buttons for each of these
function makeButtons(){ 
	// deletes the apiThing prior to adding new apiThing so there are no repeat buttons
	$('#buttonsView').empty();
	// loops through the apiThing array
	for (var i = 0; i < apiThing.length; i++){
		// dynamically makes buttons for every thing in the array
		var a = $('<button>') 
		a.addClass('thing'); // add a class
		a.attr('data-name', apiThing[i]); // add a data-attribute
		a.text(apiThing[i]); // make button text
		$('#buttonsView').append(a); // append the button to buttonsView div
    }
    
}


// handles addthing button event
$("#addthing").on("click", function(){

	// grabs the user thing input
	var thing = $("#thing-input").val().trim();
	// that input is now added to the array
	apiThing.push(thing);
	// the makeButtons function is called, which makes buttons for all apiThing plus the user thing
	makeButtons();
	// this line is so users can hit "enter" instead of clicking the submit button
	return false; 

})

function displayGifs(){
    var thing = $(this).attr("data-name");
// "http://api.giphy.com/v1/gifs/search?q="++"&api_key=YOUR_API_KEY&limit=5"
var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ thing +"&api_key=6CRX0slKPw457On49DYPweUDH253vmuF&limit=5";
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      
      // After the data comes back from the API
      .then(function(response) {
        console.log(thing);
        // Storing an array of results in the results variable
        var results = response.data;
        
        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

        //     // Creating a div for the gif
            var gifDiv = $("<div>");

            // Creating an image tag
            var personImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            personImage.attr("src", results[i].images.fixed_height.url);

            // Appending the personImage to the "gifDiv" div we created
            
            gifDiv.append(personImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifsView").prepend(gifDiv);
        
          
        }
      });
    
}
// starts displayGif function on click
$(document).on("click",".thing", displayGifs);
// initially calls the makeButtons function
makeButtons();
