const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

// class Node {
//   constructor(data) {
//     this.data = data;
//     this.left = null;
//     this.right = null;
//   }
// }

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
    this.currentNode = null;
    this.prevNode = null;
    this.flagHas = true;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);
    if (!this.rootNode) {
      this.rootNode = newNode;
      this.currentNode = this.rootNode;
      return this;
    }
    this.flagHas = false;
    if (!this.has(data)) {
      this.flagHas = true;
      this.currentNode = this.prevNode;
      this.prevNode = null;

      if (this.currentNode.data < data) {
        this.currentNode.right = newNode;
      } else {
        this.currentNode.left = newNode;
      }
    }

    this.currentNode = this.rootNode;
    return this;
  }

  has(data) {
    if (this.currentNode === null) {
      if (this.flagHas) {
        this.currentNode = this.rootNode;
      }
      return false;
    }

    if (this.currentNode.data === data) {
      if (this.flagHas) {
        this.currentNode = this.rootNode;
      }
      return true;
    }

    this.prevNode = this.currentNode;

    if (this.currentNode.data > data) {
      this.currentNode = this.currentNode.left;
    } else {
      this.currentNode = this.currentNode.right;
    }

    return this.has(data);
  }

  find(data) {
    this.flagHas = false;
    if (this.has(data)) {
      this.flagHas = true;
      const result = this.currentNode;
      this.currentNode = this.rootNode;
      this.prevNode = null;
      return result;
    }

    return null;
  }

  remove(data) {
    let deletedNode = null;
    let parentDeletedNode = null;
    let replaceableNode = null;

    this.flagHas = false;
    if (this.has(data)) {
      this.flagHas = true;

      deletedNode = this.currentNode;
      parentDeletedNode = this.prevNode;

      this.currentNode = this.rootNode;
      this.prevNode = null;
    }

    function leftOrRightNode(parent, child) {
      if (parent.data > child.data) {
        return "left";
      } else {
        return "right";
      }
    }

    if (deletedNode.left && deletedNode.right) {
      replaceableNode = deletedNode.right;

      while (replaceableNode.left) {
        replaceableNode = replaceableNode.left;
      }

      let newData = replaceableNode.data;
      this.remove(replaceableNode.data);
      deletedNode.data = newData;
    } else if (deletedNode.left == null && deletedNode.right == null) {
      let branch = leftOrRightNode(parentDeletedNode, deletedNode);
      parentDeletedNode[branch] = null;
    } else {
      replaceableNode = deletedNode.left || deletedNode.right;
      let branch = leftOrRightNode(parentDeletedNode, replaceableNode);
      parentDeletedNode[branch] = replaceableNode;
    }

    // let deletedNode = this.find(data);
    // let parentDeletedNode = null;
    //
    // if (!deletedNode) {
    //   return;
    // }

    // if (deletedNode.right) {
    //   replaceableNode = deletedNode.right;
    //   while (replaceableNode.left) {
    //     parentReplaceableNode = replaceableNode;
    //     replaceableNode = replaceableNode.left;
    //   }
    //   deletedNode.data = replaceableNode.data;
    //   if (replaceableNode.right) {
    //     this.remove(replaceableNode.data);
    //   } else {
    //     parentReplaceableNode.left = null;
    //   }
    // } else if (deletedNode.left) {
    //   this.rootNode = deletedNode.left;
    // } else {
    //   if (parentDeletedNode.data > deletedNode.data) {
    //     parentDeletedNode.left = null;
    //   } else {
    //     parentDeletedNode.right = null;
    //   }
    // }
  }

  min() {
    if (!this.rootNode) {
      return null;
    }

    while (this.currentNode.left) {
      this.currentNode = this.currentNode.left;
    }

    let result = this.currentNode.data;
    this.currentNode = this.rootNode;
    return result;
  }

  max() {
    if (!this.rootNode) {
      return null;
    }

    while (this.currentNode.right) {
      this.currentNode = this.currentNode.right;
    }

    let result = this.currentNode.data;
    this.currentNode = this.rootNode;
    return result;
  }
}

module.exports = {
  BinarySearchTree,
};
