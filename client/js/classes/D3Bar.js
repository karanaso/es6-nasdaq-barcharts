"use strict";

import d3 from 'd3'

export default class D3Bar {

 constructor( renderDiv, data, stockSymbol, itemsBeforeShift ) {
    this.renderDiv = renderDiv;
    this.stockSymbol = stockSymbol;
    this.chart  = d3.select( this.renderDiv ).select('.d3Bar');
  }

  updateScaleLinear = () => {
    this.scale = d3.scale.linear()
    .domain([d3.max(this.data)-5, d3.max(this.data)+5])
    .range([0, 100]);

  };

  updateChart = () => {
    this.chart.attr('class','D3Bar');
  }

  barEnterUpdate = () => {
    this.barEnter.transition();
    this.barUpdate.style("width", (d) => { return this.scale(d)+ "%"; });
    this.barUpdate.attr('class','d3-col');
    this.barUpdate.text( (d) => {
      let time = new Date();
      return ` ${time.toTimeString().substring(0,8)}: ${d}`;
    });
  }

  updateData = (data) => {
    this.data = data;
    this.bar    = this.chart.selectAll('div');
    this.updateScaleLinear();
    this.barUpdate = this.bar.data(this.data);
    this.barEnter  = this.barUpdate.enter().append("div");
    this.barUpdate.exit().remove();
    this.updateChart();
    this.barEnterUpdate();
  }

}
