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
    let keyStore = this.hashMod(key);
    const newPair = new KeyValuePair(key, value);

    if (this.data[keyStore] === null) {
      this.data[keyStore] = newPair;
      this.count++;
    }
    else {
      // set keyvaluepair.next to equal the current value stored at array
      newPair.next = this.data[keyStore];
      // array key will point to new pair
      this.data[keyStore] = newPair;

      this.count++;
    }

  }

  insert(key, value) {
    // create new hashed index based on key
    let hashKeyIndex = this.hashMod(key);
    // create new keyValuePair based on key and value input
    const newPair = new KeyValuePair(key, value);

    // current array index is empty - add new key value pair
    if (this.data[hashKeyIndex] === null) {
      this.data[hashKeyIndex] = newPair;
      this.count++;
    }
    // current array index is not empty
    else {
      // see if key already exists at index. If so, update value
      // traverse linked list to do this
      let current = this.data[hashKeyIndex];
      let flag = 0;
      while (current) {
        if (current.key === key) {
          current.value = value;
          flag = 1;
        }
        current = current.next;
      }
      
      // key does not exist, therefore, enable linked list chaining
      if (flag === 0) {
        // set keyvaluepair.next to equal the current value stored at array
        newPair.next = this.data[hashKeyIndex];
        // array key will point to new pair
        this.data[hashKeyIndex] = newPair;
        // update keyValuePair count
        this.count++;
      }

    }

  }

}


module.exports = HashTable;