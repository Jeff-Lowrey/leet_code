"""
# 0523. Continuous Subarray Sum

# Difficulty: Medium

Given an integer array nums and an integer k, return true if nums has a continuous
subarray of size at least two that sums to a multiple of k, or false otherwise.

An integer x is a multiple of k if there exists an integer n such that x = n * k.
0 is always a multiple of k.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>nums = [23,2,4,6,7], k = 6</dd>
<dt>Output:</dt>
<dd>true</dd>
<dt>Explanation:</dt>
<dd>The subarray [23,2,4,6,7] has sum 42, which is a multiple of k=6</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Array
**Patterns**: Hash Table Pattern, Greedy Algorithm
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(min(n, k))

### INTUITION:
Use prefix sum with modulo arithmetic. If two prefix sums have the same remainder
when divided by k, the subarray between them is divisible by k. Track remainders
in a hash map with their earliest index to ensure subarray length ≥ 2.

### APPROACH:
1. **Hash Map**: Store (remainder → earliest_index) pairs
2. **Prefix Sum**: Calculate cumulative sum modulo k
3. **Check**: If same remainder seen before and distance ≥ 2, return true
4. **Edge Cases**: Handle k=0, negative remainders with modulo normalization

### WHY THIS WORKS:
If prefix_sum[i] % k == prefix_sum[j] % k, then sum(nums[i+1:j+1]) % k == 0.
By storing earliest occurrence of each remainder, we maximize subarray length.

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [23,2,4,6,7], k = 6
```

Prefix sums: [23, 25, 29, 35, 42]
Modulos: [5, 1, 5, 5, 0]
At index 0: remainder 5, store {5: 0}
At index 1: remainder 1, store {5: 0, 1: 1}

Steps:
Step 1: At index 2: remainder 5, seen at index 0, distance = 2 → return true

Output:
```
return true
```

### TIME COMPLEXITY:
O(n)
- Single pass through input


### SPACE COMPLEXITY:
O(min(n, k)) - hash map storage

### EDGE CASES:
- k = 0: Division by zero (special handling or constraint)
- Subarray length = 1: Must skip (requirement: length ≥ 2)
- Negative numbers: Modulo handles correctly with normalization
- All elements sum to multiple of k: Returns true

</details>
"""


class Solution:
    def checkSubarraySum(self, nums: list[int], k: int) -> bool:
        """
        Approach: Prefix sum with hash map tracking remainders
        Time Complexity: O(n)
        Space Complexity: O(min(n, k))
        """
        # Hash map: remainder -> earliest index
        # Initialize with remainder 0 at index -1 (before array)
        remainder_map = {0: -1}
        prefix_sum = 0

        for i, num in enumerate(nums):
            prefix_sum += num

            # Normalize remainder to be non-negative
            remainder = prefix_sum % k if k != 0 else prefix_sum

            if remainder in remainder_map:
                # Check if subarray length >= 2
                if i - remainder_map[remainder] >= 2:
                    return True
            else:
                # Store earliest occurrence of this remainder
                remainder_map[remainder] = i

        return False

    def checkSubarraySumBruteForce(self, nums: list[int], k: int) -> bool:
        """
        Approach: Brute force checking all subarrays
        Time Complexity: O(n²)
        Space Complexity: O(1)
        """
        n = len(nums)

        for i in range(n):
            subarray_sum = nums[i]
            for j in range(i + 1, n):
                subarray_sum += nums[j]

                if k == 0:
                    if subarray_sum == 0:
                        return True
                elif subarray_sum % k == 0:
                    return True

        return False


def test_solution() -> None:
    """Test cases for Problem 523."""
    solution = Solution()

    # Test case 1: Basic case with multiple of k
    assert solution.checkSubarraySum([23, 2, 4, 6, 7], 6) is True
    print("Test case 1 passed: Basic multiple of k")

    # Test case 2: Sum to zero (multiple of any k)
    assert solution.checkSubarraySum([23, 2, 6, 4, 7], 6) is True
    print("Test case 2 passed: Contains [6] which is multiple of 6")

    # Test case 3: No valid subarray
    assert solution.checkSubarraySum([23, 2, 6, 4, 7], 13) is False
    print("Test case 3 passed: No valid subarray")

    # Test case 4: Entire array is multiple of k
    assert solution.checkSubarraySum([1, 2, 3], 6) is True
    print("Test case 4 passed: Entire array sums to 6")

    # Test case 5: k = 0 case (if handled)
    # assert solution.checkSubarraySum([0, 0], 0) is True
    # print("Test case 5 passed: k = 0")

    # Test case 6: Exact two elements
    assert solution.checkSubarraySum([5, 0, 0, 0], 3) is True
    print("Test case 6 passed: Contains [0, 0]")

    # Test case 7: Length requirement (subarray must be >= 2)
    assert solution.checkSubarraySum([5, 2], 3) is False
    print("Test case 7 passed: No valid subarray of length >= 2")

    # Test case 8: Negative numbers
    assert solution.checkSubarraySum([23, 2, 4, 6, -1], 6) is True
    print("Test case 8 passed: Works with negative numbers")

    # Test case 9: Large k
    assert solution.checkSubarraySum([23, 2, 4, 6, 7], 100) is False
    print("Test case 9 passed: k larger than any subarray sum")

    # Test case 10: Repeated remainders
    assert solution.checkSubarraySum([1, 0], 2) is False  # sum=1, not multiple of 2
    print("Test case 10 passed: Remainder 1")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()
