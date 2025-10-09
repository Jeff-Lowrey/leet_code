"""
# Difficulty: Easy

Given an integer array `nums`, return true if any value appears at least twice
in the array, and return false if every element is distinct.

Example:
Input: `nums` = [1,2,3,1]
Output: true

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
If all elements are unique, then the array length equals the set length.
If there are duplicates, the set will be smaller than the array.

### APPROACH:
[Detailed explanation of the solution approach]

### WHY THIS WORKS:
- [Explanation of correctness]

### EXAMPLE WALKTHROUGH:
Input:
```
[example input]
```

**Step 1:** [description]

**Step 2:** [description]

### TIME COMPLEXITY:
O(n)

### SPACE COMPLEXITY:
O(n)

### EDGE CASES:
- **[Edge case 1]:** [how it's handled]
- **[Edge case 2]:** [how it's handled]

</details>
"""

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
        seen = set()

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
