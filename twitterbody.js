$(document).ready(function(){
  var index=0;
  var list=streams.home;
  var user= userName();
  var location= $("#location a").text();
  index=update(index,list);


//CLICKING USERNAME
$("#user").on("click", "a",function(){
  $("body .tweet").show();
  $("#location a").text("home");
  $(".notifier").remove();
  $(".newsfeed .container").empty();

  index=0;
  list=streams.home;
  index = update(index,list);
});

//deletes notifier button, updates newsfeed
  $("#newsfeed").on("click", ".notifier",function(){
    $(this).remove();
    index=update(index,list);
  });  
 
//allows user to tweet
  $(".tweet .button").unbind('click');

  $(".tweet .button").on("click", function(){
    var text = $('textarea#message').val();     
    var message = $('<div class="message"></div>');    
    message.text(text);

    var owner = $('<div class="user"></div>');
    owner.text('@'+ user);
    var created = $('<div class="created"></div>');
    var dateCreated = new Date();  

    created.text(new Date());        

    $(".newsfeed .container").prepend(message);
    $(".newsfeed .container").prepend(owner);
    $(".newsfeed .container").prepend(created);

    $('textarea#message').val('');
  });

//clicking on username
  $("body").on("click", ".user a",function(){
    index=0;;
    var specificUser=$(this).text().slice(1);
    list= streams.users[specificUser];
    $(".newsfeed .container").empty();
    update(index,list);
    $(".notifier").remove();
    $("#location a").text(specificUser);
    $("body .tweet").hide();
  });

//refreshes window ever 5 seconds
  window.setInterval(function(){
    notify(index,list);
  }, 5000);  

//determines username
  function userName(){
    return $("#user a").text();
  }


  //streams.home is an array of all tweets from users you're follwing
  //streams.users is an objects with properties for each user.  streams.users.shawndrost has all of shawndrost tweets


  function update(index,list){
    while (index < (list.length)){

      var tweet= list[index]; 

      var message = $('<div class="message"></div>');    
      message.text(tweet.message);

      var user = $('<div class="user"></div>');
      user.text('@'+ tweet.user); 
      user.html('<a href="#">@' + tweet.user + '</a>');

      var created = $('<div class="created"></div>');
      created.text(tweet.created_at);      

      $(".newsfeed .container").prepend(message);
      $(".newsfeed .container").prepend(user);
      $(".newsfeed .container").prepend(created);

      index++;
    };
    return index;
  };

//makes notify button
  function notify(index,list){
    if (($("#location a").text()) === "home"){
      if(index<(list.length-1)){
        $(".notifier").remove();
        var notification = $('<button type="submit" class="notifier"></button>');
        notification.text((list.length - index -1) + " New Tweets");
        $(".newsfeed").before(notification);
      };
    };
  };


});