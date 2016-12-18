$(document).ready(function(){
	count = 0;
	total = 0;
	nextlist = {};
	loadPathways();

	$('#next-pathway-button').click( function() {
        	count++;
        	//console.log(count);
		$('#pathway-info').html('');
		$('.results').hide();
    		if (count == Object.keys(nextlist).length){
				$('#next-pathway').html("Loading next pathway...");
        		loadPathways();
                	count = 0;
        	}else {
			showNext();
		}
	});		


  function showNext(){
	var wpid = nextlist[count].id;
	if(!wpid.includes("WP")){console.log('Invalid wpid: '+wpid); return;}
	$('#next-pathway').html("Loading next pathway...");
	$('[name=wpid]').val(wpid); 
	$.ajax({
		type: 'GET',
		url: 'https://webservice.wikipathways.org/getPathwayAs?fileType=png&pwId='+wpid+'&revision=0',
		dataType: 'text',
		success: function (data) {
			//console.log(data);
			var png = $(data).find('ns1\\:data').text();
			$('#next-pathway').html('<a href="'+nextlist[count].url+
				'"target="_blank"><img width="600px" src="data:image/png;base64,'+png+'" />');
			$('#pathway-info').html('Title: <a href="'+nextlist[count].url+
						'"target="_blank"><b>'+nextlist[count].name+
						'</b></a> ('+nextlist[count].id+')'+
						'<br />Species: '+nextlist[count].species+
						'<br /><br />');
						
		},
                error: function (error) {
                        console.log(error);
                }
        });
  }	

	  
  function loadPathways(){
	var tag= $('[name=tag]').val();
	console.log(tag);
	nextlist = {};
	$.ajax({
		type: 'GET',
		url: 'https://webservice.wikipathways.org/getCurationTagsByName?tagName='+tag+'&format=json',
		dataType: 'json',
		success: function (response) {
			console.log(response);
			total = response.tags.length;
			if(total==0){
				taskComplete();
			} else if (tag=="Curation:AnalysisCollection" || tag =="Curation:FeaturedPathway"){
				var z=0;
				for (x=0;x<total;x++){
					if (response.tags[x].revision!=response.tags[x].pathway.revision
					   && z<10){
						nextlist[z] = response.tags[x].pathway;
						z++;
					   }
				}
                        	console.log(nextlist);
				total = Object.keys(nextlist).length;
                        	if (total==0){
                                	taskComplete();
                                	return;
                        	} else {
				 	updateFooter(total);
					showNext();
				}						
			}else {
				updateFooter(total);
				var y = 10;
				if(total<y){y = total;}
				var selectionArray = getRandomArray(0,total,y);
				for (x=0;x<y;x++){
					nextlist[x] = response.tags[selectionArray[x]].pathway;
				}
				console.log(nextlist);
				showNext();
			}
		},
        	error: function (error) {
        		console.log(error);
        	}
	});
  }				

  function taskComplete(){
	$('#next-pathway').html('This task is complete! Please try another task.');
        $('#next-pathway-button').prop('disabled',true);
        $('[name=wpid]').val('');
    }

  function getRandomArray(min, max, num) {
    var min = Math.ceil(min);
    var max = Math.floor(max);
    var arr = [];
    while (arr.length < num) {
	var r = Math.floor(Math.random() * (max - min)) + min;
        if (arr.indexOf(r) > -1) continue;
	arr.push(r);
    }
    return arr;
  }


/**
  $('#task-verify-cleared-button').click( function() {
        var wpid= $('[name=wpid]').val();
	if(!wpid.includes("WP")){console.log('Invalid wpid: '+wpid); return;}
        var sglactivity= $('[name=sgl]').val();
	var tag= $('[name=tag]').val();
        console.log('verifying '+wpid);
        $('.results').hide();
	showResult('checking');
        $.ajax({
                type: 'GET',
                url: 'https://webservice.wikipathways.org/getCurationTagsByName?tagName='+tag+'&format=json',
                dataType: 'json',
                success: function (response) {
			var alllist = [];
                        for (x=0;x<response.tags.length;x++){
                                alllist.push(response.tags[x].pathway.id);
                        }
                        //console.log(alllist);
			$('.results').hide();
                        if(!alllist.includes(wpid) ){
                                showResult('success');
				updateFooter(--total);
                                sendSGLActivity(sglactivity);
                        } else {
                                showResult('error');
                        }
                },
                error: function (error) {
                        console.log(error);
                }
        });
  });	
*/

  $('#task-verify-description-button').click( function() {
	  verifyComment("Modified description");
  });

  $('#task-verify-title-button').click( function() {
          verifyComment("Modified title");
  });

  $('#task-verify-ontology-button').click( function() {
          verifyComment("Ontology Term : ");
  });

  $('#task-verify-reversion-button').click( function() {
          verifyComment("Reverted to version ");
  });

  $('#task-verify-tag-tutorial-button').click( function() {
          verifyTag("Curation:Tutorial", "added");
  });

  $('#task-verify-tag-deletion-button').click( function() {
          verifyTag("Curation:ProposedDeletion", "added");
  });

  $('#task-verify-tag-curated-button').click( function() {
          verifyTag("Curation:AnalysisCollection", "added");
  });

  $('#task-verify-tag-featured-button').click( function() {
          verifyTag("Curation:FeaturedPathway", "added");
  });

  $('#task-verify-tag-underconstruction-button').click( function() {
          verifyTag("Curation:UnderConstruction", "added");
  });

  $('#task-verify-tag-needswork-button').click( function() {
          verifyTag("Curation:NeedsWork", "added");
  });

  $('#task-verify-tag-stub-button').click( function() {
          verifyTag("Curation:Stub", "added");
  });

  $('#task-verify-untag-unconnected-button').click( function() {
          verifyTag("Curation:NoInteractions", "removed");
  });

 
  function verifyComment(commenttext){
        var wpid= $('[name=wpid]').val();
	if(!wpid.includes("WP")){console.log('Invalid wpid: '+wpid); return;}
	var sglactivity= $('[name=sgl]').val();
        console.log('verifying '+wpid);
	$('.results').hide();
        var timestamp = getAnHourAgo();
        //console.log(timestamp);
        $.ajax({
                type: 'GET',
                url: 'https://webservice.wikipathways.org/getPathwayHistory?pwId='+wpid+'&timestamp='+timestamp+'&format=xml',
                dataType: 'xml',
                success: function (response) {
                        //console.log(response);
                        //var t = $(response).children().text();
                         var comment = $(response).find('ns2\\:comment').text();
                        console.log(comment);
                        if(comment.includes(commenttext) ){
                                showResult('success');
				updateFooter(--total);
                                sendSGLActivity(sglactivity);
                        } else {
                                showResult('error');
                        }
                },
                error: function (error) {
                        console.log(error);
                        showResult('error');
                }
        });
  }

  function verifyTag(tag,check){
        var wpid= $('[name=wpid]').val();
	if(!wpid.includes("WP")){console.log('Invalid wpid: '+wpid); return;}
        var sglactivity= $('[name=sgl]').val();
        console.log('verifying '+wpid);
        $('.results').hide();
        $.ajax({
                type: 'GET',
                url: 'https://webservice.wikipathways.org/getCurationTags?pwId='+wpid+'&format=json',
                dataType: 'json',
                success: function (response) {
			var alllist = [];
                        for (x=0;x<response.tags.length;x++){
				var tagnamex = response.tags[x].name;
				if(tagnamex=="Curation:AnalysisCollection" 
				   || tagnamex =="Curation:FeaturedPathway"){
					if(response.tags[x].revision==response.tags[x].pathway.revision){	
                                		alllist.push(tagnamex);
					}
				} else {
					alllist.push(tagnamex);
				}
                        }
                        console.log(alllist);
                        $('.results').hide();
                        if((alllist.includes(tag) && check == "added")
			    ||  (!alllist.includes(tag) && check == "removed" )){
                                showResult('success');
				if(check=="removed"){updateFooter(--total);}
                                sendSGLActivity(sglactivity);
			} else {
                                showResult('error');
                        }
                },
                error: function (error) {
                        console.log(error);
                        showResult('error');
                }
        });
  }


  function updateFooter(num){
	  $('#footer-info').html('<i>'+num+' pathways remaining</i>');
  }

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
