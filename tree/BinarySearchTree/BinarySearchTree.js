const BinaryTreeNode = require("../TreeNode");

class BinarySearchTreeNode extends BinaryTreeNode {
  constructor(value = null) {
    super(value);
  }

  insert(value) {
    if (this.value === null) {
      this.value = value;
      return this;
    }
    if (value < this.value) {
      if (this.left) {
        return this.left.insert(value);
      }

      const newNode = new BinarySearchTreeNode(value);
      this.setLeft(newNode);
      return newNode;
    }

    if (value > this.value) {
      if (this.right) {
        return this.right.insert(value);
      }

      const newNode = new BinarySearchTreeNode(value);
      this.setRight(newNode);
      return newNode;
    }

    return this;
  }

  remove(value) {
    const nodeRemove = this.find(value);

    if (!nodeRemove) {
      throw new Error("Este node não existe!");
    }

    const { parent } = nodeRemove;
    if (!nodeRemove.left && !nodeRemove.right) {
      if (parent) {
        parent.removeChild(parent);
      } else {
        nodeRemove.setValue(undefined);
      }
    } else if (nodeRemove.left && nodeRemove.right) {
      const nextBiggerNode = nodeRemove.right.findMin();
    }
  }

  find(value) {
    if (this.value === value) {
      return this;
    }
    if (value < this.value && this.left) {
      return this.left.find(value);
    }
    if (value > this.value && this.right) {
      return this.right.find(value);
    }
    return null;
  }

  findMin() {
    if(!this.left) {
      return this;
    }

    return this.left.findMin();
  }
}

class BinarySearchTree {
  constructor(value) {
    this.root = new BinarySearchTreeNode(value);
  }
  insert(value) {
    return this.root.insert(value);
  }

  remove(value) {
    return this.root.remove(value);
  }
}

const newBT = new BinarySearchTree(10);
newBT.insert(8);
newBT.insert(4);
console.log(newBT);
console.log(newBT.root.left.left);
