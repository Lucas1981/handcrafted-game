class Node<T> {
  public next: Node<T> | null;

  constructor(public element: T) {
    this.next = null;
  }
}

export class LinkedList<T> {
  private _head: Node<T>;

  constructor() {
    this._head = new Node<T>("head" as unknown as T);
  }

  public head() {
    return this._head;
  }

  public first() {
    return this._head.next;
  }

  public find(item: T) {
    let currNode: Node<T> = this._head!;
    while (currNode.element != item) {
      if (currNode.next === null) {
        return null;
      }

      currNode = currNode.next;
    }
    return currNode;
  }

  public insert(newElement: T, item: T) {
    let newNode: Node<T> = new Node<T>(newElement);
    let current: Node<T> = this.find(item)!;
    newNode.next = current.next;
    current.next = newNode;
  }

  public push(newElement: T) {
    let newNode: Node<T> = new Node<T>(newElement);
    let currNode: Node<T> = this._head;
    while (currNode.next != null) {
      currNode = currNode.next;
    }
    currNode.next = newNode;
  }

  public findPrevious(item: T) {
    let currNode: Node<T> = this._head;
    while (currNode.next !== null && currNode.next.element != item) {
      currNode = currNode.next;
    }
    return currNode;
  }

  public remove(item: T) {
    let prevNode: Node<T> = this.findPrevious(item);
    if (prevNode !== null) {
      prevNode.next = prevNode?.next?.next!;
    }
  }

  public display() {
    let currNode: Node<T> = this._head;
    while (currNode.next !== null) {
      currNode = currNode.next;
    }
  }
}
