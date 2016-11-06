var svg = d3.select('body')
            .append('svg')
            .attr({'width': 1200, 'height': 600})

var points = [{x: 20, y: 250}, {x: 20, y: 30}, {x: 100, y: 20}, {x: 200, y: 250}];

var line = d3.svg.line()
                  .x(function(d) { return d.x; })
                  .y(function(d) { return d.y; })
                  .interpolate("linear");

bezier(points[0], points[1], points[2], points[3], 0);

var circle = svg.selectAll("circle")
                .data(points)
                .enter()
                .append("circle")
                .attr("cx", function(d) { return d.x})
                .attr("cy", function(d) { return d.y})
                .attr("r", 10)
                .attr("stroke", "steelblue")
                .call(d3.behavior.drag()
                  .on("dragstart", function(d) { d3.select(this).classed("active", true); })
                  .on("drag", function(d) {
                    d3.selectAll("path").remove();
                    bezier(points[0], points[1], points[2], points[3], 0);
                    d3.select(this)
                      .attr("cx", d.x = d3.event.x)
                      .attr("cy", d.y = d3.event.y);
                  })
                  .on("dragend", function() { d3.select(this).classed("active", false); }));



function bezier(p1, p2, p3, p4, order) {

  // d3.selectAll("path").remove();

  var p12 = { "x":(p1.x + p2.x) / 2, "y": (p1.y + p2.y)/2 },
      p23 = { "x":(p3.x + p2.x) / 2, "y": (p3.y + p2.y)/2 },
      p34 = { "x":(p3.x + p4.x) / 2, "y": (p3.y + p4.y)/2 };

  var p123 = { "x": (p12.x + p23.x) / 2, "y": (p12.y + p23.y)/2 },
      p234 = { "x": (p23.x + p34.x) / 2, "y": (p23.y + p34.y)/2 };

  var q = { "x": (p123.x + p234.x) / 2, "y": (p123.y + p234.y)/2 };

  var leftSide = [p1, p12, p123, q];
  var rightSide = [q, p234, p34, p4];

  if (order > 3) {
    // return;
    var leftpath = svg.append("path")
                  .attr("d", line(leftSide))
                  .attr("stroke", "steelblue")
                  .attr("stroke-width", "2")
                  .attr("fill", "none");

    var rightpath = svg.append("path")
                  .attr("d", line(rightSide))
                  .attr("stroke", "steelblue")
                  .attr("stroke-width", "2")
                  .attr("fill", "none");
    return;
  }

  bezier(p1, p12, p123, q, order + 1);
  bezier(q, p234, p34, p4, order + 1);
}
