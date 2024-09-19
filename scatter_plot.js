// Define width, height, and padding for the SVG
var w = 600;
var h = 400;
var padding = 50;

// Dataset
var dataset = [
    [5, 20], [480, 90], [250, 50], [100, 33], [330, 95], 
    [410, 12], [475, 44], [25, 67], [85, 21], [220, 88], [500, 90]
];

// Define the scales for the x and y axes
var xScale = d3.scaleLinear()
               .domain([0, d3.max(dataset, function(d) { return d[0]; })])
               .range([padding, w - padding * 2]);

var yScale = d3.scaleLinear()
               .domain([0, d3.max(dataset, function(d) { return d[1]; })])
               .range([h - padding, padding]);

// Define axis functions
var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

// Create the SVG element
var svg = d3.select("#plot")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

// Create circles for the scatter plot
svg.selectAll("circle")
   .data(dataset)
   .enter()
   .append("circle")
   .attr("cx", function(d) { return xScale(d[0]); })
   .attr("cy", function(d) { return yScale(d[1]); })
   .attr("r", function(d) { return Math.sqrt(d[1]); })
   .attr("fill", function(d) { return d[0] === 500 ? "red" : "black"; });

// Add labels to each point
svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) { return d[0] + "," + d[1]; })
   .attr("x", function(d) { return xScale(d[0]) + 5; })
   .attr("y", function(d) { return yScale(d[1]) - 5; })
   .attr("font-size", "12px")
   .attr("fill", "green");

// Add the X Axis
svg.append("g")
   .attr("transform", "translate(0," + (h - padding) + ")")
   .call(xAxis);

// Add the Y Axis
svg.append("g")
   .attr("transform", "translate(" + padding + ",0)")
   .call(yAxis);
