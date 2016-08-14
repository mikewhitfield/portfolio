	//Call JSON 
	$.getJSON("location.json",function(results){
	   
	   //reference t as the JSON list
		var t = results.d;
		
		//loop through JSON items
		$.each(t, function (index,location){
		    
			//what the user entered
			user_context = $('input.retrun_search').val().trim().toLowerCase();
			
			//zipcode match - case insensitive
			var json_zip = location.zip.trim().toLowerCase();
			
			//city match - case insensitive
			var json_city = location.city.trim().toLowerCase();
			
			//address match - case insensitive
			var json_addr = location.address;
			
			//alert(j_addr);
			
			loca = location.address[0].trim().toLowerCase().replace(/,/g, "");
			//alert(loca)
			
			$.each(json_addr, function( key, value ) {
					
			    //console.log( key + ": " + value );
			  
			    //look in the array and find the searched subtext
				if ($.inArray(user_context, json_addr) > -1) {
						//alert("p");
						// Center market at the Long lat coords
						var pLoc = new google.maps.LatLng(location.Latitude,location.Longitude);
					  
					    //set the marker if there is a match
						marker = new google.maps.Marker({
						  position: pLoc, 
						  map: map, 
						  title:location.Title,
						  icon: location.icon,
						  locat:location.address[0]	
						});									
						
						//get market title
						var tw = marker.title;
						
						//5-15-2014
						var locatt = marker.locat;
						
						//click event for the map marker for address
						google.maps.event.addListener(marker, 'click', function(event){

						//send facility value to continue button
						/*
						 $('.xrow').each(function(){
							if(!$(this).hasClass('hidden')) {
								var f = $(this).attr('id');
								alert(f);
								$('input.fac_named').val(f);
							 }
						 })
						 */
						 
						
							//take location and replace 'array' wording
							showLocation(locatt);
							
							$('div.xrow').each(function(){
							
							    //get the id of the 
								xrowId = $(this).attr('id');
								
								//console.log(tw + xrowId);
								
								console.log(xrowId);
								console.log($(this).parent().attr('id'));
								
								//Match row id with marker title
								if(tw == xrowId) {
									//alert(tw + ' matched ' + xrowId);
									if( $(this).parent().attr('id') == 'list-view' ){
										$('div#list-view').removeClass('hidden');
									}
									$(this).removeClass('hidden').siblings('.xrow').addClass('hidden');						
								}
							});	
							
						
						 //Button go back to normal 
						 $('.sel_btn').removeClass('hidden'); 
						 $('.loc_btn').addClass('hidden');
						 $('.cont_btn').attr('disabled',true);
						});					
				
				}
			});
			
			//if the user infromation is matching with the addtess or city or zip...
			if ( user_context == json_addr || user_context == json_city || user_context == json_zip) {				
			  
			  // Center market at the Long lat coords
			  var pLoc = new google.maps.LatLng(location.Latitude,location.Longitude);
			    
				//set the marker if there is a match
				marker = new google.maps.Marker({
				  position: pLoc, 
				  map: map, 
				  title:location.Title,
				  icon: location.icon,
				  locat:location.address[0]				  
				});									
				
				//get market title
				var tw = marker.title;
				var locatt = marker.locat;
				
				//click event for the map marker
				google.maps.event.addListener(marker, 'click', function(event){
				
				  
					//map directions
					//calculateRoute([40.483100,-89.017197], [41.886963,-87.623415]);
					//calculateRoute([Chicago, IL],[Bloomington, IL]);
					
					//take location and replace 'array' wording
					showLocation(locatt);				
					
					$('div.xrow').each(function(){
							//get the id of the 
							xrowId = $(this).attr('id');
							
							//console.log(xrowId);
							//console.log($(this).parent().attr('id'));
							
							//Match row id with marker title
							if(tw == xrowId) {
							//alert(tw + ' matched ' + xrowId);
								if( $(this).parent().attr('id') == 'list-view' ){
								//alert($(this).parent().attr('id') + ' paernt is list-view');
									$('div#list-view').removeClass('hidden');
								}
								$(this).removeClass('hidden').siblings('.xrow').addClass('hidden');						
							}
					});	
				});
				
				// Auto pop
				if ($('input.retrun_search').val() == "3 Wood Rd") {
					$('div.xrow').each(function(){
						xrowId = $(this).attr('id');
						//console.log(xrowId);
						//console.log($(this).parent().attr('id'));
						
						if(tw == xrowId) {
							if( $(this).parent().attr('id') == 'list-view' ){
								$('div#list-view').removeClass('hidden');
							}
							$(this).removeClass('hidden').siblings('.xrow').addClass('hidden');						
						}
					});	
				}					
				
				/* Cab 3 
				attachSecretMessage(marker);
				
				function attachSecretMessage(marker) {
					//marker.setIcon("markeryes.png"); 
				  var message = '<div class="showFacility">'+ tw + '</div>';
				  var infowindow = new google.maps.InfoWindow({
					content: message
				  });
				  
				  google.maps.event.addListener(marker, 'mouseover', function() {
					infowindow.open(marker.get('map'), marker);
				  });
				}	
				Cab 3  */		
				
			}

		});
		
		marker.setMap(map);

	});
}

google.maps.event.addDomListener(window, 'load', initialize);