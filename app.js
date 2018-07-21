var width = 960,
    height = 490;

d3.select('svg')
  .attr('width', width)
  .attr('height', height);

var worldProjection = d3.geoEquirectangular();

var geoPath = d3.geoPath()
    .projection(worldProjection);

d3.select('svg').selectAll('path')
  .data(map_json.features)
  .enter()
  .append('path')
  .attr('fill', '#099')
  .attr('d', geoPath)
