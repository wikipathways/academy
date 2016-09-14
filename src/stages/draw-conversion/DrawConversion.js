// DrawConversion.js
import React from 'react';

class DrawConversion extends React.Component {
  render() {
    return (
      <div id="content-wrapper">
        <div className="inner clearfix">
          <section id="main-content">
            <h1><a id="intro" className="anchor" href="#intro" aria-hidden="true"><span aria-hidden="true" className="octicon octicon-link"></span></a>Draw a Conversion</h1>

            <h2>Background</h2>

            <p>The conversion of one metabolite into another comprises the fundamental biological process of <a href="https://en.wikipedia.org/wiki/Metabolism">metabolism</a>. Often catalyzed by enzymes and chained together in a series, each conversion reaction involves a change in the chemical structure of a metabolite or small molecule. Conversion reactions are thus drawn as two metabolites and a mim-conversion interaction, pointing from the subtrate to the product.
            </p>

              <h2>Challenge #1</h2>
              <p>Model the conversion reaction depicted in this research article figure.
              </p>
              [[insert cropped image and link to paper here]]

              <br />
              <br />
              <p>  
                <button className="file-upload">Upload GPML</button>
              </p>
              <p>
                <a href="glucose-solution.png">Click for image of solution</a>.
              </p>
          </section>
        </div>
        <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script type="text/javascript" src="//www.sciencegamelab.com/developer/unittest/js/sciapi.js"></script>
        <script type="text/javascript" src="../../javascripts/sgl-init.js"></script>
        <script type="text/javascript" src="../../javascripts/sgl.js"></script>
        <script type="text/javascript" src="../../javascripts/main.js"></script>
      </div>
    );
  }
}

export default DrawConversion;
