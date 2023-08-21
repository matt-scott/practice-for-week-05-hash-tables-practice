const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(numBuckets).fill(null);
  }

  hash(key) {
    let hash = sha256(key);
    hash = hash.slice(0,8);
    return parseInt(hash,16);
  }

  hashMod(key) {
    return (this.hash(key) % this.capacity);
  }

  insertNoCollisions(key, value) {
    let keyStore = this.hashMod(key);
    // check if element already at array index. if not, fill that index
    if (this.data[keyStore] === null) {
      const pair = new KeyValuePair(key, value);
      this.data[keyStore] = pair;
      this.count++;
    }
    else { // if array element at index, throw error
      throw new Error('hash collision or same key/value pair already exists!');
    }

  }

  insertWithHashCollisions(key, value) {
    // Your code here
  }

  insert(key, value) {
    // Your code here
  }

}


module.exports = HashTable;