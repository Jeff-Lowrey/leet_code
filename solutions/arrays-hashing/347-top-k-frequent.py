"""
347. Top K Frequent Elements
Medium

Given an integer array nums and an integer k, return the k most frequent elements.
You may return the answer in any order.

Example:
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
"""

from collections import Counter
import heapq

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
