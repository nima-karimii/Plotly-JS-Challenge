
///////////////////////////////////////////////////////////////////
//                    MAIN
///////////////////////////////////////////////////////////////////
// Global variables
var data,Sample_IDs,Sample_MetaData,Sample_samples,length_otu;
var Color=[];


// Reading the Json file  and creating the Global Variables 
d3.json("static/data/samples.json").then((data) => 
{
//    console.log(data);

// Selecting bacteria's names
  Sample_IDs=data.names;
// console.log(Sample_IDs);

// Selecting bacteria's Metadata
  Sample_MetaData=data.metadata;
// console.log(Sample_MetaData);

  
Sample_samples=data.samples;
//  console.log(Sample_samples);

// DropBox maker
  DropBox(Sample_IDs,"selDataset");

//Selecting Default Id for default Dashboard 
  var defaultID="940";

// Ploting the DefaultID on Dashboard
  Ploting (defaultID);
})
///////////////////////////////////////////////////////////////////
//                   DropBox Maker
//////////////////////////////////////////////////////////////////

function DropBox(data,Select_ID)
{
  var select_body= d3.select("#"+Select_ID);

  for ( var i=0 ; i<data.length ;i++ ) 
     {
        var row = select_body.append("option");
        row.text(data[i]);
         }
};

///////////////////////////////////////////////////////////////////
//Ploting Function :Finding the relevant Data and Updating the Dashboard 
//////////////////////////////////////////////////////////////////

function Ploting (SelectedID)
{
  // Finding the Data for selected ID
  var SelectedID_Data = Sample_samples.filter(smpl => smpl.id ===SelectedID);
  // console.log(SelectedID_Data[0]);

  var SelectedID_MetaData=Sample_MetaData.filter(smpl => smpl.id===parseInt(SelectedID));
  // console.log(SelectedID_MetaData[0].wfreq);
  
// Updating Dashboard with the new data 
  Dashbord_update (SelectedID_Data[0],SelectedID_MetaData[0]);
}

///////////////////////////////////////////////////////////////////
//  optionChanged Function for selecting ID from DropboX
//////////////////////////////////////////////////////////////////

function optionChanged(ID) {
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");
  // console.log(dataset);
  // console.log(ID);
  
  Ploting(ID);
}


///////////////////////////////////////////////////////////////////
//                   Updating Dashboard Function
//////////////////////////////////////////////////////////////////    

function Dashbord_update(SelectedID_Data,SelectedID_MetaData)
  {
    // Selecting the relevant Data for each charts
    var ID_sample_values= SelectedID_Data.sample_values;
    var ID_otu_ids= SelectedID_Data.otu_ids;
    var ID_out_labels= SelectedID_Data.otu_labels;
    // console.log(ID_sample_values);
    // console.log(ID_otu_ids);

    // Calling the Charts Functions

    Bubble_Chart(ID_otu_ids,ID_sample_values,ID_out_labels);

    Bar_chart(ID_otu_ids,ID_sample_values,ID_out_labels);

    Demographic_Info(SelectedID_MetaData);

    // buildGauge function is in the bonus.js
    buildGauge(SelectedID_MetaData.wfreq);
  }

///////////////////////////////////////////////////////////////////
//                   Demographic_Info function
//////////////////////////////////////////////////////////////////   

function Demographic_Info(SelectedID_MetaData)
  {
    var info_panel = d3.select("#sample-metadata");

    info_panel.html("");
  
    // console.log (Object.entries(SelectedID_MetaData)[1]);

    var info_array=Object.entries(SelectedID_MetaData);

    for (i=0; i<info_array.length;i++)
      {
        var ID=info_array[i][0];
        var INFO=info_array[i][1];
        infoDemo= ID.toUpperCase()+':  '+ INFO;
        title=info_panel.append("h5").text(infoDemo)

      }
  }

///////////////////////////////////////////////////////////////////
//                   Bubble_Chart function
//////////////////////////////////////////////////////////////////  

function Bubble_Chart(ID_otu_ids,ID_sample_values,ID_out_labels)

  { 
    length_otu=ID_otu_ids.length;

    // Creating Random Color
    for (var i=0 ; i<ID_otu_ids.length ;i++)
     {
        var x = Math. floor(Math. random() * 256);
        var y = Math. floor(Math. random() * 256);
        var z = Math. floor(Math. random() * 256);
        var rgbColor = "rgb(" + x + "," + y + "," + z + ")";
        Color[i]=rgbColor
         }
    // console.log(Color);
 
    var trace2 = 
    {
      x: ID_otu_ids ,
      y: ID_sample_values,
      text:ID_out_labels,
      mode: 'markers',
      marker: 
        {
        color:Color,
        size: ID_sample_values,
        }
    };
      
    var buble_data = [trace2];
      
    var layout = 
    {
      title: 
      { text: "<b> operational taxonomic units</b> <br> ",
        font: {
        family: 'Courier New, monospace',
        size: 24, }
            },
      showlegend: false,
      hovermode:'closest',
      // height: 600,
      // width: 1100,
      xaxis: {
        title: "OTU-ID"
              },
      yaxis: {
        title: "Sample_value"
             },
      paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)'

    };
      
      Plotly.newPlot('bubble', buble_data, layout);
        
  }
    
///////////////////////////////////////////////////////////////////
//                   Bar_chart function
//////////////////////////////////////////////////////////////////  

    function Bar_chart(ID_otu_ids,ID_sample_values,ID_out_labels)
    {
    var coolor = [];
    var x_values=[];
    var y_values=[];
    var htext=[];

    // Selecting the Top10 from Data and Selecting the same color from Bubble-chart color
    for (var i=0 ; i<10 ;i++)
    {
        y_values[i]="OUT "+ID_otu_ids[9-i];
        x_values[i]=ID_sample_values[9-i];
        coolor[9-i]=Color[i];
        htext[i]=ID_out_labels[9-i];

    }
    // console.log(Color);
    // console.log(coolor);
    // console.log(y_values);
    
    var trace1 = 
      {
        x:x_values ,
        y: y_values,
        text: htext,
        type: "bar",
        orientation: "h",
        marker: {
          color:coolor
                }
      };
       
    var Bar_chart_Data = [trace1];
    
    var bar_layout = 
      {
        title: 
          { text: "<b>TOP 10 operational taxonomic units</b> <br> ",
            font: {
            family: 'Courier New, monospace',
            size: 24, }
                },
        showlegend: false,
        xaxis: {
          gridwidth:1,
          font: {size: 50},
          title: "Sample_value"
        },


        yaxis: {
          gridwidth:1,
          title: "OTU-ID"

        },
        bargap :0.15,     
        plot_bgcolor:'rgba(0,0,0,0)',
          paper_bgcolor:'rgba(0,0,0,0)'
      }

      Plotly.newPlot("bar", Bar_chart_Data, bar_layout);
      }





