'use strict';

const Expression = require('./expression.js');
const AttributeGetter = require('./attribute_getter.js');
const Tree = require('./tree.js');

class Condition {

  constructor(key, operator, value) {
    this.key = key;
    this.operator = operator;
    this.value = this.compileValue(value);
  }

  // NOTE: Dummy method to simulate score from condition key
  get score() {
    return({ name: 3, description: 2, merchant_category: 1 }[this.key] || 0);
  }

  compileValue(val) {
    return this.isNumber(val) ? val : Expression.compile(val);
  }

  isNumber(n) {
    return !isNaN(n);
  }

  match(record) {

    let term = AttributeGetter.getValue(record, this.key);

    if(!term) {
      return false;
    }

    // This is used to look for number (123) in category_ids<Tree>
    // TODO: Should this be used for Arrays too?
    if(this.isNumber(this.value) && ((term instanceof Tree) || Array.isArray(term))) {
      return term.includes(this.value);
    }

    // Rewrite ["Möbler", "Bord"] to "Möbler Bord" to match with regexp
    if(Array.isArray(term)) {
      term = term.join(' ')
    }

    if(this.value instanceof RegExp) {
      return this.value.test(term);
    } else {
      return term.includes(this.value);
    }

  }

  static parseJsonArray(data) {
    return data.map(entry => {
      return new Condition(entry.key, entry.operator, entry.value);
    });
  }

}

module.exports = Condition
