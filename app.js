var width = 1000,
    height = 600;

d3.select('svg')
  .attr('width', width)
  .attr('height', height);

var worldProjection = d3.geoNaturalEarth1();

var geoPath = d3.geoPath()
    .projection(worldProjection);

d3.select('svg').selectAll('path')
  .data(map_json.features)
  .enter()
  .append('path')
  .attr('fill', '#099')
  .attr('d', geoPath)
