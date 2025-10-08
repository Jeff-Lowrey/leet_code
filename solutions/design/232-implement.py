"""
# 232. Implement Queue using Stacks
**Easy**

Implement a first-in-first-out (FIFO) queue using only two stacks.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
A queue follows FIFO (First In First Out), while a stack follows LIFO (Last In First Out).
We can simulate queue behavior using two stacks - one for input and one for output.
The key insight is to transfer elements between stacks when needed.

### APPROACH:
1. **Two Stack Approach**: Use input_stack and output_stack
2. **push**: Always push to input_stack - O(1)
3. **pop/peek**:
   - If output_stack has elements, pop/peek from there
   - If output_stack is empty, transfer all from input_stack to output_stack
   - This reverses the order, making FIFO behavior
4. **empty**: Check if both stacks are empty

### WHY THIS WORKS:
- Input stack holds new elements in reverse order
- Output stack holds elements in correct queue order (FIFO)
- Transfer happens lazily only when needed
- Amortized O(1) for all operations
- Each element is moved at most twice (input -> output -> removed)

### TIME COMPLEXITY:
- push: O(1)
- pop: Amortized O(1)
- peek: Amortized O(1)
- empty: O(1)

### SPACE COMPLEXITY: O(n) for storing n elements

### EXAMPLE WALKTHROUGH:
```
push(1): input=[1], output=[]
push(2): input=[1,2], output=[]
peek(): transfer -> input=[], output=[2,1], return 1
pop(): output=[2,1], return 1, output=[2]
push(3): input=[3], output=[2]
pop(): output=[2], return 2
```

### EDGE CASES:
- Empty queue
- Single element
- Multiple operations
- Alternating push/pop

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses two stacks with lazy transfer for efficient queue operations.

### Algorithm Steps:
1. Maintain input_stack for pushes
2. Maintain output_stack for pops/peeks
3. Transfer elements from input to output only when output is empty

</details>
"""


class MyQueue:
    """
    Queue implementation using two stacks.

    Implements FIFO behavior using two LIFO stacks.
    """

    def __init__(self):
        """
        Initialize the queue.

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        self.input_stack = []   # For push operations
        self.output_stack = []  # For pop/peek operations

    def push(self, x: int) -> None:
        """
        Push element x to the back of queue.

        Args:
            x: Element to push

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        self.input_stack.append(x)

    def pop(self) -> int:
        """
        Remove and return the element from front of queue.

        Returns:
            int: Front element

        Time Complexity: Amortized O(1)
        Space Complexity: O(1)
        """
        self._transfer_if_needed()
        return self.output_stack.pop()

    def peek(self) -> int:
        """
        Get the front element without removing it.

        Returns:
            int: Front element

        Time Complexity: Amortized O(1)
        Space Complexity: O(1)
        """
        self._transfer_if_needed()
        return self.output_stack[-1]

    def empty(self) -> bool:
        """
        Check if the queue is empty.

        Returns:
            bool: True if empty, False otherwise

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        return len(self.input_stack) == 0 and len(self.output_stack) == 0

    def _transfer_if_needed(self) -> None:
        """
        Helper method to transfer elements from input to output stack.

        Only transfers when output_stack is empty.

        Time Complexity: O(n) for transfer, but amortized O(1)
        Space Complexity: O(1)
        """
        if not self.output_stack:
            while self.input_stack:
                self.output_stack.append(self.input_stack.pop())


def test_solution():
    """
    Test cases for MyQueue.
    """
    # Test case 1: Basic operations
    queue1 = MyQueue()
    queue1.push(1)
    queue1.push(2)
    assert queue1.peek() == 1
    assert queue1.pop() == 1
    assert queue1.empty() == False
    assert queue1.peek() == 2
    assert queue1.pop() == 2
    assert queue1.empty() == True

    # Test case 2: Multiple operations
    queue2 = MyQueue()
    queue2.push(1)
    queue2.push(2)
    queue2.push(3)
    queue2.push(4)
    assert queue2.peek() == 1
    assert queue2.pop() == 1
    assert queue2.pop() == 2
    assert queue2.peek() == 3
    assert queue2.pop() == 3
    assert queue2.pop() == 4
    assert queue2.empty() == True

    # Test case 3: Interleaved push and pop
    queue3 = MyQueue()
    queue3.push(1)
    assert queue3.peek() == 1
    queue3.push(2)
    assert queue3.pop() == 1
    queue3.push(3)
    assert queue3.peek() == 2
    queue3.push(4)
    assert queue3.pop() == 2
    assert queue3.pop() == 3
    assert queue3.peek() == 4

    # Test case 4: Single element
    queue4 = MyQueue()
    queue4.push(42)
    assert queue4.empty() == False
    assert queue4.peek() == 42
    assert queue4.pop() == 42
    assert queue4.empty() == True

    # Test case 5: Transfer stress test
    queue5 = MyQueue()
    for i in range(1, 6):
        queue5.push(i)
    for i in range(1, 6):
        assert queue5.pop() == i
    assert queue5.empty() == True

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print("MyQueue demonstration:")
    queue = MyQueue()

    queue.push(1)
    queue.push(2)
    print(f"peek() = {queue.peek()}")   # 1
    print(f"pop() = {queue.pop()}")     # 1
    print(f"empty() = {queue.empty()}") # False
    print(f"peek() = {queue.peek()}")   # 2
    print(f"pop() = {queue.pop()}")     # 2
    print(f"empty() = {queue.empty()}") # True
