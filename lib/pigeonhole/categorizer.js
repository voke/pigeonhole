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
    let data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    this.data = data;
  }

  isBanned(bucket, tree) {
    let banned = this.data[bucket].banned;
    return banned.filter(x => tree.indexOf(x) == -1).length == 0
  }

  categorize(bucket, tree) {

    if(!Array.isArray(tree)) return [];

    let candidates = tree.map(node => {
      return this.data[bucket].mapped[node];
    }).filter(v => v);

    //console.log("Candidates:", candidates);

    return(new Tree(candidates));

  }

}

module.exports = Categorizer
