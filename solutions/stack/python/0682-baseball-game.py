"""
# 682. Baseball Game

# Difficulty: Easy

You are keeping the scores for a baseball game with strange rules. At the beginning of the game, you start with an empty record.

You are given a list of strings `operations`, where `operations[i]` is the ith operation you must apply to the record and is one of the following:

- An integer `x`: Record a new score of `x`.
- `'+'`: Record a new score that is the sum of the previous two scores.
- `'D'`: Record a new score that is double the previous score.
- `'C'`: Invalidate the previous score, removing it from the record.

Return the sum of all the scores on the record after applying all the operations.

**Example 1:**

<dl class="example-details">
<dt>Input:</dt>
<dd>ops = ["5","2","C","D","+"]</dd>
<dt>Output:</dt>
<dd>30</dd>
<dt>Explanation:</dt>
<dd>"5" - Add 5 to the record, record is now [5]. "2" - Add 2 to the record, record is now [5, 2]. "C" - Invalidate and remove the previous score, record is now [5]. "D" - Add 2 * 5 = 10 to the record, record is now [5, 10]. "+" - Add 5 + 10 = 15 to the record, record is now [5, 10, 15]. The total sum is 5 + 10 + 15 = 30.</dd>
</dl>

**Example 2:**

<dl class="example-details">
<dt>Input:</dt>
<dd>ops = ["5","-2","4","C","D","9","+","+"]</dd>
<dt>Output:</dt>
<dd>27</dd>
<dt>Explanation:</dt>
<dd>"5" - Add 5 to the record, record is now [5]. "-2" - Add -2 to the record, record is now [5, -2]. "4" - Add 4 to the record, record is now [5, -2, 4]. "C" - Invalidate and remove the previous score, record is now [5, -2]. "D" - Add 2 * -2 = -4 to the record, record is now [5, -2, -4]. "9" - Add 9 to the record, record is now [5, -2, -4, 9]. "+" - Add -4 + 9 = 5 to the record, record is now [5, -2, -4, 9, 5]. "+" - Add 9 + 5 = 14 to the record, record is now [5, -2, -4, 9, 5, 14]. The total sum is 5 + -2 + -4 + 9 + 5 + 14 = 27.</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: Stack Operations, String Parsing
**Data Structures**: Stack, Array
**Patterns**: Stack Pattern, Operation Processing
**Time Complexity**: **O(n)** - Process each operation once
**Space Complexity**: **O(n)** - Stack stores up to n scores

### INTUITION:
Use a stack to maintain the record of scores. Process each operation and modify the stack accordingly.

### APPROACH:
We iterate through each operation in the list. For integer strings, we parse them and push onto the stack. For '+', we add the sum of the top two elements. For 'D', we double the top element. For 'C', we pop the last element. After processing all operations, we return the sum of all elements in the stack.

### WHY THIS WORKS:
- Stack provides LIFO access to the most recent scores
- Operations only depend on the most recent 1-2 scores
- Stack naturally handles the 'C' operation (remove previous score)

### EXAMPLE WALKTHROUGH:
Input:
```
ops = ["5","2","C","D","+"]
```

Steps:
Step 1: "5" → Push 5, stack = [5]
Step 2: "2" → Push 2, stack = [5, 2]
Step 3: "C" → Pop previous score, stack = [5]
Step 4: "D" → Double last score (5 * 2 = 10), stack = [5, 10]
Step 5: "+" → Sum last two (5 + 10 = 15), stack = [5, 10, 15]

Output:
```
30
```

### TIME COMPLEXITY:
**O(n)** - Process each of n operations once with O(1) stack operations

### SPACE COMPLEXITY:
**O(n)** - Stack can grow to size n in worst case (all integer operations)

### EDGE CASES:
- **Negative numbers:** Handle "-2" by parsing as integer
- **Multiple 'C' operations:** Stack correctly removes most recent scores
- **Empty stack after 'C':** Problem guarantees valid operations

</details>
"""

from typing import List


class Solution:
    def calPoints(self, operations: List[str]) -> int:
        """
        Calculate final score after applying baseball game operations.

        Approach: Stack-based operation processing
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        stack = []

        for op in operations:
            if op == "+":
                # Add sum of last two scores
                stack.append(stack[-1] + stack[-2])
            elif op == "D":
                # Double the last score
                stack.append(2 * stack[-1])
            elif op == "C":
                # Remove the last score
                stack.pop()
            else:
                # It's an integer, add it to the stack
                stack.append(int(op))

        return sum(stack)


if __name__ == "__main__":
    solution = Solution()

    # Test case 1 - Basic operations
    ops1 = ["5", "2", "C", "D", "+"]
    print(f"Test 1: {solution.calPoints(ops1)}")
    print(f"Expected: 30\n")

    # Test case 2 - With negative numbers
    ops2 = ["5", "-2", "4", "C", "D", "9", "+", "+"]
    print(f"Test 2: {solution.calPoints(ops2)}")
    print(f"Expected: 27\n")

    # Test case 3 - Simple case
    ops3 = ["1", "C"]
    print(f"Test 3: {solution.calPoints(ops3)}")
    print(f"Expected: 0\n")
