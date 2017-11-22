'use strict';

const fs = require('fs');
const Tree = require('./tree.js');

class Categorizer {

  constructor(path) {
    if(!path) {
      return new Error("new Categorizer() must provide JSON filepath");
    }
    this.data = {}
    this.loadDataFromFile(path);
  }

  loadDataFromFile(filepath) {
    const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    this.data = data;
  }

  isBanned(bucket, tree) {
    const banned = this.data[bucket].banned;
    return banned.some(x => tree.includes(x) )
  }

  toCategory(bucket, merchantCategoryName) {
    return this.data[bucket].mapped[merchantCategoryName];
  }

  categorizeOne(bucket, tree) {
    if(!Array.isArray(tree)) return [];
    const candidate = tree.find(this.toCategory.bind(this, bucket));
    return(Tree.fromPaths([candidate]));
  }

  categorize(bucket, tree) {

    if(!this.data[bucket] || !Array.isArray(tree)) return [];

    const candidates = tree.map(this.toCategory.bind(this, bucket))
      .filter(v => v);

    return(Tree.fromPaths(candidates));

  }

}

module.exports = Categorizer
