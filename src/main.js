const document = require('global/document');
const fs = require('fs');
const path = require('path');
import validate from './validate';
const FileDragger = require('file-dragger')

const expected = fs.readFileSync(
    path.join(__dirname, '..', 'stages', 'draw-conversion', 'glucose-solution.gpml'),
    {encoding: 'utf8'}
);

export default function init(selector) {
  let node;
  if (!!selector) {
    node = document.querySelector(selector);
  } else {
    node = document.createElement('div');
    node.setAttribute('id', 'draw-conversion');
    document.body.appendChild(node);
  }

  // based on http://html5demos.com/file-api
  const holder = document.createElement('div');
  holder.setAttribute('id', 'holder');
  holder.setAttribute('style',
      'border: 10px dashed #ccc; width: 300px; height: 300px; margin: 20px auto;')
  node.appendChild(holder);

  const status = document.createElement('p');
  status.setAttribute('id', 'status');
  status.textContent = 'Drag and drop GPML file into target above.';
  node.appendChild(status);

  var emitter = FileDragger(holder);
  emitter.on('file', function (file) {
    var reader = new FileReader();
    reader.onload = function(evt) {
      var actual = evt.srcElement.result;
      var passes = validate(expected, actual);
      status.textContent = passes ? 'Congratulations! Your input is correct.' :
        'Oops, that does\'t look quite right. Please try again.';
      if (passes){
	submitSGLActivity('easy');
      }
    };
    reader.readAsText(file);
  });
}
