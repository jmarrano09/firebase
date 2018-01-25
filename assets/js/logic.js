var config = {
    apiKey: "AIzaSyCfp937WrHinQ_H1tf0PBM3-la8duQmsUQ",
    authDomain: "test-project-59866.firebaseapp.com",
    databaseURL: "https://test-project-59866.firebaseio.com",
    projectId: "test-project-59866",
    storageBucket: "test-project-59866.appspot.com",
    messagingSenderId: "766361558341"
  };
  
  firebase.initializeApp(config);
  const database = firebase.database().ref('employees');

  function Employee(name,role,start,rate,addedDate){ //employee constructor
    this.name=name;
    this.role=role;
    this.start=start;
    this.rate=rate;
    this.addedDate=addedDate;
  }

  $('#main-form').on('submit', function(event){
    console.log('fired');
    event.preventDefault();
    
    newEmployee = new Employee(
        $('#employee-name').val(),
        $('#employee-role').val(),
        $('#start-date').val(),
        $('#rate').val(),
        firebase.database.ServerValue.TIMESTAMP
      );
    database.push(newEmployee);
  });


  database.orderByChild('dateAdded').limitToLast(4).on("child_added", function(snapshot) {

    // Log everything that's coming out of snapshot

    console.log(snapshot.val());

    $("#recent-employees").append(createTableRow(snapshot.val()));

}, function(err) {

    // Handle errors

    console.log("Error: ", err.code);

});
  
  $(document).ready(function(){

  })
  

  function createTableRow(employee) {

    // create a div displaying user infor

    const uDiv = $('<tr>').addClass('well');
    var worked = -moment(employee.start, "MM/DD/YYYY").diff(moment(), "months");
    uDiv.append($('<td>').text(employee.name))
        .append($('<td>').text(employee.role))
        .append($('<td>').text(employee.start))
        .append($('<td>').text(worked))
        .append($('<td>').text(employee.rate))
        .append($('<td>').text(worked*employee.rate));

    

    return uDiv;

}