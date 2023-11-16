class LinkedListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

class LinkedList {
  constructor() {
    /** @var LinkedListNode */
    this.head = null;

    /** @var LinkedListNode */
    this.tail = null;
  }

  printAllNumbers() {
    let currentNode = this.head;
    while (currentNode.next) {
      console.log(currentNode.value);
      currentNode = currentNode.next;
    }
  }

  insertFirst(value) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  insertLast(value) {
    if (!this.head) {
      this.insertFirst(value);
    } else {
      const newNode = new LinkedListNode(value);

      let currentNode = this.head;

      while (currentNode.next != null) {
        currentNode = currentNode.next;
      }
      currentNode.next = newNode;
      this.tail = newNode;
    }

    return this;
  }

  insertByIndex(value, index) {
    if (index <= 0) {
      this.insertFirst(value);
    } else {
      let count = 1;
      const newNode = new LinkedListNode(value);
      let currentNode = this.head;

      while (currentNode) {
        if (count === index) break;
        count++;
        currentNode = currentNode.next;
      }
      if (currentNode) {
        newNode.next = currentNode.next;
        currentNode.next = newNode;
      } else {
        if (this.tail) {
          this.tail.next = newNode;
          this.tail = newNode;
        } else {
          this.head = newNode;
          this.tail = newNode;
        }
      }
    }

    return this;
  }

  delete(value) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    while (this.head && this.head.value === value) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      while (currentNode.next) {
        if (currentNode.next.value == value) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if (this.tail.value === value) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  reverse() {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      nextNode = currNode.next;
      currNode.next = prevNode;

      prevNode = currNode;
      currNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}

var linkedList = new LinkedList();

linkedList.insertFirst(2);
linkedList.insertFirst(3);
linkedList.insertFirst(4);
linkedList.insertLast(25);
linkedList.insertLast(58);
linkedList.insertLast(77);
linkedList.insertFirst(88);
linkedList.insertByIndex(14, 3);
linkedList.insertByIndex(66, 6);
linkedList.delete(66);
linkedList.reverse();

linkedList.printAllNumbers();
