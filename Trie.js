class HashTableNode {
  constructor() {
    this.key = null;
    this.value = null;
  }
}

class HashTable {
  constructor(tableSize = 32) {
    this.buckets = [];
    this.keys = {};
    for (let i = 0; i < tableSize; i++) {
      this.buckets.push(new HashTableNode());
    }
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

  has(key) {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  getValueByKey(key) {
    const node = this.buckets[this.hash(key)];
    return node ? node.value : undefined;
  }

  getKeys() {
    return Object.keys(this.keys);
  }

  get(key) {
    const bucketLinkedList = this.buckets[this.hash(key)];
    const node = bucketLinkedList.find({
      callback: (nodeValue) => nodeValue.key === key,
    });

    return node ? node.value.value : undefined;
  }

  getValues() {
    return this.buckets
      .filter((node) => node.value !== null)
      .map((node) => node.value);
  }
}

class TrieNode {
  constructor(character, isCompleteWord = false) {
    this.character = character;
    this.isCompleteWord = isCompleteWord;
    this.children = new HashTable();
  }

  addChild(character, isCompleteWord = false) {
    if (!this.children.has(character)) {
      this.children.set(character, new TrieNode(character, isCompleteWord));
    }
  }

  suggestChildren() {
    return [...this.children.getKeys()];
  }

  toString() {
    let childrenAsString = this.suggestChildren().toString();
    childrenAsString = childrenAsString ? `:${childrenAsString}` : "";
    const isCompleteString = this.isCompleteWord ? "*" : "";

    return `${this.character}${isCompleteString}${childrenAsString}`;
  }
}

const HEAD_CHARACTER = "*";
class Trie {
  constructor() {
    this.head = new TrieNode(HEAD_CHARACTER);
  }

  addWord(word) {
    const characters = Array.from(word);
    let currentNode = this.head;

    for (let charIndex = 0; charIndex < characters.length; charIndex += 1) {
      const isComplete = charIndex === characters.length - 1;
      currentNode = currentNode.addChild(characters[charIndex], isComplete);
    }

    return this;
  }
}

var trie = new Trie();
trie.addWord("r");
trie.addWord("a");
trie.addWord("m");
trie.addWord("o");
trie.addWord("n");
trie.head.toString();
console.log(trie);