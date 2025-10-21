"""
# Difficulty: Medium

# 673. Number Of Longest Increasing Subsequence

Given an integer array nums, return the number of longest increasing subsequences.

Notice that the sequence has to be strictly increasing.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[[1, 3, 5, 4, 7]</dd>
<dt>Output:</dt>
<dd>"\nInput: {nums}"</dd>
<dt>Explanation:</dt>
<dd>The number of longest increasing subsequences of length 4 is 2</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Set, Array, Tree
**Patterns**: Two Pointers Pattern, Hash Table Pattern
**Time Complexity**: - DP: O(n²) - Nested iteration through input
**Space Complexity**: O(n) - Additional set storage

### INTUITION:
This extends the classic LIS problem by not just finding the length, but also counting how many subsequences achieve that length. We can use dynamic programming or segment trees. For each position, we track both the longest length ending there and the count of such sequences.

### APPROACH:
1. **Initialize DP arrays**: Create two arrays - lengths[i] for LIS length ending at i, counts[i] for number of such subsequences
2. **Set base values**: Initialize all lengths to 1 and all counts to 1 (each element is a subsequence of length 1)
3. **Nested loop iteration**: For each position i, check all previous positions j where nums[j] < nums[i]
4. **Update when longer found**: If lengths[j] + 1 > lengths[i], found longer sequence, update lengths[i] and reset counts[i] to counts[j]
5. **Add when equal length**: If lengths[j] + 1 == lengths[i], found another sequence of same length, add counts[j] to counts[i]
6. **Find maximum length**: After processing all positions, find the maximum value in lengths array
7. **Sum matching counts**: Return sum of counts[i] for all positions i where lengths[i] equals maximum length

### WHY THIS WORKS:
A set by definition contains only unique elements - when we convert an array to a set, any duplicates are automatically removed. By comparing the lengths of the original array and the set, we can detect if duplicates existed. The early termination approach works because as soon as we find an element already in our seen set, we've proven a duplicate exists without needing to check the remaining elements.

### EXAMPLE WALKTHROUGH:
```
Input: nums = [1,3,5,4,7]
For each position:
i=0: nums[0]=1, length=1, count=1
i=1: nums[1]=3, length=2 (1→3), count=1
i=2: nums[2]=5, length=3 (1→3→5), count=1
i=3: nums[3]=4, length=3 (1→3→4), count=1
i=4: nums[4]=7, length=4, count=2 (from both i=2 and i=3)
Output: 2
```

### TIME COMPLEXITY:
- DP: O(n²)
- Segment Tree: O(n log n)

### SPACE COMPLEXITY:
O(n)
For DP arrays or tree structure

### EDGE CASES:
- Empty array
- Single element
- All elements equal (no strictly increasing)
- All increasing
- All decreasing
- Duplicates in array

</details>
"""

from typing import Any


class Solution:
    def findNumberOfLIS(self, nums: list[int]) -> int:
        """
        Find number of longest increasing subsequences using DP.

        Args:
            nums: Input array of integers

        Returns:
            Number of longest increasing subsequences

        Time Complexity: O(n²) - nested loops
        Space Complexity: O(n) - for length and count arrays
        """
        if not nums:
            return 0

        n = len(nums)
        lengths = [1] * n  # lengths[i] = length of LIS ending at i
        counts = [1] * n  # counts[i] = count of LIS ending at i

        for i in range(n):
            for j in range(i):
                if nums[j] < nums[i]:
                    if lengths[j] + 1 > lengths[i]:
                        # Found longer sequence
                        lengths[i] = lengths[j] + 1
                        counts[i] = counts[j]
                    elif lengths[j] + 1 == lengths[i]:
                        # Found another sequence of same length
                        counts[i] += counts[j]

        # Find maximum length and sum counts
        max_length = max(lengths)
        return sum(c for l, c in zip(lengths, counts, strict=False) if l == max_length)

    def findNumberOfLISSegmentTree(self, nums: list[int]) -> int:
        """
        Solution using Segment Tree with coordinate compression.

        Args:
            nums: Input array

        Returns:
            Number of longest increasing subsequences

        Time Complexity: O(n log n)
        Space Complexity: O(n)
        """
        if not nums:
            return 0

        # Coordinate compression
        sorted_unique = sorted(set(nums))
        rank = {v: i for i, v in enumerate(sorted_unique)}

        class SegmentTree:
            def __init__(self: Any, n: Any) -> None:
                self.n = n
                # Store (max_length, count) for each node
                self.tree = [(0, 0)] * (4 * n)

            def merge(self: Any, left: Any, right: Any) -> Any:
                """Merge two (length, count) pairs."""
                if left[0] > right[0]:
                    return left
                elif left[0] < right[0]:
                    return right
                else:
                    # Same length, add counts
                    return (left[0], left[1] + right[1])

            def update(self: Any, node: Any, start: Any, end: Any, idx: Any, val: Any) -> Any:
                """Update position idx with (length, count) = val."""
                if start == end:
                    self.tree[node] = self.merge(self.tree[node], val)
                else:
                    mid = (start + end) // 2
                    if idx <= mid:
                        self.update(2 * node, start, mid, idx, val)
                    else:
                        self.update(2 * node + 1, mid + 1, end, idx, val)
                    self.tree[node] = self.merge(self.tree[2 * node], self.tree[2 * node + 1])

            def query(self: Any, node: Any, start: Any, end: Any, l: Any, r: Any) -> Any:
                """Query max (length, count) in range [l, r]."""
                if r < start or end < l or l > r:
                    return (0, 0)
                if l <= start and end <= r:
                    return self.tree[node]
                mid = (start + end) // 2
                left_result = self.query(2 * node, start, mid, l, r)
                right_result = self.query(2 * node + 1, mid + 1, end, l, r)
                return self.merge(left_result, right_result)

        m = len(sorted_unique)
        seg_tree = SegmentTree(m)

        for num in nums:
            r = rank[num]
            # Query all numbers less than num
            if r > 0:
                max_len, count = seg_tree.query(1, 0, m - 1, 0, r - 1)
                new_len = max_len + 1
                new_count = max(1, count)  # At least 1 (just this number)
            else:
                new_len = 1
                new_count = 1

            # Update segment tree
            seg_tree.update(1, 0, m - 1, r, (new_len, new_count))

        # Get result from entire range
        _, result = seg_tree.query(1, 0, m - 1, 0, m - 1)
        return result  # type: ignore

    def findNumberOfLISBIT(self, nums: list[int]) -> int:
        """
        Solution using Binary Indexed Tree.

        Args:
            nums: Input array

        Returns:
            Number of longest increasing subsequences

        Time Complexity: O(n² log n) - due to BIT queries
        Space Complexity: O(n)
        """
        if not nums:
            return 0

        # Coordinate compression
        sorted_unique = sorted(set(nums))
        rank = {v: i + 1 for i, v in enumerate(sorted_unique)}

        class BIT:
            def __init__(self: Any, n: Any) -> None:
                self.n = n
                # Store (max_length, count) for each position
                self.tree = [(0, 0)] * (n + 1)

            def merge(self: Any, left: Any, right: Any) -> Any:
                """Merge two (length, count) pairs."""
                if left[0] > right[0]:
                    return left
                elif left[0] < right[0]:
                    return right
                else:
                    return (left[0], left[1] + right[1])

            def update(self: Any, i: Any, val: Any) -> Any:
                """Update position i with (length, count) = val."""
                while i <= self.n:
                    self.tree[i] = self.merge(self.tree[i], val)
                    i += i & (-i)

            def query(self: Any, i: Any) -> Any:
                """Query max (length, count) up to position i."""
                result = (0, 0)
                while i > 0:
                    result = self.merge(result, self.tree[i])
                    i -= i & (-i)
                return result

        m = len(sorted_unique)
        bit = BIT(m)

        for num in nums:
            r = rank[num]
            # Query all numbers less than num
            if r > 1:
                max_len, count = bit.query(r - 1)
                new_len = max_len + 1
                new_count = max(1, count)
            else:
                new_len = 1
                new_count = 1

            # Update BIT
            bit.update(r, (new_len, new_count))

        # Get maximum from all positions
        result = (0, 0)
        for i in range(1, m + 1):
            result = bit.merge(result, bit.tree[i])
        return result[1]


def test_solution() -> None:
    """Test cases for Problem 673."""
    solution = Solution()

    # Test case 1: Basic example
    result1 = solution.findNumberOfLIS([1, 3, 5, 4, 7])
    expected1 = 2
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Single element
    result2 = solution.findNumberOfLIS([1])
    expected2 = 1
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: All increasing
    result3 = solution.findNumberOfLIS([1, 2, 3, 4, 5])
    expected3 = 1
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: All decreasing
    result4 = solution.findNumberOfLIS([5, 4, 3, 2, 1])
    expected4 = 5  # Each element is LIS of length 1
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Two increasing sequences
    result5 = solution.findNumberOfLIS([2, 2, 2, 2, 2])
    expected5 = 5  # Each element is LIS of length 1
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Complex example
    result6 = solution.findNumberOfLIS([1, 2, 4, 3, 5, 4, 7, 2])
    expected6 = 3  # Three sequences of length 5
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test segment tree approach
    result7 = solution.findNumberOfLISSegmentTree([1, 3, 5, 4, 7])
    expected7 = 2
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test case 8: Empty array
    result8 = solution.findNumberOfLIS([])
    expected8 = 0
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage and demonstration
    solution = Solution()
    print("=== 673. Number Of Longest Increasing Subsequence ===")

    test_cases = [
        [1, 3, 5, 4, 7],
        [2, 2, 2, 2, 2],
        [1, 2, 4, 3, 5, 4, 7, 2],
    ]

    for nums in test_cases:
        print(f"\nInput: {nums}")

        # Show all approaches
        result_dp = solution.findNumberOfLIS(nums[:])
        result_seg = solution.findNumberOfLISSegmentTree(nums[:])

        print(f"DP:           {result_dp}")
        print(f"Segment Tree: {result_seg}")

    # Detailed walkthrough
    print("\nDetailed example: [1,3,5,4,7]")
    nums = [1, 3, 5, 4, 7]
    n = len(nums)
    lengths = [1] * n
    counts = [1] * n

    print("Computing LIS for each position:")
    for i in range(n):
        for j in range(i):
            if nums[j] < nums[i]:
                if lengths[j] + 1 > lengths[i]:
                    lengths[i] = lengths[j] + 1
                    counts[i] = counts[j]
                elif lengths[j] + 1 == lengths[i]:
                    counts[i] += counts[j]
        print(f"  i={i}, nums[{i}]={nums[i]}, length={lengths[i]}, count={counts[i]}")

    max_length = max(lengths)
    total_count = sum(c for l, c in zip(lengths, counts, strict=False) if l == max_length)
    print(f"Maximum length: {max_length}")
    print(f"Number of LIS: {total_count}")

    # Performance comparison
    print("\nApproach complexities:")
    print("DP:           O(n²) time, O(n) space")
    print("Segment Tree: O(n log n) time, O(n) space")
    print("Binary IT:    O(n² log n) time, O(n) space")
