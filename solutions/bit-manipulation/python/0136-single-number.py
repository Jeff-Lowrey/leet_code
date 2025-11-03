"""
### INTUITION:
This is a classic bit manipulation problem. The key insight is that XOR has special properties:
- a ^ a = 0 (any number XORed with itself is 0)
- a ^ 0 = a (any number XORed with 0 is itself)
- XOR is commutative and associative

So if we XOR all numbers together, the duplicates cancel out, leaving only the single number.

### APPROACH:
1. **Initialize result**: Start with 0
2. **XOR all elements**: XOR each number with the result
3. **Return result**: The final value is the single number

### WHY THIS WORKS:
- Duplicate numbers cancel out: a ^ a = 0
- XOR with 0 preserves the value: a ^ 0 = a
- Order doesn't matter due to commutativity
- All duplicates disappear, leaving only the single number

### EXAMPLE WALKTHROUGH:
Input:
```
[2,2,1]
```

Step 1: result = 0
Step 2: result = 0 ^ 2 = 2
Step 3: result = 2 ^ 2 = 0 (duplicate cancels out)
Step 4: result = 0 ^ 1 = 1

Output:
```
1 (the single number)
```

### TIME COMPLEXITY:
**O(n)**
Single pass through the array

### SPACE COMPLEXITY:
**O(1)**
Only using constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""

from typing import Any


class Solution:
    def singleNumber(self, nums: list[int]) -> int:
        """
        Find the single number using XOR bit manipulation.

        Args:
            nums: Array where every element appears twice except one

        Returns:
            The single number that appears once

        Time Complexity: O(n) - single pass through array
        Space Complexity: O(1) - constant extra space
        """
        result = 0
        for num in nums:
            result ^= num
        return result

    def singleNumberHashSet(self, nums: list[int]) -> int:
        """
        Alternative solution using hash set (less optimal).

        Args:
            nums: Array where every element appears twice except one

        Returns:
            The single number that appears once

        Time Complexity: O(n)
        Space Complexity: O(n) for hash set
        """
        seen: set[Any] = set()
        for num in nums:
            if num in seen:
                seen.remove(num)
            else:
                seen.add(num)
        return int(seen.pop())

    def singleNumberMath(self, nums: list[int]) -> int:
        """
        Alternative mathematical solution.

        Args:
            nums: Array where every element appears twice except one

        Returns:
            The single number that appears once

        Time Complexity: O(n)
        Space Complexity: O(n) for set
        """
        # 2 * (sum of unique numbers) - sum of all numbers = single number
        return 2 * sum(set(nums)) - sum(nums)

    def singleNumberSort(self, nums: list[int]) -> int:
        """
        Alternative solution using sorting (less optimal).

        Args:
            nums: Array where every element appears twice except one

        Returns:
            The single number that appears once

        Time Complexity: O(n log n) for sorting
        Space Complexity: O(1) extra space
        """
        nums.sort()
        for i in range(0, len(nums) - 1, 2):
            if nums[i] != nums[i + 1]:
                return nums[i]
        return nums[-1]  # Last element is the single one


def test_solution() -> None:
    """Test cases for Problem 136."""
    solution = Solution()

    # Test case 1: Basic case
    result1 = solution.singleNumber([2, 2, 1])
    expected1 = 1
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Multiple pairs
    result2 = solution.singleNumber([4, 1, 2, 1, 2])
    expected2 = 4
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Single element
    result3 = solution.singleNumber([1])
    expected3 = 1
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Large array
    result4 = solution.singleNumber([1, 3, 1, 3, 5, 5, 7, 7, 8])
    expected4 = 8
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Negative numbers
    result5 = solution.singleNumber([-1, -1, -2])
    expected5 = -2
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test alternative approaches
    # Hash set approach
    result6 = solution.singleNumberHashSet([2, 2, 1])
    expected6 = 1
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Mathematical approach
    result7 = solution.singleNumberMath([4, 1, 2, 1, 2])
    expected7 = 4
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Sorting approach
    result8 = solution.singleNumberSort([1, 3, 1, 3, 5, 5, 7, 7, 8])
    expected8 = 8
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 136. Single Number ===")
    print(f"singleNumber([2,2,1]) -> {solution.singleNumber([2, 2, 1])}")
    print(f"singleNumber([4,1,2,1,2]) -> {solution.singleNumber([4, 1, 2, 1, 2])}")
    print(f"singleNumber([1]) -> {solution.singleNumber([1])}")
