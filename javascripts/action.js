$(document).ready(
setTimeout(function(){
	action = ($('.action').prop('id'));

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
	  });
  }
}, 3000); );
