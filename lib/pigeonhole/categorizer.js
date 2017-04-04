'use strict';

const fs = require('fs');

class Categorizer {

  constructor(path) {
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

  normalize(paths) {

    paths = paths.map(this.dasherize)

    let deepest = paths.filter(path => {
      return !paths.some(otherPath => {
        return otherPath != path && otherPath.includes(path)
      });
    });

    let unique = deepest.filter((v, i, a) => a.indexOf(v) === i);
    return unique.map(this.undasherize);

  }

  categorize(bucket, tree) {

    let candidates = tree.map(node => {
      return this.data[bucket].mapped[node];
    }).filter(v => v);

    return this.normalize(candidates)
  }

}

module.exports = Categorizer
