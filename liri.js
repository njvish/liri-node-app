var keys = require('./keys.js');
var twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var fs = require('fs');

//capture user input, and tell user what to type in.
console.log("What would you like to do? my-tweets , spotify-this-song , movie-this , do-what-it-says");
var userCommand = process.argv[2];
var secondCommand = process.argv[3];

	for(i=4; i<process.argv.length; i++){
	    secondCommand += '+' + process.argv[i];
	}

function switchArg(){
	switch(userCommand){

		case 'my-tweets':
		getTweets();
		break;

		case 'spotify-this-song':
		mySpotify();
		break;

		case 'movie-this':
		movieChoice();
		break;

		case 'do-what-it-says':
		doIt();
		break;
		
	}
};
//functions/options

function mySpotify(){
	console.log("Jam sesh!");



	var searchTrack;
	if(secondCommand === undefined){
		searchTrack = "Tiny Dancer";
	}else{
		searchTrack = secondCommand;
	}
	spotify.search({type:'track', query:searchTrack}, function(err,data){
	    if(err){
	        console.log('Error occurred: ' + err);
	        return;
	    }else{
	  		console.log("Artist: " + data.tracks.items[0].artists[0].name);
	        console.log("Song: " + data.tracks.items[0].name);
	        console.log("Album: " + data.tracks.items[0].album.name);
	        console.log("Preview Here: " + data.tracks.items[0].preview_url);
	    }
	});
};

function movieChoice(){
	console.log("Grab some popcorn!");

	var searchMovie;
	if(secondCommand === undefined){
		searchMovie = "Gladiator";
	}else{
		searchMovie = secondCommand;
	};

	var url = 'http://www.omdbapi.com/?t=' + searchMovie +'&y=&plot=long&tomatoes=true&r=json';
   	request(url, function(error, response, body){
	    if(!error && response.statusCode == 200){
	        console.log("Title: " + JSON.parse(body)["Title"]);
	        console.log("Year: " + JSON.parse(body)["Year"]);
	        console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
	        console.log("Country: " + JSON.parse(body)["Country"]);
	        console.log("Language: " + JSON.parse(body)["Language"]);
	        console.log("Plot: " + JSON.parse(body)["Plot"]);
	        console.log("Actors: " + JSON.parse(body)["Actors"]);
	        console.log("Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"]);
	        console.log("Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"]);
	    }
    });
};

function doIt(){
	console.log("Looking at random.txt now");
	fs.readFile("random.txt", "utf8", function(error, data) {
	    if(error){
     		console.log(error);
     	}else{

    
     	var dataArr = data.split(',');
        userCommand = dataArr[0];
        secondCommand = dataArr[1];
        
        for(i=2; i<dataArr.length; i++){
            secondCommand = secondCommand + "+" + dataArr[i];
        };
        
		switchArg();
		
    	};

    });

};

switchArg();
