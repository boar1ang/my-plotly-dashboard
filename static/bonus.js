//bonus: gauge chart
function buildGaugeChart(SampleId) 
{
    console.log(`Calling buildGaugeChart(${SampleId})`);
    

    d3.json("..data/samples.json").then((data) => {
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
var layout = {width: 350, height: 300, margin: {t: 0, b: 0} };
Plotly.newPlot("gauge", data, layout);});}
