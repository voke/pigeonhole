'use strict';

const Expression = require('./expression.js');
const AttributeGetter = require('./attribute_getter.js');
const Tree = require('./tree.js');

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

    let term = AttributeGetter.getValue(record, this.key);

    if(!term) {
      return false;
    }

    // This is used to look for number (123) in category_ids<Tree>
    // TODO: Should this be used for Arrays too?
    if(this.isNumber(this.value) && (term instanceof Tree)) {
      return term.includes(this.value);
    }

    // Rewrite ["Möbler", "Bord"] to "Möbler Bord" to match with regexp
    if(Array.isArray(term)) {
      term = term.join(' ')
    }

    // TODO: Support different kinds of operators
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
