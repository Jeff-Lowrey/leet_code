"""
# 295. Find Median from Data Stream
**Hard**

The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

Implement the MedianFinder class:
- MedianFinder() initializes the MedianFinder object.
- void addNum(int num) adds the integer num from the data stream to the data structure.
- double findMedian() returns the median of all elements so far.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use two heaps to divide numbers into two halves: max-heap for smaller half, min-heap for larger half. The median is always at the top of one or both heaps.

### APPROACH:
1. **Two heaps**: max-heap (left half), min-heap (right half)
2. **Balance heaps**: Keep sizes equal or left heap has 1 more
3. **Add number**:
   - Add to left heap, then move largest to right heap
   - If right > left, move smallest from right to left
4. **Find median**:
   - If sizes equal: average of both tops
   - Else: top of left heap

### WHY THIS WORKS:
- Max-heap stores smaller half (can get largest quickly)
- Min-heap stores larger half (can get smallest quickly)
- Tops of heaps are always the middle elements
- Balancing ensures O(1) median access

### TIME COMPLEXITY:
- addNum(): O(log n) - heap operations
- findMedian(): O(1) - just access heap tops

### SPACE COMPLEXITY: O(n)
Store all n numbers across two heaps

### EXAMPLE WALKTHROUGH:
```
addNum(1):
  left=[1], right=[]
  median = 1

addNum(2):
  left=[1], right=[2]
  median = (1+2)/2 = 1.5

addNum(3):
  left=[2,1], right=[3]
  median = 2 (top of left heap)

addNum(4):
  left=[2,1], right=[3,4]
  median = (2+3)/2 = 2.5
```

### KEY INSIGHTS:
- Python heapq is min-heap, negate values for max-heap
- Keep left heap size ≥ right heap size
- After every add, heaps differ by at most 1
- Alternative: balanced BST, but heaps simpler

### EDGE CASES:
- Single element
- Two elements
- Negative numbers
- Duplicate values
- Large data stream

</details>
"""

import heapq


class MedianFinder:
    """Find median from data stream using two heaps."""

    def __init__(self) -> None:
        """
        Initialize data structure.

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        # Max-heap for smaller half (negate values)
        self.left: list[int] = []
        # Min-heap for larger half
        self.right: list[int] = []

    def addNum(self, num: int) -> None:
        """
        Add number to data structure.

        Args:
            num: Number to add

        Time Complexity: O(log n)
        Space Complexity: O(1)
        """
        # Add to left heap (max-heap, so negate)
        heapq.heappush(self.left, -num)

        # Move largest from left to right
        heapq.heappush(self.right, -heapq.heappop(self.left))

        # Balance: left should have >= elements than right
        if len(self.right) > len(self.left):
            heapq.heappush(self.left, -heapq.heappop(self.right))

    def findMedian(self) -> float:
        """
        Find median of all added numbers.

        Returns:
            The median value

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        if len(self.left) > len(self.right):
            # Odd count: return top of left (negate back)
            return float(-self.left[0])
        else:
            # Even count: average of both tops
            return (-self.left[0] + self.right[0]) / 2.0


class MedianFinderAlternative:
    """Alternative implementation with clearer logic."""

    def __init__(self) -> None:
        """Initialize with two heaps."""
        self.small: list[int] = []  # Max-heap (negated)
        self.large: list[int] = []  # Min-heap

    def addNum(self, num: int) -> None:
        """Add number maintaining heap balance."""
        # Always add to small first
        heapq.heappush(self.small, -num)

        # Ensure every element in small <= every element in large
        if self.small and self.large and (-self.small[0] > self.large[0]):
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)

        # Balance sizes (small can have at most 1 more than large)
        if len(self.small) > len(self.large) + 1:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        if len(self.large) > len(self.small):
            val = heapq.heappop(self.large)
            heapq.heappush(self.small, -val)

    def findMedian(self) -> float:
        """Return median of all elements."""
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2.0


def test_solution() -> None:
    """Test cases for Problem 295."""

    # Test case 1: Basic example
    mf = MedianFinder()
    mf.addNum(1)
    assert mf.findMedian() == 1.0
    mf.addNum(2)
    assert mf.findMedian() == 1.5
    mf.addNum(3)
    assert mf.findMedian() == 2.0
    print("Test case 1 passed")

    # Test case 2: Example from problem
    mf2 = MedianFinder()
    mf2.addNum(1)
    mf2.addNum(2)
    assert mf2.findMedian() == 1.5
    mf2.addNum(3)
    assert mf2.findMedian() == 2.0
    print("Test case 2 passed")

    # Test case 3: Negative numbers
    mf3 = MedianFinder()
    mf3.addNum(-1)
    assert mf3.findMedian() == -1.0
    mf3.addNum(-2)
    assert mf3.findMedian() == -1.5
    mf3.addNum(-3)
    assert mf3.findMedian() == -2.0
    print("Test case 3 passed")

    # Test case 4: Mixed positive/negative
    mf4 = MedianFinder()
    for num in [5, -3, 0, 8, -2]:
        mf4.addNum(num)
    # Sorted: [-3, -2, 0, 5, 8], median = 0
    assert mf4.findMedian() == 0.0
    print("Test case 4 passed")

    # Test case 5: Duplicate values
    mf5 = MedianFinder()
    for num in [1, 1, 1, 1]:
        mf5.addNum(num)
    assert mf5.findMedian() == 1.0
    print("Test case 5 passed")

    # Test case 6: Large stream
    mf6 = MedianFinder()
    for num in range(1, 11):
        mf6.addNum(num)
    # [1..10], median = (5+6)/2 = 5.5
    assert mf6.findMedian() == 5.5
    print("Test case 6 passed")

    # Test case 7: Single element
    mf7 = MedianFinder()
    mf7.addNum(42)
    assert mf7.findMedian() == 42.0
    print("Test case 7 passed")

    # Test alternative implementation
    mf8 = MedianFinderAlternative()
    mf8.addNum(1)
    mf8.addNum(2)
    assert mf8.findMedian() == 1.5
    mf8.addNum(3)
    assert mf8.findMedian() == 2.0
    print("Test case 8 passed: Alternative implementation")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print("\n=== 295. Find Median from Data Stream ===")

    mf = MedianFinder()
    nums = [1, 2, 3, 4, 5]

    print("Adding numbers and tracking median:")
    for num in nums:
        mf.addNum(num)
        print(f"addNum({num}) -> median = {mf.findMedian()}")

    # Demonstrate heap state
    print("\n\nHeap state after adding [1,2,3,4,5]:")
    print(f"Left heap (max-heap, negated): {[-x for x in mf.left]}")
    print(f"Right heap (min-heap): {mf.right}")
    print(f"Median: {mf.findMedian()}")

    # Add more numbers
    print("\n\nAdding more numbers:")
    for num in [6, 7]:
        mf.addNum(num)
        print(f"addNum({num}) -> median = {mf.findMedian()}")
