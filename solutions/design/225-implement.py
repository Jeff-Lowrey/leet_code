"""
# 225. Implement Stack using Queues
**Easy**

Implement a last-in-first-out (LIFO) stack using only two queues.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
A stack follows LIFO (Last In First Out), while a queue follows FIFO (First In First Out).
To simulate stack behavior using queues, we need to reverse the order on every push or pop.
The most efficient approach is to reverse on push, making pop O(1).

### APPROACH:
1. **Single Queue Approach**: Use one main queue
2. **push**: Add new element, then rotate queue to move it to front
   - Add element to queue
   - Rotate queue: for each existing element, dequeue and enqueue (n-1 times)
   - This makes the newest element the front of the queue
3. **pop**: Simply dequeue from front (now acts like stack top)
4. **top**: Peek at front element
5. **empty**: Check if queue is empty

### WHY THIS WORKS:
- By rotating the queue on every push, we maintain stack order
- The most recently added element is always at the front
- Pop and top operations become O(1)
- Only push is O(n), which is acceptable

### TIME COMPLEXITY:
- push: O(n) - need to rotate queue
- pop: O(1)
- top: O(1)
- empty: O(1)

### SPACE COMPLEXITY: O(n) for storing n elements

### EXAMPLE WALKTHROUGH:
```
push(1): queue = [1]
push(2): queue = [2] -> rotate -> [2, 1]
push(3): queue = [3, 2, 1] -> rotate -> [3, 2, 1]
top() -> 3
pop() -> 3, queue = [2, 1]
top() -> 2
```

### EDGE CASES:
- Empty stack
- Single element
- Multiple push/pop operations

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses a single queue with rotation on push to maintain stack order.

### Algorithm Steps:
1. Use collections.deque for efficient queue operations
2. On push: append element then rotate queue
3. On pop/top: use standard queue operations

</details>
"""

from collections import deque


class MyStack:
    """
    Stack implementation using a single queue.

    Implements LIFO behavior using FIFO queue with rotation.
    """

    def __init__(self):
        """
        Initialize the stack.

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        self.queue = deque()

    def push(self, x: int) -> None:
        """
        Push element x onto stack.

        Args:
            x: Element to push

        Time Complexity: O(n) where n is number of elements
        Space Complexity: O(1)
        """
        # Add element to queue
        self.queue.append(x)

        # Rotate queue to move new element to front
        # This maintains stack order (newest at front)
        for _ in range(len(self.queue) - 1):
            self.queue.append(self.queue.popleft())

    def pop(self) -> int:
        """
        Remove and return the element on top of the stack.

        Returns:
            int: Top element

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        return self.queue.popleft()

    def top(self) -> int:
        """
        Get the top element without removing it.

        Returns:
            int: Top element

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        return self.queue[0]

    def empty(self) -> bool:
        """
        Check if the stack is empty.

        Returns:
            bool: True if empty, False otherwise

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        return len(self.queue) == 0


def test_solution():
    """
    Test cases for MyStack.
    """
    # Test case 1: Basic operations
    stack1 = MyStack()
    stack1.push(1)
    stack1.push(2)
    assert stack1.top() == 2
    assert stack1.pop() == 2
    assert stack1.empty() == False
    assert stack1.top() == 1
    assert stack1.pop() == 1
    assert stack1.empty() == True

    # Test case 2: Multiple operations
    stack2 = MyStack()
    stack2.push(1)
    stack2.push(2)
    stack2.push(3)
    stack2.push(4)
    assert stack2.top() == 4
    assert stack2.pop() == 4
    assert stack2.pop() == 3
    assert stack2.top() == 2
    assert stack2.pop() == 2
    assert stack2.pop() == 1
    assert stack2.empty() == True

    # Test case 3: Interleaved push and pop
    stack3 = MyStack()
    stack3.push(1)
    assert stack3.top() == 1
    stack3.push(2)
    assert stack3.pop() == 2
    stack3.push(3)
    assert stack3.top() == 3
    stack3.push(4)
    assert stack3.pop() == 4
    assert stack3.pop() == 3
    assert stack3.top() == 1

    # Test case 4: Single element
    stack4 = MyStack()
    stack4.push(42)
    assert stack4.empty() == False
    assert stack4.top() == 42
    assert stack4.pop() == 42
    assert stack4.empty() == True

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print("MyStack demonstration:")
    stack = MyStack()

    stack.push(1)
    stack.push(2)
    print(f"top() = {stack.top()}")     # 2
    print(f"pop() = {stack.pop()}")     # 2
    print(f"empty() = {stack.empty()}") # False
    print(f"top() = {stack.top()}")     # 1
    print(f"pop() = {stack.pop()}")     # 1
    print(f"empty() = {stack.empty()}") # True
