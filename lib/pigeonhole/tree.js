'use strict';

const Node = require('./node.js');

class Tree {

  constructor(nodes = []) {
    this.nodes = nodes;
  }

  static fromPaths(arrayOfPaths) {
    const nodes = arrayOfPaths.map(path => {
      return Node.from(path);
    });
    return(new Tree(nodes));
  }

  includes(id) {
    return this.flattened.includes(parseInt(id));
  }

  // Get flat version of node ids
  get flattened() {
    return this.nodes.reduce(( acc, cur ) => acc.concat(cur),[]);
  }

  // Delegate length to nodes array
  get length() {
    return this.nodes.length;
  }

  // Normalize and return only the last id for each node
  toIds() {
    return this.normalize().map(node => node.last());
  }

  // Return unique ids
  toUniqIds(arr = this.toIds()) {
    return arr.filter((v, i, a) => a.indexOf(v) === i);
  }

  arrayEqual(arr1, arr2) {
    var length = arr1.length
    if (length !== arr2.length) return false
    for (var i = 0; i < length; i++)
      if (arr1[i] !== arr2[i])
        return false
    return true
  }

  winnerIds() {
    let arr = this.normalize();
    const maxScore = Math.max.apply(null, arr.map(x => x.score));
    return this.toUniqIds(arr.filter(x => {
      return x.score == maxScore;
    }).map(x => x.last()));
  }

  // Equals metoden där jämför Arrays
  normalize() {
    return this.nodes.filter(node => {
      return !this.nodes.some(otherNode => {
        return !this.arrayEqual(otherNode,node) && otherNode.includes(node.last());
      });
    });
  }

  // Create copy of object
  clone() {
    return(new Tree(this.nodes.slice()));
  }

  // Check if this equals another tree
  equals(other) {
    return this.arrayEqual(other.toUniqIds(), this.toUniqIds());
  }

}

module.exports = Tree;
