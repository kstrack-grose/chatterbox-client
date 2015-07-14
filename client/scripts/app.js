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
  return $.ajax({
    url: "https://api.parse.com/1/classes/chatterbox",
    type: "GET",
    success: function(data) {
      var allMessages = data.results;
      for(var i = 0; i < allMessages.length; i++){
        app.addMessage(allMessages[i]);
      }
      // console.log('message retrieved:' + data.results);
    },
    error: function(data) {
      console.error('chatterbox: failed to retrieve messages');
    }
  });


/*$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
});
  */
};
//////// ALTERING THE DOM /////////
// clear messages from the DOM
app.clearMessages = function() {
  $("#chats").empty();
};
// add messages to the DOM
app.addMessage = function(message) {
  var newMessage = "<div class='message'><span class='clickMe'><button class='username'>" + message.username + "</button></span><span class='text'>" + message.text + "</span></div>";
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
  app.user.friends.push(friendName);
};

app.handleSubmit = function(text){
  //get username
  // var username = $.ajax({
  //   url: "/username",
  //   type: "GET",
  //   data: username
  // });
  // debugger;
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

  app.addRoom("lobby");
  app.addMessage({username: "jk", text: "helloworld", room: "lobby"});

  $("#main").click(".username", function() {
    app.addFriend($(".username").text());
  });

  $('#send .submit').on("click", function(event) {
    event.preventDefault();
    var messageData = $("#message").serialize();
    var text = messageData.slice(8);
    app.handleSubmit(text);
  });

  $("button.update").click(function() {
    //introduce something to refresh the page, getting info from the API
  });

}); //end document.ready









