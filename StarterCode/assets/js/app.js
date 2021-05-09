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
let height = svgHeigth - margin.top - margin.bottom;

// Creating the SVG wrapper to append the SVG gorup which will hold the chart


let svg = d3.select("#scatter") 
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeigth);

let chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Obtaining the data

d3.csv("assets/data/Data.csv").then( obs => {
    console.log(obs)

// 1. Parsing Data

    obs.forEach( d => {
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;
        d.Abr = +d.Abr
        //console.log(d.br)
    });

// 2. Creating scale functions

    let xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(obs, x => x.poverty)])
        .range([0, width])

    let yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(obs, y => y.healthcare )])
        .range([height, 0]);

// 3. Creating axis functions
    let bottomAxis = d3.axisBottom(xLinearScale);
    let leftAxis = d3.axisLeft(yLinearScale);

// 4. Appending axis to the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    
    chartGroup.append("g")
        .call(leftAxis);

// 5. Creating the circles
    let circlesGroup = chartGroup.selectAll("circle")
        .data(obs)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "10")
        .attr("fill", "blue")
        .attr("stroke", "red")
        .attr("opacity", ".4")
        .attr("stroke-width","1");

    let toolTip = d3.tip()
        .attr("class", ".d3-tip")
        .offset([30,-50])
        .html(tt => {
            `${tt.state}`
        })



}).catch( err => alert(err))