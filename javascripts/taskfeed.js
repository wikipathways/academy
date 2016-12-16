$(document).ready(function(){
	count = 0;
	nextlist = [];
	loadPathways();

	$('#next-pathway-button').click( function() {
        	count++;
        	console.log(count);
    		if (count == nextlist.length){
				$('#next-pathway').html("Loading next pathway...");
        		loadPathways();
                	count = 0;
        	}else {
			showNext();
		}
	});		


  function showNext(){
	var wpid = nextlist[count];
	$('#next-pathway').html("Loading next pathway...");
	$('[name=wpid]').val(wpid); 
	$.ajax({
		type: 'GET',
		url: 'https://webservice.wikipathways.org/getPathwayAs?fileType=png&pwId='+wpid+'&revision=0',
		dataType: 'text',
		success: function (data) {
			//console.log(data);
			var png = $(data).find('ns1\\:data').text();
			$('#next-pathway').html('<a href="http://wikipathways.org/index.php/Pathway:'+wpid+
				'"target="_blank"><img width="600px" src="data:image/png;base64,'+png+'" />');
		},
                error: function (error) {
                        console.log(error);
                }
        });
  }	

	  
  function loadPathways(){
	var tag= $('[name=tag]').val();
	console.log(tag);
	nextlist = [];
	$.ajax({
		type: 'GET',
		url: 'https://webservice.wikipathways.org/getCurationTagsByName?tagName='+tag+'&format=json',
		dataType: 'json',
		success: function (response) {
			var randomArray = getRandomArray(0,response.tags.length);
			for (x=0;x<10;x++){
				nextlist.push(response.tags[randomArray[x]].pathway.id);
			}
			console.log(nextlist);
			showNext();
		},
        	error: function (error) {
        		console.log(error);
        	}
	});
  }				
    
function getRandomArray(min, max) {
  var min = Math.ceil(min);
  var max = Math.floor(max);
  var arr = [];
  while (arr.length <10) {
	var r = Math.floor(Math.random() * (max - min)) + min;
        if (arr.indexOf(r) > -1) continue;
	arr.push(r);
  }
  return arr;
}
	

  $('#task-description-button').click( function() {
        var wpid= $('[name=wpid]').val();
        console.log('verifying '+wpid);
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
                        console.log(comment);
                        if(comment.includes('Modified description') ){
                                showResult('success');
                                sendSGLActivity('task-description');
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
