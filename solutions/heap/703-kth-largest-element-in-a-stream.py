"""
# 703. Kth Largest Element in a Stream
# Difficulty: Easy
Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Implement KthLargest class:
- KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of integers nums.
- int add(int val) Appends the integer val to the stream and returns the element representing the kth largest element in the stream.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use a min-heap of size k. The root of the heap is always the kth largest element. When adding a new element, if it's larger than the root, replace the root. This maintains exactly k largest elements with the smallest at the top.

### APPROACH:
1. **Initialize min-heap**: Add first k elements from nums
2. **Maintain heap size k**: If heap grows beyond k, pop smallest
3. **add() operation**:
   - Add new element to heap
   - If heap size > k, remove smallest
   - Return heap root (kth largest)

### WHY THIS WORKS:
- Min-heap with k elements keeps k largest elements
- Root of min-heap is the smallest of the k largest = kth largest overall
- When new element added, if it's in top k, smallest of previous top k is removed
- Heap operations are O(log k), efficient for streaming data

### TIME COMPLEXITY:
- Constructor: O(n log k) where n = len(nums)
- add(): O(log k)

### SPACE COMPLEXITY: O(k)
Heap stores at most k elements

### EXAMPLE WALKTHROUGH:
```
k = 3, nums = [4, 5, 8, 2]

Initial heap (3 largest): [4, 5, 8]
Min-heap structure: 4 at root (kth largest = 4)

add(3):
  - Add 3 to heap: [3, 4, 5, 8]
  - Size > k, remove min: [4, 5, 8]
  - Return root: 4

add(5):
  - Add 5 to heap: [4, 5, 5, 8]
  - Size > k, remove min: [5, 5, 8]
  - Return root: 5

add(10):
  - Add 10 to heap: [5, 5, 8, 10]
  - Size > k, remove min: [5, 8, 10]
  - Return root: 5
```

### KEY INSIGHTS:
- Don't need to sort entire stream
- Only care about top k elements
- Min-heap root = kth largest (smallest of top k)
- Alternative: max-heap but remove from bottom (less efficient)

### EDGE CASES:
- k = 1 (just track maximum)
- Empty initial array
- All elements same
- Negative numbers
- k > initial array size

</details>
"""

import heapq

class KthLargest:
    """Find kth largest element in a stream using min-heap."""

    def __init__(self, k: int, nums: list[int]) -> None:
        """
        Initialize with k and initial numbers.

        Args:
            k: Position of largest element to track
            nums: Initial stream of numbers

        Time Complexity: O(n log k)
        Space Complexity: O(k)
        """
        self.k = k
        self.heap: list[int] = []

        # Add all initial numbers
        for num in nums:
            self.add(num)

    def add(self, val: int) -> int:
        """
        Add value to stream and return kth largest.

        Args:
            val: Value to add to stream

        Returns:
            The kth largest element in the stream

        Time Complexity: O(log k)
        Space Complexity: O(1)
        """
        # Add new value to heap
        heapq.heappush(self.heap, val)

        # Maintain heap size at k (remove smallest if > k)
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)

        # Root of min-heap is kth largest
        return self.heap[0]

class KthLargestAlternative:
    """Alternative implementation with explicit heap initialization."""

    def __init__(self, k: int, nums: list[int]) -> None:
        """Initialize with k and nums using heapify."""
        self.k = k
        self.heap = nums
        heapq.heapify(self.heap)

        # Keep only k largest elements
        while len(self.heap) > k:
            heapq.heappop(self.heap)

    def add(self, val: int) -> int:
        """Add value and return kth largest."""
        if len(self.heap) < self.k:
            heapq.heappush(self.heap, val)
        elif val > self.heap[0]:
            heapq.heapreplace(self.heap, val)

        return self.heap[0]

def test_solution() -> None:
    """Test cases for Problem 703."""

    # Test case 1: Basic example
    kth_largest = KthLargest(3, [4, 5, 8, 2])
    assert kth_largest.add(3) == 4, "add(3) should return 4"
    assert kth_largest.add(5) == 5, "add(5) should return 5"
    assert kth_largest.add(10) == 5, "add(10) should return 5"
    assert kth_largest.add(9) == 8, "add(9) should return 8"
    assert kth_largest.add(4) == 8, "add(4) should return 8"
    print("Test case 1 passed")

    # Test case 2: k = 1 (track maximum)
    kth_largest2 = KthLargest(1, [])
    assert kth_largest2.add(-3) == -3
    assert kth_largest2.add(-2) == -2
    assert kth_largest2.add(-4) == -2
    assert kth_largest2.add(0) == 0
    assert kth_largest2.add(4) == 4
    print("Test case 2 passed")

    # Test case 3: Empty initial array
    kth_largest3 = KthLargest(2, [])
    assert kth_largest3.add(3) == 3
    assert kth_largest3.add(5) == 3
    assert kth_largest3.add(10) == 5
    assert kth_largest3.add(9) == 9
    print("Test case 3 passed")

    # Test case 4: All same values
    kth_largest4 = KthLargest(2, [1, 1, 1, 1])
    assert kth_largest4.add(1) == 1
    assert kth_largest4.add(2) == 1
    print("Test case 4 passed")

    # Test case 5: Negative numbers
    kth_largest5 = KthLargest(3, [-10, 1, 3, 1, 4, 10, 3, 9, 4, 5, 1])
    assert kth_largest5.add(3) == 4
    assert kth_largest5.add(2) == 4
    assert kth_largest5.add(5) == 5
    print("Test case 5 passed")

    # Test alternative implementation
    kth_largest6 = KthLargestAlternative(3, [4, 5, 8, 2])
    assert kth_largest6.add(3) == 4
    assert kth_largest6.add(5) == 5
    assert kth_largest6.add(10) == 5
    print("Test case 6 passed: Alternative implementation")

    print("\nAll test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    print("\n=== 703. Kth Largest Element in a Stream ===")

    kth_largest = KthLargest(3, [4, 5, 8, 2])
    print("Initial array: [4, 5, 8, 2], k = 3")
    print(f"Kth largest (3rd): {kth_largest.heap[0]}")

    operations = [3, 5, 10, 9, 4]
    print("\nAdding elements:")
    for val in operations:
        result = kth_largest.add(val)
        print(f"add({val}) -> {result} (heap: {sorted(kth_largest.heap, reverse=True)})")

    # Demonstrate heap property
    print("\n\nHeap visualization (k=3):")
    print("After adding [4,5,8,2]:")
    demo = KthLargest(3, [4, 5, 8, 2])
    print(f"  Heap (min-heap): {demo.heap}")
    print(f"  Root (kth largest): {demo.heap[0]}")
    print(f"  Sorted (for clarity): {sorted(demo.heap, reverse=True)}")
