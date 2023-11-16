class Heap {
  constructor() {
    if (new.target === Heap) {
      throw new Error("impossible create class Heap");
    }
    this.heapContainer = [];
  }
  add(item) {
    this.heapContainer.push(item);
    this.heapifyUp();
  }

  remove(item) {
    const numberOfItemsToRemove = this.find(item).length;

    for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
      const indexToRemove = this.find(item).pop();

      if (indexToRemove === (this.heapContainer.length - 1)) {
        this.heapContainer.pop();
      } else {
        this.heapContainer[indexToRemove] = this.heapContainer.pop();
        const parentItem = this.parent(indexToRemove);
        if (
          this.hasLeftChild(indexToRemove)
          && (
            !parentItem
            || this.pairIsInCorrectOrder(parentItem, this.heapContainer[indexToRemove])
          )
        ) {
          this.heapifyDown(indexToRemove);
        } else {
          this.heapifyUp(indexToRemove);
        }
      }
    }
  }

  heapifyUp(customStartIndex) {
    let currentIndex = customStartIndex || this.heapContainer.length - 1;
    while (
      this.hasParent(currentIndex) &&
      !this.pairIsInCorrectOrder(
        this.parent(currentIndex),
        this.heapContainer[currentIndex]
      )
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  heapifyDown(customStartIndex = 0) {
    let currentIndex = customStartIndex;
    let nextIndex = null;

    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex) &&
        this.pairIsInCorrectOrder(
          this.rightChild(currentIndex),
          this.leftChild(currentIndex)
        )
      ) {
        nextIndex = this.getRightChildIndex(currentIndex);
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex);
      }

      if (
        this.pairIsInCorrectOrder(
          this.heapContainer[currentIndex],
          this.heapContainer[nextIndex]
        )
      ) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  leftChild(parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }

  rightChild(parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }
  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }
  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  swap(indexOne, indexTwo) {
    const tmp = this.heapContainer[indexTwo];
    this.heapContainer[indexTwo] = this.heapContainer[indexOne];
    this.heapContainer[indexOne] = tmp;
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  find(item) {
    const indices = [];
    for (
      let itemIndex = 0;
      itemIndex < this.heapContainer.length;
      itemIndex++
    ) {
      if (this.heapContainer[itemIndex] === item) {
        indices.push(itemIndex);
      }
    }
    return indices;
  }

  pool() {
    if (this.heapContainer.length === 0) {
      return null;
    }
    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop();
    }

    const item = this.heapContainer[0];

    this.heapContainer[0] = this.heapContainer.pop();
    this.heapifyDown();

    return item;
  }

  hasParent(index) {
    return this.getParentIndex(index) >= 0;
  }
  parent(childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }
  pairIsInCorrectOrder(firstElement, secondElement) {
    throw new Error(`
      You have to implement heap pair comparision method
      for ${firstElement} and ${secondElement} values.
    `);
  }
}

class MaxHeap extends Heap {
  pairIsInCorrectOrder(firstElement, secondElement) {
    return firstElement >= secondElement;
  }
}
class MinHeap extends Heap {
  pairIsInCorrectOrder(firstElement, secondElement) {
    return firstElement <= secondElement;
  }
}

var maxHeap = new MaxHeap();
maxHeap.add(1);
maxHeap.add(2);
maxHeap.add(55);
maxHeap.add(33);
maxHeap.add(22);
maxHeap.add(44);
maxHeap.add(11);
maxHeap.remove(1)
maxHeap.remove(11)

console.log(maxHeap);
