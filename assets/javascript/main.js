// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBQbcpF1y8EsXB7QcHATxmmuA79ovFpQSE",
    authDomain: "the-andy-project.firebaseapp.com",
    databaseURL: "https://the-andy-project.firebaseio.com",
    projectId: "the-andy-project",
    storageBucket: "the-andy-project.appspot.com",
    messagingSenderId: "1048328368318"
  };

  firebase.initializeApp(config);

  var firebaseData = firebase.database();

firebaseData.ref().on("child_added", function(childSnapshot, prevChildKey) {
    
        var trainName2 = childSnapshot.val().name;
        var destination2 = childSnapshot.val().destination;
        var firstTrainTime2 = childSnapshot.val().firstTrain;
        var frequency2 = childSnapshot.val().frequency;
    
        var timeDifference = moment().diff(moment.unix(firstTrainTime2), "minutes");
        var remainingTime = moment().diff(moment.unix(firstTrainTime2), "minutes") % frequency2;
        var minutes = frequency2 - remainingTime;
    
        var arrivalTime = moment().add(minutes, "m").format("hh:mm A");
    
      $("tbody").append("<tr><td>" + trainName2 + "</td><td>" + destination2 + "</td><td>" + frequency2 + "</td><td>" + arrivalTime + "</td><td>" + minutes + "</td></tr>");
    
    
      });
    

  $("#addTrain").on("click", function() {
    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequency").val().trim();

    var newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrainTime,
      frequency: frequency
    }

// Pushes train schedule data to Firebase

    firebaseData.ref().push(newTrain);

// Clears the input fields once data is pushed

    $("#trainName").val("");
    $("#destination").val("");
    $("#trainTimeInput").val("");
    $("#frequency").val("");

    return false;

  });


