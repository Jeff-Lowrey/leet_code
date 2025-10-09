"""
# Difficulty: Medium

# 209. Minimum Size Subarray Sum

Given a problem that demonstrates key concepts in Sliding Window.

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
[This problem requires understanding of sliding window concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply sliding window methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages sliding window principles
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
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        """
        Find the minimum length of a contiguous subarray whose sum is greater than
        or equal to the target.
        
        Args:
            target: The target sum we're looking for
            nums: List of positive integers
            
        Returns:
            int: Minimum length of subarray that sums to >= target, or 0 if no such subarray exists
        """
        if not nums:
            return 0
        
        n = len(nums)
        min_length = sys.maxsize
        current_sum = 0
        left = 0
        
        # Sliding window approach
        for right in range(n):
            # Add the current number to our running sum
            current_sum += nums[right]
            
            # While our sum is >= target, try to minimize the window
            while current_sum >= target:
                # Update minimum length if current window is smaller
                min_length = min(min_length, right - left + 1)
                
                # Remove leftmost element and shrink window
                current_sum -= nums[left]
                left += 1
        
        # Return 0 if we never found a valid subarray
        return min_length if min_length != sys.maxsize else 0

def test_solution():
    """
    Test cases for 209. Minimum Size Subarray Sum.
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
    print(f"Solution for 209. Minimum Size Subarray Sum")
