
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

```js

const Categorizer = require('pigeonhole').Categorizer;

let categorizer = new Categorizer('path/to/source/file.json');

let sampleRecord = {
  merchant_category: ['bord', 'hem & inredning', 'möbler']
}

categorizer.categorize(sampleRecord) // => [123,456]
```

## Mapper

```js

const Pigonehole = require('pigeonhole');

let mapper = new Pigonehole.Mapper('path/to/source/file.json');

let sampleRecord = {
  name: 'Runt bord med hjul',
  description: 'Ett runt träbord med svarta hjul.',
  merchant_category: ['bord', 'hem & inredning', 'möbler']
}

mapper.evaluate(sampleRecord) // => [123,567]
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
Record is simply a JSON Object representing the Product.
