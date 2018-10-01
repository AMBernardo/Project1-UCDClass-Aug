jQuery(document).ready(function(){
$('.dropdown-trigger').dropdown();
$('.sidenav').sidenav();

});




 $.ajax({
    url: ' https://rets.io/api/v2/test/listings?access_token=520a691140619b70d86de598796f13c1',
    type: "GET", /* or type:"GET" or type:"PUT" */
    dataType: "json",
    data: {
    },
    success: function (result) {
        console.log(result);    
    },
    error: function () {
        console.log("error");
    }
});


