const _ = require('lodash');
const XmlReader = require('xml-reader');
const xmlQuery = require('xml-query');

function validate(expectedStr, actualStr) {
    const expectedDoc = XmlReader.parseSync(expectedStr);
    const actualDoc = XmlReader.parseSync(actualStr);

    var tests = [
        // DataNode count
        function(doc) {
            return xmlQuery(doc).find('DataNode').map(node => node.name).length;
        },
        // DataNode TextLabel
        function(doc) {
            return xmlQuery(doc).find('DataNode').attr('TextLabel');
        },
        /*
        // TODO I think AP added this. Do you want to use it?
        function(doc) {
            //xmlQuery(solution).find('DataNode').attr('GraphId');
        },
        // TODO test interaction info
        function(doc) {
            //xmlQuery(solution).find('Interaction').find('Point').attr('GraphRef');
        }
        //*/
    ];
    
    return tests.reduce(function(acc, test) {
      return acc && _.isEqual(test(expectedDoc), test(actualDoc));
    });
}

export default validate;
