
const assert = require('assert');
const Expression = require('../../lib/pigeonhole/expression.js');

let exp = new Expression('*foo,*bar*');

assert.deepEqual(/foo\b|bar/i, exp.compile());
