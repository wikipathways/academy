$(window).load(function() {
  var currentUserNameLC = !!window.wgUserName ?  String(window.wgUserName).toLowerCase() : window.wgUserName;
  var sglEnabledLCUserNames = [
    'Ariutta',
    'AlexanderPico',
    'Khanspers',
    'bgood',
  ].map(function(userName) {
    return userName.toLowerCase();
  });
  if (!!window.SGL && sglEnabledLCUserNames.indexOf(currentUserNameLC) > -1) {
    var token;
    var myParam = location.search.split('token=')[1];
    if (myParam != undefined) {
      token = myParam.split('&')[0];
    } else {
      console.error("ScienceGameLab Error: you are not logged in with a valid token");
    }
    
    function submitSGLActivity(type){
      var activity_body = {
          _t: 'activity.create',
          accounttoken: token,
          details: { gameId: '5751ed90e4b050b536ba7a03' },
          activity: type,
          time: (new Date()).toTimeString()
      };
      window.SGL.create_activity(activity_body, function(err, response) {
        // TODO does this method use the node callback style?
        console.log('SGL err');
        console.log(err);
        console.log('SGL response');
        console.log(response);
      });
    }
    
    var editorOpenState = false;
    $('#pvjs-container').bind('DOMSubtreeModified', function(e) {
      var annotationElement = $('.annotation.ui-draggable');
      var updatedEditorOpenState = annotationElement.hasClass('editor-open');
      if (editorOpenState && !updatedEditorOpenState) {
        console.log('Sending update to SGL');
        submitSGLActivity('easy');
      }
      editorOpenState = updatedEditorOpenState;
    });
  }
});
