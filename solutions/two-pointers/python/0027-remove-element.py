"""
### INTUITION:
The key insight is that use two pointers: one for reading, one for writing. When read pointer finds non-target value, write it at write pointer position and increment both. Otherwise only increment read pointer.

### APPROACH:
1. **Initialize write pointer**: Set k = 0 to track position for non-val elements
2. **Iterate through array**: For each element in nums
3. **Check if not val**: If nums[i] != val
4. **Copy to write position**: nums[k] = nums[i]
5. **Increment write pointer**: k += 1
6. **Continue scanning**: Process all elements
7. **Return count**: Return k as count of elements not equal to val

### WHY THIS WORKS:
- Two pointers: write pointer tracks next position for valid elements
- If element != val, copy to write position and increment write
- If element == val, skip (don't increment write)
- Return write as new length (first write elements are result)
- O(n) time, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [3,2,2,3], val = 3
```

Step 1: Two pointers
i=0, nums[0]=3=val, skip
i=1, nums[1]=2≠val, nums[0]=2, i=1
i=2, nums[2]=2≠val, nums[1]=2, i=2
i=3, nums[3]=3=val, skip

Output:
```
k=2, nums=[2,2,_,_]
```

### TIME COMPLEXITY:
**O(n)**
- Single pass through input

### SPACE COMPLEXITY:
**O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""

from typing import List, Optional, Dict, Tuple


class Solution:
    def removeElement(self, nums: List[int], val: int) -> int:
        """
        Removes all instances of val from nums in-place and returns new length.

        Args:
            nums: List of integers to process
            val: Value to remove from the list

        Returns:
            int: Length of array after removing specified value

        Time Complexity: O(n) where n is length of nums
        Space Complexity: O(1) as we modify array in-place
        """
        if not nums:
            return 0

        # Initialize pointer for position to place next valid element
        k = 0

        # Iterate through array
        for i in range(len(nums)):
            # If current element is not the value to remove,
            # place it at position k and increment k
            if nums[i] != val:
                nums[k] = nums[i]
                k += 1

        return k


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Basic case
    result = solution.removeElement([1, 2, 3], 2)
    expected = 2
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.removeElement([], 0)
    expected = 0
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 027. Remove Element")
