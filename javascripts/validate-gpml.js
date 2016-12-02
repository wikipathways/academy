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

  // file-dragger.js is a browserified version of
  // https://www.npmjs.com/package/file-dragger
  // with FileDragger added to window.
  var emitter = window.FileDragger(uploadTarget);
  emitter.on('file', function (file) {
    var reader = new FileReader();
    reader.onload = function(evt) {
      var srcElement = evt.hasOwnProperty('srcElement') ? evt.srcElement : evt.target;
      var actualStr = srcElement.result;
      var passes = validate(actualStr);
      status.style.visibility = 'visible';
      status.style.fontSize = '20px';
      status.style.color = 'red';
      status.textContent = passes ? 'Congratulations!\nYour input is correct.' :
        'Oops!\nThat doesn\'t look quite right.\nPlease try again.';
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
