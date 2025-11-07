"""
### INTUITION:
The key insight is that several approaches: min-heap (keep k largest), max-heap (pop k-1 times), or QuickSelect (partition-based like QuickSort). QuickSelect is optimal O(n) average case.

### APPROACH:
1. **Build initial min-heap**: Create a min-heap from the first k elements of the array using heapify
2. **Process remaining elements**: Iterate through the rest of the array starting from index k
3. **Compare with heap root**: For each element, check if it's larger than the smallest element in heap (heap[0])
4. **Replace if larger**: If element is larger than heap root, replace the root with this element using heapreplace
5. **Maintain heap size k**: Heap always contains the k largest elements seen so far, with smallest of those k at the root
6. **Return kth largest**: After processing all elements, the root of the min-heap is the kth largest element
7. **Alternative QuickSelect**: Use partition-based selection similar to QuickSort for O(n) average time complexity

### WHY THIS WORKS:
- **Heap**: Root of min-heap with k elements = kth largest
- **QuickSelect**: Partially sorts to find kth element (like QuickSort but only one partition)
- **Quick Select** doesn't need full sort, just correct position

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [3,2,1,5,6,4], k = 2
```

Min-Heap approach:
- Build heap with first k=2: [2, 3]
- Process 1: 1 < 2, skip
- Process 5: 5 > 2, replace: [3, 5]
- Process 6: 6 > 3, replace: [5, 6]
- Process 4: 4 < 5, skip
- Result: heap[0] = 5
QuickSelect approach:
- Pivot 4: [3,2,1,4] | [5,6]
- Position 4 from right, need position 2
- Recurse right: [5,6]
- Pivot 5: [5] | [6]
- Position 2 from right = answer: 5

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
- Min-heap: **O(n log k)**
- Max-heap: **O(n + k log n)**
- QuickSelect: **O(n)** average, **O(n²)** worst
- Sorting: **O(n log n)**

### SPACE COMPLEXITY:
- Min-heap: **O(k)**
- QuickSelect: **O(1)** if in-place
- Sorting: **O(1)** or **O(n)** depending on algorithm

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""

import heapq
import random


class Solution:
    def findKthLargest(self, nums: list[int], k: int) -> int:
        """
        Find kth largest using min-heap.

        Args:
            nums: Array of integers
            k: Position of largest element (1-indexed)

        Returns:
            The kth largest element

        Time Complexity: O(n log k)
        Space Complexity: O(k)
        """
        # Build min-heap of size k
        heap = nums[:k]
        heapq.heapify(heap)

        # Process remaining elements
        for i in range(k, len(nums)):
            if nums[i] > heap[0]:
                heapq.heapreplace(heap, nums[i])

        return heap[0]

    def findKthLargestHeapNlogN(self, nums: list[int], k: int) -> int:
        """
        Simple approach using heapq.nlargest.

        Time Complexity: O(n log k)
        Space Complexity: O(k)
        """
        return heapq.nlargest(k, nums)[-1]

    def findKthLargestQuickSelect(self, nums: list[int], k: int) -> int:
        """
        QuickSelect algorithm (optimal average case).

        Args:
            nums: Array of integers
            k: Position of largest element

        Returns:
            The kth largest element

        Time Complexity: O(n) average, O(n²) worst
        Space Complexity: O(1)
        """

        def partition(left: int, right: int, pivot_idx: int) -> int:
            """Partition array around pivot, return pivot's final position."""
            pivot_value = nums[pivot_idx]

            # Move pivot to end
            nums[pivot_idx], nums[right] = nums[right], nums[pivot_idx]

            # Move all smaller elements to left
            store_idx = left
            for i in range(left, right):
                if nums[i] < pivot_value:
                    nums[i], nums[store_idx] = nums[store_idx], nums[i]
                    store_idx += 1

            # Move pivot to final position
            nums[store_idx], nums[right] = nums[right], nums[store_idx]
            return store_idx

        def select(left: int, right: int, k_smallest: int) -> int:
            """Find kth smallest element in nums[left:right+1]."""
            if left == right:
                return nums[left]

            # Choose random pivot to avoid worst case
            pivot_idx = random.randint(left, right)

            # Partition and get pivot position
            pivot_idx = partition(left, right, pivot_idx)

            # Pivot is in its final sorted position
            if k_smallest == pivot_idx:
                return nums[k_smallest]
            elif k_smallest < pivot_idx:
                return select(left, pivot_idx - 1, k_smallest)
            else:
                return select(pivot_idx + 1, right, k_smallest)

        # kth largest = (n - k)th smallest (0-indexed)
        return select(0, len(nums) - 1, len(nums) - k)

    def findKthLargestSort(self, nums: list[int], k: int) -> int:
        """
        Brute force: sort and return.

        Time Complexity: O(n log n)
        Space Complexity: O(1) or O(n) depending on sort algorithm
        """
        nums.sort(reverse=True)
        return nums[k - 1]

    def findKthLargestMaxHeap(self, nums: list[int], k: int) -> int:
        """
        Using max-heap: heapify and pop k-1 times.

        Time Complexity: O(n + k log n)
        Space Complexity: O(n)
        """
        # Python heapq is min-heap, so negate for max-heap
        max_heap = [-num for num in nums]
        heapq.heapify(max_heap)

        # Pop k-1 times
        for _ in range(k - 1):
            heapq.heappop(max_heap)

        return -heapq.heappop(max_heap)


def test_solution() -> None:
    """Test cases for Problem 215."""
    solution = Solution()

    # Test case 1: Basic example
    assert solution.findKthLargest([3, 2, 1, 5, 6, 4], 2) == 5
    print("Test case 1 passed")

    # Test case 2: k = 1 (maximum)
    assert solution.findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 1) == 6
    print("Test case 2 passed")

    # Test case 3: k = n (minimum)
    assert solution.findKthLargest([1, 2, 3], 3) == 1
    print("Test case 3 passed")

    # Test case 4: All same
    assert solution.findKthLargest([5, 5, 5, 5], 2) == 5
    print("Test case 4 passed")

    # Test case 5: Negative numbers
    assert solution.findKthLargest([-1, -2, -3, -4], 2) == -2
    print("Test case 5 passed")

    # Test case 6: Single element
    assert solution.findKthLargest([1], 1) == 1
    print("Test case 6 passed")

    # Test case 7: Two elements
    assert solution.findKthLargest([2, 1], 1) == 2
    assert solution.findKthLargest([2, 1], 2) == 1
    print("Test case 7 passed")

    # Test QuickSelect approach
    assert solution.findKthLargestQuickSelect([3, 2, 1, 5, 6, 4], 2) == 5
    print("Test case 8 passed: QuickSelect")

    # Test sorting approach
    assert solution.findKthLargestSort([3, 2, 1, 5, 6, 4], 2) == 5
    print("Test case 9 passed: Sorting")

    # Test max-heap approach
    assert solution.findKthLargestMaxHeap([3, 2, 1, 5, 6, 4], 2) == 5
    print("Test case 10 passed: Max-heap")

    # Test nlargest approach
    assert solution.findKthLargestHeapNlogN([3, 2, 1, 5, 6, 4], 2) == 5
    print("Test case 11 passed: heapq.nlargest")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("\n=== 215. Kth Largest Element in an Array ===")

    nums = [3, 2, 1, 5, 6, 4]
    for k in range(1, 4):
        result = solution.findKthLargest(nums.copy(), k)
        print(f"findKthLargest(nums, k={k}) -> result")

    # Compare approaches
    print("\n\nComparing approaches for nums=[3,2,1,5,6,4], k=2:")
    nums = [3, 2, 1, 5, 6, 4]
    print(f"Min-heap:      {solution.findKthLargest(nums.copy(), 2)}")
    print(f"QuickSelect:   {solution.findKthLargestQuickSelect(nums.copy(), 2)}")
    print(f"Sorting:       {solution.findKthLargestSort(nums.copy(), 2)}")
    print(f"Max-heap:      {solution.findKthLargestMaxHeap(nums.copy(), 2)}")
    print(f"heapq.nlargest: {solution.findKthLargestHeapNlogN(nums.copy(), 2)}")
