"""
### INTUITION:
The key insight is that use prefix sum with modulo arithmetic. If two prefix sums have the same remainder
when divided by k, the subarray between them is divisible by k. Track remainder
frequencies in a hash map.

### APPROACH:
1. **Hash Map**: Store (remainder → frequency) pairs
2. **Prefix Sum**: Calculate cumulative sum modulo k
3. **Count**: For each remainder, if seen before, add previous count (all pairs count)
4. **Normalize**: Handle negative remainders by adding k

### WHY THIS WORKS:
If prefix[i] % k == prefix[j] % k, then sum(nums[i+1:j+1]) % k == 0.
For n occurrences of a remainder, there are n*(n-1)/2 pairs, but we count
incrementally: each new occurrence pairs with all previous occurrences.

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [4,5,0,-2,-3,1], k = 5
```

Prefix sums: [4, 9, 9, 7, 4, 5]
Remainders: [4, 4, 4, 2, 4, 0]
Initialize: {0: 1}  # remainder 0 before array
Index 0: rem=4, count=0 (not seen), add {0:1, 4:1}
Index 1: rem=4, count=1 (seen once), add {0:1, 4:2}
Index 2: rem=4, count=2 (seen twice), add {0:1, 4:3}
Index 3: rem=2, count=0 (not seen), add {0:1, 4:3, 2:1}
Index 4: rem=4, count=3 (seen 3 times), add {0:1, 4:4, 2:1}
Index 5: rem=0, count=1 (initial 0), add {0:2, 4:4, 2:1}
Total: 0+1+2+0+3+1 = 7

Output:
```
[Expected output]
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
**O(n)**
- Single pass through input

### SPACE COMPLEXITY:
**O(min(n, k)**) - hash map storage

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""


class Solution:
    def subarraysDivByK(self, nums: list[int], k: int) -> int:
        """
        Approach: Prefix sum with hash map tracking remainders
        Time Complexity: O(n)
        Space Complexity: O(min(n, k))
        """
        # Hash map: remainder -> frequency
        remainder_count = {0: 1}  # Initialize with remainder 0
        count = 0
        prefix_sum = 0

        for num in nums:
            prefix_sum += num

            # Normalize remainder to be non-negative
            # In Python, % always returns non-negative for positive k
            remainder = prefix_sum % k

            # Count subarrays ending here with sum divisible by k
            if remainder in remainder_count:
                count += remainder_count[remainder]

            # Update frequency of this remainder
            remainder_count[remainder] = remainder_count.get(remainder, 0) + 1

        return count

    def subarraysDivByKExplicitNormalization(self, nums: list[int], k: int) -> int:
        """
        Approach: Same as above but with explicit remainder normalization
        Time Complexity: O(n)
        Space Complexity: O(min(n, k))
        """
        remainder_count = {0: 1}
        count = 0
        prefix_sum = 0

        for num in nums:
            prefix_sum += num

            # Explicit normalization for negative remainders
            remainder = ((prefix_sum % k) + k) % k

            if remainder in remainder_count:
                count += remainder_count[remainder]

            remainder_count[remainder] = remainder_count.get(remainder, 0) + 1

        return count

    def subarraysDivByKBruteForce(self, nums: list[int], k: int) -> int:
        """
        Approach: Brute force checking all subarrays
        Time Complexity: O(n²)
        Space Complexity: O(1)
        """
        count = 0
        n = len(nums)

        for i in range(n):
            subarray_sum = 0
            for j in range(i, n):
                subarray_sum += nums[j]
                if subarray_sum % k == 0:
                    count += 1

        return count


def test_solution() -> None:
    """Test cases for Problem 974."""
    solution = Solution()

    # Test case 1: Basic case
    assert solution.subarraysDivByK([4, 5, 0, -2, -3, 1], 5) == 7
    print("Test case 1 passed: Basic case")

    # Test case 2: All divisible
    assert solution.subarraysDivByK([5], 5) == 1
    print("Test case 2 passed: Single element divisible")

    # Test case 3: None divisible
    assert solution.subarraysDivByK([1, 2, 3], 5) == 0
    print("Test case 3 passed: No divisible subarrays")

    # Test case 4: Multiple pairs
    assert solution.subarraysDivByK([1, 1, 1], 2) == 3  # [1,1], [1,1], [1,1,1]
    print("Test case 4 passed: Multiple pairs")

    # Test case 5: k = 1 (all divisible)
    assert solution.subarraysDivByK([1, 2, 3], 1) == 6  # All n*(n+1)/2 subarrays
    print("Test case 5 passed: k = 1")

    # Test case 6: Negative numbers
    assert solution.subarraysDivByK([-1, -2, -3], 3) == 3  # [-3], [-1,-2], [-1,-2,-3]
    print("Test case 6 passed: Negative numbers")

    # Test case 7: With zeros
    assert solution.subarraysDivByK([0, 0], 2) == 3  # [0], [0], [0,0]
    print("Test case 7 passed: With zeros")

    # Test case 8: Large k
    assert solution.subarraysDivByK([1, 2, 3], 100) == 0
    print("Test case 8 passed: Large k")

    # Test case 9: Mixed positive/negative
    assert solution.subarraysDivByK([2, -2, 2, -2], 2) == 10
    print("Test case 9 passed: Mixed signs")

    # Test case 10: Compare with explicit normalization
    test_cases = [
        ([4, 5, 0, -2, -3, 1], 5),
        ([-1, -2, -3], 3),
        ([2, -2, 2, -2], 2),
    ]
    for nums, k in test_cases:
        assert solution.subarraysDivByK(nums, k) == solution.subarraysDivByKExplicitNormalization(nums, k)
    print("Test case 10 passed: Explicit normalization matches")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()
