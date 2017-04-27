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

  // Returns true if all conditions matches.
  match(record) {
    return this.conditions.every(condition => {
      return condition.match(record)
    });
  }

  // Parse from JSON. In the JSON file the key is named "predicates"
  static parseJsonArray(data) {
    return data.map(entry => {
      const newTrigger = new Trigger();
      newTrigger.categoryPath = entry.category_path;
      newTrigger.conditions = Condition.parseJsonArray(entry.predicates);
      return newTrigger;
    });
  }

}

module.exports = Trigger
