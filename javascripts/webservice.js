$(document).ready(function(){
  $('#wp-account-button').click( function() {
	var form = document.getElementById('wp-account');
	var username= form.getElementsByTagName('input').username.value;
	var password= form.getElementsByTagName('input').password.value;
	console.log('posting to web service');
	$('.results').hide();
	$.ajax({
		type: 'GET',
		url: 'http://webservice.wikipathways.org/login?name='+username+'&pass='+password+'&format=xml',
		dataType: 'xml',
		success: function (response) {
			console.log(response);
			showResult('success');
			sendSGLActivity('wikipathways-101');
		//	var t = $(response).children().text();
		//	console.log(t);
		},
		error: function (error) {
			console.log(error);
			showResult('error');
		}
	});
  });
  $('#wp-add-ontology-button').click( function() {
	console.log('posting to web service');
	$('.results').hide();
	var timestamp = getAnHourAgo();
	console.log(timestamp);
	$.ajax({
		type: 'GET',
		url: 'http://webservice.wikipathways.org/getPathwayHistory?pwId=WP4&timestamp='+timestamp+'&format=xml',
		dataType: 'xml',
		success: function (response) {
			console.log(response);
			//var t = $(response).children().text();
			 var tag = $(response).find('ns2\\:comment').text(); 
			 var user = $(response).find('ns2\\:user').text();
			console.log(tag);
			console.log(user);
			showResult('success');
			sendSGLActivity('wikipathways-103');
		},
		error: function (error) {
			console.log(error);
			showResult('error');
		}
	});
  });

  function showResult(result){
		$('#'+result).slideToggle('slow', function(){
			$('html, body').animate({
				'scrollTop': $('#'+result).offset().top - ($(window).height() - $('#'+result).offset().top + $('#'+result).height()*2)
			}, 'fast')
		});

  }

  function sendSGLActivity(action){
	  console.log(action);

  }
  
  function getAnHourAgo(){
	var d = new Date(Date.now());
	var YYYY = d.getFullYear();
	var MM = forceDoubleDigit(d.getMonth()) + 1; //only month is zero-based 
	var DD = forceDoubleDigit(d.getDate());
	var hh = d.getHours();
		if(hh>0){
			forceDoubleDigit(hh-1); // an hour ago
		} else {
			hh = '23'; //an hour ago, yesterday
			DD = forceDoubleDigit(DD-1); // I think '00' day actually works in wp webservice...
		}
	var mm = forceDoubleDigit(d.getMinutes());
        var ss = forceDoubleDigit(d.getSeconds());
	return(""+YYYY+MM+DD+hh+mm+ss);	
  }
  function forceDoubleDigit(x){
	if(x<10)
		x='0'+x;
	return(x);
  }

});
