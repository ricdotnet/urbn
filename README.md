### Get Urban Dictionary definitions displayed on your app the easy way
***
This package uses promises to allow for easy and asynchronous urban dictionary requests.
***

#### Install
```shell
npm install urbn
```

#### Usage
Two different ways you can use this, as shown below.
```javascript
const u = require('urbn').Urbn();
u.getFirst('term')

//------------//

const u = require('urbn');
u.Urbn().getFirst('term')

//------------//

// available methods
.getFirst(term) // gets the first definition from the list
.getAll(term) // gets all from the "page"
.getRandom() // retrieves an array of random definitions
```