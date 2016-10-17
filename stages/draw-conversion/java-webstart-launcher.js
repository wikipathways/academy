$(function() {
  $('#edit').click(function() {
    // from https://docs.oracle.com/javase/tutorial/deployment/webstart/deploying.html
    // using JavaScript to get location of JNLP
    // file relative to HTML page
    // NOTE: may be neccesary to change the url, depending on how the JNLP generator
    // is made available as an extension.
    var dir = location.href.substring(0, location.href.lastIndexOf('/')+1);
    var url = dir + '/WP4v88153.jnlp';
    //deployJava.launchWebStartApplication(url);
    deployJava.createWebStartLaunchButton(url, '1.6.0');
  });
});
