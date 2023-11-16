class NodeQueue {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    add(value) {
        const newNode = new NodeQueue(value);
        if(this.tail) {
            this.tail.next = newNode;
        } 
        this.tail = newNode;
        if(!this.head) {
            this.head = newNode;
        }
    }

    printAllQueue() {
        let current = this.head;
        while(current) {
            console.log(current.data)
            current = current.next;
        }
    }

    remove() {
        this.head = this.head.next;
        if(!this.head) {
            tail = null;
        }
    }
}

const queue = new Queue();
queue.add(5)
queue.add(7)
queue.add(9)
queue.add(10)
queue.add(25)
queue.add(33)
queue.add(44)
queue.remove()
queue.remove()
queue.remove()
queue.remove()
queue.printAllQueue()
