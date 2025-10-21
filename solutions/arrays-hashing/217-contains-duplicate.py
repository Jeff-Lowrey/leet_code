"""
# Difficulty: Easy

Given an integer array `nums`, return true if any value appears at least twice
in the array, and return false if every element is distinct.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>nums = [1,2,3,1]</dd>
<dt>Output:</dt>
<dd>true</dd>
<dt>Explanation:</dt>
<dd>The array [1,2,3,1] contains duplicate value 1</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(n)
**Space Complexity**: O(n)

### INTUITION:
If all elements are unique, then the array length equals the set length.
If there are duplicates, the set will be smaller than the array.

### APPROACH:
1. **Convert array to set**: Transform the input array into a set data structure, which automatically removes all duplicate values
2. **Compare lengths**: Calculate the length of both the original array and the newly created set
3. **Detect duplicates**: If the lengths differ, duplicates existed in the original array (they were removed during set conversion)
4. **Return result**: Return True if lengths differ (duplicates found), False if lengths match (all elements unique)
5. **Alternative early termination**: For better average performance, iterate through array and add elements to a set one by one, returning True immediately when an element is already in the set

### WHY THIS WORKS:
A set by definition contains only unique elements - when we convert an array to a set, any duplicates are automatically removed. By comparing the lengths of the original array and the set, we can detect if duplicates existed. The early termination approach works because as soon as we find an element already in our seen set, we've proven a duplicate exists without needing to check the remaining elements.

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1, 2, 3, 1]
```

**Step 1:** Convert array to set
- set(nums) = {1, 2, 3}
- Set length = 3, Array length = 4

**Step 2:** Compare lengths
- len(nums) = 4 != len(set(nums)) = 3
- Since lengths differ, duplicates exist

Output: True

Alternative (Early Termination):
- seen = {}
- Check 1: not in seen, add it → seen = {1}
- Check 2: not in seen, add it → seen = {1, 2}
- Check 3: not in seen, add it → seen = {1, 2, 3}
- Check 1: found in seen → return True immediately

### TIME COMPLEXITY:
O(n)

### SPACE COMPLEXITY:
O(n)

### EDGE CASES:
- **Empty array**: Return False (no duplicates possible)
- **Single element**: Return False (need at least 2 for duplicate)
- **All elements same**: Return True immediately on second element
- **All elements unique**: Set and array lengths match, return False
- **Duplicate at start**: Early termination finds it quickly

</details>
"""


from typing import Any

class Solution:
    def containsDuplicate(self, nums: list[int]) -> bool:
        """
        Approach: Hash Set
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        return len(nums) != len(set(nums))

    def containsDuplicateVerbose(self, nums: list[int]) -> bool:
        """
        Approach: Hash Set with early termination
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        seen: set[Any] = set()

        for num in nums:
            if num in seen:
                return True
            seen.add(num)

        return False


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    nums1 = [1, 2, 3, 1]
    print(f"Input: {nums1}")
    print(f"Output: {solution.containsDuplicate(nums1)}")  # True

    # Test case 2
    nums2 = [1, 2, 3, 4]
    print(f"Input: {nums2}")
    print(f"Output: {solution.containsDuplicate(nums2)}")  # False

    # Test case 3
    nums3 = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]
    print(f"Input: {nums3}")
    print(f"Output: {solution.containsDuplicate(nums3)}")  # True
