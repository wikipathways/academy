$(document).ready(function(){
  $('#wp-account-button').click( function() {
	var form = document.getElementById('wp-account');
	var username= form.getElementsByTagName('input').username.value;
	var password= form.getElementsByTagName('input').password.value;
	console.log('posting to web service');
	$('.results').hide();
	$.ajax({
		type: 'GET',
		url: 'https://webservice.wikipathways.org/login?name='+username+'&pass='+password+'&format=xml',
		dataType: 'xml',
		success: function (response) {
			console.log(response);
			showResult('success');
			sendSGLActivity('wp-account');
		//	var t = $(response).children().text();
		//	console.log(t);
		},
		error: function (error) {
			console.log(error);
			showResult('error');
		}
	});
  });

  $('#wp-publish-button').click( function() {
        var form = document.getElementById('wp-publish');
        var username= form.getElementsByTagName('input').username.value;
        var wpid= form.getElementsByTagName('input').wpid.value;
        console.log('posting to web service');
        $('.results').hide();
	var timestamp = getAnHourAgo();
        $.ajax({
                type: 'GET',
                url: 'https://webservice.wikipathways.org/getPathwayHistory?pwId='+wpid+'&timestamp='+timestamp+'&format=xml', 
                dataType: 'xml',
                success: function (response) {
                        console.log(response);
                        //var t = $(response).children().text();
                         var comment = $(response).find('ns2\\:comment').text();
                         var user = $(response).find('ns2\\:user').text();
                        console.log(comment);
                        console.log(user);
			if(comment.includes('New pathway') && user.includes(username)){
				showResult('success');
                        	sendSGLActivity('wp-add-ontology');
			} else {
				showResult('error');
			}
                },
                error: function (error) {
                        console.log(error);
                        showResult('error');
                }
        });
  });


  $('#wp-add-ontology-button').click( function() {
        var form = document.getElementById('wp-add-ontology');
        var username= form.getElementsByTagName('input').username.value;
        var wpid= form.getElementsByTagName('input').wpid.value;
	console.log('posting to web service');
	$('.results').hide();
	var timestamp = getAnHourAgo();
	console.log(timestamp);
	$.ajax({
		type: 'GET',
		url: 'https://webservice.wikipathways.org/getPathwayHistory?pwId='+wpid+'&timestamp='+timestamp+'&format=xml',
		dataType: 'xml',
		success: function (response) {
			console.log(response);
			//var t = $(response).children().text();
			 var comment = $(response).find('ns2\\:comment').text(); 
			 var user = $(response).find('ns2\\:user').text();
			console.log(comment);
			console.log(user);
                        if(comment.includes('Ontology Term') && user.includes(username)){
                                showResult('success');
                                sendSGLActivity('wp-add-ontology');
                        } else {
                                showResult('error');
                        }
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
