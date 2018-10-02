jQuery(document).ready(function(){
    $('.dropdown-trigger').dropdown();
    $('.sidenav').sidenav();
    
    });
    
    $('#submit').on('click', function(event) {
        event.preventDefault()
       
        var URL =  ' https://rets.io/api/v2/test/listings?access_token=520a691140619b70d86de598796f13c1&limit=9' 
        URL += '&' + $.param({
            'near': $('#city').val(),
            
        });
        $.ajax({
            url: URL,
            type: "GET", /* or type:"GET" or type:"PUT" */
            dataType: "json",
            data: {
            },
            success: function (result) {
                console.log(result)  
            },
            error: function () {
                console.log("error");
            }
        });
    });
    