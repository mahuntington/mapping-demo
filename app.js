var width = 8000,
    height = 6000;

var svg = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

var g = svg.append('g');

var albersProjection = d3.geoNaturalEarth1();
  // .scale(200000)
  // .scale(2000)
  // .rotate([0, 0])
  // .center([0, 0]);


var geoPath = d3.geoPath()
    .projection(albersProjection);

g.selectAll('path')
  .data(map_json.features)
  .enter()
  .append('path')
  .attr('fill', '#ccc')
  .attr('d', geoPath)
