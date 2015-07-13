var app = {};

app.init = function(){

};

app.send = function(message){ 
  var $outMessage = $(".message");
  $($outMessage).submit(function(event) {
    event.preventDefault();
  });
  var $outMessageData = $($outMessage).serialize();
  debugger;
  // actually post the message with ajax
  $.ajax({
    url: "https://api.parse.com/1/classes/chatterbox",
    type: "POST",
    data: $outMessageData
  });
};



// view messages

// select a username and input messages

// refresh (auto or with a button)

//


