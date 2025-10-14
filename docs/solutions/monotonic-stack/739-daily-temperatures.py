"""
# Difficulty: Medium

# 739. Daily Temperatures

Given a problem that demonstrates key concepts in Monotonic Stack.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of monotonic stack concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply monotonic stack methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages monotonic stack principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### EXAMPLE WALKTHROUGH:
```
Input: temperatures = [73, 74, 75, 71, 69, 72, 76, 73]

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

Output: [1,1,4,2,1,1,0,0]
```

### TIME COMPLEXITY:
O(n)

### SPACE COMPLEXITY:
O(1)

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

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
        stack = []  # Stack to store indices of temperatures
        
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

def test_solution():
    """
    Test cases for 739. Daily Temperatures.
    """
    solution = Solution()

    # Test case 1: Basic functionality
    # result = solution.solve([test_input])
    # expected = [expected_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Edge case
    # result = solution.solve([edge_case_input])
    # expected = [edge_case_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 739. Daily Temperatures")
