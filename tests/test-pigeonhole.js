
const assert = require('assert');
const Pigeonhole = require('../pigeonhole.js');

let path = require('path');
let dummyPath = path.join(__dirname, 'fixtures', 'dummy.json');

let ph = new Pigeonhole(dummyPath);

let sampleRecord = {
  name: 'Runt bord med stolar'
}

// Test filterTriggers()
// let triggers = ph.filterTriggers([1,2]);
// assert.equal(triggers.length, 1);

let ids = ph.evaluate(sampleRecord);

assert.deepEqual(ids, [3]);
