"use strict";

export default class LocalStorage {
  constructor(items) {
      this.ls_stocks = 'stocks';

      if (this.validateItem( items ) === true)
      {
        localStorage.setItem( this.ls_stocks, items );
      }
      else if (localStorage.getItem( this.ls_stocks ) === null)
      {
        localStorage.setItem( this.ls_stocks, ['goog','mtsi','hees','lgcy','athn','artx','swir','cvgi'] );
      }
  }

  validateItem = ( item ) => {
    return ( (item !== null) && (item !== undefined) && (item !== '') );
  }

  getItems = () => {
    let z =  localStorage.getItem( this.ls_stocks );
    return z.split(',');
  }


  checkForDuplicateItem = (item) => {
    return this.getItems().indexOf(item) > -1;
  }

  setItem = (item) => {
    if ( ( this.validateItem(item) === true) && (this.checkForDuplicateItem(item) !== true) ) {
      let items = this.getItems();
      items.push( item );
      localStorage.setItem( this.ls_stocks, items  );
      return true;

    } else {
      return false;
    }
  }

  removeItem = (item) => {
    let items = this.getItems().filter( ( _item) => { return _item !== item} );
    localStorage.setItem( this.ls_stocks, items);
  }

}
