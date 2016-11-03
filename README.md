WikiPathways Academy
=========

This repo holds the content for WikiPathways Academy located at http://academy.wikipathways.org.  The content includes an organized set of training tasks for new WikiPathways authors that lead to actual pathway editing tasks aimed at improving and expanding the collection of biological processess modeled at WikiPathways.

How to Use
====
Go to http://academy.wikipathways.org and follow the step-by-step instructions.


How to Develop
====
Make pull requests to this repo in order to fix or provide new content. The clickable skill tree image itself can be editted via the draw.io app for Google Docs: [WP Academy Tasks](https://drive.google.com/a/gladstone.ucsf.edu/file/d/0BxIWXP93jPy9QzhNakhobk81X1U/view?usp=sharing). Paste updated embed code into index.html (File>Embed>HTML... uncheck "Lightbox" then copy/paste). If you don't have edit permissions, send suggested changes to alex.pico@gladstone.ucsf.edu. 

The first time you clone the repo (and subsequent dev sessions):
* `npm install`
* `npm start`
* Then open http://10.1.12.87:9966/ to view the development instance of the site

If you make changes to src/*.js, you will need to compile before committing javascripts/*.js files:
* `npm run build`


