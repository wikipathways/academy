$(document).ready(function(){
  $('button').click( function() {
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
});
