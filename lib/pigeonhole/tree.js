'use strict';

class Tree {

  constructor(arrayOfPaths = []) {
    this.nodes = arrayOfPaths;
  }

  includes(id) {
    return this.flattened.includes(id);
  }

  // Get flat version of node ids
  get flattened() {
    return this.nodes.reduce(( acc, cur ) => acc.concat(cur),[]);
  }

  // Normalize and return only the last id for each node
  toIds() {
    return this.normalize().map(path => {
      return path[path.length - 1];
    })
  }

  // Return unique ids
  toUniqIds() {
    return this.toIds().filter((v, i, a) => a.indexOf(v) === i);
  }

  arrayEqual(arr1, arr2) {
    var length = arr1.length
    if (length !== arr2.length) return false
    for (var i = 0; i < length; i++)
      if (arr1[i] !== arr2[i])
        return false
    return true
  }

  // Equals metoden där jämför Arrays
  normalize() {
    return this.nodes.filter(path => {
      return !this.nodes.some(otherPath => {
        return !this.arrayEqual(otherPath,path) && otherPath.includes(path[path.length - 1])
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
