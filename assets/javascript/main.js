jQuery(document).ready(function(){
    $('.dropdown-trigger').dropdown();
    $(".sidenav").sidenav();
    $(".tabs").tabs();
    $(".modal").modal();
    $(".parallax").parallax();

});

new Vivus('carpenter-logo', {
    type: 'delayed',
    duration: 200,
    animTimingFunction: Vivus.EASE_OUT
});