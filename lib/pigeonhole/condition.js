'use strict';

const Expression = require('./expression.js');

class Condition {

  constructor() {
    this.key = null;
    this.operator = null;
    this.value = null;
  }

  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  match(record) {

    let term = record[this.key];

    if(!term) {
      //console.log('Undefined key [' + this.key + '] for record: ', record);
      return false;
    }

    // NOTE: This is used to look for id (123) in category_ids[]
    if(this.isNumber(this.value) && Array.isArray(term.constructor)) {
      return term.includes(this.value);
    }

    if(Array.isArray(term.constructor)) {
      term = term.join(' ')
    }

    // Support different kinds of operators
    let regexp = new Expression(this.value).compile();
    return regexp.test(term);

  }

  static parseJsonArray(data) {
    return data.map(entry => {
      let newCondition = new Condition();
      newCondition.key = entry.key;
      newCondition.operator = entry.operator;
      newCondition.value = entry.value;
      return newCondition;
    });
  }

}

module.exports = Condition
