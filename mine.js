function generatePage(lk) {
    var data =  lk.bundle[0]
     var a = $('div#post-to');
     
    $("#price").append( '$'+ data.ListPrice);
    $("#beds").append( 'Beds: ' + data.BedroomsTotal)
    $("#baths").append('Full Baths: ' + data.BathroomsFull + '<br>' + ' Half baths: ' + data.BathroomsHalf) 
    $("#sq").append('Sqaure Foot: ' + data.LotSizeSquareFeet)
    nytimes();
 
 
    function nytimes() {
 
 
     var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
     
 
     url += '?' + $.param({
       'api-key': "4adcb5b0a0bd41519b3288ed56b05019",
       'q': data.CountyOrParish ,
       'sort': "newest",
       'page': 5
     });
     $.ajax({
       url: url,
       method: 'GET',
     }).then(function(result) {
       console.log(result);
      
       var numArticles = 5
 
     for (var i = 0; i < numArticles; i++ ){
 
         var article = result.response.docs[i];
 
         var list = $("<ul>");
         list.addClass("list-group");
 
         $(".news").append(list);
 
         var headline = article.headline;
         var articlehead = $("<li>")
 
 
         if (headline && headline.main) {
             console.log(headline.main);
             articlehead.append(
               "<span>" +
             
                 "<strong> " +
                 headline.main +
                 "</strong>" +
                 "</span>" 
             );
           }
              $(list).append(articlehead)
     }
 
     });
 
 
 
     }
 };
 function propertyPage(){
    var URL = ' https://rets.io/api/v2/test/listings?access_token=520a691140619b70d86de598796f13c1' 
    URL += '&' + $.param({
        "ListingKey": "P_5af601c3fc76173b348291e9"
    

    });
    $.ajax({
        url: URL,
        type: "GET", /* or type:"GET" or type:"PUT" */
        dataType: "json",
        data: {
        },
        success: function (result) {
            console.log(result); 
            generatePage(result)
            
        },
        error: function () {
            console.log("error");
        }
     
    });
   

   
       
};
//Map api location data
function newLocation(newLat,newLng)
{
map.setCenter({
lat : newLat,
lng : newLng
});
}



$("#1").on('click', function ()
{
newLocation(37.773972,-122.431297);
});

$("#2").on('click', function ()
{
newLocation(32.715736,-117.161087);
});

$("#3").on('click', function ()
{
newLocation(30.267153, -97.7430608);
})

var map;
function initMap(){
map = new google.maps.Map(document.getElementById('map'), {
center: new google.maps.LatLng(37.773972,-122.431297),
zoom: 11
})
}

//grab this code.....
$('#1').on('click',function (event){
    event.preventDefault();
    $.ajax({
        type: "GET",
        url: "https://rets.io/api/v2/test_sf/listings?access_token=520a691140619b70d86de598796f13c1&limit=100",
        data: "",
        success: function(results) {
            for (var i = 0; i < results.bundle.length; i++) {
                var coords = results.bundle[i].Coordinates;
                var latLng = new google.maps.LatLng(coords[1],coords[0]);
                var info = "<h5>" + "  Address  " + "</h5>" + results.bundle[i].UnparsedAddress + "<br>" + "<br>" +  "<h5>"+"  Listed Price  " + "</h5>"+ results.bundle[i].ListPrice +  "<br>" +   "<br>" +  "<h5>" + "  Square Foot  " + "</h5>" + results.bundle[i].LotSizeSquareFeet + "  Bedrooms  " + results.bundle[i].BedroomsTotal  + "  Full baths  " + results.bundle[i].BathroomsFull + "  Half baths  " + results.bundle[i].BathroomsHalf 
                // var imgurl = results.bundle[1].Media[1].MediaURL;
                var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  customInfo: info
                //   customInfo:"  Address  " + results.bundle[i].UnparsedAddress + "  Listed Price  "+ results.bundle[i].ListPrice + "  Lot size sqft.  " +  results.bundle[i].LotSizeSquareFeet + "  Bedrooms  " + results.bundle[i].BedroomsTotal  + "  Full baths  " + results.bundle[i].BathroomsFull + "  Half baths  " + results.bundle[i].BathroomsHalf 
            });
            google.maps.event.addListener(marker,  'click', function() {
               
                $('#modal1').modal('open'); 
                $("#modal-text").append(this.customInfo)
               
               
            });

        }
}});

$('#2').on('click',function (event){
    event.preventDefault();
    $.ajax({
        type: "GET",
        url: "https://rets.io/api/v2/test_sd/listings?access_token=520a691140619b70d86de598796f13c1&limit=100",
        data: "",
        success: function(results) {
            for (var i = 0; i < results.bundle.length; i++) {
                var coords = results.bundle[i].Coordinates;
                var latLng = new google.maps.LatLng(coords[1],coords[0]);
                var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  customInfo:"  Address  " + results.bundle[i].UnparsedAddress + "  Listed Price  "+ results.bundle[i].ListPrice + "  Lot size sqft.  " +  results.bundle[i].LotSizeSquareFeet + "  Bedrooms  " + results.bundle[i].BedroomsTotal  + "  Full baths  " + results.bundle[i].BathroomsFull + "  Half baths  " + results.bundle[i].BathroomsHalf 
            });
            google.maps.event.addListener(marker, 'click', function() {
                alert(this.customInfo);
            });
        }
}});

$('#3').on('click',function (event){
    event.preventDefault();
    $.ajax({
        type: "GET",
        url: "https://rets.io/api/v2/abor_ref/listings?access_token=520a691140619b70d86de598796f13c1&limit=100",
        data: "",
        success: function(results) {
            for (var i = 0; i < results.bundle.length; i++) {
                var coords = results.bundle[i].Coordinates;
                var latLng = new google.maps.LatLng(coords[1],coords[0]);
                var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  customInfo:"  Address  " + results.bundle[i].UnparsedAddress + $("<br>") + "  Listed Price  "+ results.bundle[i].ListPrice + "  Lot size sqft.  " +  results.bundle[i].LotSizeSquareFeet + "  Bedrooms  " + results.bundle[i].BedroomsTotal  + "  Full baths  " + results.bundle[i].BathroomsFull + "  Half baths  " + results.bundle[i].BathroomsHalf 
            });
            google.maps.event.addListener(marker, 'click', function() {
                $("#modal1").append(this.customInfo)
                // alert(this.customInfo);
            });
        }
}});
});
});
});
$(".modal-close").on('click' , function(){
    $("#modal-text").empty();
})
//end of what you need------------------------------------------------
// end of Map script


