// Referencing documentation from
// https://docs.oracle.com/javase/tutorial/deployment/webstart/deploying.html
//
// Using JavaScript to get location of JNLP
// file relative to HTML page
// NOTE: may be neccesary to change the url, depending on how the JNLP file
// named and where it is located.

$(function() {
  var dir = location.href.substring(0, location.href.lastIndexOf('/')+1);
  var url = dir + '/WP4v88153.jnlp';

  deployJava.launchWebStartApplication(url);

  $('#edit').click(function() {
    deployJava.createWebStartLaunchButton(url, '1.6.0');
  });
});
