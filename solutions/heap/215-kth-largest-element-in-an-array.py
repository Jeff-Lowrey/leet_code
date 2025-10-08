"""
# 215. Kth Largest Element In An Array
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


class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        """
        Find the kth largest element in an unsorted array using a min heap.

        Args:
            nums: List of integers
            k: The kth position (1-indexed)

        Returns:
            The kth largest element

        Time Complexity: O(n log k)
        Space Complexity: O(k)
        """
        # Maintain a min heap of size k
        # The root will be the kth largest element
        min_heap = []

        for num in nums:
            heapq.heappush(min_heap, num)
            # Keep only k largest elements
            if len(min_heap) > k:
                heapq.heappop(min_heap)

        return min_heap[0]

    def solve(self, *args):
        """
        Main solution for 215. Kth Largest Element In An Array.

        Args:
            *args: Problem-specific arguments

        Returns:
            Problem-specific return type

        Time Complexity: O(n log k)
        Space Complexity: O(k)
        """
        return self.findKthLargest(*args)


def test_solution():
    """
    Test cases for 215. Kth Largest Element In An Array.
    """
    solution = Solution()

    # Test case 1: Basic functionality
    result = solution.findKthLargest([3, 2, 1, 5, 6, 4], 2)
    expected = 5
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Another example
    result = solution.findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)
    expected = 4
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: k equals array length (smallest element)
    result = solution.findKthLargest([1, 2, 3], 3)
    expected = 1
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: k equals 1 (largest element)
    result = solution.findKthLargest([5, 1, 9, 3, 7], 1)
    expected = 9
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 5: Single element
    result = solution.findKthLargest([1], 1)
    expected = 1
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 6: Duplicate elements
    result = solution.findKthLargest([2, 2, 2, 2], 2)
    expected = 2
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 215. Kth Largest Element In An Array")
    print(f"Example: [3,2,1,5,6,4], k=2 -> {solution.findKthLargest([3,2,1,5,6,4], 2)}")
