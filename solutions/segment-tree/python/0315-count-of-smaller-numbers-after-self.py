"""
# Difficulty: Hard

# 0315. Count Of Smaller Numbers After Self

Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[2, 1, 1, 0]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>Counts of smaller numbers after each element: [2,1,1,0] for [5,2,6,1]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Set, Array, Tree
**Patterns**: Two Pointers Pattern, Hash Table Pattern
**Time Complexity**: O(n log n) - Sorting or divide-and-conquer
**Space Complexity**: O(n) - Additional set storage

### INTUITION:
This is a classic "count inversions" problem that can be solved efficiently using various advanced data structures. The naive O(n²) approach checks every pair, but we can do better using merge sort, segment trees, or Binary Indexed Trees (Fenwick Trees).

### APPROACH:
1. **Create indexed pairs**: Build array of (value, original_index) pairs to track positions during sorting
2. **Initialize result array**: Create array of zeros to store counts for each original position
3. **Define merge sort function**: Implement merge sort that recursively divides array into halves
4. **Merge with counting**: During merge, when comparing elements from left and right halves, count inversions
5. **Count smaller elements**: When left[i] <= right[j], all remaining elements in right array are larger, so add their count to result
6. **Preserve order**: Merge elements while maintaining sorted order by value, preserving index information
7. **Return result**: After complete merge sort, result array contains count of smaller elements after each position

### WHY THIS WORKS:
A set by definition contains only unique elements - when we convert an array to a set, any duplicates are automatically removed. By comparing the lengths of the original array and the set, we can detect if duplicates existed. The early termination approach works because as soon as we find an element already in our seen set, we've proven a duplicate exists without needing to check the remaining elements.

### EXAMPLE WALKTHROUGH:
Input:
```
[5,2,6,1]
```

Process right to left:
- nums[3]=1: no elements after it, count=0
- nums[2]=6: elements after: [1], smaller: 1, count=1
- nums[1]=2: elements after: [6,1], smaller: 1, count=1
- nums[0]=5: elements after: [2,6,1], smaller: 2, count=2

Output:
```
[2,1,1,0]
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
O(n log n)
For merge sort and tree-based approaches

### SPACE COMPLEXITY:
O(n)
For auxiliary data structures

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
"""

import time
from typing import Any


class Solution:
    def countSmaller(self, nums: list[int]) -> list[int]:
        """
        Count smaller numbers after self using merge sort approach.

        Args:
            nums: Input array of integers

        Returns:
            Array where counts[i] = number of smaller elements after nums[i]

        Time Complexity: O(n log n) - merge sort with counting
        Space Complexity: O(n) - for auxiliary arrays and result
        """
        if not nums:
            return []

        # Create index array to track original positions
        indexed_nums = [(nums[i], i) for i in range(len(nums))]
        result = [0] * len(nums)

        def merge_sort(arr: Any) -> Any:
            if len(arr) <= 1:
                return arr

            mid = len(arr) // 2
            left = merge_sort(arr[:mid])
            right = merge_sort(arr[mid:])

            return merge(left, right)

        def merge(left: Any, right: Any) -> Any:
            merged: list[Any] = []
            i = j = 0

            while i < len(left) and j < len(right):
                if left[i][0] <= right[j][0]:
                    # All elements in right[j:] are greater than left[i]
                    # So left[i] has j smaller elements after it in right array
                    result[left[i][1]] += len(right) - j
                    merged.append(left[i])
                    i += 1
                else:
                    merged.append(right[j])
                    j += 1

            # Add remaining elements
            while i < len(left):
                merged.append(left[i])
                i += 1
            while j < len(right):
                merged.append(right[j])
                j += 1

            return merged

        merge_sort(indexed_nums)
        return result

    def countSmallerBIT(self, nums: list[int]) -> list[int]:
        """
        Solution using Binary Indexed Tree (Fenwick Tree).

        Args:
            nums: Input array of integers

        Returns:
            Count array for smaller elements after each position

        Time Complexity: O(n log n)
        Space Complexity: O(n)
        """
        if not nums:
            return []

        # Coordinate compression
        sorted_unique = sorted(set(nums))
        rank = {v: i + 1 for i, v in enumerate(sorted_unique)}  # 1-indexed

        class BinaryIndexedTree:
            def __init__(self: Any, n: Any) -> None:
                self.n = n
                self.tree = [0] * (n + 1)

            def update(self: Any, i: Any, delta: Any) -> Any:
                while i <= self.n:
                    self.tree[i] += delta
                    i += i & (-i)

            def query(self: Any, i: Any) -> Any:
                s = 0
                while i > 0:
                    s += self.tree[i]
                    i -= i & (-i)
                return s

        bit = BinaryIndexedTree(len(sorted_unique))
        result: list[Any] = []

        # Process from right to left
        for i in range(len(nums) - 1, -1, -1):
            # Count numbers smaller than nums[i]
            rank_i = rank[nums[i]]
            count = bit.query(rank_i - 1)  # Count of elements with rank < rank_i
            result.append(count)

            # Add current number to BIT
            bit.update(rank_i, 1)

        return result[::-1]  # Reverse since we processed right to left

    def countSmallerSegmentTree(self, nums: list[int]) -> list[int]:
        """
        Solution using Segment Tree.

        Args:
            nums: Input array of integers

        Returns:
            Count array for smaller elements after each position
        """
        if not nums:
            return []

        # Coordinate compression
        sorted_unique = sorted(set(nums))
        rank = {v: i for i, v in enumerate(sorted_unique)}

        class SegmentTree:
            def __init__(self: Any, n: Any) -> None:
                self.n = n
                self.tree = [0] * (4 * n)

            def update(self: Any, node: Any, start: Any, end: Any, idx: Any) -> Any:
                if start == end:
                    self.tree[node] += 1
                else:
                    mid = (start + end) // 2
                    if idx <= mid:
                        self.update(2 * node, start, mid, idx)
                    else:
                        self.update(2 * node + 1, mid + 1, end, idx)
                    self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

            def query(self: Any, node: Any, start: Any, end: Any, l: Any, r: Any) -> Any:
                if r < start or end < l:
                    return 0
                if l <= start and end <= r:
                    return self.tree[node]
                mid = (start + end) // 2
                return self.query(2 * node, start, mid, l, r) + self.query(2 * node + 1, mid + 1, end, l, r)

        n = len(sorted_unique)
        seg_tree = SegmentTree(n)
        result = []

        # Process from right to left
        for i in range(len(nums) - 1, -1, -1):
            rank_i = rank[nums[i]]
            # Query for count of elements with rank < rank_i
            count = seg_tree.query(1, 0, n - 1, 0, rank_i - 1) if rank_i > 0 else 0
            result.append(count)

            # Update segment tree
            seg_tree.update(1, 0, n - 1, rank_i)

        return result[::-1]

    def countSmallerBruteForce(self, nums: list[int]) -> list[int]:
        """
        Brute force solution for comparison.

        Args:
            nums: Input array

        Returns:
            Count array

        Time Complexity: O(n²)
        Space Complexity: O(1)
        """
        result = []
        for i in range(len(nums)):
            count = 0
            for j in range(i + 1, len(nums)):
                if nums[j] < nums[i]:
                    count += 1
            result.append(count)
        return result


def test_solution() -> None:
    """Test cases for Problem 315."""
    solution = Solution()

    # Test case 1: Basic example
    result1 = solution.countSmaller([5, 2, 6, 1])
    expected1 = [2, 1, 1, 0]
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Empty array
    result2 = solution.countSmaller([])
    expected2: list[Any] = []
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Single element
    result3 = solution.countSmaller([1])
    expected3 = [0]
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Decreasing array
    result4 = solution.countSmaller([5, 4, 3, 2, 1])
    expected4 = [4, 3, 2, 1, 0]
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Increasing array
    result5 = solution.countSmaller([1, 2, 3, 4, 5])
    expected5 = [0, 0, 0, 0, 0]
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Duplicates
    result6 = solution.countSmaller([1, 1, 1, 1])
    expected6 = [0, 0, 0, 0]
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test case 7: Mixed with negatives
    result7 = solution.countSmaller([-1, 2, -3, 4])
    expected7 = [1, 1, 0, 0]
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test BIT solution
    result8 = solution.countSmallerBIT([5, 2, 6, 1])
    expected8 = [2, 1, 1, 0]
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    # Test Segment Tree solution
    result9 = solution.countSmallerSegmentTree([5, 2, 6, 1])
    expected9 = [2, 1, 1, 0]
    assert result9 == expected9, f"Expected {expected9}, got {result9}"

    # Test brute force solution
    result10 = solution.countSmallerBruteForce([5, 2, 6, 1])
    expected10 = [2, 1, 1, 0]
    assert result10 == expected10, f"Expected {expected10}, got {result10}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage and demonstration
    solution = Solution()
    print("=== 315. Count Of Smaller Numbers After Self ===")

    test_cases = [[5, 2, 6, 1], [1, 2, 3, 4, 5], [5, 4, 3, 2, 1], [-1, 2, -3, 4]]

    for nums in test_cases:
        print(f"\nInput: nums")

        # Show all approaches
        result_merge = solution.countSmaller(nums)
        result_bit = solution.countSmallerBIT(nums)
        result_seg = solution.countSmallerSegmentTree(nums)

        print(f"Merge Sort:    {result_merge}")
        print(f"Binary IT:     {result_bit}")
        print(f"Segment Tree:  {result_seg}")

    # Detailed walkthrough
    print("\nDetailed example: [5,2,6,1]")
    nums = [5, 2, 6, 1]
    print("Processing right to left:")
    print("Index 3 (1): No elements after it → count = 0")
    print("Index 2 (6): Elements after [1], smaller count = 1")
    print("Index 1 (2): Elements after [6,1], smaller count = 1")
    print("Index 0 (5): Elements after [2,6,1], smaller count = 2")
    print(f"Result: {solution.countSmaller(nums)}")

    # Performance comparison demonstration
    print("\nPerformance comparison on larger input:")
    large_input = list(range(100, 0, -1))  # Decreasing sequence
    print(f"Input size: {len(large_input)} (decreasing sequence)")

    # Time merge sort approach
    start = time.time()
    result_merge = solution.countSmaller(large_input[:])
    merge_time = time.time() - start

    # Time BIT approach
    start = time.time()
    result_bit = solution.countSmallerBIT(large_input[:])
    bit_time = time.time() - start

    print(f"Merge Sort time: {merge_time:.4f}s")
    print(f"Binary IT time:  {bit_time:.4f}s")
    print(f"Results match: {result_merge == result_bit}")
    print(f"Sample result: {result_merge[:5]}...")  # Show first 5 elements
