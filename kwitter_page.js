//YOUR FIREBASE LINKS
var firebaseConfig = {
    apiKey: "AIzaSyBhKpLBqVTbBQJe_mwBAmlRJnZ5JYV233k",
    authDomain: "kwitterapp-69e28.firebaseapp.com",
    databaseURL: "https://kwitterapp-69e28-default-rtdb.firebaseio.com",
    projectId: "kwitterapp-69e28",
    storageBucket: "kwitterapp-69e28.appspot.com",
    messagingSenderId: "666068006523",
    appId: "1:666068006523:web:044a9c054b6d02170c54de"
  };
  
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 user_name = localStorage.getItem("user_name");
 room_name = localStorage.getItem("room_name");
 function send()
{
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
          name:user_name,
          messege:msg,
          like:0
    });

    document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;
//Start code
    console.log(firebase_message_id);
    console.log(message_data);
    name = message_data['name'];
    like = message_data['like'];
    messege = message_data['messege'];
    name_with_tag = "<h4>" + name + "<img class='user_tick' src ='tick.png'></h4>";
    messege_with_tag = "<h4 class = 'message_h4'>" + messege + "</h4>";
    like_button = "<button class= 'btn btn-success' id=" + firebase_message_id + "value="+like+"onclick = 'updateLike(this.id)'>"
    span_with_tag = "<span class = 'glyphicon glyphicon-thumbs-up'> Like: " +like+ "</span> </button> <hr>";

    row = name_with_tag + messege_with_tag + like_button + span_with_tag;
    document.getElementById("output").innerHTML += row;
//End code
    } });  }); }
getData();

function updateLike(messege_id)
{
    console.log("messege_id");
    button_id = messege_id;
    like = document.getElementById(button_id).value;
    updated_like = Number(likes) + 1;
    console.log(updated_like);

    firebase.database().ref(room_name).child(messege_id).update({
          like : updated_like
    });
}

function logout()
{
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("kwitter_page.html");
}



