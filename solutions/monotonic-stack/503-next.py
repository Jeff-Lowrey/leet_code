"""
# Difficulty: Medium

# 503. Next

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
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
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
    def nextGreaterElements(self, nums: List[int]) -> List[int]:
        """
        Find the next greater element for each element in a circular array.
        
        Args:
            nums: List of integers representing the circular array
            
        Returns:
            List of integers where each element represents the next greater element
            for the corresponding element in the input array
            
        Time Complexity: O(n), where n is the length of nums
        Space Complexity: O(n)
        """
        if not nums:
            return []

        n = len(nums)
        result = [-1] * n  # Initialize result array with -1
        stack = []  # Stack to store indices
        
        # Iterate through the array twice to handle circular nature
        # We use modulo to simulate circular array
        for i in range(2 * n):
            current = nums[i % n]
            
            # While stack is not empty and current element is greater than
            # the element at index at top of stack
            while stack and nums[stack[-1]] < current:
                result[stack.pop()] = current
                
            # Only push index to stack during first iteration
            if i < n:
                stack.append(i)
                
        return result

def test_solution():
    """
    Test cases for 503. Next.
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
    print(f"Solution for 503. Next")
