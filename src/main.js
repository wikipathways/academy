//const document = require('global/document');

const _ = require('lodash');
const path = require('path');
const FileDragger = require('file-dragger')
const xmlReader = require('xml-reader');
const xmlQuery = require('xml-query');

window.xmlReader = xmlReader;
window.xmlQuery = xmlQuery;

export default function init(selector, validate) {
  let node = document.querySelector(selector);

  // based on http://html5demos.com/file-api
  const holder = document.createElement('div');
  holder.setAttribute('id', 'holder');
  holder.setAttribute('style',
      'border: 10px dashed #ccc; width: 300px; height: 300px; margin: 20px auto;')
  node.appendChild(holder);

  const status = document.createElement('p');
  status.setAttribute('id', 'status');
  status.style.pointerEvents = 'none';
  status.style.position = 'relative';
  status.style.top = '50%';
  status.style.transform = 'translateY(-50%)';
  status.style.textAlign = 'center';
  status.textContent = 'Drag and drop GPML file here.';
  holder.appendChild(status);

  holder.addEventListener('mouseenter', function(evt) {
    holder.style.border = '10px solid lightgreen';
    holder.style.backgroundColor = 'white';
    status.style.visibility = 'hidden';
  });

  holder.addEventListener('mouseout', function(evt) {
    holder.style.border = '10px dashed #ccc';
    holder.style.backgroundColor = '';
    status.style.visibility = 'visible';
  });

  var emitter = FileDragger(holder);
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
        window.submitSGLActivity('demo-101');
      }
    };
    reader.readAsText(file);
  });
}
