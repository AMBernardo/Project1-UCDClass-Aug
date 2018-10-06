jQuery(document).ready(function(){
$('.dropdown-trigger').dropdown();
$(".sidenav").sidenav();
$(".tabs").tabs();
$('.parallax').parallax();
$('.slider').slider({full_width: true});
$('.carousel-slider').slider({full_width: true});

$('.carousel').carousel();
// setInterval (function(){
//     $('.carousel').carousel('next');
// }, 2000);
//autoplay function for carousel

});

$('.carousel.carousel-slider').carousel({
    fullWidth: true
    });