function buildGauge(wfreq) {
  var gauge_trace = 
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: wfreq,
      title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
             font: { size: 24 ,
             family: 'Courier New, monospace',
            } },
      type: "indicator",
       delta: { reference: 10, increasing: { color: "RebeccaPurple" } },
  
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
        bar: { color: "darkblue" },
        bgcolor: "Grey",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          { range: [0, 1], color: "darkred" },
          { range: [1 ,2], color: "red" },
          { range: [2 ,3], color: "OrangeRed" },
          { range: [3 ,4], color: "darkorange" },
          { range: [4 ,5], color: "orange" },
          { range: [5 ,6], color: "gold" },
          { range: [6 ,7], color: "yellow" },
          { range: [7 ,8], color: "yellowgreen" },
          { range: [8 ,9], color: "green" },
          { range: [9 ,10], color: "darkgreen" }
  
  
        ],
        threshold: {
          line: { color: "white", width: 5 },
          thickness: 0.75,
          value: wfreq
        }
      }
    };
  
  // var layout = { width: 450, 
  //   height: 400, 
  //   margin: { t: 0, b: 0 } ,
  //   paper_bgcolor:'rgba(0,0,0,0)',
  //   // plot_bgcolor:'rgba(0,0,0,0)'
  // };
  // Plotly.newPlot('gauge', data, layout);


// Enter the washing frequency between 0 and 180
var level = parseInt(wfreq) * 18;
  
// Trig to calc meter point
var degrees = 180 - level;
var radius = 0.7;
var radians = (degrees * Math.PI) / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians)-0.5;

// Path: may have to change to create a better triangle
var mainPath = "M -.0 -0.6 L -.0 -0.5 L ";
var pathX = String(x);
var space = " ";
var pathY = String(y);
var pathEnd = " Z";
var path = mainPath.concat(pathX, space, pathY, pathEnd);

var pointer_trace = 
  {
    type: "scatter",
    x: [0],
    y: [-0.5],
    marker: { size: 1, color: "850000" },
    showlegend: false,
    text: 'none',
  };
  var layout = {
    shapes: [
      {
        type: "path",
        path: path,
        fillcolor: "850000",
        line: {
          color: "850000"
        }
      }
    ],
    width: 450, 
    height: 450, 
    xaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    },
    yaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1],

    },
    
    paper_bgcolor:'rgba(0,0,0,0)',
    plot_bgcolor:'rgba(0,0,0,0)'
  };

data=[gauge_trace,pointer_trace]

    Plotly.newPlot("gauge", data, layout);





} 