// @TODO: YOUR CODE HERE!
let svgWidth = 800;
let svgHeigth = 400;

let margin = {
    top:20,
    right: 40, 
    bottom: 60,
    left: 100
}

let width = svgWidth - margin.left - margin.right;
let height = svgHeigh - margin.top - margin.bottom;

// Creating the SVG wrapper to append the SVG gorup which will hold the chart

let  svg = d3.select(".scatter") 
    .append("svg")
    .attr("width", svgWidth)
    .attr("heigh", svgHeigth);