window.$(window).load(function() {
    if ( window.location !== window.parent.location ) {
        document.getElementById('banner').style.display = "none";
        //document.getElementById('next-button').style.display = "none"; // When next button doesn't have an ID, this line causes the code to die.
        $("a:contains('Next step')").hide(); // If all next buttons have the same text, this will work too.
        var token;
        var myParam = location.search.split('token=')[1];
        if (typeof myParam !== 'undefined' && myParam !== null) {
            token = myParam.split('&')[0];
        } else {
            console.error('ScienceGameLab Error: you are not logged in with a valid token');
        }

        var game = {
        gameId: '5751ed90e4b050b536ba7a03',
        token: token,
        };

        window.wpSGL = {
        postLeaderboard: function(score, cb) {
            var game_data = {
            _t:'msg',
            body:{
            _t:'leaderboard.post',
            accounttoken: game.token,
            gametoken: game.gameId,
            gamescore: '' + score
            },
            header: { _t: 'hdr', cid: ('' + window.SGL.sessioncounter) }
            };
            
            var post_data = JSON.stringify(game_data);
            window.SGL.post_leaderboard(post_data, cb);
        },
        submitSGLActivity: function(action, cb) {
            var activity_body = {
            _t: 'activity.create',
            accounttoken: game.token,
            details: { gameId: game.gameId },
            name: action,
            time: (new Date()).toTimeString()
            };
            window.SGL.create_activity(activity_body, cb);
        },
        };
    }
});
