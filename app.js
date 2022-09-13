const width = 960;
const height = 490;

d3.select('svg')
	.attr('width', width)
	.attr('height', height);

const worldProjection = d3.geoEquirectangular();
const dAttributeFunction = d3.geoPath()
	.projection(worldProjection);

d3.select('svg').selectAll('path')
	.data(map_json.features)
	.enter()
	.append('path')
	.attr('fill', '#099')
	.attr('d', dAttributeFunction);
