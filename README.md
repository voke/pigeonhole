
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

## Example usage

```js

const Pigonehole = require('pigeonhole');

let pigeonhole = new Pigonehole('path/to/source/file.json');

let sampleRecord = {
  name: 'Runt bord med hjul',
  description: 'Ett runt träbord med svarta hjul.',
  merchant_category: ['bord', 'hem & inredning', 'möbler']
}

pigeonhole.evaluate(sampleRecord) // => [123,567]
```

## Source file
The source file contains a JSON array with triggers. Each trigger has an
Array named `categoryPath` and one or more `conditions/predicates` that
must be satisfied for the trigger to match.

### Example source file
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

## Conditions/Predicates

Every conditions consists of three params: `key`, `operator` and `value`.
The `key` is the name of the attribute, `operator` is .... and `value` is
a `Regexp` OR `Number`.

## Record
Record is simply a JSON Object representing the Product.


## How it works

1. We iterate through all triggers and collect the `categoryPath` for triggers that matches the given `record{}`.

2. When we have a unique Array of ids we loop once again but
   with `category_ids=[]` set to given id.
