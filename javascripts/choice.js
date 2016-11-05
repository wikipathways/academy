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
		} else {
			$(this).find('span').addClass('wrong');
			$(this).find('span').addClass('fa-times-circle');
			showExplanation('ex2');
		}
		$(this).removeAttr('href');
		$(this).addClass('selected');
	  }
	});

function showExplanation(a){
	$('#'+a).slideToggle('slow', function() {
			    $('html, body').animate({
				    'scrollTop': $('#'+a).offset().top
				    + $('#'+a).height()
			    }, 'fast')
	});
	}

});


