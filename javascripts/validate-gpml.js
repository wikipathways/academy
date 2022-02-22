window.wpAcademy = window.wpAcademy || {};
window.wpAcademy.validateGPML = function(args) {
  var uploadTargetContainerSelector = args.uploadTargetContainerSelector;
  var validate = args.validate;
  var action = args.action;
  var points = args.points;
  window.addEventListener('dragover', function(e) {
    e = e || event;
    e.preventDefault();
  }, false);
  window.addEventListener('drop', function(e) {
    e = e || event;
    e.preventDefault();
  }, false);

  var uploadTargetContainer = document.querySelector(uploadTargetContainerSelector);

  // based on http://html5demos.com/file-api
  var uploadTarget = document.createElement('div');
  uploadTarget.setAttribute('id', 'upload-target');
  uploadTarget.setAttribute('style',
      'border: 10px dashed #ccc; height: 300px; margin: 20px auto; padding: 10px;')
  uploadTargetContainer.appendChild(uploadTarget);

  var status = document.createElement('p');
  status.setAttribute('id', 'status');
  status.style.pointerEvents = 'none';
  status.style.position = 'relative';
  status.style.top = '50%';
  status.style.transform = 'translateY(-50%)';
  status.style.textAlign = 'center';
  status.style.fontSize = '2em';
  status.textContent = 'Drag and drop GPML file here';
  uploadTarget.appendChild(status);

  uploadTarget.addEventListener('dragover', function(evt) {
    uploadTarget.style.border = '10px solid lightgreen';
    uploadTarget.style.backgroundColor = 'white';
    status.style.visibility = 'hidden';
  });

  uploadTarget.addEventListener('drop', function(evt) {
    uploadTarget.style.border = '10px dashed #ccc';
    uploadTarget.style.backgroundColor = '';
    status.style.visibility = 'visible';
  });

  uploadTarget.addEventListener('dragleave', function(evt) {
    uploadTarget.style.border = '10px dashed #ccc';
    uploadTarget.style.backgroundColor = '';
    status.style.visibility = 'visible';
  });

  var solutionGpml = '';
  $.ajax({url:validate,success:function(s){
    solutionGpml = s;
  }
  });

  // file-dragger.js is a browserified version of
  // https://www.npmjs.com/package/file-dragger
  // with FileDragger added to window.
  var emitter = window.FileDragger(uploadTarget);
  emitter.on('file', function (file) {
    var reader = new FileReader();
    reader.onload = function(evt) {
      var srcElement = evt.hasOwnProperty('srcElement') ? evt.srcElement : evt.target;
      var userGpml = srcElement.result;
      var errors = validateGpml(userGpml,solutionGpml);
      var passes = (errors.length == 0) ? true : false;
      status.style.visibility = 'visible';
      status.style.fontSize = '20px';
      status.style.color = 'red';
      status.textContent = passes ? 'Congratulations!\nYour input is correct.' :
        "Oops!\nThat doesn\'t look quite right.\nPlease try again.\n"+errors;
      if (passes) {
        status.style.color='green';
        if ( window.location !== window.parent.location ) {
          window.wpSGL.submitSGLActivity(action, function(err, response) {
            // TODO does this method use the node callback style?
          console.log('SGL submit');
          if (err) {
            console.log('err');
            console.log(err);
          }
          console.log('response');
          console.log(response);
          window.wpSGL.postLeaderboard(points, function(err, response) {
            // TODO does this method use the node callback style?
          console.log('SGL post leaderboard');
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
    };
    reader.readAsText(file);
  });
};

function parseGpml(gpml){
          //console.log(gpml);

          // DataNode collection
          var data = {};
          $(gpml).find('DataNode').each(function(){
                  var gi = $(this).attr('GraphId');
                  var tl = $(this).attr('TextLabel').toUpperCase();
                  var ty = $(this).attr('Type');
                  var xdb = $(this).find('Xref').attr('Database');
                  var xid = $(this).find('Xref').attr('ID');
                  data[gi] = [tl,ty,xdb,xid,[]]; //insert array placeholder for interaction collection
          });
	  // Label collection
	  $(gpml).find('Label').each(function(){
                  var gi = $(this).attr('GraphId');
                  var tl = $(this).attr('TextLabel').toUpperCase();
                  data[gi] = [tl,'Label','NULL','NULL',[]];
          });

          // Group collection
          $(gpml).find('Group').each(function(){
                  var gi = $(this).attr('GraphId');
                  data[gi] = ['GROUP','Group','NULL','NULL',[]];
          });

	  // Compartment collection
	  $(gpml).find('Shape').each(function(){
		  var gi = $(this).attr('GraphId');
		  $(this).find('Attribute').each(function(){
			  if ($(this).attr('Key') == 'org.pathvisio.CellularComponentProperty'){
				  var cc = $(this).attr('Value').toUpperCase();
				  data[gi] = [cc,'Shape','NULL','NULL',[]];
			  }
		  });
	  });

          // Anchor collection
          $(gpml).find('Interaction').each(function(){
		  var anchorlabel = 'ANCHOR';
		  $(this).find('Graphics').find('Point').each(function() {
		  	var gr = $(this).attr('GraphRef');
			 if (undefined === data[gr]){
                                console.log('GraphRef pointing to missing GraphId: '+gr);
                          } else {
                                anchorlabel += '_'+data[gr][0];
			  }
		  });
		  $(this).find('Graphics').find('Anchor').each(function(){
                        var gi = $(this).attr('GraphId');

                        data[gi] = [anchorlabel.toUpperCase(),'Anchor','NULL','NULL',[]];
                  });
          });

          // Interaction collection
          $(gpml).find('Interaction').each(function(){
                  $(this).find('Graphics').find('Point').each(function() {
                          var gr = $(this).attr('GraphRef');
                          var ah = $(this).attr('ArrowHead');
                          if (undefined === ah) { ah = 'Line';}
                          if (undefined === data[gr]){
                                console.log('GraphRef pointing to missing GraphId: '+gr);
                          } else {
				console.log(data[gr]);
				  console.log(data[ah]);
                                data[gr][4].push(ah);
                          }
                  });
          });

	  // Fix anchor interaction arrays by merging per interaction
	  data2 = data;
	  $.each(data, function(k1,v1){
		if (v1[1] == 'Anchor'){
	  		$.each(data2, function(k2,v2){
				if (v1[0] === v2[0] && k1 != k2){
					Array.prototype.push.apply(data[k1][4], data2[k2][4]);
				}
			});
		}
	  });				

          console.log(data);

	  return data;
}
function validateGpml(userGpml,solutionGpml){
	 var userData = parseGpml(userGpml);
 	 var solutionData = parseGpml(solutionGpml);

          var err = '';
	  userDataCount = Object.keys(userData).length;
          solutionDataCount = Object.keys(solutionData).length;
          err += (userDataCount == solutionDataCount) ? '' : 'Incorrect number of nodes: '+userDataCount+' detected, '+solutionDataCount+' expected. ';

          var userlabels = [];
          $.each(userData, function(userkey, userval){
                userlabels.push(userval[0]);
                err += (userval[2] != '') ? '' : 'Missing Xref database for: '+userval[0]+'. ';
                err += (userval[3] != '') ? '' : 'Missing Xref identifier for: '+userval[0]+'. ';
          });

          $.each(solutionData, function(solkey, solval){
                err += (userlabels.includes(solval[0])) ? '' : 'Missing '+solval[0]+' node. ';
                var intmatch = true;
                var typematch = true;
                $.each(userData, function(userkey, userval){
                        if (solval[0] == userval[0]){
                          intmatch = false;
                          typematch = false;
                          if (solval[1] == userval[1]){
                                typematch = true;
                          }
                          if ($(solval[4]).not(userval[4]).length === 0 && $(userval[4]).not(solval[4]).length === 0){
                                intmatch = true;
                          }
                        }
                });
                err += (typematch) ? '' : 'Incorrect molecule type for '+solval[0]+'. ';
                err += (intmatch) ? '' : 'Incorrect interactions for '+solval[0]+'. ';

          });

	  return err;
}

