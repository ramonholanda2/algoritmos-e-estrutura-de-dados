class StackNode {
  constructor(data) {
    this.data = data;
    this.next = null
  }
}
class Stack {
  constructor() {
    this.top = null;
  }

  peek() {
    return this.top.data;
  }

  push(value) {
    const newStackNode = new StackNode(value);
    newStackNode.next = this.top;
    this.top = newStackNode;
  }
  pop() {
    this.top = this.top.next;
  }
}

const stack = new Stack()

stack.push(2)
stack.push(88)
stack.push(3)
stack.pop()
console.log(stack)