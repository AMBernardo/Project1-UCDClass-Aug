 $("#submit").on("click", function(event) {
      event.preventDefault();
      var location = $("#locationname").val().trim();
      console.log(location);
      localStorage.clear();
      localStorage.setItem("location1", location);
  
    });
