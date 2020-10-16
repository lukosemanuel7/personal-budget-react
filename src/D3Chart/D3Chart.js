import React, { useState, useEffect } from "react";
import * as d3 from 'd3';
import { getBudgetData } from '../Axios/Axios';


const D3Chart = () => {
  const [data, setData] = useState({
    title: [],
    budget: [],
  });

  const width = 500;
  const height = 400;
  const margin = 50;
  const radius = Math.min(width, height) / 2 - margin;
  const getMidAngle = (d) => d.startAngle + (d.endAngle - d.startAngle) / 2;

  const title = data;
  
  const createChart = (data) => {
    
    var pie = d3.pie().value((d) => d.budget);

    var arc = d3.arc()
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0.4);

    var outerArc = d3.arc()
      .outerRadius(radius * 0.9)
      .innerRadius(radius * 0.9);

     
    let colors = d3.scaleOrdinal()
    .domain(data.map(d => d.budget.toString()))
    .range([
        '#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00'
    ]);
      
    
    var svg = d3.select(".D3Chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr(
        "transform", 
    'translate(' + width / 2 + ',' + height / 2 + ')'
    );


    svg.selectAll("pieces")
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', arc
      .innerRadius(radius * .4)
      .outerRadius(radius * .8)
    )
    .attr("fill", (d) => colors(d.data.title))
    .attr('stroke', '#FFFFFF')
    .style('stroke-width', '1px');

    svg.selectAll("polyline")
      .data(pie(data))
      .enter()
      .append("polyline")
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .style("fill", "none")
      .attr("points", (d) => {
        var posA = arc.centroid(d);
        var posB = outerArc.centroid(d);
        var posC = outerArc.centroid(d);
        var midAngle = getMidAngle(d);
        posC[0] = radius * 0.95 * (midAngle < Math.PI ? 1 : -1);
        return [posA, posB, posC];
      });

    svg.selectAll("labels")
      .data(pie(data))
      .enter()
      .append("text")
      .text((d) => d.data.title)
      .attr("transform", (d) => {
        var pos = outerArc.centroid(d);
        var midAngle = getMidAngle(d);
        pos[0] = radius * 0.99 * (midAngle < Math.PI ? 1 : -1);
        return `translate(${pos})`;
      })
      .style("text-anchor", (d) => {
        var midAngle = getMidAngle(d);
        return midAngle < Math.PI ? "start" : "end";
      });
  };

  useEffect(() => {
    const getData = () => {
        getBudgetData().then((res) => {
          createChart(res.data.myBudget);
          setData({
            title: res.data.myBudget.map((res) => {
              return res.title;
            }),
            budget: res.data.myBudget.map((res) => {
              return res.budget;
            }),
          });
        });
      };

    getData();
  }, []);

  return <figure id="d3chart"></figure>;
};
  
export default D3Chart;