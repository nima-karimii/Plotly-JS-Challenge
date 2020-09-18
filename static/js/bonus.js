
/// We drowning the gauge whit 3 plots:
/// 1- "Gauge" plot from Plotly for showing the Steeps
/// 2- "Scater" plot for center of gauge 
/// 3- "Path" for drawing the arrows

function buildGauge(frqwashing) {


  if (frqwashing===null) frqwashing=0;
  else frqwashing=parseInt(frqwashing);
  
  ////////////////////Setting up gauge Steps

  var gauge_trace = 
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: frqwashing,
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
          value: frqwashing
        }
      }
    };
  
///////Setting up the Arrow by 2 plots ( Scater and Path )

/// Coordinating the 3 points for Arrow 

// Converting "frqwashing" to degree (0-180)
var level = parseInt(frqwashing) * 18;
  
// Trig to calc meter point
var Pointer_degrees = 180 - level;
var Pointer = 0.7;
var radians = (Pointer_degrees * Math.PI) / 180;
var x = Pointer * Math.cos(radians);
var y = Pointer * Math.sin(radians)-0.5;

/// Setting up the Path plot
var mainPath = "M -.02 -0.8 L .03 -0.8 L ";
var pathX = String(x);
var space = " ";
var pathY = String(y);
var pathEnd = " Z";
var path = mainPath.concat(pathX, space, pathY, pathEnd);

var pointer_trace = 
  {
    type: "scatter",
    x: [0],
    y: [-.8],
    marker: { size: 20, color: "850000" },
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
    width: 600 , 
    height: 500, 
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