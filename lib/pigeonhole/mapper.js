'use strict';

const Trigger = require('./trigger.js');
const fs = require('fs');
const Tree = require('./tree.js');
const Node = require('./node.js');

class Mapper {

  constructor(path) {
    if(!path) {
      return new Error("new Mapper() must provide JSON filepath");
    }
    this.triggers = [];
    this.loadDataFromFile(path);
  }

  loadDataFromFile(filepath) {
    const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    this.triggers = Trigger.parseJsonArray(data);
  }

  filterTriggers(triggers, categoryIds) {

    if(!(categoryIds instanceof Tree)) {
      throw new Error('categoryIds must be instance of Tree');
    }

    return triggers.filter(t => {
      return t.categoryPath.some(id => categoryIds.includes(id))
    });

  }

  debug() {
    //console.log(arguments)
  }

  evaluateWithCategoryIds(record, categoryIds, setCategory = true) {
    const haystack = this.filterTriggers(this.triggers, categoryIds);
    if(setCategory) { record.category_ids = categoryIds; }
    return this.evaluate(record, haystack);
  }

  // NOTE: We are open-minded. First time we run this on a record
  // we check against all triggers even if record has category_ids[]
  //
  // record - basic javascript object
  // haystack - Array of triggers
  // candidates - Two dimensional array contaning category paths Example: [[1,2,3],[1,2,3,4]]

  evaluate(record, haystack = this.triggers, candidates = [], tries = 0) {

    this.debug("Try #%d using %d triggers", tries, haystack.length);
    this.debug("category_id:", record.category_ids);

    if(record.category_ids == null) {
      record.category_ids = new Tree();
    }

    if(!(record.category_ids instanceof Tree)) {
      throw new Error('record.category_ids must be instance of Tree');
    }

    // Copy array to keep track of changes between iterations
    const currentCategoryIds = record.category_ids.clone();

    // Collect paths for matching triggers
    for(var i = 0; i < haystack.length; i++) {
      let trigger = haystack[i];
      if(trigger.match(record)) {
        let node = Node.from(trigger.categoryPath);
        node.score = trigger.score;
        candidates.push(node);
      }
    }

    const tree = new Tree(candidates);

    // Set record category ids
    record.category_ids = tree;

    this.debug("Before: ", currentCategoryIds);
    this.debug("After: ", record.category_ids);

    let continueSearch = false;

    // Check if this iteration changed the category_ids value.
    // If it did, we should continue looking deeper.
    if(!currentCategoryIds.equals(record.category_ids)) {
      continueSearch = true;
    }

    if(continueSearch) {
      const newHaystack = this.filterTriggers(haystack, record.category_ids);
      if(newHaystack.length > 0) {
        return this.evaluate(record, newHaystack, candidates, tries+1);
      } else {
        return record.category_ids;
      }
    } else {
      return record.category_ids;
    }

  }

}

module.exports = Mapper
