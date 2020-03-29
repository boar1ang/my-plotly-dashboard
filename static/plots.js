//Plot.ly Homework Week 15
function showMetadata(SampleId)
{        
    console.log(`Calling showMetadata(${SampleId})`); 

    d3.json("./samples.json").then((data) => {
        var metadata = data.metadata;

        var results = metadata.filter(m => m.id == SampleId);
            var result = results[0];
        
        var demoCardArea = d3.select("#sample-metadata");
        demoCardArea.html(""); 

        Object.entries(result).forEach(([key, value]) => {
        var metadata = demoCardArea.append("h6")
            .text(`${key}: ${value}`);
            
        });
        
    });
      
}


function drawBarGraph(SampleId)
{
    console.log(`Calling drawBarGraph(${SampleId})`);
    var barChartArea = d3.select("#bar");
    
    d3.json("./samples.json").then((data) => {
        //Sample Data -------------------
        var samples = data.samples;
            console.log(samples);
            var results = samples.filter(s => s.id == SampleId);
                var result = results[0];
               
                    var otu_ids = result.otu_ids;
                    var otu_labels = result.otu_labels;
                    var values = result.sample_values;

                    yticks = otu_ids.slice(0,10)
                    .map(otuId => `OTU ${otuId}`)
                    .reverse();

                var barData = {
                    x: values.slice(0, 10).reverse(),
                    y: yticks,
                    type: "bar",
                    text: otu_labels.slice(0, 10).reverse(),
                    orientation: "h",
                    hovertext: otu_labels
                };

                barArray = [barData];

                barLayout = {
                    title:"Top 10 OTUs (Bacteria Cultures) Found",
                    margin: {t: 30, l: 110},
                    xaxis: {title: "Qty. of Sample Values"},
                    yaxis: {title: "OTU ID"},
                    barmode: 'stack'
                };

            Plotly.newPlot("bar", barArray, barLayout);
    });
}
           
                 
function drawBubbleChart(SampleId)
{
    console.log(`Calling drawBubbleChart(${SampleId})`);
    var bubbleChartArea = d3.select("#bubble");
    
    d3.json("./samples.json").then((data) => {
        var samplesData = data.samples; 
        console.log(samplesData);    
        
        var results = samplesData.filter(s => s.id == SampleId);
        var result = results[0];

        var xaxis = result.otu_ids;
        var yaxis = result.sample_values;
        var size = result.sample_values;
        var color = result.otu_ids;
        var labels = result.otu_labels;
        

    var bubbleChartData = {
        x: xaxis,
        y: yaxis,
        text: labels,
        mode: 'markers',
        marker: {
                size: size,
                color: color}
        };
    
    var data = [bubbleChartData];
    var layout = {
        title: "Belly Button Bacteria",
        xaxis: {title: "OTU ID"},
        margin: {t: 30, l: 50}
        };
    
    Plotly.newPlot("bubble", data, layout);
    });
}

// Event handler; calls each function when a change takes place to the DOM:
function optionChanged(newSampleId) 
{
        console.log(`User selected new sample ID: ${newSampleId}`);
        drawBubbleChart(newSampleId);
        drawBarGraph(newSampleId);
        showMetadata(newSampleId);
        buildGaugeChart(newSampleId);
}

function buildGaugeChart(SampleId) 
{
    console.log(`Calling buildGaugeChart(${SampleId})`);
    

    d3.json("./samples.json").then((data) => {
        var metadata = data.metadata;
        
        var results = metadata.filter(m => m.id == SampleId);
            var result = results[0];
            var wfreq = result.wfreq;
            console.log(wfreq);
    
                    

var gaugeData = [
{
    domain: { x: [0, 1], y: [0, 1] },
    title: {text: "Belly Button Wash Frequency<br>(Scrubs per Week)"},
    type: "indicator",
    mode: "gauge",
    gauge: {
        axis: {
            range: [0, 9],
            tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            ticks: "outside"},
        steps: [
            {range: [0, 3], color: "#c6ffdd"},
            {range: [3, 6], color: "#FBD786"},
            {range: [6, 9], color: "#f7797d"}
                
            ],
        
            threshold: {
                line: { color: "#900C3F", width: 3 },
                thickness: 1,
                value: wfreq
            }
        }
    }
];   
var data = [gaugeData];
var layout = {width: 300, height: 275, margin: {t: 0, b: 0} };
Plotly.newPlot("gauge", data, layout);});}


//Create a function to initialize the dashboard with a default plot:
function initDashboard() 
{
    console.log("Initializing Dashboard ...");
    
    //Select dropdown element
    var subjSelectorArea = d3.select("#selDataset");
        
    //Use D3 to read in json data and log to console:
    d3.json("./samples.json").then((data) => {
        console.log(data); //object
    
    
        //Assign "names" list to variable
        var sampNames = data.names;
            console.log(sampNames);
    
        sampNames.forEach((SampleId) => {
            subjSelectorArea.append("option")
                .text(SampleId)
                .property("value", SampleId);
        });
                
    
        var SampleId = sampNames[0];
        
        drawBarGraph(SampleId);
        drawBubbleChart(SampleId);
        showMetadata(SampleId);   
        buildGaugeChart(SampleId); 
    });
}
//call initDashboard function to load page with default test subject sample ID (name) value   
initDashboard(); 