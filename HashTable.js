/* class HashTableNode {
  constructor() {
    this.key = null;
    this.value = null;
  }
}
class HashTable {
  constructor(hashTableSize = 32) {
    this.buckets = Array(hashTableSize)
      .fill(null)
      .map(() => new HashTableNode());
    this.keys = {};
  }

  hash(key) {
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => hashAccumulator + keySymbol.charCodeAt(0),
      0
    );
    return hash % this.buckets.length;
  }

  set(key, value) {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash;
    const bucket = this.buckets[keyHash];
    const node = bucket.key === key;
    if (!node) {
      bucket.key = key;
      bucket.value = value;
    } else {
      bucket.value = value;
    }
  }

  getValueByKey(key) {
    const node = this.buckets[this.hash(key)];
    return node ? node.value : undefined;
  }

  getKeys() {
    return Object.keys(this.keys);
  }

  getValues() {
    return this.buckets
      .filter((node) => node.value !== null)
      .map((node) => node.value);
  }
}
const hashTable = new HashTable();
hashTable.set("nome", "ramon");
hashTable.set("idade", 19);
hashTable.set("sexo", "M");
hashTable.set("idade", 21);
hashTable.getValueByKey("idade");
hashTable.getKeys();
hashTable.getValues()
console.log(hashTable);
 */