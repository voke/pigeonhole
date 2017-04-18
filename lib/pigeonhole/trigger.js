'use strict';

const Condition = require('./condition.js');

class Trigger {

  constructor() {
    this.categoryPath = null;
    this.depth = 0; // NOTE: This is probably not needed!?
    this.conditions = [];
  }

  // TODO: Should support setting score using setter (parsing it from JSON)
  get score() {
    return this.conditions.map(c => c.score).reduce((a, b) => a + b, 0);
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
