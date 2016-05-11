"use strict";

import D3Bar from './D3Bar';
import StockMarket from './StockMarket';

export default class D3BarRenderer {
  constructor( stockSymbol, title, divRenderer, updateInterval, removeSymbol ) {
    this.stockSymbol   = stockSymbol;
    this.title = title;
    this.divRenderer  = divRenderer;
    this.updateInterval = (updateInterval != 'undefined') ? updateInterval : 5000;
    this.data = [];
    this.removeSymbol = removeSymbol;

    //applyTemplate
    this.applyTemplate();

    //initiate D3Bar
    this.D3Bar = new D3Bar( this.divRenderer, this.data, this.stockSymbol );
    this.StockMarket = new StockMarket( this.stockSymbol );

    this.interval = setInterval( () => {
      this.redraw();
    }, this.updateInterval);
  }

  template = () => {
    this.id = this.divRenderer.substr(1);
    this.className = this.id;

    return `
      <div id="${this.id}" class="${this.className} chart col-lg-3 col-md-3 col-sm-4 col-md-6">
        <div class="well">
            <i class="fa fa-1x fa-close" style="float:right; margin-top:12px;"></i>
            <h4>${this.title}</h4>
            <hr />
            <div class="d3Bar text-center">
                <div class="pleaseWaitMessage">
                   <i class="fa fa-spin fa-3x fa-cog"></i>
                   <br />
                   <strong>Please wait  while fetching data</strong>
               </div>
            </div>
        </div>
      </div>
    `;
  };

  couldnotRetrieveData = () => {
    let template =  `
      <div class="text-center">
        OOooopssss !!!!
        <br />
        <strong>Unfortunatelly, I could not retrieve any data for stock symbol ${this.stockSymbol}</strong>
      </div>
    `;

    //terminate processes
    this.destructor();

    //update HTML
    document.getElementById( this.id ).getElementsByClassName('well')[0].getElementsByClassName('d3Bar')[0].outerHTML = template;
  }

  watch = () => {
    //listens for click on fa-close and closes the widget
    document.getElementById( this.id ).addEventListener('click', (elm) => {
      if ( elm.target.className.indexOf('fa-close') > 0) {
          this.closeTemplate();
      }
    });
  };

  applyTemplate = () => {
    let updateTemplate = document.getElementById('charts');
    updateTemplate.outerHTML += this.template();
    this.watch();
  };

  closeTemplate = () => {

    //call the object destructor;
    this.destructor();

    //notiy SymbolManager
    this.removeSymbol( this.id );
    //remove template

    document.getElementById( this.id ).remove();
  }

  destructor = () => {
    delete this.D3Bar;
    delete this.StockMarket;
    clearInterval( this.interval );
  };

  redraw = () => {
    this.StockMarket.GetStockValues().then( (resolve) => {
      this.data.push( parseFloat( resolve[0].l ) );
      this.D3Bar.updateData( this.data );
    }).catch( (reject) => {
      console.log(reject);
      this.couldnotRetrieveData();
    });
  };
}
