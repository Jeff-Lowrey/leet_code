"""
# 295. Find Median From Data Stream
**Medium**

Given a problem that demonstrates key concepts in Heap.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of heap concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply heap methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages heap principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(1)

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses heap techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using heap method
3. Return the computed result

</details>
"""

import heapq


class MedianFinder:
    """
    Find median from data stream using two heaps.

    Use a max heap for the smaller half and a min heap for the larger half.
    Balance them so that median is always at the top of one or both heaps.
    """

    def __init__(self):
        """
        Initialize data structure.

        small: max heap (negated values) for smaller half
        large: min heap for larger half
        """
        self.small = []  # max heap (use negative values)
        self.large = []  # min heap

    def addNum(self, num: int) -> None:
        """
        Add a number to the data structure.

        Time Complexity: O(log n)
        Space Complexity: O(n)
        """
        # Add to max heap (small) first
        heapq.heappush(self.small, -num)

        # Ensure every element in small <= every element in large
        if self.small and self.large and (-self.small[0] > self.large[0]):
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)

        # Balance the heaps so that len(small) >= len(large)
        # and len(small) <= len(large) + 1
        if len(self.small) > len(self.large) + 1:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)

        if len(self.large) > len(self.small):
            val = heapq.heappop(self.large)
            heapq.heappush(self.small, -val)

    def findMedian(self) -> float:
        """
        Return the median of all elements.

        Time Complexity: O(1)
        """
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2.0


class Solution:
    def solve(self, *args):
        """
        Main solution for 295. Find Median From Data Stream.

        Args:
            *args: Problem-specific arguments

        Returns:
            MedianFinder instance

        Time Complexity: O(log n) per addNum, O(1) per findMedian
        Space Complexity: O(n)
        """
        return MedianFinder()


def test_solution():
    """
    Test cases for 295. Find Median From Data Stream.
    """
    # Test case 1: Basic functionality
    medianFinder = MedianFinder()
    medianFinder.addNum(1)
    medianFinder.addNum(2)
    result = medianFinder.findMedian()
    expected = 1.5
    assert result == expected, f"Expected {expected}, got {result}"

    medianFinder.addNum(3)
    result = medianFinder.findMedian()
    expected = 2.0
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: More complex sequence
    medianFinder2 = MedianFinder()
    nums = [5, 15, 1, 3, 8]
    expected_medians = [5.0, 10.0, 5.0, 4.0, 5.0]

    for num, expected_median in zip(nums, expected_medians):
        medianFinder2.addNum(num)
        result = medianFinder2.findMedian()
        assert result == expected_median, f"Expected {expected_median}, got {result}"

    # Test case 3: Single element
    medianFinder3 = MedianFinder()
    medianFinder3.addNum(1)
    result = medianFinder3.findMedian()
    expected = 1.0
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: Negative numbers
    medianFinder4 = MedianFinder()
    medianFinder4.addNum(-1)
    medianFinder4.addNum(-2)
    medianFinder4.addNum(-3)
    result = medianFinder4.findMedian()
    expected = -2.0
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 5: Duplicates
    medianFinder5 = MedianFinder()
    medianFinder5.addNum(1)
    medianFinder5.addNum(1)
    medianFinder5.addNum(1)
    result = medianFinder5.findMedian()
    expected = 1.0
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print(f"Solution for 295. Find Median From Data Stream")
    medianFinder = MedianFinder()
    medianFinder.addNum(1)
    print(f"After adding 1, median: {medianFinder.findMedian()}")
    medianFinder.addNum(2)
    print(f"After adding 2, median: {medianFinder.findMedian()}")
    medianFinder.addNum(3)
    print(f"After adding 3, median: {medianFinder.findMedian()}")
