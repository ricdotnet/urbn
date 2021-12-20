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

### Types
Added type definition to use with typescript.
```typescript
import {Urbn} from 'urbn';
const u = new Urbn();

u.getFirst(term: string): Promise<object>;
u.getAll(term: string): Promise<object>;
u.getRandom(): Promise<object>;
u.getRandom(term: string): Promise<object>;
// using getRandom('term') will return a single definition
// as opposed to getFirst() it will return one random from an array of 10
```