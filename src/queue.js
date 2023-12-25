const { NotImplementedError } = require("../extensions/index.js");

const { ListNode } = require("../extensions/list-node.js");

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
  top = null;
  bottom = null;

  getUnderlyingList() {
    return this.top;
  }

  enqueue(value) {
    const newElement = new ListNode(value);
    if (!this.top) {
      this.top = newElement;
      this.bottom = this.top;
    } else {
      this.bottom.next = newElement;
      this.bottom = this.bottom.next;
    }
  }

  dequeue() {
    const topData = this.top.value;
    this.top = this.top.next;
    return topData;
  }
}

module.exports = {
  Queue,
};
