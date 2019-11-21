const scaling = 200;
  let lineGenerator = d3.line();
  let path;
  let svg;
  let text;
  let xShift = window.innerWidth / 2, yShift = window.innerHeight / 2, values = [];
  for (let t = 0; t < 2.2 * Math.PI; t += 0.05) {
    values.push([x(t) + xShift, y(t) + yShift]);
  }

  svg = d3.select('svg')
    .attr('width', window.innerWidth)
    .attr('height', window.innerHeight)
    .style('body', 'none');

  path = lineGenerator(values);
  svg.append('path')
    .attr('d', path)
    .style('stroke', '#000000')
    .style('stroke-width', '3')
    .style('fill', '#FFFFFF')
    .style('z-style', '-99');

  text = svg.append('text')
    .attr('x', window.innerWidth/2)
    .attr('y', window.innerHeight/2 + 150)
    .style('font', '20pt Times New Roman')
    .style('letter-spacing', '10px')
    .style('text-anchor', 'middle');

  let line = [
    [xShift, yShift],
    [xShift, yShift + 100],
    [xShift, yShift - 100],
    [xShift, yShift],
    [xShift + 150, yShift],
    [xShift + 150, yShift + 10],
    [xShift + 150, yShift - 10],
    [xShift + 150, yShift],
    [xShift - 150, yShift],
    [xShift - 150, yShift + 10],
    [xShift - 150, yShift - 10],
    [xShift - 150, yShift],
    [xShift, yShift],
    [xShift + 300, yShift],
    [xShift - 300, yShift]
  ];

  let xText = svg.append('text')
                .attr('x', xShift + 320)
                .attr('y', yShift + 5)
                .style('font', 'italic 20pt Times New Roman');

  let yText = svg.append('text')
                .attr('x', xShift - 5)
                .attr('y', yShift - 125)
                .style('font', 'italic 20pt Times New Roman');

  xText.text('x');
  yText.text('y');
  svg.append('path')
    .attr('d', lineGenerator(line))
    .attr('stroke', '#000000')
    .attr('stroke-width', '3');


  text.text("L  E  M  N  I  S  C  A  T  E");

  let trianglePath = [
    [0, 0],
    [window.innerWidth, 0],
    [0, window.innerHeight],
    [0, 0]
  ];

  svg.append('path')
    .attr('d', lineGenerator(trianglePath))
    .attr('fill', '#888888')
    .attr('stroke', '#888888')
    .style('opacity', '0.7');

function x(t) {
  return (Math.sqrt(2) * scaling * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
}

function y(t) {
  return (Math.sqrt(2) * scaling * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
}
