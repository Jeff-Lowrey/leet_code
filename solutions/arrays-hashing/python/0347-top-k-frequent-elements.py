"""
# Difficulty: Medium

# 0347. Top K Frequent Elements

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
**Techniques**: Frequency Counting, Bucket Sort, Hash Map Storage
**Data Structures**: Hash Map (frequency counting), Array (buckets), Nested Arrays
**Patterns**: Bucket Sort Pattern, Frequency Analysis
**Time Complexity**: O(n) - Frequency counting O(n) + bucket sort O(n)
**Space Complexity**: O(n) - Hash map O(n) + buckets array O(n)

### INTUITION:
The key insight is to use bucket sort based on frequency. Since the maximum frequency any element can have is n (all elements the same), we can create n+1 buckets where bucket[i] contains all numbers that appear exactly i times. First count frequencies with a hash map, then place numbers into frequency buckets, finally collect k elements from highest frequency buckets first. This achieves O(n) time by avoiding sorting.

### APPROACH:
1. **Count frequencies**: Build hash map of number → frequency for all elements in nums
2. **Create frequency buckets**: Initialize array of n+1 buckets, where bucket[freq] holds all numbers with that frequency
3. **Fill buckets**: For each (number, frequency) pair from hash map, add number to bucket[frequency]
4. **Collect top k**: Traverse buckets from highest frequency (n) down to lowest, collecting elements until we have k total
5. **Return result**: Slice to ensure exactly k elements returned (handle case where last bucket has more than needed)

### WHY THIS WORKS:
- This ensures that bucket sort by frequency achieves O(n) time vs heap's O(n log k)
- This ensures that frequency can't exceed n, so we need at most n+1 buckets (index 0 to n)
- This ensures that hash map counts frequencies in O(n), bucketing also O(n)
- This ensures that collecting from buckets high to low gets k elements without full sort
- This ensures that trade space O(n) for buckets to gain linear time complexity

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
**O(n)** - where n is the length of the nums array. We perform three linear passes: (1) count frequencies in hash map O(n), (2) place numbers into frequency buckets O(unique elements) ≤ O(n), (3) collect k elements from buckets O(n) in worst case. Total: O(n) + O(n) + O(n) = O(3n) = O(n). This is better than heap-based solutions which would be O(n log k) or sorting-based solutions which would be O(n log n).

### SPACE COMPLEXITY:
**O(n)** - We use a frequency hash map that stores at most n unique elements (O(n)), plus a buckets array of size n+1 where each bucket can hold numbers (O(n) total across all buckets in worst case), plus the result array of size k (O(k) ≤ O(n)). Total space: O(n) + O(n) + O(k) = O(n). The dominant factors are the hash map and buckets array, both O(n).


### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

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
