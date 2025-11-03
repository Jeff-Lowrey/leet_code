"""### METADATA:
**Techniques**: Frequency Counting, Hash Map Lookup
**Data Structures**: Hash Map (Counter)
**Time Complexity**: O(n + m)
**Space Complexity**: O(min(n, m)

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
Input:
```
nums1 = [1,2,2,1], nums2 = [2,2]
```

Step 1: Build frequency map from nums1
freq = {1: 2, 2: 2}
Step 2: Iterate through nums2

Steps:
Step 1: num = 2: freq[2] = 2 > 0 → add 2, freq[2] = 1
Step 2: num = 2: freq[2] = 1 > 0 → add 2, freq[2] = 0

Output:
```
[2, 2]
```

### TIME COMPLEXITY:
**O(n + m)** - where n = len(nums1) and m = len(nums2). We make one pass through nums1 to build the frequency map (**O(n)**), then one pass through nums2 to find intersections (**O(m)**). Each hash map operation (Counter increment, lookup, decrement) is **O(1)**. Total: **O(n)** + **O(m)** = **O(n + m)**. This is optimal since we must examine all elements in both arrays.

### SPACE COMPLEXITY:
**O(min(n, m))** - We store frequencies of the smaller array in the hash map. In the worst case where all elements in the smaller array are unique, we store min(n, m) entries. The result array can be at most min(n, m) in size (when all elements of the smaller array appear in the larger array). Total space: **O(min(n, m)**) for the frequency map + **O(min(n, m)**) for the result = **O(min(n, m)**).

### EDGE CASES:
- **Empty arrays**: Return empty array
- **No intersection**: Return empty array
- **All elements intersect**: Return all with proper frequencies
- **One array is subset**: Return the subset

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
