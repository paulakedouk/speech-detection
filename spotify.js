var keys = require('./keys.js');
var request = require('request');
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);
var userInput = process.argv;
var song;

function getSpotify() {
  song = userInput[3];
  if (song === undefined) {
    spotify
      .search({ type: 'track', query: 'Ace of Base' })
      .then(function(response) {
        songInfo(response);
      })
      .catch(function(err) {
        return console.log("Spotify can't find this song, please try another one!");
      });
  } else {
    spotify
      .search({ type: 'track', query: song })
      .then(function(response) {
        songInfo(response);
      })
      .catch(function(err) {
        return console.log("Spotify can't find this song, please try another one!");
      });
  }
}

function songInfo(response) {
  console.log('Artist: ', response.tracks.items[0].artists[0].name);
  console.log('Song: ', response.tracks.items[0].name);
  console.log('A preview link: ', response.tracks.items[0].external_urls.spotify);
  console.log('Album: ', response.tracks.items[0].album.name);
}

module.exports = getSpotify;
