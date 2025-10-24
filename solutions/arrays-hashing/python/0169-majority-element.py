"""
# Difficulty: Easy

# 0169. Majority Element

Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times.
You may assume that the majority element always exists in the array.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[2, 2, 1, 1, 1, 2, 2]</dd>
<dt>Output:</dt>
<dd>2</dd>
<dt>Explanation:</dt>
<dd>The majority element is 2, appearing 4 times in an array of size 7 (more than ⌊7/2⌋ = 3)</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Array Traversal, Sorting
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Hash Table Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Since the majority element appears more than n/2 times, it will always "survive" any cancellation process. The Boyer-Moore voting algorithm leverages this by maintaining a candidate and count, canceling out different elements.

### APPROACH:
1. **Initialize**: Set candidate to None and count to 0
2. **Vote**: For each element, if count is 0, make it the new candidate
3. **Count**: If element matches candidate, increment count; otherwise decrement
4. **Result**: The surviving candidate is the majority element

### WHY THIS WORKS:
- Majority element appears > n/2 times
- Non-majority elements can at most cancel out n/2 occurrences
- Majority element will always have positive net count
- Each cancellation removes one majority and one non-majority element

### EXAMPLE WALKTHROUGH:
Input:
```
[2,2,1,1,1,2,2]
```

Steps:
Step 1: num=2, count=0 → candidate=2, count=1
Step 2: num=2, count=1 → count=2 (match)
Step 3: num=1, count=2 → count=1 (different)
Step 4: num=1, count=1 → count=0 (different)
Step 5: num=1, count=0 → candidate=1, count=1
Step 6: num=2, count=1 → count=0 (different)
Step 7: num=2, count=0 → candidate=2, count=1
Step 8: Result: 2 (which is correct, appears 4/7 times)

Output:
```
2
```

### TIME COMPLEXITY:
O(n)
Single pass through the array

### SPACE COMPLEXITY:
O(1)
Only using constant extra space

### EDGE CASES:
- **Single element**: Return that element (it's the majority)
- **All same elements**: Return that element
- **Exactly n/2 + 1 occurrences**: Still majority element
- **Multiple candidates**: Boyer-Moore finds the true majority
- **Guaranteed majority**: Problem guarantees one exists

</details>
"""

from collections import Counter
import random


class Solution:
    def majorityElement(self, nums: list[int]) -> int:
        """
        Find majority element using Boyer-Moore voting algorithm.

        Args:
            nums: Array of integers

        Returns:
            The majority element

        Time Complexity: O(n) - single pass through array
        Space Complexity: O(1) - constant extra space
        """
        candidate = None
        count = 0

        # Boyer-Moore Voting Algorithm
        for num in nums:
            if count == 0:
                candidate = num
                count = 1
            elif num == candidate:
                count += 1
            else:
                count -= 1

        # Problem guarantees nums is non-empty with a majority element
        assert candidate is not None
        return candidate

    def majorityElementHashMap(self, nums: list[int]) -> int:
        """
        Alternative solution using hash map for counting.

        Args:
            nums: Array of integers

        Returns:
            The majority element

        Time Complexity: O(n)
        Space Complexity: O(n) for hash map
        """
        counts = Counter(nums)
        majority_count = len(nums) // 2

        for num, count in counts.items():
            if count > majority_count:
                return num

        # Problem guarantees a majority element exists
        raise ValueError("No majority element found")

    def majorityElementSorting(self, nums: list[int]) -> int:
        """
        Alternative solution using sorting.

        Args:
            nums: Array of integers

        Returns:
            The majority element

        Time Complexity: O(n log n) for sorting
        Space Complexity: O(1) extra space
        """
        nums.sort()
        # The majority element will always be at the middle position
        return nums[len(nums) // 2]

    def majorityElementRandomized(self, nums: list[int]) -> int:
        """
        Alternative randomized solution.

        Args:
            nums: Array of integers

        Returns:
            The majority element

        Time Complexity: Expected O(n)
        Space Complexity: O(1)
        """
        while True:
            # Pick a random element
            candidate = random.choice(nums)

            # Count its occurrences
            count = sum(1 for num in nums if num == candidate)

            # Check if it's the majority
            if count > len(nums) // 2:
                return candidate


def test_solution() -> None:
    """Test cases for Problem 169."""
    solution = Solution()

    # Test case 1: Basic case with clear majority
    result1 = solution.majorityElement([3, 2, 3])
    expected1 = 3
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Majority element at the beginning
    result2 = solution.majorityElement([2, 2, 1, 1, 1, 2, 2])
    expected2 = 2
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Single element
    result3 = solution.majorityElement([1])
    expected3 = 1
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: All same elements
    result4 = solution.majorityElement([5, 5, 5, 5])
    expected4 = 5
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Large array
    result5 = solution.majorityElement([6, 5, 5])
    expected5 = 5
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test alternative approaches
    # HashMap approach
    result6 = solution.majorityElementHashMap([3, 2, 3])
    expected6 = 3
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Sorting approach (note: this modifies the input)
    test_nums = [2, 2, 1, 1, 1, 2, 2]
    result7 = solution.majorityElementSorting(test_nums.copy())
    expected7 = 2
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Randomized approach (may need multiple runs due to randomness)
    result8 = solution.majorityElementRandomized([3, 2, 3])
    expected8 = 3
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 169. Majority Element ===")
    print(f"majorityElement([3,2,3]) -> {solution.majorityElement([3, 2, 3])}")
    print(f"majorityElement([2,2,1,1,1,2,2]) -> {solution.majorityElement([2, 2, 1, 1, 1, 2, 2])}")
    print(f"majorityElement([1]) -> {solution.majorityElement([1])}")
