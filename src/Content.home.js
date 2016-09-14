// Content.home.js
import React from 'react';

class ContentHome extends React.Component {
//  renderHome = () => {
//    document.getElementById('skilltree').on('click', this.props.onClick);
//  }
//
//  shouldComponentUpdate(nextProps) {
////      const xDataChanged = !this.props.xData.equals(nextProps.xData);
////      const yDataChanged = !this.props.yData.equals(nextProps.yData);
////
////      return xDataChanged || yDataChanged;
//    return false;
//  }
//
//  componentDidMount() {
//    this.renderHome();
//  }
//
//  componentDidUpdate() {
//    this.renderHome();
//  }


  componentDidMount() {
    document.getElementById('skilltree').addEventListener('click', this.props.onClick);
  }

  componentWillUnmount(){
    document.getElementById('skilltree').removeEventListener('click', this.props.onClick);
  }

  render() {
    return (
      <div id="content-wrapper">
        <div className="inner clearfix">
          <section id="main-content">
            <h2>How to Use Our Skill Tree</h2>

            <p>Follow the skill tree, starting from the top, to hone your pathway authoring skills. Each stage links to training examples. Once you've mastered a given stage, progress to subsequent stages following the skill tree. 
              Yellow stages cover the basic training needed before moving on to curating existing pathways listed in silver and green stages. 
              Master all the prerequist stages before moving on to authoring new pathways lists in red, blue and purple stages.
            </p>

            <svg width="640" height="480.00000000000006" xmlns="http://www.w3.org/2000/svg" id="skilltree">
             <defs>
              <radialGradient r="1" cy="0.5" cx="0.5" spreadMethod="pad" id="svg_37">
               <stop offset="0" stopOpacity="0.99609" stopColor="#00ff00"/>
               <stop offset="1" stopOpacity="0.99609" stopColor="#333333"/>
              </radialGradient>
              <radialGradient gradientTransform="translate(0.020000000000000018,0) scale(0.96,1)" r="1.90461" cy="0.5" cx="0.5" spreadMethod="pad" id="svg_61">
               <stop offset="0" stopOpacity="0.99609" stopColor="#ffff00"/>
               <stop offset="1" stopOpacity="0.99609" stopColor="#191919"/>
              </radialGradient>
             </defs>
             <g>
              <title>Layer 1</title>
              <rect id="annotation" ry="10" rx="10" height="108" width="169" y="229.125" x="243.04167" strokeWidth="2" stroke="#7f7f7f" fill="url(#svg_61)"/>
              <text textAnchor="middle" fontFamily="Monospace" fontSize="24" id="svg_33" y="52.5" x="327.54687" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" stroke="#7f7f7f" fill="#000000">Install</text>
              <text textAnchor="middle" fontFamily="Monospace" fontSize="24" id="svg_34" y="43.16667" x="327.54687" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" stroke="#7f7f7f" fill="#000000">Install</text>
              <rect ry="10" rx="10" id="start" height="108" width="169" y="1.5" x="243.04166" strokeWidth="2" stroke="#7f7f7f" fill="url(#svg_37)"/>
              <rect id="datanode-name" ry="10" rx="10" height="108" width="169" y="115" x="243.04167" strokeWidth="2" stroke="#7f7f7f" fill="url(#svg_61)"/>
              <text id="svg_36" textAnchor="middle" fontFamily="Monospace" fontSize="24" y="75.16146" x="327.54427" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" stroke="#7f7f7f" fill="#000000">PathVisio</text>
              <text id="svg_47" textAnchor="middle" fontFamily="Monospace" fontSize="24" y="189.82814" x="327.55208" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" stroke="#7f7f7f" fill="#000000">Name</text>
              <text id="svg_48" textAnchor="middle" fontFamily="Monospace" fontSize="24" y="157.82814" x="327.54948" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" stroke="#7f7f7f" fill="#000000">DataNode</text>
              <text id="svg_49" textAnchor="middle" fontFamily="Monospace" fontSize="24" y="41.82813" x="327.55729" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" stroke="#7f7f7f" fill="#000000">Install</text>
              <text id="svg_55" textAnchor="middle" fontFamily="Monospace" fontSize="24" y="303.95314" x="327.5547" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" stroke="#7f7f7f" fill="#000000">Annotation</text>
              <text id="svg_56" textAnchor="middle" fontFamily="Monospace" fontSize="24" y="271.95314" x="327.55991" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" stroke="#7f7f7f" fill="#000000">DataNode</text>
              <rect id="conversion" ry="10" rx="10" height="108" width="169" y="369.375" x="2.62501" strokeWidth="2" stroke="#7f7f7f" fill="url(#svg_61)"/>
              <text id="svg_58" textAnchor="middle" fontFamily="Monospace" fontSize="24" y="444.20314" x="87.13804" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" stroke="#7f7f7f" fill="#000000">Conversion</text>
              <text id="svg_59" textAnchor="middle" fontFamily="Monospace" fontSize="24" y="412.20314" x="87.13544" strokeLinecap="null" strokeLinejoin="null" strokeDasharray="null" strokeWidth="0" stroke="#7f7f7f" fill="#000000">Metabolite</text>
             </g>
            </svg>

          </section>
        </div>
      </div>
    );
  }
}

export default ContentHome;
