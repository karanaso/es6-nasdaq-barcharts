"use strict";

import D3BarRenderer from './D3BarRenderer'
//import D3LineChartRenderer from './D3LineChartRenderer'
import LocalStorage from './LocalStorage'

export default class SymbolsManager {

  constructor( initialStockSymbols ) {
    this.persistence = new LocalStorage( initialStockSymbols );

    this.initialStockSymbols = this.persistence.getItems();
    //render template
    this.renderTemplate();

    //array that holds all d3BarRenderer objecys
    this.d3BarRenderer = [];

    //event handler
    this.watch();

    //initialize constructor symbols
    this.initializeSymbols();

  };

  removeSymbol = ( symbol ) => {
    this.persistence.removeItem( symbol );
  };

  //the template
  template = () => {
    return `
      <div class="container-fluid">
        <h3>Nasdaq Dashboard</h3>
        <div id="symbols" class="row">
          <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div class="input-group">
            <input id="symbol" type="text" class="form-control" placeholder="Please enter your stock i.e. goog for google">
            <span class="input-group-btn">
              <button class="btn btn-secondary _btnChart" type="button"><i class="fa fa-1x fa-area-chart"></i></button>
              <button class="btn btn-secondary _btnBar" type="button"><i class="fa fa-1x fa-bar-chart"></i></button>
            </span>
          </div>
        </div>
        <div id="charts" class="row"></div>
      </div>
    `;
  };

  //render the template
  renderTemplate = () => {
    document.body.innerHTML = this.template();
  }

  //event handlers
  watch = () => {
    document.body.getElementsByClassName('_btnChart')[0].addEventListener('click', (evt) => {
        let stockSymbol = document.getElementById('symbol').value;
        alert('it still needs work, try the barChart button right next to this one');
        this.insertNewStockChart( stockSymbol,'lineChart' );
    });

    document.body.getElementsByClassName('_btnBar')[0].addEventListener('click', (evt) => {
        let stockSymbol = document.getElementById('symbol').value;
        this.insertNewStockChart( stockSymbol,'barChart' );
    });

  };

  //insert new stock chart
  insertNewStockChart = (symbol, chartType) => {
    if ( (symbol !== '') && (symbol !== null) && (symbol.length >= 4) ) {
      if ( (chartType == undefined) || (chartType === 'barChart') ) {
        this.d3BarRenderer.push(
          new D3BarRenderer(symbol, symbol.toUpperCase() ,'.'+symbol, 5000, this.removeSymbol)
        );
      } else if (chartType == 'lineChart') {
        alert('it still needs work, try the barChart button right next to this one');
        // this.d3BarRenderer.push(
        //   new D3LineChartRenderer(symbol, symbol.toUpperCase() ,'.'+symbol, 5000)
        // );
      }
      this.persistence.setItem( symbol );
    }
  };

  //initialize symbols passed in constructor
  initializeSymbols = () => {
    if ( (typeof this.initialStockSymbols === 'object') && (this.initialStockSymbols !== 'undefined') && (this.initialStockSymbols.length > 0) ) {
      this.initialStockSymbols.forEach( (symbol) => {
        this.insertNewStockChart( symbol );
      });
    }
  }

}
