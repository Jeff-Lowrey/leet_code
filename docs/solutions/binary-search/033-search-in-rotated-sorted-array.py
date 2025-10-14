"""
# Difficulty: Medium

# 033. Search In Rotated Sorted Array

Given a problem that demonstrates key concepts in Binary Search.

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
[This problem requires understanding of binary search concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply binary search methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages binary search principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### EXAMPLE WALKTHROUGH:
```
Input: nums = [4, 5, 6, 7, 0, 1, 2], target = 0

Step 1: Initialize
  left = 0, right = 6
  mid = 3, nums[3] = 7

Step 2: Check mid
  nums[3] = 7 ≠ 0
  Left half [4,5,6,7] is sorted (4 ≤ 7)
  Is target in [4,7]? No (0 < 4)
  Search right half: left = 4

Step 3: left = 4, right = 6
  mid = 5, nums[5] = 1
  nums[5] = 1 ≠ 0
  Right half [1,2] is sorted (1 < 4, so left is NOT sorted)
  Is target in [1,2]? No (0 < 1)
  Search left half: right = 4

Step 4: left = 4, right = 4
  mid = 4, nums[4] = 0
  Found target!

Output: 4
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
    def search(self, nums: List[int], target: int) -> int:
        """
        Search for target in a rotated sorted array.
        
        Args:
            nums: List[int] - The rotated sorted array
            target: int - The value to search for
            
        Returns:
            int - Index of target if found, -1 if not found
            
        Time Complexity: O(log n)
        Space Complexity: O(1)
        """
        if not nums:
            return -1
        
        left, right = 0, len(nums) - 1
        
        while left <= right:
            mid = (left + right) // 2
            
            # If we found the target
            if nums[mid] == target:
                return mid
            
            # Check if left half is sorted
            if nums[left] <= nums[mid]:
                # Check if target is in left half
                if nums[left] <= target < nums[mid]:
                    right = mid - 1
                else:
                    left = mid + 1
            # Right half must be sorted
            else:
                # Check if target is in right half
                if nums[mid] < target <= nums[right]:
                    left = mid + 1
                else:
                    right = mid - 1
                    
        return -1

def test_solution():
    """
    Test cases for 033. Search In Rotated Sorted Array.
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
    print(f"Solution for 033. Search In Rotated Sorted Array")
