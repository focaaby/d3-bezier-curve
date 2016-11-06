var width = 1200, height = 600;

var svg = d3.select("body")
            .append("svg")
            .attr({"width": width, "height": height});


var points = d3.range(1, 5).map(function(i) {
  return { "x": i * width / 5, "y": 50 + Math.random() * (height - 100) };
});

var line = d3.svg.line()
                  .x(function(d) { return d.x; })
                  .y(function(d) { return d.y; })
                  .interpolate("linear");

bezier(points, 0);

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
                    bezier(points, 0);
                    d3.select(this)
                      .attr("cx", d.x = d3.event.x)
                      .attr("cy", d.y = d3.event.y);
                  })
                  .on("dragend", function() { d3.select(this).classed("active", false); }));

function getMids(points) {
  var tmp = [];
  for (var i = 0; i < points.length - 1; i++) {
    tmp.push({ "x": (points[i].x + points[i+1].x)/2, "y": (points[i].y + points[i+1].y)/2});
  }
  return tmp;
}


function bezier(points, order) {

  var mid1 = getMids(points);
  var mid2 = getMids(mid1);
  var q = getMids(mid2);
  var leftSide = [points[0], mid1[0], mid2[0], q[0]];
  var rightSide = [q[0], mid2[1], mid1[2], points[3]];

  if (order > 3) {
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

  bezier(leftSide, order + 1);
  bezier(rightSide, order + 1);

}
