function DropBox(data,Select_ID)
{
    var select_body= d3.select("#"+Select_ID);
    // console.log(select_body);
    // console.log(data);

 for ( var i=0 ; i<data.length ;i++ ) 
     {
        var row = select_body.append("option");
        row.text(data[i]);
         }
    };




d3.json("https://raw.githubusercontent.com/nima-karimii/Plotly-JS-Challenge/master/static/data/samples.json").then((importedData) => {
    // console.log(importedData);
    var data = importedData;
//    console.log(data);

var Sample_IDs=data.names;
// console.log(Sample_IDs);

var Sample_MetaData=data.metadata;
// console.log(Sample_MetaData);
DropBox(Sample_IDs,"selDataset");

var Sample_samples=data.samples;
//  console.log(Sample_samples);

var SelectedID="940";
var SelectedID_Data = Sample_samples.filter(smpl => smpl.id ===SelectedID);
console.log(SelectedID_Data[0]);

if (SelectedID_Data.length===0)
     { console.log("Not found")}
else
{

var ID_sample_values= SelectedID_Data[0].sample_values;
var ID_otu_ids= SelectedID_Data[0].otu_ids;
var ID_out_labels= SelectedID_Data[0].otu_labels;
console.log(ID_sample_values);
console.log(ID_otu_ids);
x_values=[];
y_values=[];
for (var i=0 ; i<10 ;i++)
{
    y_values[i]="OUT "+ID_otu_ids[9-i];
    x_values[i]=ID_sample_values[9-i];
}
    console.log(y_values);

var trace1 = {
    x:x_values ,
    y: y_values,
    text: y_values.map(String),
        name: "yyyyy",
    type: "bar",
    orientation: "h"
  };
   // data
   var Bar_chart_Data = [trace1];

   // Apply the group bar mode to the layout
   var bar_layout = {
    title: 'xxxxxxxx',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: -45
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05,     

   };
 
  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", Bar_chart_Data, bar_layout);
}

var Color=[];
for (var i=0 ; i<ID_otu_ids.length ;i++)
{
    var x = Math. floor(Math. random() * 256);
    var y = Math. floor(Math. random() * 256);
    var z = Math. floor(Math. random() * 256);
    var rgbColor = "rgb(" + x + "," + y + "," + z + ")";
    Color[i]=rgbColor

}

console.log(Color);
console.log(Color);


var trace2 = {
    x: ID_otu_ids ,
    y: ID_sample_values,
    // hoverinfo:Textt,
    text:ID_out_labels,
    mode: 'markers',
    marker: {
      color:Color,
      size: ID_sample_values,
    }
  };
  
  var buble_data = [trace2];
  
  var layout = {
    title: 'Bubble Chart Hover Text',
    showlegend: false,
    hovermode:'closest',
    height: 600,
    width: 1200
  };
  
  Plotly.newPlot('bubble', buble_data, layout);





})