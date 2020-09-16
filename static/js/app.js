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


    function Ploting (SelectedID)
    {
    // d3.selectAll("#selDataset").on("change", updatePlotly);
    
    
    // var SelectedID="940";
    
    
    var SelectedID_Data = Sample_samples.filter(smpl => smpl.id ===SelectedID);
    console.log(SelectedID_Data[0]);
    var SelectedID_MetaData=Sample_MetaData.filter(smpl => smpl.id===parseInt(SelectedID));
    console.log(SelectedID_MetaData[0].wfreq);
    
    if (SelectedID_Data.length===0)
         { console.log("Not found")}
    else
     Dashbord_update (SelectedID_Data[0],SelectedID_MetaData[0]);
      
     
    }

    

  function Dashbord_update(SelectedID_Data,SelectedID_MetaData)
    {
    var ID_sample_values= SelectedID_Data.sample_values;
    var ID_otu_ids= SelectedID_Data.otu_ids;
    var ID_out_labels= SelectedID_Data.otu_labels;
    console.log(ID_sample_values);
    console.log(ID_otu_ids);
    Bubble_Chart(ID_otu_ids,ID_sample_values,ID_out_labels);
    Bar_chart(ID_otu_ids,ID_sample_values);
    Demographic_Info(SelectedID_MetaData);
    buildGauge(SelectedID_MetaData.wfreq);
    }

    function Demographic_Info(SelectedID_MetaData)
    {
      var info_panel = d3.select("#sample-metadata");

      info_panel.html("");
  
      console.log (Object.entries(SelectedID_MetaData)[1]);

      var info_array=Object.entries(SelectedID_MetaData);

      for (i=0; i<info_array.length;i++)
      {
        var ID=info_array[i][0];
        var INFO=info_array[i][1];
        infoDemo= ID.toUpperCase()+':  '+ INFO;
        title=info_panel.append("h5").text(infoDemo)

        // title.append("h4").text(`: ${INFO}`);
      // console.log (info_array[i][0]);
      // console.log (info_array[i][1]);

    }
    }


    var Color=[];
    var length_otu;
    function Bubble_Chart(ID_otu_ids,ID_sample_values,ID_out_labels)
    { length_otu=ID_otu_ids.length;

    for (var i=0 ; i<ID_otu_ids.length ;i++)
    {
        var x = Math. floor(Math. random() * 256);
        var y = Math. floor(Math. random() * 256);
        var z = Math. floor(Math. random() * 256);
        var rgbColor = "rgb(" + x + "," + y + "," + z + ")";
        Color[i]=rgbColor
    
    }
    
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
        width: 1100,
        paper_bgcolor:'rgba(0,0,0,0)',
    plot_bgcolor:'rgba(0,0,0,0)'

      };
      
      Plotly.newPlot('bubble', buble_data, layout);
    
    
    }
    

    function Bar_chart(ID_otu_ids,ID_sample_values)
    {
    var coolor = []

    x_values=[];
    y_values=[];
    for (var i=0 ; i<10 ;i++)
    {
        y_values[i]="OUT "+ID_otu_ids[9-i];
        x_values[i]=ID_sample_values[9-i];
        coolor[9-i]=Color[i];
        // console.log(y_values[i]);
        // console.log(coolor[i]);


    }
    console.log(Color);
    console.log(coolor);
        console.log(y_values);
    
    var trace1 = {
        x:x_values ,
        y: y_values,
        
        text: y_values.map(String),
        type: "bar",
        orientation: "h",
        marker: {
          color:coolor
        }
      };
       // data
       var Bar_chart_Data = [trace1];
    
       // Apply the group bar mode to the layout
       var bar_layout = {
        title: { text: "<b>TOP 10 BACTERIAS</b> <br> ",

                  font: {
                  family: 'Courier New, monospace',
                  size: 24,
        }
      },
        showlegend: false,
        xaxis: {
          gridwidth:1,
          font: {size: 50}
        },
        yaxis: {
          gridwidth:1
        },
        bargap :0.15,     
        plot_bgcolor:'rgba(0,0,0,0)',
          paper_bgcolor:'rgba(0,0,0,0)'

      }
      // Render the plot to the div tag with id "plot"
      Plotly.newPlot("bar", Bar_chart_Data, bar_layout);
      }

  function optionChanged(ID) {
      // Use D3 to select the dropdown menu
      var dropdownMenu = d3.select("#selDataset");
      // Assign the value of the dropdown menu option to a variable
      var dataset = dropdownMenu.property("value");
      console.log(dataset);
      console.log(ID);
      Ploting(ID);
    }


var data,Sample_IDs,Sample_MetaData,Sample_samples;

d3.json("static/data/samples.json").then((importedData) => 
{
    // console.log(importedData);
data = importedData;
//    console.log(data);

Sample_IDs=data.names;
// console.log(Sample_IDs);

Sample_MetaData=data.metadata;
// console.log(Sample_MetaData);

Sample_samples=data.samples;
//  console.log(Sample_samples);

DropBox(Sample_IDs,"selDataset");

var defaultID="940";

Ploting (defaultID);

  })
