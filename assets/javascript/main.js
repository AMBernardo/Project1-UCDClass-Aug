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


function nyAjax (){
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "e31a2759eca74b7d93ed0c48fa573df8"
});
$.ajax({
  url: url,
  method: 'GET',
}).then(function(resultNy) {
    result = resultNy.response.docs[0].headline.main
  console.log(result);
  
  if($(".news")) {
    $("#post-to").append(result);
  }
})
};

$(".news").on('click' , function (){
    nyAjax();
    
})

$(".stats").on('click' , function (){
    $("#post-to").append("hello 2");
    
})

$(".card-reveal").on('click' , function() {
    $("#post-to").empty();
    
})

