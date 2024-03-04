// Sources : https://codepen.io/GRSimon/pen/vbFle/

var getaudio = ($('#player')[0]);
/* Get the audio from the player (using the player's ID), the [0] is necessary */
var mouseovertimer;
/* Global variable for a timer. When the mouse is hovered over the play-button it will start playing after hovering for 1 second, if less than 1 second it won't play (incase you accidentally hover over the play-button) */
var audiostatus = 'off';
/* Global variable for the audio's status (off or on). It's a bit crude but it works for determining the status. */

$(document).on('mouseenter', '#song-play', function() {
 /* Bonus feature, if the mouse hovers over the play-button image for more than 1 second the audio will start playing */
 if (!mouseovertimer) {
   mouseovertimer = window.setTimeout(function() {
     mouseovertimer = null;
     if (!$('#song-play').hasClass("playing")) {
       getaudio.load();
       /* Loads the audio */
       getaudio.play();
       /* Play the audio (starting at the beginning of the track) */
       $('#song-play').addClass('playing');
       return false;
     }
   }, 1000);
 }
});

$(document).on('mouseleave', '#song-play', function() {
 /* If the mouse stops hovering on the image (leaves the image) clear the timer, reset back to 0 */
 if (mouseovertimer) {
   window.clearTimeout(mouseovertimer);
   mouseovertimer = null
 }
});

$(document).on('click touchend', '#song-play', function() {
 /* Touchend is necessary for mobile devices, click alone won't work */
 if (!$('#song-play').hasClass("playing")) {
   if (audiostatus == 'off') {
     $('#song-play').addClass('playing');
     getaudio.load();
     getaudio.play();
     window.clearTimeout(mouseovertimer);
     audiostatus = 'on';
     return false;
   } else if (audiostatus == 'on') {
     $('#song-play').addClass('playing');
     getaudio.play()
   }
 } else if ($('#song-play').hasClass("playing")) {
   getaudio.pause();
   $('#song-play').removeClass('playing');
   window.clearTimeout(mouseovertimer);
   audiostatus = 'on';
 }
});

$('#player').on('ended', function() {
 $('#song-play').removeClass('playing');
 /*When the audio has finished playing, remove the class playing*/
 audiostatus = 'off';
 /*Set the status back to off*/
});