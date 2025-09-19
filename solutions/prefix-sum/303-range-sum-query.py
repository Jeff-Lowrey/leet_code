"""
303. Range Sum Query - Immutable
Easy

Given an integer array nums, handle multiple queries of the following type:
Calculate the sum of the elements of nums between indices left and right inclusive
where left <= right.

Implement the NumArray class:
- NumArray(int[] nums) Initializes the object with the integer array nums.
- int sumRange(int left, int right) Returns the sum of the elements between
  indices left and right inclusive.

Example:
Input:
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
Output:
[null, 1, -1, -3]
"""

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Precompute prefix sums to answer range queries in O(1) time. The key insight is that sum(i,j) = prefixSum[j+1] - prefixSum[i], avoiding repeated calculations.

### APPROACH:
1. **Preprocessing**: Build prefix sum array where prefix[i] = sum of nums[0...i-1]
2. **Query**: For range [left, right], return prefix[right+1] - prefix[left]

### WHY THIS WORKS:
Prefix sums store cumulative totals. To get sum from index i to j, we subtract the cumulative sum before index i from the cumulative sum up to index j. This eliminates the need to iterate through the range each time.

### TIME COMPLEXITY: O(1) per query, O(n) preprocessing
### SPACE COMPLEXITY: O(n)

### EXAMPLE WALKTHROUGH:
Array: [-2, 0, 3, -5, 2, -1]
Prefix: [0, -2, -2, 1, -4, -2, -3]

Query sumRange(0, 2):
- prefix[3] - prefix[0] = 1 - 0 = 1
- Represents sum(-2 + 0 + 3) = 1 ✓

Query sumRange(2, 5):
- prefix[6] - prefix[2] = -3 - (-2) = -1
- Represents sum(3 + (-5) + 2 + (-1)) = -1 ✓

### EDGE CASES:
- Single element arrays
- Negative numbers (handled naturally)
- Full array queries

</details>

class NumArray:
    """
    Approach: Prefix sum
    Time Complexity: O(1) for sumRange, O(n) for initialization
    Space Complexity: O(n)
    """

    def __init__(self, nums: list[int]):
        self.prefix = [0]
        for num in nums:
            self.prefix.append(self.prefix[-1] + num)

    def sumRange(self, left: int, right: int) -> int:
        return self.prefix[right + 1] - self.prefix[left]


"""
304. Range Sum Query 2D - Immutable
Medium

Given a 2D matrix matrix, handle multiple queries of the following type:
Calculate the sum of the elements of matrix inside the rectangle defined by its
upper left corner (row1, col1) and lower right corner (row2, col2).

Implement the NumMatrix class:
- NumMatrix(int[][] matrix) Initializes the object with the integer matrix.
- int sumRegion(int row1, int col1, int row2, int col2) Returns the sum of the
  elements inside the rectangle.

Example:
Input:
["NumMatrix", "sumRegion", "sumRegion", "sumRegion"]
[[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]],
 [2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]
Output:
[null, 8, 11, 12]
"""

class NumMatrix:
    """
    Approach: 2D Prefix sum
    Time Complexity: O(1) for sumRegion, O(m*n) for initialization
    Space Complexity: O(m*n)
    """

    def __init__(self, matrix: list[list[int]]):
        if not matrix or not matrix[0]:
            return

        m, n = len(matrix), len(matrix[0])
        self.prefix = [[0] * (n + 1) for _ in range(m + 1)]

        for i in range(1, m + 1):
            for j in range(1, n + 1):
                self.prefix[i][j] = (matrix[i-1][j-1] +
                                     self.prefix[i-1][j] +
                                     self.prefix[i][j-1] -
                                     self.prefix[i-1][j-1])

    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        return (self.prefix[row2+1][col2+1] -
                self.prefix[row1][col2+1] -
                self.prefix[row2+1][col1] +
                self.prefix[row1][col1])


"""
560. Subarray Sum Equals K
Medium

Given an array of integers nums and an integer k, return the total number of
subarrays whose sum equals to k.

Example:
Input: nums = [1,1,1], k = 2
Output: 2
"""

class SolutionSubarraySum:
    def subarraySum(self, nums: list[int], k: int) -> int:
        """
        Approach: Prefix sum with hash map
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        count = 0
        prefix_sum = 0
        sum_count = {0: 1}  # Empty subarray

        for num in nums:
            prefix_sum += num

            # Check if (prefix_sum - k) exists
            if prefix_sum - k in sum_count:
                count += sum_count[prefix_sum - k]

            # Add current sum to map
            sum_count[prefix_sum] = sum_count.get(prefix_sum, 0) + 1

        return count


"""
523. Continuous Subarray Sum
Medium

Given an integer array nums and an integer k, return true if nums has a good
subarray or false otherwise.

A good subarray is a subarray where:
- its length is at least two, and
- the sum of the elements of the subarray is a multiple of k.

Example:
Input: nums = [23,2,4,6,7], k = 6
Output: true
Explanation: [2, 4] is a continuous subarray of size 2 whose elements sum up to 6.
"""

class SolutionContinuous:
    def checkSubarraySum(self, nums: list[int], k: int) -> bool:
        """
        Approach: Prefix sum with modulo
        Time Complexity: O(n)
        Space Complexity: O(min(n, k))
        """
        # Map remainder to earliest index
        remainder_index = {0: -1}
        prefix_sum = 0

        for i, num in enumerate(nums):
            prefix_sum += num
            remainder = prefix_sum % k

            if remainder in remainder_index:
                # Check if subarray length >= 2
                if i - remainder_index[remainder] > 1:
                    return True
            else:
                remainder_index[remainder] = i

        return False


# Test cases
if __name__ == "__main__":
    # Test Range Sum Query 1D
    print("Range Sum Query - Immutable:")
    nums = [-2, 0, 3, -5, 2, -1]
    obj = NumArray(nums)
    queries = [(0, 2), (2, 5), (0, 5)]

    print(f"Array: {nums}")
    for left, right in queries:
        result = obj.sumRange(left, right)
        print(f"Sum [{left}, {right}]: {result}")

    print("\n" + "="*50 + "\n")

    # Test Range Sum Query 2D
    print("Range Sum Query 2D - Immutable:")
    matrix = [
        [3, 0, 1, 4, 2],
        [5, 6, 3, 2, 1],
        [1, 2, 0, 1, 5],
        [4, 1, 0, 1, 7],
        [1, 0, 3, 0, 5]
    ]
    obj2 = NumMatrix(matrix)
    queries2d = [(2, 1, 4, 3), (1, 1, 2, 2), (1, 2, 2, 4)]

    print("Matrix:")
    for row in matrix:
        print(row)
    print()

    for r1, c1, r2, c2 in queries2d:
        result = obj2.sumRegion(r1, c1, r2, c2)
        print(f"Sum region [{r1},{c1}] to [{r2},{c2}]: {result}")

    print("\n" + "="*50 + "\n")

    # Test Subarray Sum Equals K
    solution_subarray = SolutionSubarraySum()

    print("Subarray Sum Equals K:")
    test_cases = [
        ([1, 1, 1], 2),
        ([1, 2, 3], 3),
        ([1, -1, 0], 0)
    ]

    for nums, k in test_cases:
        result = solution_subarray.subarraySum(nums, k)
        print(f"Array: {nums}, k={k}")
        print(f"Number of subarrays: {result}\n")

    # Test Continuous Subarray Sum
    solution_continuous = SolutionContinuous()

    print("Continuous Subarray Sum:")
    test_cases_cont = [
        ([23, 2, 4, 6, 7], 6),
        ([23, 2, 6, 4, 7], 6),
        ([5, 0, 0, 0], 3)
    ]

    for nums, k in test_cases_cont:
        result = solution_continuous.checkSubarraySum(nums, k)
        print(f"Array: {nums}, k={k}")
        print(f"Has valid subarray: {result}\n")
