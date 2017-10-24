
# Pigeonhole
```
		Pigeonhole
                        -
    \                  /   @ )
      \             _/_   |~ \)
        \     ( ( (     \ \
         ( ( ( ( (       | \
_ _=(_(_(_(_(_(_(_  _ _ /  )
                -  _ _ _  /
                      _\___
```

> Pigeonholing is any process that attempts to classify disparate entities into a small number of categories

## Categorizer

Map an arbitrary merchant category to a primary category.

```js

const Categorizer = require('pigeonhole').Categorizer

let categorizer = new Categorizer('path/to/source/file.json')

let record = {
  bucket: 'superstore',
  merchant_category: ['furniture', 'decor', 'lamps']
}

categorizer.categorize(record.bucket, record.merchant_category) // => [123, 123]
```

#### Source file
See fixture folder for markup

## Mapper

```js

const Pigonehole = require('pigeonhole')

let mapper = new Pigonehole.Mapper('path/to/source/file.json')

let record = {
  name: 'Runt bord med hjul',
  description: 'Ett runt träbord med svarta hjul.',
  merchant_category: ['bord', 'hem & inredning', 'möbler']
}

mapper.evaluate(record) // => [123,567]
```

### Mapper Source file
The source file contains a JSON array with triggers. Each trigger has an
Array named `categoryPath` and one or more `conditions/predicates` that
must be satisfied for the trigger to match.

#### Example source file for mapper
```json
[  
   {  
      "category_path":[  
         1,
         2
      ],
      "predicates":[  
         {  
            "key":"name",
            "operator":1,
            "value":"\\bbord"
         }
      ]
   }
]
```

### Conditions/Predicates

Every conditions consists of three params: `key`, `operator` and `value`.
The `key` is the name of the attribute, `operator` is .... and `value` is
a `Regexp` OR `Number`.

### Record
Record is simply a object representing the product.
