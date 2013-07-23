## Data Validations [![Build Status](https://secure.travis-ci.org/dresende/node-enforce.png?branch=master)](http://travis-ci.org/dresende/node-enforce)

This will be the package responsible for data validations in [ORM](http://dresende.github.io/node-orm2).

### Validators

#### `enforce.lists.inside(Array[, msg = "outside-list" ])`

Checks if the property is inside a list of items (the `Array`).

#### `enforce.lists.outside(Array[, msg = "inside-list" ])`

Checks if the property is not inside a list of items (the `Array`).
