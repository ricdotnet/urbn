### Get Urban Dictionary definitions displayed on your app the easy way
***
This package uses promises to allow for asynchronous requests natively.
***

#### Install
```shell
npm install urbn
```

#### Usage
Two different ways you can use this, as shown below.
```javascript
const u = require('urbn').Urbn();
u.getFirst('term');

//------------//

const u = require('urbn');
u.Urbn().getFirst('term');

// available methods
.getFirst(term);
.getAll(term);
```