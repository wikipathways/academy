WikiPathways Academy
=========

This repo holds the content for WikiPathways Academy located at https://wikipathways.github.io/academy/.  The content includes an organized set of training tasks for new WikiPathways authors that lead to actual pathway editing tasks aimed at improving and expanding the collection of biological processess modeled at WikiPathways.

How to Use
====
Go to https://wikipathways.github.io/academy/ and follow the step-by-step instructions.


How to Develop
====
Make pull requests to this repo in order to fix or provide new content. 

## Editing the clickable path image
The clickable path image itself can be editted via the draw.io app for Google Docs: [WP Academy Tasks](https://drive.google.com/a/gladstone.ucsf.edu/file/d/0BxIWXP93jPy9QzhNakhobk81X1U/view?usp=sharing). 
* Open the diagram in draw.io and make any necessary changes.
* Export the diagram as html under File>Embed>HTML... , making sure to uncheck "Lightbox". Leave other settings as-is. The export will be displayed in a popup box, copy the contents to the clipboard. 
* Paste the html export into a text editor.
* Locate the `<div class="mxgraph"` part and in the `style` attribute add "width: 959px; height: 724px". This is necessary to make sure the diagram is sized properly. 
* Copy the code of the entire `<div class="mxgraph"` div.
* Open the path.html document in a text editor and replace paste updated embed code into path.html.
## Editing/adding individual tasks
Individual tasks/stages are organized in folders. To edit the instructions for a stage, edit the index.html file. To add a stage, add a new folder and index file. 
The order of tasks in the path is determined by the “Next step” and “Previous step” hyperlinked buttons in each task. These hyperlinks will need to be updated accordingly if new tasks are added and/or if the order of tasks is changed.
If a new stage/task is added, update the gpml validator java script accordingly.

If you don't have edit permissions, send suggested changes to alex.pico@gladstone.ucsf.edu. 

The first time you clone the repo (and subsequent dev sessions):
* `npm install`
* `npm start`
* Then open http://10.1.12.87:9966/ to view the development instance of the site

If you make changes to src/*.js, you will need to compile before committing javascripts/*.js files:
* `npm run build`

Project Structure
----
####Directories:
* stages: challenge pages html and local-only content
* stylesheets: css files 
* images: image files 
* javascripts: js files 
* src: source js files to be compiled by npm using package.json
* test: test files

#### Relationships:
There are a handful of challenge types collected in the stages dir. Each type depends on a unique js solution. The diagram below depicts how each stage type relates to js files, which in turn, sometimes relate to src files that require compiling.

Stage type      | JS/CSS                              | Notes
----------------|-------------------------------------|---------------------------------------------------
read only       | read-only.js                        | specify activity name as ```id``` in div ```class="readonly"```
download jnlp   | download-jnlp.js                    | specify wpid as ```value``` in form input ```name="wpidload"```
multiple choice | choice.js, choice.css, cdn:font-awesome | specify activity name as ```id``` in div ```class="choices"```
task feed | taskfeed.js, webservice.css | specify values in ```task-feed``` form; note verify-button types in taskfeed.js    
validate GPML   | file-dragger.js, validate-gpml.js   | specify solution file, activity and points in ```script```
web service     | webservice.js, webservice.css       | specify activity name as form ```id```
All types       | sgl.js, sgl-init.js, stylesheet.css |  
