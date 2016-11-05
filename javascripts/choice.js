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
			sendSGLActivity($(this).prop('id');
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
				    'scrollTop': $('#'+ex).offset().top
				    + $('#'+ex).height()
			    }, 'fast')
	});
	}

function sendSGLActivity(action){
	console.log(action);	
	}

});


