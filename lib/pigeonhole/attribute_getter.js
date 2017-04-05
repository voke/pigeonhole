'use strict';

class AttributeGetter {

  static aliases() {
    return({
      "text": ['merchant_category', 'name', 'description'],
      "category_id": ['category_ids']
    });
  }

  static getValue(record, key) {

    let keys = this.aliases()[key];

    if(keys && keys.length > 0) {
      return keys.map(key => {
        return record[key];
      }).reduce(( acc, cur ) => acc.concat(cur),[]).filter(v => v)
    } else {
      return record[key];
    }

  }

}

module.exports = AttributeGetter
