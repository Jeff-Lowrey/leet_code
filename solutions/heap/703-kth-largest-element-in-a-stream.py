"""
# 703. Kth Largest Element In A Stream
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
from typing import List


class KthLargest:
    """
    Find kth largest element in a stream using a min heap.

    Maintains a min heap of size k containing the k largest elements.
    The root of the heap is always the kth largest element.
    """

    def __init__(self, k: int, nums: List[int]):
        """
        Initialize the data structure with k and initial array.

        Args:
            k: Position of element to track (1-indexed)
            nums: Initial array of integers

        Time Complexity: O(n log k)
        Space Complexity: O(k)
        """
        self.k = k
        self.min_heap = []

        # Add all initial numbers
        for num in nums:
            self.add(num)

    def add(self, val: int) -> int:
        """
        Add a value to the stream and return the kth largest element.

        Args:
            val: Value to add

        Returns:
            The kth largest element after adding val

        Time Complexity: O(log k)
        """
        heapq.heappush(self.min_heap, val)

        # Keep only k largest elements
        if len(self.min_heap) > self.k:
            heapq.heappop(self.min_heap)

        return self.min_heap[0]


class Solution:
    def solve(self, *args):
        """
        Main solution for 703. Kth Largest Element In A Stream.

        Args:
            *args: Problem-specific arguments

        Returns:
            KthLargest instance

        Time Complexity: O(n log k) for initialization, O(log k) per add
        Space Complexity: O(k)
        """
        return KthLargest(*args)


def test_solution():
    """
    Test cases for 703. Kth Largest Element In A Stream.
    """
    # Test case 1: Basic functionality
    kthLargest = KthLargest(3, [4, 5, 8, 2])

    result = kthLargest.add(3)
    expected = 4
    assert result == expected, f"Expected {expected}, got {result}"

    result = kthLargest.add(5)
    expected = 5
    assert result == expected, f"Expected {expected}, got {result}"

    result = kthLargest.add(10)
    expected = 5
    assert result == expected, f"Expected {expected}, got {result}"

    result = kthLargest.add(9)
    expected = 8
    assert result == expected, f"Expected {expected}, got {result}"

    result = kthLargest.add(4)
    expected = 8
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: k = 1 (always track maximum)
    kthLargest2 = KthLargest(1, [1])

    result = kthLargest2.add(2)
    expected = 2
    assert result == expected, f"Expected {expected}, got {result}"

    result = kthLargest2.add(3)
    expected = 3
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Empty initial array
    kthLargest3 = KthLargest(2, [])

    result = kthLargest3.add(1)
    expected = 1
    assert result == expected, f"Expected {expected}, got {result}"

    result = kthLargest3.add(2)
    expected = 1
    assert result == expected, f"Expected {expected}, got {result}"

    result = kthLargest3.add(3)
    expected = 2
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: Negative numbers
    kthLargest4 = KthLargest(2, [-1, -2, -3])

    result = kthLargest4.add(0)
    expected = -1
    assert result == expected, f"Expected {expected}, got {result}"

    result = kthLargest4.add(1)
    expected = 0
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print(f"Solution for 703. Kth Largest Element In A Stream")
    kthLargest = KthLargest(3, [4, 5, 8, 2])
    print(f"Initial: k=3, nums=[4,5,8,2]")
    print(f"Add 3: {kthLargest.add(3)}")
    print(f"Add 5: {kthLargest.add(5)}")
    print(f"Add 10: {kthLargest.add(10)}")
