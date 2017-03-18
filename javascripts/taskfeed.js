$(document).ready(function(){
	count = 0;
	total = 0;
	prevlist = [];
	nextlist = {};
	loadPathways();
	$('#next-pathway-button').prop('disabled',false);

	$('#next-pathway-button').click( function() {
        	count++;
        	//console.log(count);
		$('#pathway-info').html('');
		$('.results').hide();
    		if (count == Object.keys(nextlist).length){
			if($('[name=tag]').val()=='RecentChanges'){
				taskComplete();
				updateFooter(0);
				return;
			} else {
				$('#next-pathway').html("Loading next pathway...");
        		loadPathways();
                	count = 0;
			}
        	}else {
			//if ($('[name=tag]').val()=='RecentChanges'){updateFooter(--total);}
			updateFooter(--total);
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
			var png = $(data).find('ns1\\:data, data').text();
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
	if (tag=='RecentChanges'){loadRecentlyChangedPathways(); return;}
	prevlist = prevlist.concat(Object.keys(nextlist).map(function(k){return nextlist[k].id}))
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
				filter(response.tags, tag, function(filteredResponseTags){
					//using callback to sync nested ajax calls
					total = filteredResponseTags.length;
                                	updateFooter(total);
                                	var y = 10;
                                	if(total<y){y = total;}
                                	var selectionArray = getRandomArray(0,total,y);
                                	for (x=0;x<y;){
						//if (prevlist.indexOf(filteredResponseTags[selectionArray[x]].pathway.id) < 0){
						    //exclude pathways seen before in current page load
						    nextlist[x] = filteredResponseTags[selectionArray[x]].pathway;
						    x++;
						//}
			           	}
                                	console.log(nextlist);
                                	showNext();	
				});
			}
		},
        	error: function (error) {
        		console.log(error);
        	}
	});
  }				

  function filter(responseX,tag,callback){
	  var testPathways = ['WP4','WP2545','WP2582','WP2605','WP2606','WP2610','WP2611','WP2919','WP3418','WP3539','WP3590','WP3900','WP3902','WP3903','WP3905','WP3907','WP3908','WP3909','WP3910','WP3913','WP3917','WP3918','WP3919','WP3920','WP3921','WP3923','WP3961','WP3966'];
	  var netpathPathways = ['WP539','WP375','WP862','WP363','WP1098','WP754','WP980','WP10','WP895','WP1131','WP118','WP1320','WP297','WP781','WP1092','WP8','WP856','WP748','WP905','WP147','WP1168','WP397','WP937','WP1376','WP116','WP1374','WP182','WP1141','WP93','WP790','WP934','WP1341','WP1353','WP774','WP1346','WP407','WP886','WP815','WP818','WP1171','WP574','WP1121','WP512','WP373','WP827','WP1150','WP1322','WP319','WP1103','WP3227','WP2032','WP1315','WP1087','WP759','WP485','WP1094','WP783','WP1359','WP135','WP747','WP68','WP744','WP450','WP800','WP858','WP151','WP355','WP37','WP1329','WP488','WP387','WP569','WP855','WP44','WP1319','WP252','WP1382','WP1091','WP1180','WP750','WP946','WP913','WP849','WP199','WP1348','WP265','WP867','WP811','WP1369','WP929','WP457','WP246','WP1163','WP860','WP908','WP362','WP809','WP285','WP1354','WP274','WP1144','WP572','WP258','WP5','WP752','WP926','WP1323','WP1096','WP1367','WP794','WP1161','WP2374','WP3277 ','WP2380','WP3141','WP3888','WP2203','WP2355','WP3265','WP2324','WP3124','WP2332','WP3159','WP3191','WP69','WP1011','WP2035','WP3158','WP2037','WP2034','WP3274','WP2018','WP3153','WP22','WP205','WP364','WP127','WP395','WP286','WP49','WP23','WP47','WP231','WP366','WP304','WP53','WP437','WP61','WP138','WP195','WP1345','WP894','WP780','WP352','WP480','WP1130','WP492','WP1325','WP244','WP2036','WP973','WP3271','WP1031','WP1055','WP968','WP976','WP1012','WP974','WP1022','WP1004','WP1052','WP1047','WP985','WP1014','WP897','WP1133','WP1045','WP1025'];

	  

	if (tag == "Curation:Tutorial"){
		var filteredResponseTags = [];
		for (x=0;x<responseX.length;x++){
			if (testPathways.indexOf(responseX[x].pathway.id) < 0){
				console.log(responseX[x].pathway.id);
				filteredResponseTags.push(responseX[x]);
			}
		}
		callback(filteredResponseTags);
	}
	else if (tag == "RecentChanges"){
		var filteredResponsePathways = [];
		for (x=0;x<responseX.length;x++){
			if (testPathways.indexOf(responseX[x].id) < 0){
				console.log(responseX[x].id);
				filteredResponsePathways.push(responseX[x]);
			}
		}
		callback(filteredResponsePathways);
	}

	else if (tag == "Curation:NoInteractions"){
		var filteredResponseTags = [];
		var reactomePathways =[];
		$.ajax({
                  type: 'GET',
                  url: 'https://webservice.wikipathways.org/getCurationTagsByName?tagName=Curation:Reactome_Approved&format=json',
                  dataType: 'json',
                  success: function (response) {
                        console.log(response);
			for (y=0;y<response.tags.length;y++){
				reactomePathways.push(response.tags[y].pathway.id);
			}
                	for (x=0;x<responseX.length;x++){
                        	if (netpathPathways.indexOf(responseX[x].pathway.id) < 0 &&
                            	reactomePathways.indexOf(responseX[x].pathway.id) < 0){
                                    filteredResponseTags.push(responseX[x]);
                        	}
                	}
			callback(filteredResponseTags);
		  },
		  error: function(error){
			  console.log(error);
		  }
		});
	
	}
	else {
		callback(responseX);
	}
  }

  function loadRecentlyChangedPathways() {
        nextlist = {};
	var timestamp = getDaysAgo(10);
	console.log(timestamp);
        $.ajax({
                type: 'GET',
                url: 'https://webservice.wikipathways.org/getRecentChanges?timestamp='+timestamp+'&format=json',
                dataType: 'json',
                success: function (response) {
                        console.log(response);
                        total = response.pathways.length;
                        if(total==0){
                                taskComplete();
                        } else {
				filter(response.pathways, 'RecentChanges', function(filteredResponsePathways){
				//using callback to sync nested ajax calls
					total = filteredResponsePathways.length;
					var z=0;
					for(x=0;x<total;x++){
						if(filteredResponsePathways[x].revision!=0){
							nextlist[z] = filteredResponsePathways[x];
							z++;
						}
					}
					total = Object.keys(nextlist).length;
					updateFooter(total);
					console.log(nextlist);
					showNext();
				});
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

  $('#task-verify-untag-button').click( function() {
          verifyTag($('[name=tag]').val(), "removed");
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
                         var comment = $(response).find('ns2\\:comment, comment').text();
                        console.log(comment);
                        if(comment.includes(commenttext) ){
                                showResult('success');
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
    if ( window.location !== window.parent.location ) {
	window.wpSGL.submitSGLActivity(action, function(err, response) {
		console.log('SGL submit activity');
	 	if (err) {
			console.log('err');
			console.log(err);
		}
		console.log('response');
		console.log(response);
	
		window.wpSGL.postLeaderboard(10, function(err, response) {
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
  
  /**
   * returns timestamp as YYYYMMDDhhmmss, e.g., 20161214162000
   */
  function getAnHourAgo(){
	var d = new Date(Date.now());
	var YYYY = d.getFullYear();
	var MM = forceDoubleDigit(d.getMonth()+1); //only month is zero-based 
	var DD = forceDoubleDigit(d.getDate());
	var hh = d.getHours();
	if(hh>0){
		hh = forceDoubleDigit(hh-1); // an hour ago
	} else {
		hh = '23'; //an hour ago, yesterday
		DD = forceDoubleDigit(DD-1); // I think '00' day actually works in wp webservice...
	}
	var mm = forceDoubleDigit(d.getMinutes());
        var ss = forceDoubleDigit(d.getSeconds());
	return(""+YYYY+MM+DD+hh+mm+ss);	
  }
  /**
   * takes integer for number of days
   * assumes 30 days per month for simplicity
   * 0 for today
   *	
   * returns timestamp as YYYYMMDDhhmmss, e.g., 20161214162000
   */
  function getDaysAgo(days){
        var d = new Date(Date.now());
        var YYYY = d.getFullYear();
        var MM = forceDoubleDigit(d.getMonth()+1); //only month is zero-based 
        var DD = d.getDate();
	if(DD>days){
		DD = forceDoubleDigit(DD-days); // days ago
	} else {
		DD = forceDoubleDigit(DD-days+30); // end of last month; wp webservice will ignore possible innaccuracies in Feb dates
		if (MM==1){  	// if Jan, then Dec last year
			MM = 12;	
			YY = YY-1;			
		} else {
			MM = forceDoubleDigit(MM-1);
		}
	}
        var hh = forceDoubleDigit(d.getHours());
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
