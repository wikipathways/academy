$(document).ready(function() {
        var downloadButton = getShowInstructions() ? $('#download-from-modal') : $('#download-from-page');
        downloadButton.click(function() {
        var wpid= $('[name=wpidload]').val();
          if ($('#dont-show-instructions').is(':checked')) {
            localStorage.setItem('showChallengeInstructions', 'false');
          }
          // server must set Content-Disposition: attachment
          window.location = 'https://wikipathways.org/wpi/extensions/PathwayViewer/pathway-jnlp.php?identifier='+wpid+'&filename=WikiPathwaysAcademy-Challenge';
          getShowInstructions();
        });
});

function getShowInstructions() {
        var showInstructions = localStorage.getItem('showChallengeInstructions') === 'false' ? false : true;
        if (showInstructions) {
          $('#download-from-page').hide();
          $('#launch-modal').show();
        } else {
          $('#launch-modal').hide();
          $('#download-from-page').show();
        }
        return showInstructions;
}
