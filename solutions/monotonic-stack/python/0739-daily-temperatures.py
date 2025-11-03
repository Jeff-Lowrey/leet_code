"""
### INTUITION:
The key insight is that use monotonic decreasing stack storing indices. When current temperature > stack top temperature, pop and calculate days waited (current index - popped index). Remaining indices have no warmer day.

### APPROACH:
1. **Initialize result and stack**: result = [0] * len(temperatures), stack = []
2. **Iterate through temperatures**: For i, temp in enumerate(temperatures)
3. **Process stack**: While stack and temp > temperatures[stack[-1]]
4. **Calculate days**: prev_idx = stack.pop(), result[prev_idx] = i - prev_idx
5. **Push current**: Append i to stack
6. **Return result**: Return result array

### WHY THIS WORKS:
- This ensures that monotonic decreasing stack stores indices of days waiting for warmer temperature
- This ensures that when warmer day found, pop all cooler days and calculate their wait times
- This ensures that current index - popped index gives days waited
- This ensures that days still in stack at end have answer 0 (no warmer day)
- This ensures that o(n) time: each element pushed/popped once, O(n) space for stack

### EXAMPLE WALKTHROUGH:
Input:
```
temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
```

Step 1: day=0, temp=73
Stack: [0]
Result: [0,0,0,0,0,0,0,0]
Step 2: day=1, temp=74
74 > 73 (stack top), pop 0
result[0] = 1 - 0 = 1
Stack: [1]
Result: [1,0,0,0,0,0,0,0]
Step 3: day=2, temp=75
75 > 74, pop 1
result[1] = 2 - 1 = 1
Stack: [2]
Result: [1,1,0,0,0,0,0,0]
Step 4: day=3, temp=71
71 < 75, push 3
Stack: [2,3]
Result: [1,1,0,0,0,0,0,0]
Step 5: day=4, temp=69
69 < 71, push 4
Stack: [2,3,4]
Result: [1,1,0,0,0,0,0,0]
Step 6: day=5, temp=72
72 > 69, pop 4: result[4] = 5-4 = 1
72 > 71, pop 3: result[3] = 5-3 = 2
72 < 75, push 5
Stack: [2,5]
Result: [1,1,0,2,1,0,0,0]
Step 7: day=6, temp=76
76 > 72, pop 5: result[5] = 6-5 = 1
76 > 75, pop 2: result[2] = 6-2 = 4
Stack: [6]
Result: [1,1,4,2,1,1,0,0]
Step 8: day=7, temp=73
73 < 76, push 7
Stack: [6,7]
Result: [1,1,4,2,1,1,0,0]

Output:
```
[1,1,4,2,1,1,0,0]
```

### TIME COMPLEXITY:
**O(n)** where n is the number of days (length of temperatures array). Although we have a nested while loop, each index is pushed onto the stack exactly once and popped at most once. This means across the entire execution, we perform at most 2n stack operations (n pushes + at most n pops), giving us **O(2n)** = **O(n)** time complexity. The outer loop runs n times, and the total work done by the inner while loop across all iterations is bounded by n.

### SPACE COMPLEXITY:
**O(n)** - In the worst case, the stack can grow to size n. This happens when temperatures are in strictly decreasing order (e.g., [100, 90, 80, 70, 60]). In this case, we push all n indices onto the stack and never pop any until the end, requiring **O(n)** space. The result array also takes **O(n)** space, but since it's required for the output, the dominant auxiliary space is the stack: **O(n)**.

### EDGE CASES:
- **Empty array**: temperatures = [] returns [] (no days to process)
- **Single temperature**: temperatures = [75] returns [0] (no future day exists)
- **Strictly increasing**: temperatures = [30,40,50,60] returns [1,1,1,0] (each day next day is warmer except last)
- **Strictly decreasing**: temperatures = [60,50,40,30] returns [0,0,0,0] (no warmer days ahead)
- **All same temperature**: temperatures = [70,70,70] returns [0,0,0] (never gets warmer)
- **Large temperature spike**: One very high temperature causes many pops at once (e.g., [30,40,50,100,60] → stack empties when reaching 100)

</details>

"""

from typing import Any, List, Optional, Dict, Tuple
import re


class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        """
        Calculate the number of days until a warmer temperature occurs.

        Args:
            temperatures: List of daily temperatures

        Returns:
            List of integers representing days until warmer temperature
        """
        n = len(temperatures)
        result = [0] * n  # Initialize result array with zeros
        stack: list[int] = []  # Stack to store indices of temperatures

        # Process each temperature
        for curr_day in range(n):
            curr_temp = temperatures[curr_day]

            # While stack is not empty and current temperature is warmer
            # than temperature at top of stack
            while stack and temperatures[stack[-1]] < curr_temp:
                prev_day = stack.pop()
                result[prev_day] = curr_day - prev_day

            # Add current day to stack
            stack.append(curr_day)

        return result


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])
    expected: list[Any] = [1, 1, 4, 2, 1, 1, 0, 0]
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.dailyTemperatures([])
    expected = []
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Single element
    result = solution.dailyTemperatures([1])
    expected = [0]
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 739. Daily Temperatures")
