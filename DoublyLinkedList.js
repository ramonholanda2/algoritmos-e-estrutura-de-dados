class DoublyLinkedListNode {
  constructor(value, next = null, prev = null) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }

  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}

class DoublyLinkedList {
    constructor() {
        /** @var LinkedListNode */
        this.head = null;

        /** @var LinkedListNode */
        this.tail = null;
    }

    addValue(value) {
        const newDoublyLinkedListNode = new DoublyLinkedListNode(value);
        if(!this.head) {
            this.head = newDoublyLinkedListNode;
            this.tail = newDoublyLinkedListNode;
        } else {
            newDoublyLinkedListNode.prev = this.tail;
            this.tail.next = newDoublyLinkedListNode;
            this.tail = newDoublyLinkedListNode;
        }

    }

    deleteValue(value) {
        if(!this.head) return null;
        let deletedNode = null;
        let currentNode = this.head;
        
        // percorre a lista
        while(currentNode) {
            // se encontrar o valor
            if(currentNode.value === value) {
                deletedNode = currentNode;
                if(deletedNode === this.head) {
                    this.head = deletedNode.next;
                    // atualiza o valor do head e retira a referencia do previous
                    if(this.head) {
                        this.head.prev = null; 
                    }

                    if(deletedNode === this.tail) {
                        this.tail = null;
                    }

                } else if(deletedNode === this.tail) {
                    this.tail = deletedNode.prev;
                    this.tail.next = null;
                } else {
                    const { next, prev } =  deletedNode;
                    prev.next = next;
                    next.prev = prev;
                }
            }
            currentNode = currentNode.next;
        }
        return deletedNode;
    }

    toArray() {
        const nodes = [];

        let currentNode = this.head;
        while(currentNode) {
            nodes.push(currentNode)
            currentNode = currentNode.next
        }
        return nodes;

    }


    reverse() {
        let currentNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while(currentNode) {
            prevNode = currentNode.prev;
            nextNode = currentNode.next;

            currentNode.next = prevNode;
            currentNode.prev = nextNode;

            prevNode = currentNode;
            currentNode = nextNode;
        }

        this.tail = this.head;
        this.head = prevNode;
    }
}

const doublyLinkedList = new DoublyLinkedList();

doublyLinkedList.addValue(5);
doublyLinkedList.addValue(4);
doublyLinkedList.addValue(6);
doublyLinkedList.addValue(8);
doublyLinkedList.deleteValue(6)
doublyLinkedList.reverse();


console.log(doublyLinkedList.toArray())