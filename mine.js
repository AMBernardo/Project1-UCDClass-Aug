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