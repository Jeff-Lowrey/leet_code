"""
# Difficulty: Medium

# 347. Top K Frequent Elements

Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>nums = [1,1,1,2,2,3], k = 2</dd>
<dt>Output:</dt>
<dd>[1, 2]
[1, 2]</dd>
<dt>Explanation:</dt>
<dd>The k=2 most frequent elements in [1,1,1,2,2,3] are [1,2]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Hash Table Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Use bucket sort where the index represents frequency. After counting frequencies with a hash map, place each number in a bucket corresponding to its frequency. Then collect results from the highest frequency buckets downward until we have k elements.

### APPROACH:
1. **Count frequencies**: Use Counter(nums) to create freq_map with each number's frequency
2. **Build max heap**: Initialize empty heap, iterate through freq_map.items()
3. **Push to heap**: For each (num, freq) pair, push (-freq, num) to heap using heapq.heappush (negative for max heap behavior)
4. **Extract k elements**: Loop k times, calling heapq.heappop(heap) to get highest frequency elements
5. **Build result**: Append the num (second element of popped tuple) to result list
6. **Return result**: After k pops, return the result list with k most frequent elements

### WHY THIS WORKS:
- Bucket sort by frequency achieves O(n) time vs heap's O(n log k)
- Frequency can't exceed n, so we need at most n+1 buckets (index 0 to n)
- Hash map counts frequencies in O(n), bucketing also O(n)
- Collecting from buckets high to low gets k elements without full sort
- Trade space O(n) for buckets to gain linear time complexity

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1,1,1,2,2,3], k = 2
```

Step 1: Count frequencies using Counter
freq_map = {1: 3, 2: 2, 3: 1}
Step 2: Build max heap with negative frequencies
heap = [(-3, 1), (-2, 2), (-1, 3)]
Step 3: Extract k most frequent elements
Alternative (Bucket Sort):

Steps:
Step 1: - Pop: (-3, 1) → result = [1]
Step 2: - Pop: (-2, 2) → result = [1, 2]
Step 3: Create buckets by frequency
Step 4: buckets[3] = [1]
Step 5: buckets[2] = [2]
Step 6: buckets[1] = [3]
Step 7: Collect from highest frequency buckets
Step 8: - From bucket 3: add 1
Step 9: - From bucket 2: add 2

Output:
```
[1, 2]
[1, 2]
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

import heapq
from collections import Counter

from typing import Any, List, Optional, Dict, Tuple


class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        """
        Find the k most frequent elements in the given list.

        Args:
            nums: List of integers
            k: Number of top frequent elements to return

        Returns:
            List of k most frequent elements

        Example:
            >>> s = Solution()
            >>> s.topKFrequent([1,1,1,2,2,3], 2)
            [1, 2]
        """
        # Handle edge cases
        if not nums or k <= 0:
            return []
        if k >= len(nums):
            return list(set(nums))

        # Count frequency of each number
        freq_map = Counter(nums)

        # Use heap to get k most frequent elements
        # We use negative frequency because heapq implements min heap
        heap: list[Any] = []
        for num, freq in freq_map.items():
            heapq.heappush(heap, (-freq, num))

        # Extract k most frequent elements
        result: list[Any] = []
        for _ in range(k):
            result.append(heapq.heappop(heap)[1])

        return result

    def topKFrequent_bucket_sort(self, nums: List[int], k: int) -> List[int]:
        """
        Alternative implementation using bucket sort approach.
        Time Complexity: O(n)
        Space Complexity: O(n)

        Args:
            nums: List of integers
            k: Number of top frequent elements to return

        Returns:
            List of k most frequent elements
        """
        # Handle edge cases
        if not nums or k <= 0:
            return []
        if k >= len(nums):
            return list(set(nums))

        # Count frequency of each number
        freq_map = Counter(nums)

        # Create buckets where index represents frequency
        buckets: list[list[Any]] = [[] for _ in range(len(nums) + 1)]
        for num, freq in freq_map.items():
            buckets[freq].append(num)

        # Collect k most frequent elements
        result = []
        for i in range(len(buckets) - 1, -1, -1):
            result.extend(buckets[i])
            if len(result) >= k:
                return result[:k]

        return result


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.topKFrequent([1, 1, 1, 2, 2, 3], k=2)
    expected: list[Any] = [1, 2]
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.topKFrequent([], 0)
    expected = []
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 347. Top K Frequent Elements")
