"""
### INTUITION:
This problem is a variation of "subarray sum equals k" but instead of sum, we count odd numbers. We can use prefix sum technique by treating each odd number as 1 and even numbers as 0. Then we need to find subarrays where the sum of 1s equals k.

### APPROACH:
1. **Transform problem**: Convert to counting subarrays with sum = k using array traversal
2. **Prefix sum**: Track running count of odd numbers using hash map storage
3. **HashMap frequency with hash table lookup**: Store frequency of each prefix count in hash map
4. **Count subarrays**: For each position, use hash table lookup to check if (current_count - k) exists in hash map

### WHY THIS WORKS:
- This ensures that transform odd numbers to 1, even numbers to 0
- This ensures that problem becomes: find subarrays with sum = k
- This ensures that use the same technique as "Subarray Sum Equals K"
- This ensures that prefix_count[j] - prefix_count[i] = k means subarray from i+1 to j has k odd numbers

### EXAMPLE WALKTHROUGH:
**Input:** nums = [1,1,2,1,1], k = 3

**Step 1:** Transform problem using array traversal
- Convert: [1,1,2,1,1] → [1,1,0,1,1] (odd=1, even=0)

**Step 2:** Track prefix sum (running count of odd numbers)
- Prefix counts: [0,1,2,2,3,4]

**Step 3:** Build hash map frequency with hash table lookup
- HashMap: {0:1, 1:1, 2:2, 3:1, 4:1}

**Step 4:** Count subarrays using hash table lookup
- Position 0 (count=1): Check count-k=1-3=-2 in hash map → 0
- Position 1 (count=2): Check count-k=2-3=-1 in hash map → 0
- Position 2 (count=2): Check count-k=2-3=-1 in hash map → 0
- Position 3 (count=3): Check count-k=3-3=0 in hash map → 1 ✓
- Position 4 (count=4): Check count-k=4-3=1 in hash map → 1 ✓
- Total: 2 nice subarrays

Output:
```
2
```

### TIME COMPLEXITY:
**O(n)**
Single pass through array with HashMap operations

### SPACE COMPLEXITY:
**O(n)**
For the frequency HashMap

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""

from collections import defaultdict
from typing import Any


class Solution:
    def numberOfSubarrays(self, nums: list[int], k: int) -> int:
        """
        Count nice subarrays using prefix sum approach.

        Args:
            nums: Array of integers
            k: Number of odd numbers required in subarray

        Returns:
            Number of nice subarrays (subarrays with exactly k odd numbers)

        Time Complexity: O(n) - single pass through array
        Space Complexity: O(n) - for frequency HashMap
        """
        # Count frequency of prefix sums (number of odd numbers seen so far)
        prefix_count_freq: dict[Any, int] = defaultdict(int)
        prefix_count_freq[0] = 1  # Empty prefix has 0 odd numbers

        current_odd_count = 0
        nice_subarrays = 0

        for num in nums:
            # Increment count if current number is odd
            if num % 2 == 1:
                current_odd_count += 1

            # Check if there's a prefix with (current_odd_count - k) odd numbers
            # This would create a subarray with exactly k odd numbers
            needed_prefix_count = current_odd_count - k
            nice_subarrays += prefix_count_freq[needed_prefix_count]

            # Update frequency of current prefix count
            prefix_count_freq[current_odd_count] += 1

        return nice_subarrays

    def numberOfSubarraysSlidingWindow(self, nums: list[int], k: int) -> int:
        """
        Alternative solution using sliding window approach.

        Args:
            nums: Array of integers
            k: Number of odd numbers required

        Returns:
            Number of nice subarrays

        Time Complexity: O(n)
        Space Complexity: O(1)
        """

        def at_most_k_odd(nums: Any, k: Any) -> Any:
            """Count subarrays with at most k odd numbers."""
            if k < 0:
                return 0

            left = 0
            odd_count = 0
            result = 0

            for right in range(len(nums)):
                if nums[right] % 2 == 1:
                    odd_count += 1

                while odd_count > k:
                    if nums[left] % 2 == 1:
                        odd_count -= 1
                    left += 1

                result += right - left + 1

            return result

        # exactly k = at_most_k - at_most_(k-1)
        return at_most_k_odd(nums, k) - at_most_k_odd(nums, k - 1)  # type: ignore

    def numberOfSubarraysOptimized(self, nums: list[int], k: int) -> int:
        """
        Optimized solution using manual HashMap.

        Args:
            nums: Array of integers
            k: Number of odd numbers required

        Returns:
            Number of nice subarrays
        """
        # Manual HashMap for prefix count frequencies
        prefix_freq = {0: 1}
        odd_count = 0
        result = 0

        for num in nums:
            if num % 2 == 1:
                odd_count += 1

            # Look for prefix with (odd_count - k) odd numbers
            target = odd_count - k
            if target in prefix_freq:
                result += prefix_freq[target]

            # Update frequency
            if odd_count in prefix_freq:
                prefix_freq[odd_count] += 1
            else:
                prefix_freq[odd_count] = 1

        return result

    def numberOfSubarraysBruteForce(self, nums: list[int], k: int) -> int:
        """
        Brute force solution for verification.

        Args:
            nums: Array of integers
            k: Number of odd numbers required

        Returns:
            Number of nice subarrays

        Time Complexity: O(n²)
        Space Complexity: O(1)
        """
        n = len(nums)
        count = 0

        for i in range(n):
            odd_count = 0
            for j in range(i, n):
                if nums[j] % 2 == 1:
                    odd_count += 1

                if odd_count == k:
                    count += 1
                elif odd_count > k:
                    break

        return count


def test_solution() -> None:
    """Test cases for Problem 1248."""
    solution = Solution()

    # Test case 1: Basic example
    result1 = solution.numberOfSubarrays([1, 1, 2, 1, 1], 3)
    expected1 = 2
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: k = 1
    result2 = solution.numberOfSubarrays([2, 4, 6], 1)
    expected2 = 0
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: All odd numbers
    result3 = solution.numberOfSubarrays([1, 3, 5], 2)
    expected3 = 2  # [1,3] and [3,5]
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: k = 0 (no odd numbers required)
    result4 = solution.numberOfSubarrays([2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2)
    expected4 = 16
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Single element
    result5 = solution.numberOfSubarrays([1], 1)
    expected5 = 1
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: k larger than total odd numbers
    result6 = solution.numberOfSubarrays([1, 2, 3], 4)
    expected6 = 0
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test case 7: Complex case
    result7 = solution.numberOfSubarrays([2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2)
    expected7 = 16
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test sliding window approach
    result8 = solution.numberOfSubarraysSlidingWindow([1, 1, 2, 1, 1], 3)
    expected8 = 2
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    # Test optimized approach
    result9 = solution.numberOfSubarraysOptimized([1, 1, 2, 1, 1], 3)
    expected9 = 2
    assert result9 == expected9, f"Expected {expected9}, got {result9}"

    # Test brute force approach
    result10 = solution.numberOfSubarraysBruteForce([1, 1, 2, 1, 1], 3)
    expected10 = 2
    assert result10 == expected10, f"Expected {expected10}, got {result10}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 1248. Count Number Of Nice Subarrays ===")

    # Test different approaches
    test_cases = [([1, 1, 2, 1, 1], 3), ([2, 4, 6], 1), ([1, 3, 5], 2), ([2, 2, 2, 1, 2, 2, 1, 2, 2, 2], 2)]

    for nums, k in test_cases:
        print(f"\nInput: nums={nums}, k={k}")

        result1 = solution.numberOfSubarrays(nums, k)
        result2 = solution.numberOfSubarraysSlidingWindow(nums, k)
        result3 = solution.numberOfSubarraysOptimized(nums, k)

        print(f"Prefix sum approach:    {result1}")
        print(f"Sliding window:         {result2}")
        print(f"Optimized approach:     {result3}")

    # Detailed walkthrough
    print("\nDetailed example: nums=[1,1,2,1,1], k=3")
    nums = [1, 1, 2, 1, 1]
    print(f"Odd positions: {[i for i, x in enumerate(nums) if x % 2 == 1]}")
    print("Nice subarrays with 3 odd numbers:")
    print("- [1,1,2,1] (indices 0-3)")
    print("- [1,2,1,1] (indices 1-4)")
    print(f"Total: {solution.numberOfSubarrays(nums, 3)}")

    # Performance comparison
    print("\nApproach complexities:")
    print("Prefix sum:     O(n) time, O(n) space")
    print("Sliding window: O(n) time, O(1) space")
    print("Optimized:      O(n) time, O(n) space")
