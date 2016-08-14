/* =========================================================
 
=========================================================== */
//featured-item	

$('.project').find('a').on('click', function(e){
	//load html from link into #feature div
	var feature_load = $(this).attr('title');
			
	$('#featured-item').load(feature_load );
	
	e.preventDefault();	
});
     


/* =========================================================
  Map
=========================================================== */

function initialize() {
	//Call JSON 
	$.getJSON("http://imwhit.com/js/locat.json",function(results){
	   
	   //reference t as the JSON list
		var t = results.d;
		
		//loop through JSON items
		$.each(t, function (index,location){
		  	
		  	var latLng = new google.maps.LatLng(location.lat, location.lng); 
		  	
		     	//set the marker if there is a match
			marker = new google.maps.Marker({
			  position: latLng, 
			  map: map, 
			  title:location.Title,
			  icon: location.icon,	
			});									
			

			marker.setMap(map);

		});
	});
	
	var mapProp = {
		  center:new google.maps.LatLng(40.478165,-88.954401),
		  zoom:14,
		  mapTypeId:google.maps.MapTypeId.ROADMAP
	  };
	  	
	var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

google.maps.event.addDomListener(window, 'load', initialize);


/* =========================================================
  MObile Menu
=========================================================== */

$(document).ready(function(){
	$('nav a.mobile_menu').on('click', function(){
		var currentNavheight = $('nav').height();
		
		if(currentNavheight < 20) {
			var  newNavheight = $('nav div  ul ').height() + 15;
			$('nav').animate({'height' : newNavheight + 'px'}, 750)
		}else {
			$('nav').animate({'height' : '15px'}, 750, function(){
				$(this).removeAttr('style');
			});
		}
	});
	
	$(window).resize(function(){
		
		 if(  $(this).width() > 625 ){
			 $('nav').removeAttr('style');
		 }
	});

});

/* =========================================================
  Sticky Menu
=========================================================== */


$(function(){
        var stickyRibbonTop = $('.nav-header').offset().top;
          
        $(window).scroll(function(){
                if( $(window).scrollTop() > stickyRibbonTop ) {
                        $('.nav-header').css({position: 'fixed', top: '0px'}).css({zIndex: '1'}).css({paddingBottom: '15px'}).css({width: '100%'});
                } else {
                        $('.nav-header').css({position: 'static', top: '0px'});
                }
        });
});


/* =========================================================
  scroll motion
=========================================================== */
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

		








	
		
		