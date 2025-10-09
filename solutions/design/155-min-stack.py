"""
# 155. Min Stack
# Difficulty: Easy
Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the MinStack class:
- MinStack() initializes the stack object.
- void push(int val) pushes the element val onto the stack.
- void pop() removes the element on the top of the stack.
- int top() gets the top element of the stack.
- int getMin() retrieves the minimum element in the stack.

You must implement a solution with O(1) time complexity for each function.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
The key challenge is maintaining the minimum element in O(1) time. We can use
two stacks: one for all elements and another to track minimums at each level.

### APPROACH:
1. **Two Stack Method**: Use main_stack for elements, min_stack for minimums
2. **Push Operation**: Always push to main_stack, conditionally to min_stack
3. **Pop Operation**: Pop from main_stack, conditionally from min_stack
4. **Min Tracking**: min_stack top always contains current minimum

### WHY THIS WORKS:
- Main stack handles normal stack operations
- Min stack maintains minimum for each level of main stack
- When we pop, we check if we're removing the current minimum
- This ensures O(1) access to minimum at all times

### TIME COMPLEXITY: O(1)
All operations are constant time

### SPACE COMPLEXITY: O(n)
In worst case, min_stack can have same size as main_stack

### EXAMPLE WALKTHROUGH:
```
Operations: push(-2), push(0), push(-3)
main_stack: [-2, 0, -3]
min_stack:  [-2, -3]

getMin() returns -3 (top of min_stack)
pop() removes -3 from both stacks
getMin() returns -2 (new top of min_stack)
```

### EDGE CASES:
- Empty stack operations
- Single element stack
- Duplicate minimum values
- All elements are the same

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

Two-stack approach:
1. main_stack: stores all pushed elements
2. min_stack: stores minimum elements at each level
3. Push: add to main_stack, add to min_stack if new minimum
4. Pop: remove from main_stack, remove from min_stack if current minimum
5. Top: return top of main_stack
6. GetMin: return top of min_stack

Alternative: Single stack with (value, current_min) tuples

</details>
"""

class MinStack:
    def __init__(self):
        """
        Initialize the MinStack data structure.

        We use two stacks:
        - main_stack: stores all elements
        - min_stack: stores minimum elements at each level
        """
        self.main_stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        """
        Push element val onto stack.

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        self.main_stack.append(val)

        # Push to min_stack if it's empty or val is <= current minimum
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)

    def pop(self) -> None:
        """
        Remove the element on top of the stack.

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        if self.main_stack:
            popped = self.main_stack.pop()
            # Remove from min_stack if it's the current minimum
            if self.min_stack and popped == self.min_stack[-1]:
                self.min_stack.pop()

    def top(self) -> int:
        """
        Get the top element of the stack.

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        return self.main_stack[-1] if self.main_stack else None

    def getMin(self) -> int:
        """
        Retrieve the minimum element in the stack.

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        return self.min_stack[-1] if self.min_stack else None

# Alternative implementation using single stack with tuples
class MinStackAlternative:
    def __init__(self):
        """
        Alternative implementation storing (value, current_min) tuples.
        """
        self.stack = []

    def push(self, val: int) -> None:
        if not self.stack:
            self.stack.append((val, val))
        else:
            current_min = min(val, self.stack[-1][1])
            self.stack.append((val, current_min))

    def pop(self) -> None:
        if self.stack:
            self.stack.pop()

    def top(self) -> int:
        return self.stack[-1][0] if self.stack else None

    def getMin(self) -> int:
        return self.stack[-1][1] if self.stack else None

def test_solution():
    """
    Test cases for 155. Min Stack.
    """
    # Test case 1: Basic operations
    min_stack = MinStack()
    min_stack.push(-2)
    min_stack.push(0)
    min_stack.push(-3)

    assert min_stack.getMin() == -3, f"Expected -3, got {min_stack.getMin()}"
    min_stack.pop()
    assert min_stack.top() == 0, f"Expected 0, got {min_stack.top()}"
    assert min_stack.getMin() == -2, f"Expected -2, got {min_stack.getMin()}"

    # Test case 2: Single element
    min_stack2 = MinStack()
    min_stack2.push(5)
    assert min_stack2.top() == 5
    assert min_stack2.getMin() == 5
    min_stack2.pop()

    # Test case 3: Duplicate minimums
    min_stack3 = MinStack()
    min_stack3.push(1)
    min_stack3.push(1)
    min_stack3.push(2)
    assert min_stack3.getMin() == 1
    min_stack3.pop()
    assert min_stack3.getMin() == 1
    min_stack3.pop()
    assert min_stack3.getMin() == 1

    # Test alternative implementation
    alt_stack = MinStackAlternative()
    alt_stack.push(-2)
    alt_stack.push(0)
    alt_stack.push(-3)
    assert alt_stack.getMin() == -3
    alt_stack.pop()
    assert alt_stack.top() == 0
    assert alt_stack.getMin() == -2

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    print("=== 155. Min Stack ===")
    min_stack = MinStack()

    print("Operations: push(-2), push(0), push(-3)")
    min_stack.push(-2)
    min_stack.push(0)
    min_stack.push(-3)

    print(f"getMin(): {min_stack.getMin()}")
    print("pop()")
    min_stack.pop()
    print(f"top(): {min_stack.top()}")
    print(f"getMin(): {min_stack.getMin()}")