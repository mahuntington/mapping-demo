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

const dragBehavior = d3.drag()
	.on('start', (event) => {
		d3.select('table tr:nth-child(2) td:first-child')
			.html(worldProjection.invert([event.x, event.y])[0])
		d3.select('table tr:nth-child(2) td:last-child')
			.html(worldProjection.invert([event.x, event.y])[1])

		d3.selectAll('rect').remove();
		d3.select('svg').append('rect')
			.attr('x', event.x)
			.attr('y', event.y);
	})
	.on('drag', (event) => {
		d3.select('table tr:nth-child(3) td:first-child')
			.html(worldProjection.invert([event.x, event.y])[0])
		d3.select('table tr:nth-child(3) td:last-child')
			.html(worldProjection.invert([event.x, event.y])[1])

		d3.select('rect').attr('width', event.x-d3.select('rect').attr('x'))
		d3.select('rect').attr('height', event.y-d3.select('rect').attr('y'))
	})

d3.select('svg').call(dragBehavior);

d3.select('form').on('submit', (event) => {
	event.preventDefault();

	d3.selectAll('rect').remove();

	const lat1 = d3.select('input:first-child').property('value');
	const lng1 = d3.select('input:nth-child(2)').property('value');
	const location1 = worldProjection([lat1, lng1]);
	const x1 = location1[0];
	const y1 = location1[1];

	const lat2 = d3.select('input:nth-child(4)').property('value');
	const lng2 = d3.select('input:nth-child(5)').property('value');
	const location2 = worldProjection([lat2, lng2]);
	const x2 = location2[0];
	const y2 = location2[1];

	d3.select('svg').append('rect')
		.attr('fill', '#000')
		.attr('x', x1)
		.attr('y', y1)
		.attr('width', x2-x1)
		.attr('height', y2-y1) 
});
