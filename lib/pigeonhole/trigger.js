'use strict';

const Condition = require('./condition.js');

class Trigger {

  constructor() {
    this.categoryPath = null;
    this.depth = 0; // NOTE: This is probably not needed!?
    this.conditions = [];
  }

  match(record) {
    return this.conditions.every(condition => {
      return condition.match(record)
    });
  }

  static parseJsonArray(data) {
    return data.map(entry => {
      let newTrigger = new Trigger();
      newTrigger.categoryPath = entry.category_path;
      newTrigger.conditions = Condition.parseJsonArray(entry.predicates);
      return newTrigger;
    });
  }

}

module.exports = Trigger
