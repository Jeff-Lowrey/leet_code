"""
# Difficulty: Medium

# 448. Find All Numbers Disappeared In An Array

Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[5, 6]</dd>
<dt>Output:</dt>
<dd>"Expected {expected}, got {result}"</dd>
<dt>Explanation:</dt>
<dd>The numbers [5,6] are missing from [4,3,2,7,8,2,3,1] (should be 1-8)</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use the array itself as a hash map by marking indices. For each number n, negate the value at index n-1 to mark that n is present. After marking, any indices with positive values indicate missing numbers.

### APPROACH:
1. **Mark present numbers**: Iterate through nums array, for each num get index = abs(num) - 1
2. **Negate at index**: Set nums[index] = -abs(nums[index]) to mark that number (index + 1) is present
3. **Use absolute value**: Always use abs(num) when calculating index since previous iterations may have negated values
4. **Find missing numbers**: After marking phase, iterate through indices 0 to len(nums) - 1
5. **Check for positive values**: If nums[i] > 0, then number (i + 1) was never marked as present
6. **Build result**: Append (i + 1) to result list for each positive value found
7. **Return result**: Return list of all missing numbers from range [1, n]

### WHY THIS WORKS:
- Array values are in range [1, n], so each value maps to a valid index (value - 1)
- Negating values at corresponding indices marks numbers as "seen" without extra space
- Using absolute value when indexing handles already-negated values correctly
- Positive values after marking phase indicate those indices+1 were never present
- O(n) time with two passes, O(1) space by reusing input array as marker

### EXAMPLE WALKTHROUGH:
```
Input: nums = [4,3,2,7,8,2,3,1]
Step 1: Mark present numbers by negating values at indices
  - Process 4: nums[3] = -7, nums = [4,3,2,-7,8,2,3,1]
  - Process 3: nums[2] = -2, nums = [4,3,-2,-7,8,2,3,1]
  - Process 2: nums[1] = -3, nums = [4,-3,-2,-7,8,2,3,1]
  - Process 7: nums[6] = -3, nums = [4,-3,-2,-7,8,2,-3,1]
  - Process 8: nums[7] = -1, nums = [4,-3,-2,-7,8,2,-3,-1]
  - Process 2: already marked
  - Process 3: already marked
  - Process 1: nums[0] = -4, nums = [-4,-3,-2,-7,8,2,-3,-1]

Step 2: Find indices with positive values
  - Index 4 has value 8 (positive) → number 5 is missing
  - Index 5 has value 2 (positive) → number 6 is missing

Output: [5, 6]
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

from typing import List, Optional, Dict, Tuple

class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        """
        Find all numbers from 1 to n that are missing in the input array.
        
        Args:
            nums: List of integers where each integer is in range [1, n]
                 and n is the length of the list
        
        Returns:
            List of integers that are missing from the input array
        
        Time Complexity: O(n)
        Space Complexity: O(1) - excluding the output array
        """
        # Mark present numbers using index manipulation
        for num in nums:
            # Get the absolute value since numbers might have been marked negative
            index = abs(num) - 1
            # Mark as seen by making the number at index negative
            nums[index] = -abs(nums[index])
        
        # Find missing numbers by checking which indices contain positive numbers
        result = []
        for i in range(len(nums)):
            if nums[i] > 0:
                # i + 1 is missing from the original array
                result.append(i + 1)
        
        return result

def test_solution():
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.findDisappearedNumbers([4,3,2,7,8,2,3,1])
    expected = [5, 6]
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Empty input
    result = solution.findDisappearedNumbers([])
    expected = []
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Single element
    result = solution.findDisappearedNumbers([1])
    expected = []
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 448. Find All Numbers Disappeared In An Array")
