var app = {};
app.server = "https://api.parse.com/1/classes/chatterbox";

// user object contains references to all of the things about YOU
// the user
app.user = {
  username: "username",
  friends: []
}
// INIT. For currently unknown reasons.
app.init = function(){

};
////////// MANIPULATE MESSAGES ///////////
// send message
app.send = function(message){ 
  // var $outMessage = $(".message");
  // $($outMessage).submit(function(event) {
  //   event.preventDefault();
  // });
  // var $outMessageData = $($outMessage).serialize();
  // debugger;
  // actually post the message with ajax
  $.ajax({
    url: "https://api.parse.com/1/classes/chatterbox",
    type: "POST",
    data: message
  });
};
// view messages
app.fetch = function() {
  $.ajax({
    url: "https://api.parse.com/1/classes/chatterbox",
    type: "GET"
  });
};
//////// ALTERING THE DOM /////////
// clear messages from the DOM
app.clearMessages = function() {
  $("#chats").empty();
};
// add messages to the DOM
app.addMessage = function(message) {
  var newMessage = "<div class='message'><span><button class='username'>" + message.username + "</button></span><span class='text'>" + message.text + "</span></div>";
  $("#chats").append(newMessage);
};
// add rooms to select menu
app.addRoom = function(roomName) {
  $('#roomSelect').append($('<option>', {
    text: roomName
  }));
};
/////// EVENTS METHODS ///////////
// add a friend by clicking their username
app.addFriend = function(friendName) {
  user.friends.push(friendName);
};



//JQUERY
$("document").ready(function() {
  $(".username").on("click", function() {
    app.addFriend(this.text);
  });


}); //end document.ready









