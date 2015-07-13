var app = {};
app.server = "https://api.parse.com/1/classes/chatterbox";

app.init = function(){

};

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

// clear messages from the DOM
app.clearMessages = function() {
  $("#chats").empty();
};

// add messages to the DOM
app.addMessage = function(message) {
  var newMessage = "<div class='message'><span class='username'>message.username</span><span class='text'>message.text</span></div>";
  $("#chats").append(newMessage);
};

app.addRoom = function(roomName) {
  $('#roomSelect').append($('<option>', {
    text: roomName
  }));
};