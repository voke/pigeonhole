'use strict';

const fs = require('fs');
const TreePath = require('./tree_path.js');

class Categorizer {

  constructor(path) {
    if(!path) {
      return new Error("new Categorizer() must have JSON filepath");
    }
    this.data = {}
    this.loadDataFromFile(path);
  }

  loadDataFromFile(filepath) {
    let data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    this.data = data;
  }

  isBanned(bucket, tree) {
    let banned = this.data[bucket].banned;
    return banned.filter(x => tree.indexOf(x) == -1).length == 0
  }

  categorize(bucket, tree) {

    let candidates = tree.map(node => {
      return this.data[bucket].mapped[node];
    }).filter(v => v);

    return TreePath.normalize(candidates)

  }

}

module.exports = Categorizer
