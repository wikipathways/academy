$(document).ready(function(){
	SGLCallback();	
});
		  
function SGLCallback()
{
    if (typeof window.wpSGL == 'undefined') {
       setTimeout( SGLCallback, 1000);
       return;
    }
    sendSGLActivity();
}
		  
function sendSGLActivity(){
	action = ($('.readonly').prop('id'));

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
}

