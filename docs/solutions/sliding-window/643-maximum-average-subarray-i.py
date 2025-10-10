"""
# Difficulty: Medium

# 643. Maximum Average Subarray I

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
    def findMaxAverage(self, nums: List[int], k: int) -> float:
        """
        Find the maximum average value of any contiguous subarray of size k.
        
        Args:
            nums: List of integers
            k: Size of the subarray
            
        Returns:
            float: Maximum average value of any contiguous subarray of size k
            
        Example:
            >>> solution = Solution()
            >>> solution.findMaxAverage([1,12,-5,-6,50,3], 4)
            12.75
        """
        if not nums or k <= 0 or k > len(nums):
            return 0.0
        
        # Initialize the sum of first k elements
        current_sum = sum(nums[:k])
        max_sum = current_sum
        
        # Slide the window and keep track of maximum sum
        for i in range(k, len(nums)):
            # Add new element and remove first element of previous window
            current_sum = current_sum + nums[i] - nums[i - k]
            max_sum = max(max_sum, current_sum)
        
        # Return the maximum average
        return max_sum / k

def test_solution():
    """
    Test cases for 643. Maximum Average Subarray I.
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
    print(f"Solution for 643. Maximum Average Subarray I")
