"""
# 0696. Count Binary Substrings

# Difficulty: Easy

Given a binary string s, return the number of non-empty substrings that have the same
number of 0's and 1's, and all the 0's and all the 1's in these substrings are grouped
consecutively.

Substrings that occur multiple times are counted the number of times they occur.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>s = "00110011"</dd>
<dt>Output:</dt>
<dd>6</dd>
<dt>Explanation:</dt>
<dd>Count of binary substrings with equal consecutive 0s and 1s in '00110011' is 6</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Set, Array, String
**Patterns**: Two Pointers Pattern, Sliding Window Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(n) - Additional set storage

### INTUITION:
For a valid binary substring, all 0's must be grouped together and all 1's must be
grouped together, with equal counts. The key insight is that we only need to look at
adjacent groups of the same digit. For two consecutive groups, the number of valid
substrings is min(length of first group, length of second group).

### APPROACH:
1. **Count Consecutive Groups**: Count length of each consecutive group of same digit
2. **Sliding Window**: Look at pairs of adjacent groups
3. **Count Valid Substrings**: For each pair, add min(group1_length, group2_length)
4. **Total Count**: Sum all valid substrings from all pairs

Example: "00110" has groups [2, 2, 1]
- Groups "00" and "11": min(2, 2) = 2 valid substrings ("01", "0011")
- Groups "11" and "0": min(2, 1) = 1 valid substring ("10")
- Total: 3

### WHY THIS WORKS:
- Valid substrings must have consecutive identical digits
- For two adjacent groups with lengths n and m, we can form min(n, m) valid substrings
- Each valid substring takes equal number of digits from each group
- Example: groups "000" (3) and "11" (2) → min(3, 2) = 2 substrings: "01", "0011"

### EXAMPLE WALKTHROUGH:
Input:
```
s = "00110011"
```

Count groups: [2, 2, 2, 2]
- "00": length 2
- "11": length 2
- "00": length 2
- "11": length 2
Count valid substrings:
- Pair [2, 2]: min(2, 2) = 2 substrings ("01", "0011")
- Pair [2, 2]: min(2, 2) = 2 substrings ("10", "1100")
- Pair [2, 2]: min(2, 2) = 2 substrings ("01", "0011")
Total: 2 + 2 + 2 = 6

### TIME COMPLEXITY:
O(n)
- Single pass through string to count groups
- Process each group once
- Overall linear in string length

### SPACE COMPLEXITY:
O(n)
- In worst case, store n groups (alternating 0s and 1s)
- Can be optimized to O(1) by processing pairs on-the-fly

### EDGE CASES:
- Single character: No valid substrings, return 0
- All same character: No valid substrings, return 0
- Alternating pattern "010101": Maximum valid substrings
- Two groups only: Simple case

</details>
"""

from typing import Any


class Solution:
    def countBinarySubstrings(self, s: str) -> int:
        """
        Count binary substrings with equal grouped 0's and 1's.

        Args:
            s: Binary string

        Returns:
            Number of valid binary substrings

        Time Complexity: O(n) where n is length of string
        Space Complexity: O(1) - only tracking prev and curr group lengths
        """
        count = 0
        prev_group_len = 0
        curr_group_len = 1

        # Process string left to right
        for i in range(1, len(s)):
            if s[i] == s[i - 1]:
                # Same digit, extend current group
                curr_group_len += 1
            else:
                # Different digit, new group starts
                # Add valid substrings from previous pair
                count += min(prev_group_len, curr_group_len)
                prev_group_len = curr_group_len
                curr_group_len = 1

        # Don't forget the last pair
        count += min(prev_group_len, curr_group_len)

        return count

    def countBinarySubstringsGroups(self, s: str) -> int:
        """
        Alternative using explicit group list.

        Args:
            s: Binary string

        Returns:
            Number of valid binary substrings

        Time Complexity: O(n)
        Space Complexity: O(n) for storing groups
        """
        if len(s) < 2:
            return 0

        # Count consecutive groups
        groups: list[Any] = []
        count = 1

        for i in range(1, len(s)):
            if s[i] == s[i - 1]:
                count += 1
            else:
                groups.append(count)
                count = 1

        groups.append(count)  # Don't forget last group

        # Count valid substrings from adjacent pairs
        result = 0
        for i in range(len(groups) - 1):
            result += min(groups[i], groups[i + 1])

        return result

    def countBinarySubstringsBrute(self, s: str) -> int:
        """
        Brute force approach checking all substrings (inefficient).

        Args:
            s: Binary string

        Returns:
            Number of valid binary substrings

        Time Complexity: O(n^2)
        Space Complexity: O(1)
        """

        def is_valid(substring: str) -> bool:
            """Check if substring has equal grouped 0s and 1s."""
            if len(substring) % 2 != 0:
                return False

            mid = len(substring) // 2
            left = substring[:mid]
            right = substring[mid:]

            # Check if left is all same and right is all same and different
            return len(set(left)) == 1 and len(set(right)) == 1 and left[0] != right[0]

        count = 0
        for i in range(len(s)):
            for j in range(i + 2, len(s) + 1, 2):  # Only even lengths
                if is_valid(s[i:j]):
                    count += 1

        return count

    def countBinarySubstringsVerbose(self, s: str) -> int:
        """
        Verbose implementation with detailed comments.

        Args:
            s: Binary string

        Returns:
            Number of valid binary substrings
        """
        if not s or len(s) < 2:
            return 0

        result = 0
        previous_group_length = 0
        current_group_length = 1

        # Scan through string
        for i in range(1, len(s)):
            if s[i] == s[i - 1]:
                # Current character matches previous, extend current group
                current_group_length += 1
            else:
                # Current character differs, we have a boundary between groups
                # Count valid substrings between these two groups
                # The number is the minimum of the two group lengths
                result += min(previous_group_length, current_group_length)

                # Update for next iteration
                previous_group_length = current_group_length
                current_group_length = 1

        # Process the last group boundary
        result += min(previous_group_length, current_group_length)

        return result


def test_solution() -> None:
    """Test cases for Problem 696."""
    solution = Solution()

    # Test case 1: Standard case
    result1 = solution.countBinarySubstrings("00110011")
    expected1 = 6
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Simple case
    result2 = solution.countBinarySubstrings("10101")
    expected2 = 4
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Single character
    result3 = solution.countBinarySubstrings("0")
    expected3 = 0
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Two characters same
    result4 = solution.countBinarySubstrings("00")
    expected4 = 0
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Two characters different
    result5 = solution.countBinarySubstrings("01")
    expected5 = 1
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Longer unequal groups
    result6 = solution.countBinarySubstrings("00110")
    expected6 = 3
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test case 7: All zeros
    result7 = solution.countBinarySubstrings("0000")
    expected7 = 0
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test groups solution
    result8 = solution.countBinarySubstringsGroups("00110011")
    expected8 = 6
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    # Test verbose solution
    result9 = solution.countBinarySubstringsVerbose("10101")
    expected9 = 4
    assert result9 == expected9, f"Expected {expected9}, got {result9}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 696. Count Binary Substrings ===")

    test_cases = ["00110011", "10101", "00110", "01", "0011", "000111"]

    for test in test_cases:
        result = solution.countBinarySubstrings(test)
        print(f"countBinarySubstrings('{test}') = result")

    # Demonstrate the logic
    print("\nDetailed example for '00110011':")
    s = "00110011"
    print(f"String: '{s}'")
    print("Groups: '00' (2), '11' (2), '00' (2), '11' (2)")
    print("\nValid substrings:")
    print("From '00' and '11': min(2,2)=2 → '01', '0011'")
    print("From '11' and '00': min(2,2)=2 → '10', '1100'")
    print("From '00' and '11': min(2,2)=2 → '01', '0011'")
    print(f"Total: {solution.countBinarySubstrings(s)}")
