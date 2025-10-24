"""
# Difficulty: Easy

# 155. Min Stack

Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the MinStack class:
- MinStack() initializes the stack object.
- void push(int val) pushes the element val onto the stack.
- void pop() removes the element on the top of the stack.
- int top() gets the top element of the stack.
- int getMin() retrieves the minimum element in the stack.

You must implement a solution with O(1) time complexity for each function.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>Operations: push(-2), push(0), push(-3)</dd>
<dt>Output:</dt>
<dd>main_stack: [-2, 0, -3]</dd>
<dt>Explanation:</dt>
<dd>After pushing -2, 0, and -3 onto the stack, the main stack contains all three values with -3 on top, while the min stack tracks that -3 is the current minimum</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Stack Operations, Greedy Selection
**Data Structures**: Stack, Trie
**Patterns**: Greedy Algorithm, Tree Pattern
**Time Complexity**: O(1)
**Space Complexity**: O(n)

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

### EXAMPLE WALKTHROUGH:
Input:
```
Operations: push(-2), push(0), push(-3)
```

main_stack: [-2, 0, -3]
min_stack:  [-2, -3]
getMin() returns -3 (top of min_stack)
pop() removes -3 from both stacks
getMin() returns -2 (new top of min_stack)

### TIME COMPLEXITY:
O(1)
All operations are constant time

### SPACE COMPLEXITY:
O(n)
In worst case, min_stack can have same size as main_stack

### EDGE CASES:
- Empty stack operations
- Single element stack
- Duplicate minimum values
- All elements are the same

</details>
"""
