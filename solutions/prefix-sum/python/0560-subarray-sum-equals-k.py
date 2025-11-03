"""
# Difficulty: Medium

# 0560. Subarray Sum Equals K

Given an array of integers nums and an integer k, return the total number of subarrays whose sum is equal to k.

A subarray is a contiguous non-empty sequence of elements within an array.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>nums = [1,1,1], k = 2</dd>
<dt>Output:</dt>
<dd>[1]</dd>
<dt>Explanation:</dt>
<dd>There are 2 subarrays with sum equal to k: [1] and [2,-1,2]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Array
**Patterns**: Hash Table Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(n) - Additional hash map storage

### INTUITION:
This is a classic prefix sum problem. The key insight is that if we know the prefix sum up to index i and up to index j (where j > i), then the sum of subarray from i+1 to j is: prefix_sum[j] - prefix_sum[i]. We can use a hashmap to store prefix sums and their frequencies to find subarrays with target sum efficiently.

### APPROACH:
1. **Use prefix sum**: Calculate running sum as we iterate
2. **HashMap tracking**: Store frequency of each prefix sum seen
3. **Target calculation**: For current prefix sum, check if (prefix_sum - k) exists
4. **Count subarrays**: Add frequency of (prefix_sum - k) to result
5. **Update map**: Increment frequency of current prefix sum

### WHY THIS WORKS:
- If prefix_sum[j] - prefix_sum[i] = k, then prefix_sum[i] = prefix_sum[j] - k
- By storing prefix sum frequencies, we can quickly find how many times (prefix_sum - k) occurred
- Each occurrence represents a valid subarray ending at current position
- Running prefix sum allows single pass solution

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1,1,1], k = 2
```

Index 0: sum=1, need=1-2=-1, count=0, map={0:1, 1:1}
Index 1: sum=2, need=2-2=0, count=1, map={0:1, 1:1, 2:1}
Index 2: sum=3, need=3-2=1, count=2, map={0:1, 1:1, 2:1, 3:1}
Result: 2 subarrays: [1,1] and [1,1]

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
O(n)
Single pass through the array with O(1) hashmap operations

### SPACE COMPLEXITY:
O(n)
HashMap can store up to n different prefix sums

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
"""

from collections import defaultdict
from typing import Any


class Solution:
    def subarraySum(self, nums: list[int], k: int) -> int:
        """
        Count subarrays with sum equal to k using prefix sum and hashmap.

        Args:
            nums: Array of integers
            k: Target sum

        Returns:
            Number of subarrays with sum equal to k

        Time Complexity: O(n) - single pass through array
        Space Complexity: O(n) - hashmap for prefix sums
        """
        # Dictionary to store frequency of prefix sums
        prefix_sum_count: dict[Any, int] = defaultdict(int)
        prefix_sum_count[0] = 1  # Empty subarray has sum 0

        current_sum = 0
        count = 0

        for num in nums:
            # Update current prefix sum
            current_sum += num

            # Check if there's a prefix sum such that current_sum - prefix_sum = k
            # This means prefix_sum = current_sum - k
            needed_sum = current_sum - k
            count += prefix_sum_count[needed_sum]

            # Add current prefix sum to the map
            prefix_sum_count[current_sum] += 1

        return count

    def subarraySumBruteForce(self, nums: list[int], k: int) -> int:
        """
        Brute force solution checking all subarrays.

        Args:
            nums: Array of integers
            k: Target sum

        Returns:
            Number of subarrays with sum equal to k

        Time Complexity: O(n²) - check all possible subarrays
        Space Complexity: O(1) - constant extra space
        """
        count = 0
        n = len(nums)

        for i in range(n):
            current_sum = 0
            for j in range(i, n):
                current_sum += nums[j]
                if current_sum == k:
                    count += 1

        return count

    def subarraySumOptimized(self, nums: list[int], k: int) -> int:
        """
        Optimized solution with manual hashmap to avoid defaultdict import.

        Args:
            nums: Array of integers
            k: Target sum

        Returns:
            Number of subarrays with sum equal to k
        """
        # Manual hashmap using regular dict
        prefix_sum_count = {0: 1}  # Initialize with sum 0 having count 1
        current_sum = 0
        count = 0

        for num in nums:
            current_sum += num

            # Check if (current_sum - k) exists in our map
            needed_sum = current_sum - k
            if needed_sum in prefix_sum_count:
                count += prefix_sum_count[needed_sum]

            # Update frequency of current prefix sum
            if current_sum in prefix_sum_count:
                prefix_sum_count[current_sum] += 1
            else:
                prefix_sum_count[current_sum] = 1

        return count

    def subarraySumDetailed(self, nums: list[int], k: int) -> int:
        """
        More detailed implementation with step-by-step logic.

        Args:
            nums: Array of integers
            k: Target sum

        Returns:
            Number of subarrays with sum equal to k
        """
        result = 0
        prefix_sum = 0
        sum_frequency: dict[Any, Any] = {}

        # Base case: empty prefix has sum 0
        sum_frequency[0] = 1

        for i, num in enumerate(nums):
            # Add current number to prefix sum
            prefix_sum += num

            # We want: prefix_sum - some_previous_prefix_sum = k
            # Therefore: some_previous_prefix_sum = prefix_sum - k
            target_prefix = prefix_sum - k

            # Count how many times we've seen this target prefix sum
            if target_prefix in sum_frequency:
                result += sum_frequency[target_prefix]

            # Record current prefix sum
            if prefix_sum in sum_frequency:
                sum_frequency[prefix_sum] += 1
            else:
                sum_frequency[prefix_sum] = 1

        return result


def test_solution() -> None:
    """Test cases for Problem 560."""
    solution = Solution()

    # Test case 1: Basic example
    result1 = solution.subarraySum([1, 1, 1], 2)
    expected1 = 2
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Mixed positive and negative
    result2 = solution.subarraySum([1, 2, 3], 3)
    expected2 = 2  # [3] and [1,2]
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: No valid subarrays
    result3 = solution.subarraySum([1, 2, 3], 7)
    expected3 = 0
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Single element
    result4 = solution.subarraySum([1], 1)
    expected4 = 1
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Target is 0
    result5 = solution.subarraySum([1, -1, 0], 0)
    expected5 = 3  # [1,-1], [0], and [1,-1,0]
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: With negative numbers
    result6 = solution.subarraySum([1, -1, 1, -1], 0)
    expected6 = 4  # [1,-1], [-1,1], [1,-1,1,-1], [1,-1] (second occurrence)
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test brute force solution
    result7 = solution.subarraySumBruteForce([1, 1, 1], 2)
    expected7 = 2
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test optimized solution
    result8 = solution.subarraySumOptimized([1, 2, 3], 3)
    expected8 = 2
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    # Test detailed solution
    result9 = solution.subarraySumDetailed([1, -1, 0], 0)
    expected9 = 3
    assert result9 == expected9, f"Expected {expected9}, got {result9}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 560. Subarray Sum Equals K ===")

    # Demonstrate with examples
    test_cases = [([1, 1, 1], 2), ([1, 2, 3], 3), ([1, -1, 0], 0), ([1], 1)]

    for nums, k in test_cases:
        result = solution.subarraySum(nums, k)
        print(f"subarraySum(nums, {k}) -> result")

    # Show detailed walkthrough
    print("\nDetailed example: nums=[1,1,1], k=2")
    nums, k = [1, 1, 1], 2
    print(f"Array: nums, Target: {k}")
    print("Prefix sums and valid subarrays:")

    prefix_sum = 0
    prefix_map = {0: 1}
    count = 0

    for i, num in enumerate(nums):
        prefix_sum += num
        needed = prefix_sum - k
        if needed in prefix_map:
            count += prefix_map[needed]
            print(f"Index {i}: sum={prefix_sum}, need={needed}, found {prefix_map[needed]} times")
        else:
            print(f"Index {i}: sum={prefix_sum}, need={needed}, not found")

        prefix_map[prefix_sum] = prefix_map.get(prefix_sum, 0) + 1

    print(f"Total subarrays: {count}")
