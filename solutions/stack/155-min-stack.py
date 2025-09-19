"""
155. Min Stack
Medium

Design a stack that supports push, pop, top, and retrieving the minimum element
in constant time.

Implement the MinStack class:
- MinStack() initializes the stack object.
- void push(int val) pushes the element val onto the stack.
- void pop() removes the element on the top of the stack.
- int top() gets the top element of the stack.
- int getMin() retrieves the minimum element in the stack.

Example:
Input:
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]
Output:
[null,null,null,null,-3,null,0,-2]
"""

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Maintain two stacks: one for actual values and another for tracking minimums. The key insight is to only push to the min stack when we encounter a new minimum or equal value.

### APPROACH (Two Stacks):
1. **Main stack**: Stores all pushed values
2. **Min stack**: Stores minimum values at each point
3. **Push**: Add to main stack, add to min stack only if new minimum
4. **Pop**: Remove from main, remove from min stack if it's the current minimum
5. **GetMin**: Return top of min stack

### WHY THIS WORKS:
- Min stack always has the minimum value at its top
- When we pop a minimum, the previous minimum is revealed
- Space optimization: min stack only stores actual minimums (not duplicates)

### TIME COMPLEXITY: O(1) for all operations
### SPACE COMPLEXITY: O(n) - worst case both stacks are full

### TWO APPROACHES:

#### Approach 1: Two Separate Stacks (Optimal)
```python
if not self.min_stack or val <= self.min_stack[-1]:
    self.min_stack.append(val)
```

#### Approach 2: Single Stack with Pairs
```python
self.stack.append((val, current_min))
```

### EXAMPLE WALKTHROUGH:
```
Operations: push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()

Step 1: push(-2)
main_stack: [-2]
min_stack: [-2]  # -2 is new minimum

Step 2: push(0)
main_stack: [-2, 0]
min_stack: [-2]  # 0 > -2, don't add to min_stack

Step 3: push(-3)
main_stack: [-2, 0, -3]
min_stack: [-2, -3]  # -3 is new minimum

Step 4: getMin() → -3 (top of min_stack)

Step 5: pop() → remove -3
main_stack: [-2, 0]
min_stack: [-2]  # -3 was minimum, so remove from min_stack

Step 6: top() → 0 (top of main_stack)

Step 7: getMin() → -2 (top of min_stack)
```

### KEY INSIGHTS:
- Store minimums only when they change (space optimization)
- Use <= comparison to handle duplicate minimums correctly
- Min stack top always contains current global minimum

</details>

class MinStack:
    """
    Approach: Two stacks
    Time Complexity: O(1) for all operations
    Space Complexity: O(n)
    """

    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        # Push to min_stack if it's empty or val is smaller/equal
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)

    def pop(self) -> None:
        if self.stack:
            val = self.stack.pop()
            # Also pop from min_stack if it's the minimum
            if self.min_stack and val == self.min_stack[-1]:
                self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1] if self.stack else None

    def getMin(self) -> int:
        return self.min_stack[-1] if self.min_stack else None


class MinStackSingleStack:
    """
    Approach: Single stack with pairs
    Time Complexity: O(1) for all operations
    Space Complexity: O(n)
    """

    def __init__(self):
        self.stack = []  # Each element is (value, min_at_this_point)

    def push(self, val: int) -> None:
        current_min = val
        if self.stack:
            current_min = min(val, self.stack[-1][1])
        self.stack.append((val, current_min))

    def pop(self) -> None:
        if self.stack:
            self.stack.pop()

    def top(self) -> int:
        return self.stack[-1][0] if self.stack else None

    def getMin(self) -> int:
        return self.stack[-1][1] if self.stack else None


"""
150. Evaluate Reverse Polish Notation
Medium

Evaluate the value of an arithmetic expression in Reverse Polish Notation.

Valid operators are +, -, *, and /. Each operand may be an integer or another expression.

Example:
Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9
"""

class SolutionRPN:
    def evalRPN(self, tokens: list[str]) -> int:
        """
        Approach: Stack
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        stack = []
        operators = {'+', '-', '*', '/'}

        for token in tokens:
            if token in operators:
                # Pop two operands (note the order)
                b = stack.pop()
                a = stack.pop()

                if token == '+':
                    stack.append(a + b)
                elif token == '-':
                    stack.append(a - b)
                elif token == '*':
                    stack.append(a * b)
                else:  # token == '/'
                    # Truncate toward zero
                    stack.append(int(a / b))
            else:
                # Push operand
                stack.append(int(token))

        return stack[0]


"""
739. Daily Temperatures
Medium

Given an array of integers temperatures represents the daily temperatures, return
an array answer such that answer[i] is the number of days you have to wait after
the ith day to get a warmer temperature. If there is no future day for which this
is possible, keep answer[i] == 0 instead.

Example:
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
"""

class SolutionTemperatures:
    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:
        """
        Approach: Monotonic decreasing stack
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        n = len(temperatures)
        answer = [0] * n
        stack = []  # Stores indices

        for i in range(n):
            # Pop all temperatures lower than current
            while stack and temperatures[stack[-1]] < temperatures[i]:
                prev_index = stack.pop()
                answer[prev_index] = i - prev_index

            stack.append(i)

        return answer


"""
22. Generate Parentheses
Medium

Given n pairs of parentheses, write a function to generate all combinations of
well-formed parentheses.

Example:
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
"""

class SolutionParentheses:
    def generateParenthesis(self, n: int) -> list[str]:
        """
        Approach: Backtracking with stack validation
        Time Complexity: O(4^n / sqrt(n)) - Catalan number
        Space Complexity: O(n)
        """
        result = []

        def backtrack(current, open_count, close_count):
            if len(current) == 2 * n:
                result.append(current)
                return

            if open_count < n:
                backtrack(current + '(', open_count + 1, close_count)

            if close_count < open_count:
                backtrack(current + ')', open_count, close_count + 1)

        backtrack('', 0, 0)
        return result

    def generateParenthesisBFS(self, n: int) -> list[str]:
        """
        Approach: BFS
        Time Complexity: O(4^n / sqrt(n))
        Space Complexity: O(4^n / sqrt(n))
        """
        from collections import deque

        queue = deque([('', 0, 0)])
        result = []

        while queue:
            current, open_count, close_count = queue.popleft()

            if len(current) == 2 * n:
                result.append(current)
                continue

            if open_count < n:
                queue.append((current + '(', open_count + 1, close_count))

            if close_count < open_count:
                queue.append((current + ')', open_count, close_count + 1))

        return result


# Test cases
if __name__ == "__main__":
    # Test MinStack
    print("Testing MinStack:")
    min_stack = MinStack()
    operations = [
        ("push", -2),
        ("push", 0),
        ("push", -3),
        ("getMin",),
        ("pop",),
        ("top",),
        ("getMin",)
    ]

    for op in operations:
        if op[0] == "push":
            min_stack.push(op[1])
            print(f"Pushed {op[1]}")
        elif op[0] == "pop":
            min_stack.pop()
            print("Popped")
        elif op[0] == "top":
            result = min_stack.top()
            print(f"Top: {result}")
        else:  # getMin
            result = min_stack.getMin()
            print(f"Min: {result}")

    print("\n" + "="*50 + "\n")

    # Test RPN
    solution_rpn = SolutionRPN()

    print("Evaluate Reverse Polish Notation:")
    rpn_cases = [
        ["2", "1", "+", "3", "*"],
        ["4", "13", "5", "/", "+"],
        ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]
    ]

    for tokens in rpn_cases:
        result = solution_rpn.evalRPN(tokens)
        print(f"Tokens: {tokens}")
        print(f"Result: {result}\n")

    # Test Daily Temperatures
    solution_temp = SolutionTemperatures()

    print("Daily Temperatures:")
    temp_cases = [
        [73, 74, 75, 71, 69, 72, 76, 73],
        [30, 40, 50, 60],
        [30, 60, 90]
    ]

    for temperatures in temp_cases:
        result = solution_temp.dailyTemperatures(temperatures)
        print(f"Temperatures: {temperatures}")
        print(f"Days to wait: {result}\n")

    # Test Generate Parentheses
    solution_paren = SolutionParentheses()

    print("Generate Parentheses:")
    for n in [1, 2, 3]:
        result = solution_paren.generateParenthesis(n)
        print(f"n={n}: {result}\n")
