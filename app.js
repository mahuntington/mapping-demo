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

let points = [];
d3.select('svg').on('click', (event)=>{
	points.push([event.x, event.y])
	const path = d3.path();
	path.moveTo(points[0][0], points[0][1])
	for(let i = 1; i < points.length; i++){
		path.lineTo(points[i][0], points[i][1])
	}
	path.closePath()
	d3.select('#polygon').remove()
	d3.select('svg')
		.append('path')
		.attr('id', 'polygon')
		.attr('fill', 'black')
		.attr('d', path)
})
d3.select('body').on('keydown', (event)=>{
	d3.select('tbody').html('');
	for(point of points){
		const row = d3.select('tbody')
			.append('tr')
		row.append('td')
			.html(point[0])
		row.append('td')
			.html(point[1])
	}
	points = [];
})
