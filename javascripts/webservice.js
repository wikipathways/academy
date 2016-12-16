$(document).ready(function(){
  $('#wp-account-button').click( function() {
	var username= $('[name=username]').val();
	var password= $('[name=password]').val();
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
	var username= $('[name=username]').val();
        var wpid= $('[name=wpid]').val();
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
                        	sendSGLActivity('wp-publish');
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

  $('#wp-description-button').click( function() {
	var username= $('[name=username]').val();
        var wpid= $('[name=wpid]').val();
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
                        if(comment.includes('Modified description') && user.includes(username)){
                                showResult('success');
                                sendSGLActivity('wp-description');
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
	var username= $('[name=username]').val();
        var wpid= $('[name=wpid]').val();
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

  $('#wp-edit-pathway-button').click( function() {
	var username= $('[name=username]').val();
        var wpid= $('[name=wpid]').val();
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
                        if(user.includes(username)){
                                showResult('success');
                                sendSGLActivity('wp-edit-pathway');
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

  $('#wp-add-literature-button').click( function() {
        var username= $('[name=username]').val();
        var wpid= $('[name=wpid]').val();
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
                        if(user.includes(username)){
                                showResult('success');
                                sendSGLActivity('wp-add-literature');
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

  $('#wp-tag-delete-button').click( function() {
        var username= $('[name=username]').val();
        var wpid= $('[name=wpid]').val();
        console.log('posting to web service');
        $('.results').hide();
        $.ajax({
                type: 'GET',
                url: 'https://webservice.wikipathways.org/getCurationTags?pwId='+wpid+'&format=xml',
                dataType: 'xml',
                success: function (response) {
                        console.log(response);
                        //var t = $(response).children().text();
                         var comment = $(response).find('ns2\\:name').text();
                         var user = $(response).find('ns2\\:userModified').text();
                        console.log(comment);
                        console.log(user);
                        if(comment.includes('ProposedDeletion') && user.includes(username)){
                                showResult('success');
                                sendSGLActivity('wp-tag-delete');
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
