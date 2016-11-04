//const document = require('global/document');

const _ = require('lodash');
const path = require('path');
const FileDragger = require('file-dragger')
const xmlReader = require('xml-reader');
const xmlQuery = require('xml-query');

window.xmlReader = xmlReader;
window.xmlQuery = xmlQuery;

export default function init({uploadTargetContainerSelector, validate, action, score}) {
  let uploadTargetContainer = document.querySelector(uploadTargetContainerSelector);

  // based on http://html5demos.com/file-api
  const uploadTarget = document.createElement('div');
  uploadTarget.setAttribute('id', 'upload-target');
  uploadTarget.setAttribute('style',
      'border: 10px dashed #ccc; width: 300px; height: 300px; margin: 20px auto;')
  uploadTargetContainer.appendChild(uploadTarget);

  const status = document.createElement('p');
  status.setAttribute('id', 'status');
  status.style.pointerEvents = 'none';
  status.style.position = 'relative';
  status.style.top = '50%';
  status.style.transform = 'translateY(-50%)';
  status.style.textAlign = 'center';
  status.textContent = 'Drag and drop GPML file here.';
  uploadTarget.appendChild(status);

  uploadTarget.addEventListener('dragover', function(evt) {
    uploadTarget.style.border = '10px solid lightgreen';
    uploadTarget.style.backgroundColor = 'white';
    status.style.visibility = 'hidden';
  });

  uploadTarget.addEventListener('mouseout', function(evt) {
    uploadTarget.style.border = '10px dashed #ccc';
    uploadTarget.style.backgroundColor = '';
    status.style.visibility = 'visible';
  });

  var emitter = FileDragger(uploadTarget);
  emitter.on('file', function (file) {
    var reader = new FileReader();
    reader.onload = function(evt) {
      const srcElement = evt.hasOwnProperty('srcElement') ? evt.srcElement : evt.target;
      var actualStr = srcElement.result;
      var passes = validate(actualStr);
      status.style.visibility = 'visible';
      status.textContent = passes ? 'Congratulations! Your input is correct.' :
        'Oops, that does\'t look quite right. Please try again.';
      if (passes){
        window.wpSGL.submitSGLActivity(action, function(err, response) {
          // TODO does this method use the node callback style?
          console.log('SGL submit');
          if (err) {
            console.log('err');
            console.log(err);
          }
          console.log('response');
          console.log(response);
          window.wpSGL.postLeaderboard(score, function(err, response) {
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
    };
    reader.readAsText(file);
  });
}
