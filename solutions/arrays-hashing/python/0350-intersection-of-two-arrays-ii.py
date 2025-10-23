"""
# 350. Intersection of Two Arrays II

# Difficulty: Easy

Given two integer arrays nums1 and nums2, return an array of their intersection.
Each element in the result must appear as many times as it shows in both arrays
and you may return the result in any order.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>nums1 = [1,2,2,1], nums2 = [2,2]</dd>
<dt>Output:</dt>
<dd>[2,2]</dd>
<dt>Explanation:</dt>
<dd>The intersection includes elements that appear in both arrays with their frequencies</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: Hash Table, Frequency Counting, Two Pointers
**Data Structures**: Hash Map, Array
**Patterns**: Frequency Counter Pattern
**Time Complexity**: O(n + m) - Single pass through both arrays with O(1) hash operations
**Space Complexity**: O(min(n, m)) - Hash map stores frequencies of smaller array

### INTUITION:
Use a hash map to count frequencies in one array, then iterate through the second
array to find common elements. This allows us to handle duplicates correctly.

### APPROACH:
1. **Count frequencies**: Build frequency map for nums1
2. **Find intersections**: Iterate through nums2
3. **Check and decrement**: If element exists in map with count > 0, add to result and decrement
4. **Return result**: Array of intersecting elements with proper frequencies

### WHY THIS WORKS:
- Hash map tracks how many times each element appears in nums1
- For each element in nums2, we check if it's available in the map
- Decrementing the count ensures we don't reuse elements
- Time complexity is linear, space is proportional to smaller array

### EXAMPLE WALKTHROUGH:
```
Input: nums1 = [1,2,2,1], nums2 = [2,2]

Step 1: Build frequency map from nums1
  freq = {1: 2, 2: 2}

Step 2: Iterate through nums2
  num = 2: freq[2] = 2 > 0 → add 2, freq[2] = 1
  num = 2: freq[2] = 1 > 0 → add 2, freq[2] = 0

Output: [2, 2]
```

### TIME COMPLEXITY:
O(n + m) where n = len(nums1), m = len(nums2)

### SPACE COMPLEXITY:
O(min(n, m)) - Store frequencies of smaller array

### EDGE CASES:
- **Empty arrays**: Return empty array
- **No intersection**: Return empty array
- **All elements intersect**: Return all with proper frequencies
- **One array is subset**: Return the subset

</details>
"""

from typing import List
from collections import Counter


class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        """
        Find intersection of two arrays with duplicate handling.

        Time Complexity: O(n + m)
        Space Complexity: O(min(n, m))
        """
        # Count frequencies in nums1
        freq = Counter(nums1)
        result = []

        # Find intersections in nums2
        for num in nums2:
            if freq[num] > 0:
                result.append(num)
                freq[num] -= 1

        return result

    def intersectSorted(self, nums1: List[int], nums2: List[int]) -> List[int]:
        """
        Alternative: Two pointers approach (requires sorting).

        Time Complexity: O(n log n + m log m)
        Space Complexity: O(1) excluding output
        """
        nums1.sort()
        nums2.sort()

        i, j = 0, 0
        result = []

        while i < len(nums1) and j < len(nums2):
            if nums1[i] < nums2[j]:
                i += 1
            elif nums1[i] > nums2[j]:
                j += 1
            else:
                result.append(nums1[i])
                i += 1
                j += 1

        return result


if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    nums1 = [1, 2, 2, 1]
    nums2 = [2, 2]
    print(f"Test 1: {solution.intersect(nums1, nums2)}")  # Expected: [2, 2]

    # Test case 2
    nums1 = [4, 9, 5]
    nums2 = [9, 4, 9, 8, 4]
    print(f"Test 2: {sorted(solution.intersect(nums1, nums2))}")  # Expected: [4, 9]

    # Test case 3
    nums1 = [1, 2, 3]
    nums2 = [4, 5, 6]
    print(f"Test 3: {solution.intersect(nums1, nums2)}")  # Expected: []

    print("\nAll test cases completed!")
