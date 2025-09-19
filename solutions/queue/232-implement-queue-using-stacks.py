"""
232. Implement Queue using Stacks
Easy

Implement a first in first out (FIFO) queue using only two stacks. The implemented
queue should support all the functions of a normal queue (push, peek, pop, and empty).

Implement the MyQueue class:
- void push(int x) Pushes element x to the back of the queue.
- int pop() Removes the element from the front of the queue and returns it.
- int peek() Returns the element at the front of the queue.
- boolean empty() Returns true if the queue is empty, false otherwise.

Notes:
- You must use only standard operations of a stack, which means only push to top,
  peek/pop from top, size, and is empty operations are valid.

Example:
Input:
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
Output:
[null, null, null, 1, 1, false]
"""

class MyQueue:
    """
    Approach: Two stacks (input and output)
    Time Complexity: O(1) amortized for all operations
    Space Complexity: O(n)
    """

    def __init__(self):
        self.input_stack = []
        self.output_stack = []

    def push(self, x: int) -> None:
        self.input_stack.append(x)

    def pop(self) -> int:
        self.peek()  # Ensure output_stack has elements
        return self.output_stack.pop()

    def peek(self) -> int:
        if not self.output_stack:
            # Transfer all elements from input to output
            while self.input_stack:
                self.output_stack.append(self.input_stack.pop())
        return self.output_stack[-1]

    def empty(self) -> bool:
        return not self.input_stack and not self.output_stack


"""
225. Implement Stack using Queues
Easy

Implement a last-in-first-out (LIFO) stack using only two queues. The implemented
stack should support all the functions of a normal stack (push, top, pop, and empty).

Implement the MyStack class:
- void push(int x) Pushes element x to the top of the stack.
- int pop() Removes the element on the top of the stack and returns it.
- int top() Returns the element on the top of the stack.
- boolean empty() Returns true if the stack is empty, false otherwise.

Example:
Input:
["MyStack", "push", "push", "top", "pop", "empty"]
[[], [1], [2], [], [], []]
Output:
[null, null, null, 2, 2, false]
"""

from collections import deque


class MyStack:
    """
    Approach: Single queue
    Time Complexity: O(n) for push, O(1) for others
    Space Complexity: O(n)
    """

    def __init__(self):
        self.queue = deque()

    def push(self, x: int) -> None:
        self.queue.append(x)
        # Rotate queue to make new element at front
        for _ in range(len(self.queue) - 1):
            self.queue.append(self.queue.popleft())

    def pop(self) -> int:
        return self.queue.popleft()

    def top(self) -> int:
        return self.queue[0]

    def empty(self) -> bool:
        return not self.queue


class MyStackTwoQueues:
    """
    Approach: Two queues
    Time Complexity: O(n) for push or pop (can optimize either)
    Space Complexity: O(n)
    """

    def __init__(self):
        self.q1 = deque()
        self.q2 = deque()

    def push(self, x: int) -> None:
        # Push to q2
        self.q2.append(x)

        # Move all elements from q1 to q2
        while self.q1:
            self.q2.append(self.q1.popleft())

        # Swap queues
        self.q1, self.q2 = self.q2, self.q1

    def pop(self) -> int:
        return self.q1.popleft()

    def top(self) -> int:
        return self.q1[0]

    def empty(self) -> bool:
        return not self.q1


"""
622. Design Circular Queue
Medium

Design your implementation of the circular queue. The circular queue is a linear
data structure in which the operations are performed based on FIFO principle and
the last position is connected back to the first position to make a circle.

Implement the MyCircularQueue class:
- MyCircularQueue(k) Initializes the object with the size of the queue to be k.
- int Front() Gets the front item from the queue. If the queue is empty, return -1.
- int Rear() Gets the last item from the queue. If the queue is empty, return -1.
- boolean enQueue(int value) Inserts an element into the circular queue.
- boolean deQueue() Deletes an element from the circular queue.
- boolean isEmpty() Checks whether the circular queue is empty or not.
- boolean isFull() Checks whether the circular queue is full or not.
"""

class MyCircularQueue:
    """
    Approach: Array with two pointers
    Time Complexity: O(1) for all operations
    Space Complexity: O(k)
    """

    def __init__(self, k: int):
        self.queue = [0] * k
        self.capacity = k
        self.head = 0
        self.count = 0

    def enQueue(self, value: int) -> bool:
        if self.isFull():
            return False

        self.queue[(self.head + self.count) % self.capacity] = value
        self.count += 1
        return True

    def deQueue(self) -> bool:
        if self.isEmpty():
            return False

        self.head = (self.head + 1) % self.capacity
        self.count -= 1
        return True

    def Front(self) -> int:
        if self.isEmpty():
            return -1
        return self.queue[self.head]

    def Rear(self) -> int:
        if self.isEmpty():
            return -1
        return self.queue[(self.head + self.count - 1) % self.capacity]

    def isEmpty(self) -> bool:
        return self.count == 0

    def isFull(self) -> bool:
        return self.count == self.capacity


# Test cases
if __name__ == "__main__":
    # Test MyQueue
    print("Testing Queue using Stacks:")
    queue = MyQueue()
    operations = [
        ("push", 1),
        ("push", 2),
        ("peek",),
        ("pop",),
        ("empty",)
    ]

    for op in operations:
        if op[0] == "push":
            queue.push(op[1])
            print(f"Pushed {op[1]}")
        elif op[0] == "pop":
            result = queue.pop()
            print(f"Popped: {result}")
        elif op[0] == "peek":
            result = queue.peek()
            print(f"Peek: {result}")
        else:  # empty
            result = queue.empty()
            print(f"Empty: {result}")

    print("\n" + "="*50 + "\n")

    # Test MyStack
    print("Testing Stack using Queues:")
    stack = MyStack()
    stack_operations = [
        ("push", 1),
        ("push", 2),
        ("top",),
        ("pop",),
        ("empty",)
    ]

    for op in stack_operations:
        if op[0] == "push":
            stack.push(op[1])
            print(f"Pushed {op[1]}")
        elif op[0] == "pop":
            result = stack.pop()
            print(f"Popped: {result}")
        elif op[0] == "top":
            result = stack.top()
            print(f"Top: {result}")
        else:  # empty
            result = stack.empty()
            print(f"Empty: {result}")

    print("\n" + "="*50 + "\n")

    # Test Circular Queue
    print("Testing Circular Queue:")
    circular_queue = MyCircularQueue(3)
    circular_operations = [
        ("enQueue", 1),
        ("enQueue", 2),
        ("enQueue", 3),
        ("enQueue", 4),
        ("Rear",),
        ("isFull",),
        ("deQueue",),
        ("enQueue", 4),
        ("Rear",)
    ]

    for op in circular_operations:
        if op[0] == "enQueue":
            result = circular_queue.enQueue(op[1])
            print(f"EnQueue {op[1]}: {result}")
        elif op[0] == "deQueue":
            result = circular_queue.deQueue()
            print(f"DeQueue: {result}")
        elif op[0] == "Front":
            result = circular_queue.Front()
            print(f"Front: {result}")
        elif op[0] == "Rear":
            result = circular_queue.Rear()
            print(f"Rear: {result}")
        elif op[0] == "isEmpty":
            result = circular_queue.isEmpty()
            print(f"IsEmpty: {result}")
        else:  # isFull
            result = circular_queue.isFull()
            print(f"IsFull: {result}")
