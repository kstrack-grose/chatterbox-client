var app = {};
app.server = "https://api.parse.com/1/classes/chatterbox";

// user object contains references to all of the things about YOU
// the user
app.user = {
  username: "username",
  friends: [],
  currentRoom: ''
}
// INIT. For currently unknown reasons.
app.init = function(){
  app.addRoom("lobby");
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
  return $.ajax({
    url: "https://api.parse.com/1/classes/chatterbox",
    type: "GET",
    success: function(data) {
      var allMessages = data.results;
      for(var i = 0; i < allMessages.length; i++){
        console.log(allMessages[i]);
        var currMessage = JSON.stringify(allMessages[i]);
        app.addMessage(currMessage);
      }
      // console.log('message retrieved:' + data.results);
    },
    error: function(data) {
      console.error('chatterbox: failed to retrieve messages');
    }
  });

};

//////// ALTERING THE DOM /////////
// clear messages from the DOM
app.clearMessages = function() {
  $("#chats").empty();
};
// add messages to the DOM
app.addMessage = function(message) {
  var messageObject = JSON.parse(message);
  var room = messageObject.roomname;
  debugger;
  if (room === app.user.currentRoom) {
    var text = JSON.stringify(messageObject.text);
    var username = JSON.stringify(messageObject.username);
    var newMessage = "<div class='message'><span class='clickMe'><button class='username'>" + username + "</button></span><span class='text'>" + text + "</span></div>";
    $("#chats").append(newMessage);    
  }
};
// add rooms to select menu
app.addRoom = function(roomName) {
  //find old selected room
    //unselect it
  $('#roomSelect').find('option').removeAttr('selected');

  $('#roomSelect').append($('<option>', {
    text: roomName,
    selected: true
  }));
  app.user.currentRoom = roomName;
};
/////// EVENTS METHODS ///////////
// add a friend by clicking their username
app.addFriend = function(friendName) {
  app.user.friends.push(friendName);
};

app.handleSubmit = function(text){
  //get username
  // var username = $.ajax({
  //   url: "/username",
  //   type: "GET",
  //   data: username
  // });
  var username = "HR30";
  //get room
  var room = "lobby";
  //compose message
  var message = {
    'username': username,
    'text': text,
    'room': room
  };
  app.addMessage(message);
};

//JQUERY

$(document).ready(function() {

  app.init();
//  app.addMessage("{username: "jk", text: "helloworld", room: "lobby"}");

  $("#main").click(".username", function() {
    app.addFriend($(".username").text());
  });

  $('#send .submit').on("click", function(event) {
    event.preventDefault();
    var messageData = $("#message").serialize();
//    var text = messageData.slice(8);
    $('#message').value = '';
    app.handleSubmit(text);
  });

  $("button").click(".update", function() {
    //introduce something to refresh the page, getting info from the API
    app.fetch();
  });

}); //end document.ready









