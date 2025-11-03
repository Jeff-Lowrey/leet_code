"""
# Difficulty: Medium

# 0373. Find K Pairs With Smallest Sums

You are given two integer arrays nums1 and nums2 sorted in ascending order and an integer k.

Define a pair (u, v) which consists of one element from the first array and one element from the second array.

Return the k pairs (u1, v1), (u2, v2), ..., (uk, vk) with the smallest sums.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>nums1 = [1,7,11], nums2 = [2,4,6], k = 3</dd>
<dt>Output:</dt>
<dd>[[1,2],[1,4],[1,6]]</dd>
<dt>Explanation:</dt>
<dd>The k=3 pairs with smallest sums from [1,7,11] and [2,4,6] are [[1,2],[1,4],[1,6]]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
**Data Structures**: Hash Map, Array, Heap
**Patterns**: Hash Table Pattern, Greedy Algorithm
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
The key insight is that use min heap containing pairs from k sorted lists. Initially add first pair from each list. Pop minimum, add result, and push next pair from same lists. Repeat k times.

### APPROACH:
1. **Initialize min heap**: Create heap with first element from nums2 for each nums1 element
2. **Push initial pairs**: For i in range(min(k, len(nums1))), push (nums1[i]+nums2[0], i, 0)
3. **Extract k pairs**: Pop from heap k times or until heap empty
4. **Add to result**: For each popped (sum, i, j), add [nums1[i], nums2[j]] to result
5. **Push next pair**: If j+1 < len(nums2), push (nums1[i]+nums2[j+1], i, j+1)
6. **Continue extraction**: Repeat until k pairs found or heap empty
7. **Return result**: Return list of k pairs with smallest sums

### WHY THIS WORKS:
- This ensures that min heap stores (sum, i, j) tuples
- This ensures that start with pairs (nums1[i], nums2[0]) for all i
- This ensures that pop minimum, add next pair (nums1[i], nums2[j+1]) to heap
- This ensures that collect k pairs or until heap empty
- This ensures that o(k log k) time: k heap operations, O(k) space for heap

### EXAMPLE WALKTHROUGH:
Input:
```
nums1 = [1,7,11], nums2 = [2,4,6], k = 3
```

Step 1: Initialize min heap
heap = [(1+2, 0, 0)]
Step 2: Extract k smallest pairs
Pop (3, 0, 0): pair [1,2], add (1+4, 0, 1)
Pop (5, 0, 1): pair [1,4], add (1+6, 0, 2)
Pop (7, 0, 2): pair [1,6], add (7+2, 1, 0)

Output:
```
[[1,2],[1,4],[1,6]]
```

### TIME COMPLEXITY:
O(n)
- Single pass through input


### SPACE COMPLEXITY:
O(1)
- Constant extra space


### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
"""

import heapq

from typing import Any, List, Optional, Dict, Tuple


class Solution:
    def kSmallestPairs(self, nums1: List[int], nums2: List[int], k: int) -> List[List[int]]:
        """
        Find k pairs of numbers from nums1 and nums2 with the smallest sums.

        Args:
            nums1: First sorted array
            nums2: Second sorted array
            k: Number of pairs to return

        Returns:
            List of k pairs with smallest sums
        """
        # Handle edge cases
        if not nums1 or not nums2:
            return []

        # Initialize result list and min heap
        result: list[Any] = []
        min_heap: list[Any] = []

        # Push the first pair from nums1 with all possible pairs from nums2
        # We start with (sum, i, j) where i is index in nums1 and j is index in nums2
        heapq.heappush(min_heap, (nums1[0] + nums2[0], 0, 0))

        # Keep track of visited pairs to avoid duplicates
        visited = {(0, 0)}

        # Continue until we have k pairs or heap is empty
        while min_heap and len(result) < k:
            # Get the smallest sum pair
            curr_sum, i, j = heapq.heappop(min_heap)

            # Add current pair to result
            result.append([nums1[i], nums2[j]])

            # Try next number from nums1 if available
            if i + 1 < len(nums1) and (i + 1, j) not in visited:
                heapq.heappush(min_heap, (nums1[i + 1] + nums2[j], i + 1, j))
                visited.add((i + 1, j))

            # Try next number from nums2 if available
            if j + 1 < len(nums2) and (i, j + 1) not in visited:
                heapq.heappush(min_heap, (nums1[i] + nums2[j + 1], i, j + 1))
                visited.add((i, j + 1))

        return result


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.kSmallestPairs([1, 7, 11], [2, 4, 6], 3)
    expected = [[1, 2], [1, 4], [1, 6]]
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty arrays
    result = solution.kSmallestPairs([], [2, 4, 6], 3)
    expected: list[Any] = []
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 373. Find K Pairs With Smallest Sums")
