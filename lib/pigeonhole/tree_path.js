'use strict';

class TreePath {

  static normalize(paths) {

    // Only keep the deepest paths
    let deepest = paths.filter(path => {
      return !paths.some(otherPath => {
        return !otherPath.equals(path) && otherPath.includes(path[path.length - 1])
      });
    });

    // Grab only last id for each path
    let finalIds = deepest.map(path => {
      return path[path.length - 1];
    })

    // Get only unique ids
    return finalIds.filter((v, i, a) => a.indexOf(v) === i);

  }

}

module.exports = TreePath;
