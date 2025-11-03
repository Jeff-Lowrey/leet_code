"""
# Difficulty: Easy

# 1221. Split A String In Balanced Strings

Balanced strings are those that have an equal quantity of 'L' and 'R' characters.

Given a balanced string s, split it into some number of substrings such that:
- Each substring is balanced.

Return the maximum number of balanced strings you can obtain.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>"RLRRLLRLRL"</dd>
<dt>Output:</dt>
<dd>4</dd>
<dt>Explanation:</dt>
<dd>String 'RLRRLLRLRL' can be split into 4 balanced substrings</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Array, String
**Patterns**: Hash Table Pattern, Greedy Algorithm
**Time Complexity**: O(n)
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
The key insight is to use a greedy approach: whenever we find a balanced substring
(where count of 'L' equals count of 'R'), we should immediately split it off. This
maximizes the number of splits because splitting early gives us more opportunities
for future splits.

### APPROACH:
1. **Use a counter**: Track the balance between 'L' and 'R' characters
2. **Increment/decrement**: +1 for 'L', -1 for 'R' (or vice versa)
3. **Split when balanced**: When counter reaches 0, we have a balanced substring
4. **Count splits**: Increment split counter each time balance reaches 0

### WHY THIS WORKS:
The algorithm correctly solves the problem by systematically exploring all valid states while maintaining necessary invariants. Each step preserves correctness through careful state management, and the base cases handle edge conditions properly. The approach guarantees finding the solution (if one exists) by examining all possibilities or efficiently pruning invalid paths.

### EXAMPLE WALKTHROUGH:
Input:
```
s = "RLRRLLRLRL"
```

Steps:
Step 1: i=0: 'R' → balance = -1
Step 2: i=1: 'L' → balance = 0 → SPLIT! count = 1 → "RL"
Step 3: i=2: 'R' → balance = -1
Step 4: i=3: 'R' → balance = -2
Step 5: i=4: 'L' → balance = -1
Step 6: i=5: 'L' → balance = 0 → SPLIT! count = 2 → "RRLL"
Step 7: i=6: 'R' → balance = -1
Step 8: i=7: 'L' → balance = 0 → SPLIT! count = 3 → "RL"
Step 9: i=8: 'R' → balance = -1
Step 10: i=9: 'L' → balance = 0 → SPLIT! count = 4 → "RL"

Output:
```
4
Substrings: "RL", "RRLL", "RL", "RL"
```

### TIME COMPLEXITY:
O(n)
Single pass through the string

### SPACE COMPLEXITY:
O(1)
Only using counter and result variables

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
"""

from typing import Any, List


class Solution:
    def balancedStringSplit(self, s: str) -> int:
        """
        Find maximum number of balanced substrings using greedy approach.

        Args:
            s: Balanced string containing only 'L' and 'R'

        Returns:
            Maximum number of balanced substrings

        Time Complexity: O(n) - single pass
        Space Complexity: O(1) - only tracking variables
        """
        balance = 0
        count = 0

        for char in s:
            # Update balance: +1 for 'R', -1 for 'L'
            balance += 1 if char == "R" else -1

            # When balance is 0, we have equal Rs and Ls
            if balance == 0:
                count += 1

        return count

    def balancedStringSplitVerbose(self, s: str) -> int:
        """
        Verbose version with detailed tracking.

        Args:
            s: Balanced string

        Returns:
            Maximum number of balanced substrings
        """
        balance = 0
        split_count = 0
        current_substring_start = 0

        for i, char in enumerate(s):
            # Track balance: R is +1, L is -1
            if char == "R":
                balance += 1
            else:  # char == 'L'
                balance -= 1

            # When balance returns to 0, we have a balanced substring
            if balance == 0:
                # We found a balanced substring from start to i
                split_count += 1
                current_substring_start = i + 1

        return split_count

    def balancedStringSplitAlternative(self, s: str) -> int:
        """
        Alternative implementation using L as +1 and R as -1.

        Args:
            s: Balanced string

        Returns:
            Maximum number of balanced substrings
        """
        balance = 0
        result = 0

        for char in s:
            # Update balance: +1 for 'L', -1 for 'R'
            balance += 1 if char == "L" else -1

            # Split when balanced
            if balance == 0:
                result += 1

        return result

    def balancedStringSplitWithTracking(self, s: str) -> tuple[int, List[str]]:
        """
        Returns both count and actual substrings (for educational purposes).

        Args:
            s: Balanced string

        Returns:
            Tuple of (count, list of balanced substrings)
        """
        balance = 0
        count = 0
        substrings: list[Any] = []
        start = 0

        for i, char in enumerate(s):
            balance += 1 if char == "R" else -1

            if balance == 0:
                # Found balanced substring
                substrings.append(s[start : i + 1])
                count += 1
                start = i + 1

        return count, substrings


def test_solution() -> None:
    """Test cases for Problem 1221."""
    solution = Solution()

    # Test case 1: Standard case
    result1 = solution.balancedStringSplit("RLRRLLRLRL")
    expected1 = 4
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Minimum splits
    result2 = solution.balancedStringSplit("RLRRRLLRLL")
    expected2 = 2
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: All alternating
    result3 = solution.balancedStringSplit("LLLLRRRR")
    expected3 = 1
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Minimum length
    result4 = solution.balancedStringSplit("RL")
    expected4 = 1
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Another minimum
    result5 = solution.balancedStringSplit("LR")
    expected5 = 1
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Complex pattern
    result6 = solution.balancedStringSplit("RLRLRLRL")
    expected6 = 4
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test case 7: Nested pattern
    result7 = solution.balancedStringSplit("RLLLLRRRLR")
    expected7 = 3
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test case 8: Larger example
    result8 = solution.balancedStringSplit("RRLRLLRLLR")
    expected8 = 3  # "RR", "LRLL", "RLLR" won't work, let me verify...
    # Actually: R=1, R=2, L=1, R=2, L=1, L=0 -> split (1)
    # R=1, L=0 -> split (2), R=1, L=0 -> split (3)
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    # Test verbose implementation
    result9 = solution.balancedStringSplitVerbose("RLRRLLRLRL")
    expected9 = 4
    assert result9 == expected9, f"Expected {expected9}, got {result9}"

    # Test alternative implementation
    result10 = solution.balancedStringSplitAlternative("RLRRLLRLRL")
    expected10 = 4
    assert result10 == expected10, f"Expected {expected10}, got {result10}"

    # Test with tracking
    count11, substrings11 = solution.balancedStringSplitWithTracking("RLRRLLRLRL")
    expected11 = 4
    assert count11 == expected11, f"Expected {expected11}, got {count11}"
    assert len(substrings11) == 4, f"Expected 4 substrings, got {len(substrings11)}"
    # Verify all substrings are balanced
    for sub in substrings11:
        assert sub.count("R") == sub.count("L"), f"Substring {sub} is not balanced"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 1221. Split A String In Balanced Strings ===")

    test_string = "RLRRLLRLRL"
    result = solution.balancedStringSplit(test_string)
    print(f"balancedStringSplit('{test_string}') -> result")

    # Show the actual substrings
    count, substrings = solution.balancedStringSplitWithTracking(test_string)
    print(f"Substrings: {substrings}")

    test_string2 = "RLRRRLLRLL"
    result2 = solution.balancedStringSplit(test_string2)
    print(f"\nbalancedStringSplit('{test_string2}') -> {result2}")

    count2, substrings2 = solution.balancedStringSplitWithTracking(test_string2)
    print(f"Substrings: {substrings2}")
