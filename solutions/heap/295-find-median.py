"""
295. Find Median from Data Stream
Hard

The median is the middle value in an ordered integer list. If the size of the
list is even, there is no middle value, and the median is the mean of the two
middle values.

Implement the MedianFinder class:
- MedianFinder() initializes the MedianFinder object.
- void addNum(int num) adds the integer num from the data stream to the data structure.
- double findMedian() returns the median of all elements so far.

Example:
Input:
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
Output:
[null, null, null, 1.5, null, 2.0]

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
To find median efficiently, we need access to the "middle" elements. Using two heaps
allows us to maintain the smaller half and larger half of numbers, with quick access
to the elements closest to the median.

### KEY INSIGHT:
- Use max heap for smaller half (to get largest of small numbers)
- Use min heap for larger half (to get smallest of large numbers)
- Keep heaps balanced (size difference ≤ 1)
- Median is either top of larger heap or average of both tops

### TWO HEAP STRATEGY:
```
small_heap (max heap): [1, 2, 3] → top is 3
large_heap (min heap): [4, 5, 6] → top is 4
Median = (`3 + 4`) / `2 = 3`.5
```

### ALGORITHM:
1. Add to small heap first
2. Move largest from small to large (maintain order)
3. Balance heap sizes:
   - If small has > large + 1: move top of small to large
   - If large has > small: move top of large to small
4. Find median:
   - If small has more elements: return top of small
   - Otherwise: return average of both tops

### WHY THIS WORKS:
- **Adding**: O(log n) for heap operations
- **Finding median**: O(1) since we have direct access to middle elements
- **Space**: O(n) for storing all numbers
- **Maintains sorted order** implicitly through heap properties

### EXAMPLE WALKTHROUGH:
```
Add 1: small=[1], large=[] → `median = 1`
Add 2: small=[1], large=[2] → median = (`1+2`)/`2 = 1`.5
Add 3: small=[2], large=[1,3] → rebalance → small=[1,2], large=[3] → `median = 2`
```

</details>
"""

import heapq


class MedianFinder:
    """
    Approach: Two heaps (max heap for smaller half, min heap for larger half)
    Time Complexity: O(log n) for addNum, O(1) for findMedian
    Space Complexity: O(n)
    """

    def __init__(self):
        self.small = []  # Max heap (negate values for max heap)
        self.large = []  # Min heap

    def addNum(self, num: int) -> None:
        # Add to max heap (small values)
        heapq.heappush(self.small, -num)

        # Ensure every num in small <= every num in large
        if self.small and self.large and (-self.small[0]) > self.large[0]:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)

        # Balance the sizes
        if len(self.small) > len(self.large) + 1:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        elif len(self.large) > len(self.small):
            val = heapq.heappop(self.large)
            heapq.heappush(self.small, -val)

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return -self.small[0]
        else:
            return (-self.small[0] + self.large[0]) / 2.0


"""
480. Sliding Window Median
Hard

The median is the middle value in an ordered integer list.

Given an integer array nums and an integer k, there is a sliding window of size k
which is moving from the very left of the array to the very right. You can only
see the k numbers in the window. Each time the sliding window moves right by one position.

Return the median array for each window in the original array.

Example:
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [1.0,-1.0,-1.0,3.0,5.0,6.0]
"""

from sortedcontainers import SortedList


class SolutionSlidingMedian:
    def medianSlidingWindow(self, nums: list[int], k: int) -> list[float]:
        """
        Approach: Balanced binary search tree (using SortedList)
        Time Complexity: O(n * log k)
        Space Complexity: O(k)
        """
        window = SortedList(nums[:k])
        medians = []

        def get_median():
            if k % 2:
                return float(window[k // 2])
            else:
                return (window[k // 2 - 1] + window[k // 2]) / 2.0

        medians.append(get_median())

        for i in range(k, len(nums)):
            # Remove outgoing element
            window.remove(nums[i - k])
            # Add incoming element
            window.add(nums[i])
            medians.append(get_median())

        return medians


# Test cases
if __name__ == "__main__":
    # Test MedianFinder
    print("Testing MedianFinder:")
    mf = MedianFinder()
    operations = [
        ("add", 1),
        ("add", 2),
        ("median",),
        ("add", 3),
        ("median",),
        ("add", 4),
        ("median",)
    ]

    for op in operations:
        if op[0] == "add":
            mf.addNum(op[1])
            print(f"Added {op[1]}")
        else:
            result = mf.findMedian()
            print(f"Median: {result}")

    print("\n" + "="*50 + "\n")

    # Test Sliding Window Median
    print("Testing Sliding Window Median:")
    solution = SolutionSlidingMedian()

    test_cases = [
        ([1, 3, -1, -3, 5, 3, 6, 7], 3),
        ([1, 2, 3, 4, 2, 3, 1, 4, 2], 3),
        ([1, 4, 2, 3], 4)
    ]

    for nums, k in test_cases:
        result = solution.medianSlidingWindow(nums, k)
        print(f"Array: {nums}, k={k}")
        print(f"Medians: {result}\n")
