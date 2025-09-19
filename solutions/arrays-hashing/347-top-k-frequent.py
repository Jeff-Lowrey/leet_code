"""
347. Top K Frequent Elements
Medium

Given an integer array nums and an integer k, return the k most frequent elements.
You may return the answer in any order.

Example:
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
"""

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Find the k most frequent elements by first counting frequencies, then selecting the top k by frequency. Multiple approaches exist with different time complexities.

### APPROACH (Bucket Sort - Optimal):
1. **Count frequencies** using a hash map
2. **Create buckets** where bucket[i] contains all elements with frequency i
3. **Traverse buckets** from highest frequency to lowest, collecting k elements

### WHY THIS WORKS:
- Maximum possible frequency is n (all elements the same)
- Bucket sort is linear when range is limited (0 to n frequencies)
- By traversing from highest frequency bucket, we get top k elements

### TIME COMPLEXITY: O(n) - bucket sort approach
### SPACE COMPLEXITY: O(n)

### MULTIPLE APPROACHES:

#### Approach 1: Bucket Sort (Optimal O(n))
Use frequency as bucket index, traverse from high to low frequency

#### Approach 2: Min Heap (O(n log k))
Maintain a min heap of size k with the k most frequent elements

#### Approach 3: Sorting (O(n log n))
Sort all elements by frequency, take top k

### EXAMPLE WALKTHROUGH (Bucket Sort):
```
Input: nums = [1,1,1,2,2,3], k = 2

Step 1: Count frequencies
{1: 3, 2: 2, 3: 1}

Step 2: Create buckets (indices 0-6)
buckets[0] = []
buckets[1] = [3]     # element 3 appears 1 time
buckets[2] = [2]     # element 2 appears 2 times
buckets[3] = [1]     # element 1 appears 3 times
buckets[4] = []
buckets[5] = []
buckets[6] = []

Step 3: Traverse from high frequency (index 6 down to 1)
i=6: buckets[6] = [] → skip
i=5: buckets[5] = [] → skip
i=4: buckets[4] = [] → skip
i=3: buckets[3] = [1] → add 1, result = [1]
i=2: buckets[2] = [2] → add 2, result = [1,2] → length = k, return

Output: [1,2]
```

### WHY BUCKET SORT IS OPTIMAL:
- Frequency range is bounded by array length (1 to n)
- Creating and filling buckets takes O(n) time
- Traversing buckets takes O(n) time in worst case
- Total: O(n) time, optimal for this problem

</details>

import heapq
from collections import Counter


class Solution:
    def topKFrequent(self, nums: list[int], k: int) -> list[int]:
        """
        Approach: Bucket Sort
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        count = Counter(nums)
        buckets = [[] for _ in range(len(nums) + 1)]

        # Group by frequency
        for num, freq in count.items():
            buckets[freq].append(num)

        # Collect top k
        result = []
        for i in range(len(buckets) - 1, 0, -1):
            for num in buckets[i]:
                result.append(num)
                if len(result) == k:
                    return result

        return result

    def topKFrequentHeap(self, nums: list[int], k: int) -> list[int]:
        """
        Approach: Min Heap
        Time Complexity: O(n log k)
        Space Complexity: O(n)
        """
        count = Counter(nums)

        # Use a min heap of size k
        heap = []
        for num, freq in count.items():
            heapq.heappush(heap, (freq, num))
            if len(heap) > k:
                heapq.heappop(heap)

        return [num for freq, num in heap]

    def topKFrequentSimple(self, nums: list[int], k: int) -> list[int]:
        """
        Approach: Sort by frequency
        Time Complexity: O(n log n)
        Space Complexity: O(n)
        """
        count = Counter(nums)
        return [num for num, _ in count.most_common(k)]


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    nums1 = [1, 1, 1, 2, 2, 3]
    k1 = 2
    print(f"Input: nums = {nums1}, k = {k1}")
    print(f"Output: {solution.topKFrequent(nums1, k1)}")  # [1, 2]

    # Test case 2
    nums2 = [1]
    k2 = 1
    print(f"Input: nums = {nums2}, k = {k2}")
    print(f"Output: {solution.topKFrequent(nums2, k2)}")  # [1]
