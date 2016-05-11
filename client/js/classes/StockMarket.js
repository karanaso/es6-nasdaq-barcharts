"use strict";

import superagent from 'superagent';

export default class GetStockValues {
  constructor( NSECode ) {
    this.urlJsonFeed = `http://www.google.com/finance/info?q=NASDAQ:${NSECode}`;
  }

  GetStockValues() {
    return new Promise( (resolve,reject) =>{
      superagent.get( this.urlJsonFeed ).end( (err,res) => {
        if (!err) {
          resolve(JSON.parse( res.text.substr(4) ));
        } else {
          reject( err );
        }
      });

    });
  }
}
