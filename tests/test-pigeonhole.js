
const assert = require('assert');
const Pigeonhole = require('../lib/pigeonhole.js');

let categorizer = new Pigeonhole.Categorizer('tests/fixtures/merchant_cats.json');
let mapper = new Pigeonhole.Mapper('tests/fixtures/triggers.json');

let record = {
  bucket_id: 'ahlens',
  name: 'stickad glittertröja',
  description: 'En väldigt fin stickad tröja',
  merchant_category: ["stickade tröjor", "kläder"],
  category_ids: [1,2,3]
}

let primaryIds = categorizer.categorize(record.bucket_id, record.merchant_category);
let finalIds = mapper.evaluateWithCategoryIds(record, primaryIds);

assert.deepEqual(finalIds.toUniqIds(), [33]);
