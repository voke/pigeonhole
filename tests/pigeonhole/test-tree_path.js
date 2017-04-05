
const assert = require('assert');
require('../../lib/pigeonhole/array.js'); // TODO: Include this somewhere else
const TreePath = require('../../lib/pigeonhole/tree_path.js');

let ids = TreePath.normalize([[1,2,3],[1,2],[1]]);

assert.deepEqual([3], ids);
