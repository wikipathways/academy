$(document).ready(
function(){
	$('.choices a').click(function(){
	   if($(this).prop('href')){
		$('.explanations').hide();
		$(this).find('span').removeClass('fa-circle-thin');
		if($(this).hasClass('true')){
			$(this).find('span').addClass('correct')
                        $(this).find('span').addClass('fa-check-circle');
			showExplanation('ex1');
			sendSGLActivity($(this).prop('id'));
		} else {
			$(this).find('span').addClass('wrong');
			$(this).find('span').addClass('fa-times-circle');
			showExplanation('ex2');
		}
		$(this).removeAttr('href');
		$(this).addClass('selected');
	  }
	});

function showExplanation(ex){
	$('#'+ex).slideToggle('slow', function() {
		$('html, body').animate({
			'scrollTop': $('#'+ex).offset().top - ($(window).height() - $('#'+ex).offset().top + $('#'+ex).height()*2)
			}, 'fast')
	});
	}

function sendSGLActivity(action){
	console.log(action);	
    if ( window.location !== window.parent.location ) {
	window.wpSGL.submitSGLActivity(action, function(err, response) {
		console.log('SGL submit activity');
	 	if (err) {
			console.log('err');
			console.log(err);
		}
		console.log('response');
		console.log(response);
	
		window.wpSGL.postLeaderboard(1, function(err, response) {
			console.log('SGL post to leaderboard');
			if (err) {
				console.log('err');
				console.log(err);
			}
			console.log('response');
			console.log(response);
		});
	});
    }
	}

});


