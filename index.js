var svg = d3.select('body')
            .append('svg')
            .attr({'width': 1200, 'height': 600})

var points = [{x: 20, y: 250}, {x: 20, y: 30}, {x: 100, y: 20}, {x: 200, y: 250}];

var line = d3.svg.line()
                  .x(function(d) { return d.x; })
                  .y(function(d) { return d.y; })
                  .interpolate("linear");

var path = svg.append("path")
              .attr("d", line(points))
              .attr("stroke", "steelblue")
              .attr("stroke-width", "2")
              .attr("fill", "none");

var circle = svg.selectAll("circle")
                .data(points)
                .enter()
                .append("circle")
                .attr("cx", function(d) { return d.x})
                .attr("cy", function(d) { return d.y})
                .attr("r", 6.5)
                .attr("stroke", "steelblue")
                .call(d3.behavior.drag()
                  .on("dragstart", function(d) {
                    this.__origin__ = [d.x, d.y];
                  })
                  .on("drag", function(d) {
                    d.x = Math.min(1200, Math.max(0, this.__origin__[0] += d3.event.dx));
                    d.y = Math.min(600, Math.max(0, this.__origin__[1] += d3.event.dy));
                    // bezier = {};
                    update();
                    svg.selectAll("circle")
                      .attr("cx", function(d) { return d.x})
                      .attr("cy", function(d) { return d.y})
                  })
                  .on("dragend", function() {
                    delete this.__origin__;
                  }));

function update() {

  d3.selectAll("path").remove();

  path = svg.append("path")
            .attr("d", line(points))
            .attr("stroke", "steelblue")
            .attr("stroke-width", "2")
            .attr("fill", "none");
}
