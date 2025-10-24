"""
# Difficulty: Medium

# 131. Palindrome Partitioning

Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>s = "aab"</dd>
<dt>Output:</dt>
<dd>[["a","a","b"],["aa","b"]]</dd>
<dt>Explanation:</dt>
<dd>All palindrome partitions of 'aab' are [['a','a','b'], ['aa','b']]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Array, String
**Patterns**: Two Pointers Pattern, Dynamic Programming
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
At each position, try all possible substrings starting from that position. If a substring is a palindrome, add it to the current partition and recursively partition the remaining string. Backtrack by removing the last substring. This explores all valid palindrome partitions.

### APPROACH:
1. **Define isPalindrome helper**: Create function to check if substring s[left:right+1] is a palindrome
2. **Initialize result**: Create empty result list and current partition list
3. **Define backtrack function**: Create recursive function with parameter start (current position in string)
# 4. **Base case**: If start == len(s), add copy of current partition to result and return  # Result undefined
5. **Try all substrings**: Loop from start to end of string with end index
6. **Check palindrome**: If s[start:end+1] is palindrome, add it to current partition
7. **Recurse**: Call backtrack(end+1) to partition remaining string
8. **Backtrack**: Remove last substring from current partition to try other partitions

### WHY THIS WORKS:
- Backtracking tries all possible partition points
- At each position, try cutting at every valid palindrome ending
- Precompute palindrome DP table: O(n^2) preprocessing for O(1) checks
- When reaching end, found valid partitioning
- O(n * 2^n) time: 2^n partitions, O(n) to check/copy each

### EXAMPLE WALKTHROUGH:
Input:
```
s = "aab"
```

Step 1: Start backtracking from index 0

Steps:
Step 1: Try substring "a" (palindrome) → recurse from index 1
Step 2: Try substring "a" (palindrome) → recurse from index 2
Step 3: Try substring "b" (palindrome) → end of string
Step 4: Found partition: ["a", "a", "b"]
Step 5: Try substring "ab" (not palindrome) → skip
Step 6: Try substring "aa" (palindrome) → recurse from index 2
Step 7: Try substring "b" (palindrome) → end of string
Step 8: Found partition: ["aa", "b"]
Step 9: Try substring "aab" (not palindrome) → skip

Output:
```
[["a","a","b"],["aa","b"]]
```

### TIME COMPLEXITY:
O(n)

### SPACE COMPLEXITY:
O(1)

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

from typing import Any, List, Optional, Dict, Tuple


class Solution:
    def partition(self, s: str) -> List[List[str]]:
        """
        Finds all possible palindrome partitions of the input string.

        Args:
            s: Input string to be partitioned

        Returns:
            List of lists containing all possible palindrome partitions
        """

        def is_palindrome(start: int, end: int) -> bool:
            """
            Helper function to check if substring is palindrome.

            Args:
                start: Starting index of substring
                end: Ending index of substring

            Returns:
                True if substring is palindrome, False otherwise
            """
            while start < end:
                if s[start] != s[end]:
                    return False
                start += 1
                end -= 1
            return True

        def backtrack(start: int, current_partition: List[str]) -> None:
            """
            Recursive backtracking function to find all palindrome partitions.

            Args:
                start: Starting index for current partition
                current_partition: Current partition being built
            """
            # If we've reached the end of the string, we've found a valid partition
            if start >= len(s):
                result.append(current_partition[:])
                return

            # Try all possible substrings starting from current position
            for end in range(start, len(s)):
                # If current substring is palindrome, include it and recurse
                if is_palindrome(start, end):
                    current_partition.append(s[start : end + 1])
                    backtrack(end + 1, current_partition)
                    current_partition.pop()  # Backtrack

        result: list[Any] = []
        backtrack(0, [])
        return result


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.partition("aab")
    expected = [["a", "a", "b"], ["aa", "b"]]
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.partition([])  # type: ignore
    expected: list[list[str]] = [[]]
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Single element
    result = solution.partition([1])  # type: ignore
    expected = [[[1]]]
    assert result == expected, f"Expected expected, got result"  # type: ignore

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 131. Palindrome Partitioning")
