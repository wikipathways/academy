WikiPathways Academy
=========

This repo holds the content for WikiPathways Academy located at https://wikipathways.github.io/academy/.  The content includes an organized set of training tasks for new WikiPathways authors that lead to actual pathway editing tasks aimed at improving and expanding the collection of biological processess modeled at WikiPathways.

How to Use
====
Go to https://wikipathways.github.io/academy/ and follow the step-by-step instructions.


How to Develop
====
Make pull requests to this repo in order to fix or provide new content. The clickable skill tree image itself can be editted via the draw.io app for Google Docs: [WP Academy Tasks](https://drive.google.com/a/gladstone.ucsf.edu/file/d/0BxIWXP93jPy9QzhNakhobk81X1U/view?usp=sharing). Paste updated embed code into index.html (File>Embed>HTML... uncheck "Lightbox" then copy/paste). If you don't have edit permissions, send suggested changes to alex.pico@gladstone.ucsf.edu. 

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
download jnlp   | download-jnlp.js                    | specify wpid as ```value``` in form input ```name="wpidload"```
multiple choice | choice.js, choice.css, font-awesome | specify activity name as ```id``` in div ```class="choices"```
validate GPML   | file-dragger.js, validate-gpml.js   | specify solution file, activity and points in ```script```
web service     | webservice.js, webservice.css       | specify activity name as form ```id```
All types       | sgl.js, sgl-init.js, stylesheet.css |  
