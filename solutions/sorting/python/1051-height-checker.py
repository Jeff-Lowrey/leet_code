"""
# Difficulty: Easy

# 1051. Height Checker

A school is trying to take an annual photo of all the students. The students are asked to stand in a single file line in non-decreasing order by height. Let this ordering be represented by the integer array expected where expected[i] is the expected height of the ith student in line.

You are given an integer array heights representing the current order that the students are standing in. Each heights[i] is the height of the ith student in line (0-indexed).

Return the number of indices where heights[i] != expected[i].

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>Input: heights = [1,1,4,2,1,3]</dd>
<dt>Output:</dt>
<dd>Expected (sorted): [1,1,1,2,3,4]</dd>
<dt>Explanation:</dt>
<dd>Minimum swaps needed to sort students by height</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Array Traversal, Sorting
**Data Structures**: Array
**Patterns**: Hash Table Pattern
**Time Complexity**: O(n log n) - Sorting or divide-and-conquer
**Space Complexity**: O(n)

### INTUITION:
We need to compare the current order with the expected sorted order and count mismatches. The key insight is that the expected order is simply the current array sorted.

### APPROACH:
1. **Create expected array**: Sort the current heights array
2. **Compare arrays**: Count positions where current != expected
3. **Return count**: Number of students in wrong positions

### WHY THIS WORKS:
- The expected order is the sorted version of current heights
- Any position where current[i] != sorted[i] needs adjustment
- Simple comparison gives us the mismatch count

### EXAMPLE WALKTHROUGH:
Input:
```
heights = [1,1,4,2,1,3]
```

Expected (sorted): [1,1,1,2,3,4]
Compare:
Current:  [1,1,4,2,1,3]
Expected: [1,1,1,2,3,4]
Match:     ✓ ✓ ✗ ✓ ✗ ✗
Mismatches at indices: 2, 4, 5
Count: 3

### TIME COMPLEXITY:
O(n log n)
Due to sorting the array

### SPACE COMPLEXITY:
O(n)
For the sorted expected array

### EDGE CASES:
- **Already sorted**: Return 0 (no mismatches)
- **Reverse sorted**: Return n (all positions wrong)
- **Single element**: Return 0 (trivially sorted)
- **All same heights**: Return 0 (any order is sorted)
- **Few elements out of place**: Count specific mismatches

</details>
"""

from typing import Any


class Solution:
    def heightChecker(self, heights: list[int]) -> int:
        """
        Count students not in expected sorted positions.

        Args:
            heights: Current heights order

        Returns:
            Number of students in wrong positions

        Time Complexity: O(n log n) for sorting
        Space Complexity: O(n) for expected array
        """
        # Create expected sorted order
        expected = sorted(heights)

        # Count mismatches
        mismatches = 0
        for i in range(len(heights)):
            if heights[i] != expected[i]:
                mismatches += 1

        return mismatches

    def heightCheckerCountingSort(self, heights: list[int]) -> int:
        """
        Optimized solution using counting sort for height range 1-100.

        Args:
            heights: Current heights order

        Returns:
            Number of students in wrong positions

        Time Complexity: O(n + k) where k is height range (100)
        Space Complexity: O(k) for counting array
        """
        # Count frequency of each height (1 to 100)
        count = [0] * 101

        for height in heights:
            count[height] += 1

        # Reconstruct expected sorted order and compare
        mismatches = 0
        expected_index = 0

        for height in range(1, 101):
            for _ in range(count[height]):
                if expected_index < len(heights) and heights[expected_index] != height:
                    mismatches += 1
                expected_index += 1

        return mismatches

    def heightCheckerOneLiner(self, heights: list[int]) -> int:
        """
        Concise one-liner solution.

        Args:
            heights: Current heights order

        Returns:
            Number of students in wrong positions
        """
        return sum(h1 != h2 for h1, h2 in zip(heights, sorted(heights), strict=False))


def test_solution() -> None:
    """Test cases for Problem 1051."""
    solution = Solution()

    # Test case 1: Multiple mismatches
    result1 = solution.heightChecker([1, 1, 4, 2, 1, 3])
    expected1 = 3
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Already sorted
    result2 = solution.heightChecker([5, 1, 2, 3, 4])
    expected2 = 5
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Perfect order
    result3 = solution.heightChecker([1, 2, 3, 4, 5])
    expected3 = 0
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Single element
    result4 = solution.heightChecker([1])
    expected4 = 0
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Two elements
    result5 = solution.heightChecker([2, 1])
    expected5 = 2
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test counting sort solution
    result6 = solution.heightCheckerCountingSort([1, 1, 4, 2, 1, 3])
    expected6 = 3
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test one-liner solution
    result7 = solution.heightCheckerOneLiner([1, 1, 4, 2, 1, 3])
    expected7 = 3
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 1051. Height Checker ===")
    print(f"heightChecker([1,1,4,2,1,3]) -> {solution.heightChecker([1, 1, 4, 2, 1, 3])}")
    print(f"heightChecker([5,1,2,3,4]) -> {solution.heightChecker([5, 1, 2, 3, 4])}")
    print(f"heightChecker([1,2,3,4,5]) -> {solution.heightChecker([1, 2, 3, 4, 5])}")
