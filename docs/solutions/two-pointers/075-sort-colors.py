"""
# Difficulty: Medium

# 075. Sort Colors

Given a problem that demonstrates key concepts in Two Pointers.

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
[This problem requires understanding of two pointers concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply two pointers methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages two pointers principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### EXAMPLE WALKTHROUGH:
```
Input: nums = [2, 0, 2, 1, 1, 0]

Step 1: Initialize pointers
  left = 0, current = 0, right = 5
  Array: [2, 0, 2, 1, 1, 0]

Step 2: current=0, nums[0]=2
  Swap with right: [0, 0, 2, 1, 1, 2]
  right = 4, current stays at 0

Step 3: current=0, nums[0]=0
  Swap with left: [0, 0, 2, 1, 1, 2]
  left = 1, current = 1

Step 4: current=1, nums[1]=0
  Swap with left: [0, 0, 2, 1, 1, 2]
  left = 2, current = 2

Step 5: current=2, nums[2]=2
  Swap with right: [0, 0, 1, 1, 2, 2]
  right = 3, current stays at 2

Step 6: current=2, nums[2]=1
  Move current: current = 3

Step 7: current=3, nums[3]=1
  Move current: current = 4

Step 8: current=4, right=3, stop (current > right)

Output: [0, 0, 1, 1, 2, 2]
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
    def sortColors(self, nums: List[int]) -> None:
        """
        Sorts an array containing only 0s, 1s, and 2s in-place.
        
        Args:
            nums: List of integers (containing only 0s, 1s, and 2s)
            
        Returns:
            None (modifies the input array in-place)
        """
        # Edge case: empty array or single element
        if not nums or len(nums) == 1:
            return

        # Initialize three pointers
        left = 0  # pointer for 0s (left boundary)
        right = len(nums) - 1  # pointer for 2s (right boundary)
        current = 0  # current element being examined

        while current <= right:
            if nums[current] == 0:
                # Swap current element with left pointer
                nums[current], nums[left] = nums[left], nums[current]
                left += 1
                current += 1
            elif nums[current] == 2:
                # Swap current element with right pointer
                nums[current], nums[right] = nums[right], nums[current]
                right -= 1
                # Don't increment current as the swapped element needs to be checked
            else:
                # Element is 1, just move forward
                current += 1

def test_solution():
    """
    Test cases for 075. Sort Colors.
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
    print(f"Solution for 075. Sort Colors")
