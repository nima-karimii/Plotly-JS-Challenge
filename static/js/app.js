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





  function Dashbord_update(SelectedID_Data,SelectedID_MetaData)
    {
    var ID_sample_values= SelectedID_Data.sample_values;
    var ID_otu_ids= SelectedID_Data.otu_ids;
    var ID_out_labels= SelectedID_Data.otu_labels;
    console.log(ID_sample_values);
    console.log(ID_otu_ids);
    Bar_chart(ID_otu_ids,ID_sample_values);
    Demographic_Info(SelectedID_MetaData);
    Bubble_Chart(ID_otu_ids,ID_sample_values,ID_out_labels);
    buildGauge(SelectedID_MetaData.wfreq);
    }

    function Demographic_Info(SelectedID_MetaData)
    {
      var info_panel = d3.select("#sample-metadata");

      // Use `.html("") to clear any existing metadata
      info_panel.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      // Object.entries(SelectedID_MetaData).forEach(([key, value]) => {
      //   PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      // });
      console.log (Object.entries(SelectedID_MetaData)[1]);
      var info_array=Object.entries(SelectedID_MetaData);
      for (i=0; i<info_array.length;i++)
      {
        var ID=info_array[i][0];
        var INFO=info_array[i][1];

        info_panel.append("h6").text(`${ID.toUpperCase()}: ${INFO}`);
    console.log (info_array[i][0]);
    console.log (info_array[i][1]);

    }
    }


    function Bar_chart(ID_otu_ids,ID_sample_values)
    {
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

    function Bubble_Chart(ID_otu_ids,ID_sample_values,ID_out_labels)
    {
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
    
    
    }
    


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
var SelectedID_MetaData=Sample_MetaData.filter(smpl => smpl.id===parseInt(SelectedID));
console.log(SelectedID_MetaData[0].wfreq);

if (SelectedID_Data.length===0)
     { console.log("Not found")}
else
 Dashbord_update (SelectedID_Data[0],SelectedID_MetaData[0]);
  
 

})