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
    // this.flagHas = false;
    // if (this.has(data)) {
    //   this.flagHas = true;
    //   let prevDeletedNode = this.prevNode;
    //   let deletedNode = this.currentNode;
    //   let nestedNode = null;
    //   function leftOrRightInsert(nested) {
    //     if (!nested) {
    //       return;
    //     }
    //     if (prevDeletedNode.data > nested.data) {
    //       prevDeletedNode.left = nested;
    //     } else {
    //       prevDeletedNode.right = nested;
    //     }
    //   }
    //   if (deletedNode.right && deletedNode.left) {
    //     this.currentNode = this.currentNode.right;
    //     while (this.currentNode.left) {
    //       this.prevNode = this.currentNode;
    //       this.currentNode = this.currentNode.left;
    //     }
    //     nestedNode = this.currentNode;
    //     this.remove(nestedNode.data);
    //     nestedNode.left = deletedNode.left;
    //     nestedNode.right = deletedNode.right;
    //     leftOrRightInsert(nestedNode);
    //   } else {
    //     nestedNode = this.currentNode.right || this.currentNode.left;
    //     leftOrRightInsert(nestedNode);
    //   }
    // }
    // this.prevNode = null;
    // this.currentNode = this.rootNode;
    // return this;
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
