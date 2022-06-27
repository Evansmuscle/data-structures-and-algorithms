class SingleNode {
  index: number;
  value: number;
  next: SingleNode | null;

  constructor(val: number, next: SingleNode | null, index: number) {
    this.value = val;
    this.next = next;
    this.index = index;
  }
}

class SinglyLinkedList {
  public head: SingleNode;
  public tail: SingleNode;
  public length: number;

  constructor(head: number) {
    this.tail = new SingleNode(head, null, 0);
    this.head = new SingleNode(head, null, 0);
    this.length = this.tail.index + 1;
  }

  public insert(num: number) {
    const newTail = new SingleNode(num, null, this.length);

    if (this.head.next === null) {
      this.head.next = newTail;
      this.tail = newTail;
      return true;
    }

    this.tail.next = newTail;
    this.tail = newTail;
    this.length = this.tail.index + 1;
    return true;
  }

  public reIndex(from: SingleNode) {
    let currentNode = from;
    for (let i = from.index; i < this.length; i++) {
      currentNode.index--;

      let temp = currentNode;
      if (temp.next) {
        currentNode = temp.next;
      }
    }

    this.length--;
  }

  public delete(targetIdx: number) {
    const prevNode = this.traverse(targetIdx);

    if (targetIdx === 0) {
      const headNext = this.head.next;

      if (headNext) {
        this.head = headNext;
        this.reIndex(this.head);
        return true;
      }

      return false;
    }

    if (prevNode && prevNode.next) {
      const targetNode = prevNode.next;
      const nextNode = targetNode.next;

      prevNode.next = nextNode;

      if (nextNode) {
        this.reIndex(nextNode);
      }

      return true;
    }
  }

  /**
   * This method returns the previous value of the target index, so we can use the previous
   * value to delete the node if we want to.
   * @param number
   * @returns SingleNode | null
   */
  public traverse(targetIdx: number): SingleNode | null {
    if (targetIdx === 0) {
      return this.head;
    }

    let traversing = true;
    let currentElement = this.head;

    while (traversing) {
      if (currentElement.next === null) {
        return null;
      }

      if (currentElement.next.index !== targetIdx) {
        let nextNode = currentElement.next;
        currentElement = nextNode;

        continue;
      }

      return currentElement;
    }

    return null;
  }
}

const list = new SinglyLinkedList(10);

list.insert(11);
list.insert(12);
list.insert(13);

list.delete(0);

console.log(list.traverse(0));
