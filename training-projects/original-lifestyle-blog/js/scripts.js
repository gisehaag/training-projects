
$(document).ready(function(){

    $("#first-carousel").owlCarousel({
        items:3,
        center:true,
        margin:40,
        autoWidth:true,
        dots: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        slideTransition:"ease",
        stagePadding: 50,
    });
    
    $("#second-carousel").owlCarousel({
        items:7,
        dots: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        slideTransition:"ease",
    });
    
  });