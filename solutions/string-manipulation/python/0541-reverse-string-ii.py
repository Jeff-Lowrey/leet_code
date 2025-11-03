"""
# 0541. Reverse String Ii

# Difficulty: Easy

Given a string s and an integer k, reverse the first k characters for every 2k
characters counting from the start of the string.

If there are fewer than k characters left, reverse all of them.
If there are less than 2k but greater than or equal to k characters, then reverse
the first k characters and leave the other as original.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>s = "abcdefg", k = 2</dd>
<dt>Output:</dt>
<dd>bacdfeg"</dd>
<dt>Explanation:</dt>
<dd>Reverse first k=2 chars in each 2k group: 'abcdefg' becomes 'bacdfeg'</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Array, String, Tree
**Patterns**: Two Pointers Pattern, Hash Table Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(n)

### INTUITION:
We need to process the string in chunks of 2k characters. For each chunk, we reverse
the first k characters and leave the rest unchanged. This pattern repeats throughout
the string. The key is to iterate by steps of 2k and handle edge cases where fewer
characters remain.

### APPROACH:
1. **Convert to List**: Strings are immutable in Python, convert to list
2. **Iterate by 2k Steps**: Process string in chunks of 2k characters
3. **Reverse First k**: For each chunk, reverse the first k characters
4. **Handle Edge Cases**:
   - If < k characters left: reverse all
   - If k to 2k-1 characters left: reverse first k only
5. **Join Result**: Convert list back to string

### WHY THIS WORKS:
- Processing in 2k chunks ensures we reverse the right segments
- Two-pointer reversal is efficient and in-place
- Range with step=2k automatically handles chunking
- Edge cases are naturally handled by min(i+k, len(s))

### EXAMPLE WALKTHROUGH:
Input:
```
s = "abcdefg", k = 2
```

Chunks of 2k = 4:
1. i=0: Process chars[0:4] = "abcd"

Steps:
Step 1: - Reverse chars[0:2] = "ab" → "ba"
Step 2: - Result: "bacd"
Step 3: i=4: Process chars[4:8] = "efg"
Step 4: - Reverse chars[4:6] = "ef" → "fe"
Step 5: - Result: "feg"
Step 6: Final: "bacd" + "feg" = "bacdfeg"

Output:
```
"bacd"
```

### TIME COMPLEXITY:
O(n)
- Visit each character once during iteration
- Reversing k characters per 2k chunk is O(k) but amortized O(n)

### SPACE COMPLEXITY:
O(n)
- Converting string to list requires O(n) space
- Python strings are immutable, so this is necessary

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
"""

from typing import Any


class Solution:
    def reverseStr(self, s: str, k: int) -> str:
        """
        Reverse first k characters for every 2k characters.

        Args:
            s: Input string
            k: Reversal segment size

        Returns:
            String with alternating reversed segments

        Time Complexity: O(n) where n is length of string
        Space Complexity: O(n) for string to list conversion
        """
        # Convert to list for in-place modification
        chars = list(s)

        # Process in chunks of 2k
        for i in range(0, len(chars), 2 * k):
            # Reverse first k characters of this chunk
            left = i
            right = min(i + k - 1, len(chars) - 1)

            # Two-pointer reversal
            while left < right:
                chars[left], chars[right] = chars[right], chars[left]
                left += 1
                right -= 1

        return "".join(chars)

    def reverseStrSlicing(self, s: str, k: int) -> str:
        """
        Alternative using string slicing.

        Args:
            s: Input string
            k: Reversal segment size

        Returns:
            String with alternating reversed segments

        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        result: list[Any] = []

        for i in range(0, len(s), 2 * k):
            # Reverse the first k characters
            segment = s[i : i + k]
            result.append(segment[::-1])

            # Append the next k characters unchanged (if they exist)
            result.append(s[i + k : i + 2 * k])

        return "".join(result)

    def reverseStrVerbose(self, s: str, k: int) -> str:
        """
        More verbose implementation with explicit logic.

        Args:
            s: Input string
            k: Reversal segment size

        Returns:
            String with alternating reversed segments
        """
        if not s or k <= 0:
            return s

        chars = list(s)
        n = len(chars)

        # Process every 2k characters
        i = 0
        while i < n:
            # Calculate the end of the k-segment to reverse
            end = min(i + k, n)

            # Reverse the segment [i, end)
            left, right = i, end - 1
            while left < right:
                chars[left], chars[right] = chars[right], chars[left]
                left += 1
                right -= 1

            # Move to the next 2k chunk
            i += 2 * k

        return "".join(chars)

    def reverseStrRecursive(self, s: str, k: int) -> str:
        """
        Recursive implementation (less efficient).

        Args:
            s: Input string
            k: Reversal segment size

        Returns:
            String with alternating reversed segments
        """
        if len(s) < k:
            return s[::-1]

        if len(s) < 2 * k:
            return s[:k][::-1] + s[k:]

        # Reverse first k, keep next k, recurse on rest
        return s[:k][::-1] + s[k : 2 * k] + self.reverseStrRecursive(s[2 * k :], k)


def test_solution() -> None:
    """Test cases for Problem 541."""
    solution = Solution()

    # Test case 1: Standard case
    result1 = solution.reverseStr("abcdefg", 2)
    expected1 = "bacdfeg"
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Exact multiple of 2k
    result2 = solution.reverseStr("abcd", 2)
    expected2 = "bacd"
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Length less than k
    result3 = solution.reverseStr("abc", 5)
    expected3 = "cba"
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Length between k and 2k
    result4 = solution.reverseStr("abcdef", 2)
    expected4 = "bacdfe"
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: k = 1
    result5 = solution.reverseStr("abcdefg", 1)
    expected5 = "abcdefg"
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Single character
    result6 = solution.reverseStr("a", 2)
    expected6 = "a"
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test case 7: Larger k value
    result7 = solution.reverseStr("abcdefghij", 3)
    expected7 = "cbadefihgj"
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test slicing solution
    result8 = solution.reverseStrSlicing("abcdefg", 2)
    expected8 = "bacdfeg"
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    # Test verbose solution
    result9 = solution.reverseStrVerbose("abcd", 2)
    expected9 = "bacd"
    assert result9 == expected9, f"Expected {expected9}, got {result9}"

    # Test recursive solution
    result10 = solution.reverseStrRecursive("abcdefg", 2)
    expected10 = "bacdfeg"
    assert result10 == expected10, f"Expected {expected10}, got {result10}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 541. Reverse String II ===")

    test_cases = [("abcdefg", 2), ("abcd", 2), ("abc", 5), ("abcdefghij", 3), ("a", 2)]

    for s, k in test_cases:
        result = solution.reverseStr(s, k)
        print(f"reverseStr('{s}', {k}) = 'result'")

    # Demonstrate the logic
    print("\nStep-by-step for s='abcdefg', k=2:")
    s, k = "abcdefg", 2
    print(f"String: '{s}', k: {k}, 2k: {2 * k}")
    print("Chunk [0:4]: 'abcd' -> reverse first 2: 'bacd'")
    print("Chunk [4:8]: 'efg' -> reverse first 2: 'feg'")
    print(f"Result: '{solution.reverseStr(s, k)}'")
