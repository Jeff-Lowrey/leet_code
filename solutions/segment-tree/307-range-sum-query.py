"""
307. Range Sum `Query - Mutable`
Medium

Given an integer array `nums`, handle multiple queries of the following types:
1. Update the value of an element in `nums`.
2. Calculate the sum of the elements of `nums` between indices `left` and `right` inclusive.

Implement the NumArray class:
- NumArray(int[] nums) Initializes the object with the integer array nums.
- void update(int index, int val) Updates the value of nums[index] to be val.
- int sumRange(int left, int right) Returns the sum of the elements between indices left and right.

Example:
Input:
["NumArray", "sumRange", "update", "sumRange"]
[[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
Output:
[null, 9, null, 8]

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
For mutable arrays, prefix sums become inefficient (O(n) updates). Segment trees provide a balanced solution with O(log n) for both updates and range queries by representing the array as a binary tree where each node stores the sum of its range.

### APPROACH:
1. **Tree Structure**: Complete binary tree where leaves are array elements
2. **Internal Nodes**: Store sum of their children's ranges
3. **Update**: Propagate changes up from leaf to root
4. **Query**: Traverse tree to collect relevant range sums

### WHY THIS WORKS:
The tree height is log n, so we visit at most log n nodes for any operation. Each internal node represents a range, allowing us to quickly skip over irrelevant sections during queries.

### TIME COMPLEXITY: O(log n) for both update and query
### SPACE COMPLEXITY: O(n)

### SEGMENT TREE VISUALIZATION:
```
Array: [1, 3, 5]
Tree:     9
        /   \
       4     5
      / \   /
     1   3 5
```

### EXAMPLE WALKTHROUGH:
- Initial: sumRange(0,2) = 9
- Update index 1 to 2: Tree becomes [1,2,5], root = 8
- Query sumRange(0,2) = 8

### ALTERNATIVE: Binary Indexed Tree (Fenwick Tree)
- More space efficient
- Slightly more complex implementation
- Same time complexity

</details>
"""


class NumArray:
    """
    Approach: Segment Tree
    Time Complexity: O(log n) for update and sumRange
    Space Complexity: O(n)
    """

    def __init__(self, nums: list[int]):
        self.n = len(nums)
        self.tree = [0] * (2 * self.n)

        # Build the tree
        for i in range(self.n):
            self.tree[self.n + i] = nums[i]

        for i in range(self.n - 1, 0, -1):
            self.tree[i] = self.tree[2 * i] + self.tree[2 * i + 1]

    def update(self, index: int, val: int) -> None:
        # Set value at position index
        index += self.n
        self.tree[index] = val

        # Move up and update parents
        while index > 1:
            self.tree[index // 2] = self.tree[index] + self.tree[index ^ 1]
            index //= 2

    def sumRange(self, left: int, right: int) -> int:
        # Get sum on interval [left, right]
        result = 0
        left += self.n
        right += self.n + 1

        while left < right:
            if left % 2 == 1:
                result += self.tree[left]
                left += 1
            if right % 2 == 1:
                right -= 1
                result += self.tree[right]
            left //= 2
            right //= 2

        return result


class NumArrayBIT:
    """
    Approach: Binary Indexed Tree (Fenwick Tree)
    Time Complexity: O(log n) for update and sumRange
    Space Complexity: O(n)
    """

    def __init__(self, nums: list[int]):
        self.nums = nums
        self.n = len(nums)
        self.tree = [0] * (self.n + 1)

        # Build the tree
        for i in range(self.n):
            self._updateBIT(i + 1, nums[i])

    def _updateBIT(self, i: int, delta: int) -> None:
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)

    def _queryBIT(self, i: int) -> int:
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)
        return s

    def update(self, index: int, val: int) -> None:
        delta = val - self.nums[index]
        self.nums[index] = val
        self._updateBIT(index + 1, delta)

    def sumRange(self, left: int, right: int) -> int:
        return self._queryBIT(right + 1) - self._queryBIT(left)


"""
315. Count of Smaller Numbers After Self
Hard

Given an integer array nums, return an integer array counts where counts[i] is
the number of smaller elements to the right of nums[i].

Example:
Input: nums = [5,2,6,1]
Output: [2,1,1,0]
"""


class Solution:
    def countSmaller(self, nums: list[int]) -> list[int]:
        """
        Approach: Merge sort with counting
        Time Complexity: O(n log n)
        Space Complexity: O(n)
        """

        def merge_sort(indices):
            if len(indices) <= 1:
                return indices

            mid = len(indices) // 2
            left = merge_sort(indices[:mid])
            right = merge_sort(indices[mid:])

            # Merge and count
            merged = []
            i = j = 0

            while i < len(left) or j < len(right):
                if j == len(right) or (i < len(left) and nums[left[i]] <= nums[right[j]]):
                    merged.append(left[i])
                    counts[left[i]] += j  # Count smaller elements from right
                    i += 1
                else:
                    merged.append(right[j])
                    j += 1

            return merged

        n = len(nums)
        counts = [0] * n
        indices = list(range(n))
        merge_sort(indices)

        return counts

    def countSmallerBIT(self, nums: list[int]) -> list[int]:
        """
        Approach: Binary Indexed Tree with coordinate compression
        Time Complexity: O(n log n)
        Space Complexity: O(n)
        """
        # Coordinate compression
        sorted_nums = sorted(set(nums))
        ranks = {num: i + 1 for i, num in enumerate(sorted_nums)}

        class BIT:
            def __init__(self, n):
                self.n = n
                self.tree = [0] * (n + 1)

            def update(self, i):
                while i <= self.n:
                    self.tree[i] += 1
                    i += i & (-i)

            def query(self, i):
                s = 0
                while i > 0:
                    s += self.tree[i]
                    i -= i & (-i)
                return s

        bit = BIT(len(sorted_nums))
        result = []

        # Process from right to left
        for num in reversed(nums):
            rank = ranks[num]
            result.append(bit.query(rank - 1))
            bit.update(rank)

        return result[::-1]


# Test cases
if __name__ == "__main__":
    # Test Range Sum Query
    print("Range Sum Query - Mutable:")
    nums = [1, 3, 5]
    obj = NumArray(nums)
    print(f"Initial array: {nums}")
    print(f"Sum range [0, 2]: {obj.sumRange(0, 2)}")  # 9
    obj.update(1, 2)
    print("After update index 1 to 2")
    print(f"Sum range [0, 2]: {obj.sumRange(0, 2)}")  # 8

    print("\n" + "=" * 50 + "\n")

    # Test with BIT
    print("Using Binary Indexed Tree:")
    obj_bit = NumArrayBIT([1, 3, 5])
    print(f"Sum range [0, 2]: {obj_bit.sumRange(0, 2)}")  # 9
    obj_bit.update(1, 2)
    print("After update index 1 to 2")
    print(f"Sum range [0, 2]: {obj_bit.sumRange(0, 2)}")  # 8

    print("\n" + "=" * 50 + "\n")

    # Test Count Smaller
    solution = Solution()
    print("Count of Smaller Numbers After Self:")
    test_cases = [[5, 2, 6, 1], [-1], [-1, -1], [5, 2, 6, 1, 3]]

    for nums in test_cases:
        result = solution.countSmaller(nums)
        print(f"Input: {nums}")
        print(f"Counts: {result}")
