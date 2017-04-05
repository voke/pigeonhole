const Trigger = require('./trigger.js');
const fs = require('fs');
const Tree = require('./tree.js');

class Mapper {

  constructor(path) {
    if(!path) {
      return new Error("new Mapper() must provide JSON filepath");
    }
    this.triggers = [];
    this.loadDataFromFile(path);
  }

  loadDataFromFile(filepath) {
    let data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    this.triggers = Trigger.parseJsonArray(data);
  }

  filterTriggers(triggers, categoryIds) {

    if(!(categoryIds instanceof Tree)) {
      throw new Error('categoryIds must be an Array');
    }

    return triggers.filter(t => {
      return t.categoryPath.some(id => categoryIds.includes(id))
    });

  }

  debug() {
    console.log(arguments)
  }

  evaluateWithCategoryIds(record, categoryIds, setCategory = true) {
    let haystack = this.filterTriggers(this.triggers, categoryIds);
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

    //console.log("Try #%d using %d triggers", tries, haystack.length);
    //console.log("Record:", record);

    if(record.category_ids == null) {
      record.category_ids = new Tree();
    }

    if(!(record.category_ids instanceof Tree)) {
      throw new Error('record.category_ids must be instance of Tree');
    }

    // Copy array to keep track of changes between iterations
    let currentCategoryIds = record.category_ids.clone();

    // Collect paths for matching triggers
    for(var i = 0; i < haystack.length; i++) {
      let trigger = haystack[i];
      if(trigger.match(record)) {
        candidates.push(trigger.categoryPath);
      }
    }

    // Extract id for each path
    let ids = new Tree(candidates);

    // Set record category ids
    record.category_ids = ids

    //console.log("Before: ", currentCategoryIds);
    //console.log("After: ", record.category_ids);

    let continueSearch = false;

    // Check if this iteration changed the category_ids value.
    // If it did, we should continue looking deeper.
    if(!currentCategoryIds.equals(record.category_ids)) {
      continueSearch = true;
    }

    if(continueSearch) {
      let newHaystack = this.filterTriggers(haystack, record.category_ids);
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
