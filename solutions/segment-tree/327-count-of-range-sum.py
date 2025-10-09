"""
# Difficulty: Hard

# 327. Count Of Range Sum

Given an integer array nums and two integers lower and upper, return the number of range sums that lie in [lower, upper] inclusive.

Range sum S(i, j) is defined as the sum of the elements in nums between indices i and j inclusive, where i <= j.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This is an advanced range sum counting problem. The key insight is to use prefix sums: if we have prefix[j] - prefix[i] in [lower, upper], then we need to count how many prefix[i] satisfy: prefix[j] - upper <= prefix[i] <= prefix[j] - lower. This transforms into a range counting problem solvable with merge sort or segment trees.

### APPROACH:
[Detailed explanation of the solution approach]

### WHY THIS WORKS:
- [Explanation of correctness]

### EXAMPLE WALKTHROUGH:
```
Input: nums = [-2,5,-1], lower = -2, upper = 2
Prefix sums: [0, -2, 3, 2]
Range sums to check:
- S(0,0) = -2 ✓ (in range)
- S(0,1) = 3 ✗
- S(0,2) = 2 ✓
- S(1,1) = 5 ✗
- S(1,2) = 4 ✗
- S(2,2) = -1 ✓
Output: 3
```

### TIME COMPLEXITY:
O(n log n)
For merge sort and tree-based approaches

### SPACE COMPLEXITY:
O(n)
For prefix sums and auxiliary structures

### EDGE CASES:
- Empty array
- Single element
- All elements equal
- Lower and upper bounds edge cases
- Negative numbers and overflow considerations

</details>
"""

class Solution:
    def countRangeSum(self, nums: list[int], lower: int, upper: int) -> int:
        """
        Count range sums in [lower, upper] using merge sort approach.

        Args:
            nums: Input array of integers
            lower: Lower bound of range (inclusive)
            upper: Upper bound of range (inclusive)

        Returns:
            Number of range sums in [lower, upper]

        Time Complexity: O(n log n) - merge sort with counting
        Space Complexity: O(n) - for prefix sums and recursion
        """
        if not nums:
            return 0

        # Compute prefix sums
        prefix = [0]
        for num in nums:
            prefix.append(prefix[-1] + num)

        def merge_sort(start: int, end: int) -> int:
            """Merge sort with range counting."""
            if end - start <= 1:
                return 0

            mid = (start + end) // 2
            count = merge_sort(start, mid) + merge_sort(mid, end)

            # Count valid ranges where i in [start, mid) and j in [mid, end)
            # We need: lower <= prefix[j] - prefix[i] <= upper
            # Which means: prefix[j] - upper <= prefix[i] <= prefix[j] - lower

            # For each j in [mid, end), count valid i's in [start, mid)
            i = j = start
            for k in range(mid, end):
                # Find first i where prefix[i] >= prefix[k] - upper
                while i < mid and prefix[i] < prefix[k] - upper:
                    i += 1
                # Find first j where prefix[j] > prefix[k] - lower
                while j < mid and prefix[j] <= prefix[k] - lower:
                    j += 1
                count += j - i

            # Merge two sorted subarrays
            sorted_prefix = []
            i = start
            j = mid
            while i < mid and j < end:
                if prefix[i] <= prefix[j]:
                    sorted_prefix.append(prefix[i])
                    i += 1
                else:
                    sorted_prefix.append(prefix[j])
                    j += 1

            sorted_prefix.extend(prefix[i:mid])
            sorted_prefix.extend(prefix[j:end])
            prefix[start:end] = sorted_prefix

            return count

        return merge_sort(0, len(prefix))

    def countRangeSumBIT(self, nums: list[int], lower: int, upper: int) -> int:
        """
        Solution using Binary Indexed Tree with coordinate compression.

        Args:
            nums: Input array
            lower: Lower bound
            upper: Upper bound

        Returns:
            Count of valid range sums

        Time Complexity: O(n log n)
        Space Complexity: O(n)
        """
        if not nums:
            return 0

        # Compute prefix sums
        prefix = [0]
        for num in nums:
            prefix.append(prefix[-1] + num)

        # Coordinate compression
        all_values = set()
        for p in prefix:
            all_values.add(p)
            all_values.add(p - lower)
            all_values.add(p - upper)

        sorted_values = sorted(all_values)
        rank = {v: i + 1 for i, v in enumerate(sorted_values)}

        class BinaryIndexedTree:
            def __init__(self, n):
                self.n = n
                self.tree = [0] * (n + 1)

            def update(self, i, delta):
                while i <= self.n:
                    self.tree[i] += delta
                    i += i & (-i)

            def query(self, i):
                s = 0
                while i > 0:
                    s += self.tree[i]
                    i -= i & (-i)
                return s

            def range_query(self, left, right):
                if left > right:
                    return 0
                return self.query(right) - (self.query(left - 1) if left > 1 else 0)

        bit = BinaryIndexedTree(len(sorted_values))
        count = 0

        for p in prefix:
            # Count how many previous prefix sums are in [p - upper, p - lower]
            left_rank = rank[p - upper]
            right_rank = rank[p - lower]
            count += bit.range_query(left_rank, right_rank)

            # Add current prefix sum to BIT
            bit.update(rank[p], 1)

        return count

    def countRangeSumSegmentTree(self, nums: list[int], lower: int, upper: int) -> int:
        """
        Solution using Segment Tree.

        Args:
            nums: Input array
            lower: Lower bound
            upper: Upper bound

        Returns:
            Count of valid range sums

        Time Complexity: O(n log n)
        Space Complexity: O(n)
        """
        if not nums:
            return 0

        # Compute prefix sums
        prefix = [0]
        for num in nums:
            prefix.append(prefix[-1] + num)

        # Coordinate compression
        all_values = set()
        for p in prefix:
            all_values.add(p)
            all_values.add(p - lower)
            all_values.add(p - upper)

        sorted_values = sorted(all_values)
        rank = {v: i for i, v in enumerate(sorted_values)}

        class SegmentTree:
            def __init__(self, n):
                self.n = n
                self.tree = [0] * (4 * n)

            def update(self, node, start, end, idx):
                if start == end:
                    self.tree[node] += 1
                else:
                    mid = (start + end) // 2
                    if idx <= mid:
                        self.update(2 * node, start, mid, idx)
                    else:
                        self.update(2 * node + 1, mid + 1, end, idx)
                    self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

            def query(self, node, start, end, l, r):
                if r < start or end < l or l > r:
                    return 0
                if l <= start and end <= r:
                    return self.tree[node]
                mid = (start + end) // 2
                return self.query(2 * node, start, mid, l, r) + self.query(2 * node + 1, mid + 1, end, l, r)

        n = len(sorted_values)
        seg_tree = SegmentTree(n)
        count = 0

        for p in prefix:
            # Query for count in range [p - upper, p - lower]
            left_rank = rank[p - upper]
            right_rank = rank[p - lower]
            count += seg_tree.query(1, 0, n - 1, left_rank, right_rank)

            # Add current prefix to tree
            seg_tree.update(1, 0, n - 1, rank[p])

        return count

    def countRangeSumBruteForce(self, nums: list[int], lower: int, upper: int) -> int:
        """
        Brute force solution for verification.

        Args:
            nums: Input array
            lower: Lower bound
            upper: Upper bound

        Returns:
            Count of valid range sums

        Time Complexity: O(n²)
        Space Complexity: O(n) for prefix sums
        """
        if not nums:
            return 0

        # Compute prefix sums
        prefix = [0]
        for num in nums:
            prefix.append(prefix[-1] + num)

        count = 0
        for i in range(len(nums)):
            for j in range(i, len(nums)):
                range_sum = prefix[j + 1] - prefix[i]
                if lower <= range_sum <= upper:
                    count += 1

        return count

def test_solution():
    """Test cases for Problem 327."""
    solution = Solution()

    # Test case 1: Basic example
    result1 = solution.countRangeSum([-2, 5, -1], -2, 2)
    expected1 = 3
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Empty array
    result2 = solution.countRangeSum([], 0, 0)
    expected2 = 0
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Single element in range
    result3 = solution.countRangeSum([0], -1, 1)
    expected3 = 1
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Single element out of range
    result4 = solution.countRangeSum([5], 1, 3)
    expected4 = 0
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: All positive
    result5 = solution.countRangeSum([1, 2, 3], 3, 7)
    expected5 = 4  # [1,2], [2,3], [3], [1,2,3]
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Mixed values
    result6 = solution.countRangeSum([0, -3, -3, 1, 1, 2], 3, 5)
    expected6 = 2
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test BIT approach
    result7 = solution.countRangeSumBIT([-2, 5, -1], -2, 2)
    expected7 = 3
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test Segment Tree approach
    result8 = solution.countRangeSumSegmentTree([-2, 5, -1], -2, 2)
    expected8 = 3
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    # Test brute force approach
    result9 = solution.countRangeSumBruteForce([-2, 5, -1], -2, 2)
    expected9 = 3
    assert result9 == expected9, f"Expected {expected9}, got {result9}"

    # Test case 10: Large range
    result10 = solution.countRangeSum([1, 2, 3], 0, 10)
    expected10 = 6  # All possible ranges
    assert result10 == expected10, f"Expected {expected10}, got {result10}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage and demonstration
    solution = Solution()
    print("=== 327. Count Of Range Sum ===")

    test_cases = [
        ([-2, 5, -1], -2, 2),
        ([0, -3, -3, 1, 1, 2], 3, 5),
        ([1, 2, 3], 3, 7),
    ]

    for nums, lower, upper in test_cases:
        print(f"\nInput: nums = {nums}, lower = {lower}, upper = {upper}")

        # Show all approaches
        result_merge = solution.countRangeSum(nums, lower, upper)
        result_brute = solution.countRangeSumBruteForce(nums, lower, upper)

        print(f"Merge Sort:  {result_merge}")
        print(f"Brute Force: {result_brute}")

        # Only test tree approaches for small inputs
        if len(nums) <= 10:
            result_bit = solution.countRangeSumBIT(nums, lower, upper)
            result_seg = solution.countRangeSumSegmentTree(nums, lower, upper)
            print(f"Binary IT:   {result_bit}")
            print(f"Segment Tree: {result_seg}")

    # Detailed walkthrough
    print("\nDetailed example: nums = [-2,5,-1], lower = -2, upper = 2")
    nums = [-2, 5, -1]
    print("Prefix sums: [0, -2, 3, 2]")
    print("Valid range sums:")
    print("  S(0,0) = -2 (in [-2, 2])")
    print("  S(0,2) = 2 (in [-2, 2])")
    print("  S(2,2) = -1 (in [-2, 2])")
    print(f"Total: {solution.countRangeSum(nums, -2, 2)} valid ranges")

    # Performance comparison
    print("\nApproach complexities:")
    print("Merge Sort:   O(n log n) time, O(n) space")
    print("Binary IT:    O(n log n) time, O(n) space")
    print("Segment Tree: O(n log n) time, O(n) space")
    print("Brute Force:  O(n²) time, O(n) space")
