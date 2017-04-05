

const assert = require('assert');
const AttributeGetter = require('../../lib/pigeonhole/attribute_getter.js');

let record = {
  bucket_id: 'ahlens',
  name: 'stickad glittertröja',
  description: 'En väldigt fin stickad tröja',
  merchant_category: ["stickade tröjor", "kläder"],
  category_ids: [1,2,3]
}

let value = AttributeGetter.getValue(record, 'text');
let expected = ['stickad glittertröja',
  'En väldigt fin stickad tröja',
  'stickade tröjor', 'kläder'];

assert.deepEqual(value.sort(), expected.sort());

let num_value = AttributeGetter.getValue(record, 'category_id');
assert.deepEqual(num_value, [1,2,3]);
