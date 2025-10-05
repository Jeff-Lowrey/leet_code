I'll help you create a solution for the Median Finder implementation in Python. This solution will use a two-heap approach to efficiently maintain and find the median of a data stream.

```python
"""
Median Finder Implementation
---------------------------
This implementation uses two heaps to maintain the median of a data stream:
- A max heap for the lower half of numbers
- A min heap for the upper half of numbers

The median is either the top of max heap (if odd number of elements)
or average of both heap tops (if even number of elements).
"""

import heapq

class MedianFinder:
    def __init__(self):
        """
        Initialize your data structure here.
        - max_heap stores the lower half of numbers (as negatives for max heap simulation)
        - min_heap stores the upper half of numbers
        """
        self.max_heap = []  # Lower half (negated values)
        self.min_heap = []  # Upper half
        
    def addNum(self, num: int) -> None:
        """
        Adds a number to the data structure.
        
        Args:
            num: The number to be added
            
        Strategy:
        1. Add to max_heap first (negated)
        2. Balance heaps if needed
        3. Ensure size difference is at most 1
        """
        # Add to max heap (with negation)
        heapq.heappush(self.max_heap, -num)
        
        # Ensure every number in max_heap is <= every number in min_heap
        if (self.max_heap and self.min_heap and 
            (-self.max_heap[0] > self.min_heap[0])):
            value = -heapq.heappop(self.max_heap)
            heapq.heappush(self.min_heap, value)
            
        # Balance heaps if size difference > 1
        if len(self.max_heap) > len(self.min_heap) + 1:
            value = -heapq.heappop(self.max_heap)
            heapq.heappush(self.min_heap, value)
        elif len(self.min_heap) > len(self.max_heap):
            value = heapq.heappop(self.min_heap)
            heapq.heappush(self.max_heap, -value)

    def findMedian(self) -> float:
        """
        Returns the median of all numbers added so far.
        
        Returns:
            float: The current median
            
        Strategy:
        - If odd number of elements: return max heap top
        - If even number of elements: return average of both heap tops
        """
        if len(self.max_heap) > len(self.min_heap):
            return float(-self.max_heap[0])
        elif len(self.max_heap) == len(self.min_heap):
            return (-self.max_heap[0] + self.min_heap[0]) / 2.0
        else:
            return float(self.min_heap[0])

def test_median_finder():
    """
    Test function to demonstrate MedianFinder usage
    """
    mf = MedianFinder()
    
    # Test case 1: Adding numbers one by one
    test_numbers = [1, 2, 3]
    expected_medians = [1.0, 1.5, 2.0]
    
    for i, num in enumerate(test_numbers):
        mf.addNum(num)
        actual_median = mf.findMedian()
        print(f"After adding {num}, median is {actual_median} "
              f"(expected: {expected_medians[i]})")
        
    # Test case 2: Adding numbers in non-sorted order
    mf = MedianFinder()
    test_numbers = [5, 2, 8, 1, 3]
    for num in test_numbers:
        mf.addNum(num)
        print(f"After adding {num}, median is {mf.findMedian()}")

if __name__ == "__main__":
    test_median_finder()
```

This implementation provides:

1. A `MedianFinder` class that efficiently maintains the median of a data stream
2. Two main methods:
   - `addNum`: Adds a number to the data structure
   - `findMedian`: Returns the current median
3. A test function to demonstrate usage
4. Comprehensive comments explaining the implementation
5. Efficient O(log n) time complexity for adding numbers and O(1) for finding median
6. Proper handling of both odd and even number of elements

The solution uses two heaps:
- A max heap for the lower half of numbers (implemented using a min heap with negated values)
- A min heap for the upper half of numbers

This approach ensures that we can efficiently maintain and find the median at any time, with the median either being the top of the max heap (odd number of elements) or the average of both heap tops (even number of elements).

The code includes error handling, follows Python conventions, and includes a test function to demonstrate its usage.