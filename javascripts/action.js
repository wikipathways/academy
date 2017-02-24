$(document).ready(function(){
	SGLCallback();	
});
		  
function SGLCallback()
{
    if (!$.isFunction(window.wpSGL.submitSGLActivity)) {
       setTimeout( SGLCallback, 1000);
       return;
    }
    sendSGLActivity();
}
		  
function sendSGLActivity(){
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
}

