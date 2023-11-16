class MinHeapInterface {
    constructor() {
        this.container = [];
    }
    pairIsInCorrectOrder(indexParent, currentIndex) {
        return indexParent <= currentIndex; 
    }
}

class PriorityQueue extends MinHeapInterface {
    constructor() {
        super();
        this.priorities = new Map();
        this.compare = null;
    }

    add(item, priority = 0) {
        this.priorities.set(item, priority);
        this.container.push(item);
        this.heapfyUp();
    }
    
    heapfyUp() {
        let currentIndex = this.container.length - 1;
        let isContainParent = true;
        let isCorrectOrder = false;
        let parent = 999;
        while(isContainParent && !isCorrectOrder) {
            parent = this.getParent(currentIndex);
            isContainParent = this.hasParent(currentIndex);
            isCorrectOrder = this.pairIsInCorrectOrder(parent)
            console.log(isContainParent);
            if(isContainParent) { 
                
            }
        }
    }
    hasParent(index) {
        return this.getParentIndex(index) >= 0;
    }
    getParent(index) {
        return this.container[this.getParentIndex(index)]

    }
    getParentIndex(index) {
        const parentIndex = (index-1) / 2;
        console.log("parent index: " + parentIndex);
        return Math.floor(parentIndex)
    }
}

const priorityQueue = new PriorityQueue();
priorityQueue.add(12, 2);
priorityQueue.add(12, 3);
console.log(priorityQueue)