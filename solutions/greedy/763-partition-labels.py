"""
# Difficulty: Medium

# 763. Partition Labels

You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part.

Note that the partition is done so that after concatenating all the parts in order, the resultant string should be s.

Return a list of integers representing the size of these parts.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[1, 1, 1]</dd>
<dt>Output:</dt>
<dd>"Expected {expected}, got {result}"</dd>
<dt>Explanation:</dt>
<dd>String is partitioned into 2 parts: 'ababcbaca' + 'defegde'</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Each partition should end at the last occurrence of any character in it. Track last occurrence of each character. Extend partition end while current position hasn't passed last occurrence of all seen characters.

### APPROACH:
1. **Find last occurrence**: Create dict mapping each char to its last index in s
2. **Initialize variables**: Set start = 0, end = 0, result = []
3. **Iterate through string**: For i, char in enumerate(s)
4. **Update partition end**: end = max(end, last_occurrence[char])
5. **Check if partition complete**: If i == end, partition ends here
6. **Add partition size**: Append (end - start + 1) to result
7. **Start new partition**: Set start = i + 1
8. **Return result**: Return result list with partition sizes

### WHY THIS WORKS:
- Track last occurrence of each character
- Extend partition end to max last occurrence of chars seen so far
- When reach partition end, cut and start new partition
- Greedy: maximize partition size before cutting
- O(n) time: two passes, O(26) = O(1) space for last occurrence map

### EXAMPLE WALKTHROUGH:
```
Input: s = "ababcbacadefegdehijhklij"
Step 1: Record last occurrence of each character
  last = {'a':8, 'b':5, 'c':7, 'd':14, 'e':15, ...}

Step 2: Iterate and extend partition
  i=0, ch='a': end = max(0, 8) = 8
  i=1, ch='b': end = max(8, 5) = 8
  ...
  i=8: reached end → partition size = 9
  i=9, ch='c': end = 14
  ...

Output: [9,7,8] (partition sizes)
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
    def partitionLabels(self, s: str) -> List[int]:
        """
        Partitions the input string into as many parts as possible where each letter
        appears in at most one part.

        Args:
            s: Input string to be partitioned

        Returns:
            List of integers representing the lengths of the partitions

        Time Complexity: O(n) where n is the length of the input string
        Space Complexity: O(1) since we only use a fixed-size array for last_occurrence
        """
        if not s:
            return []

        # Store the last occurrence of each character
        last_occurrence: dict[Any, Any] = {}
        for i, char in enumerate(s):
            last_occurrence[char] = i

        partitions: list[Any] = []
        start = 0
        end = 0

        # Iterate through the string to find partitions
        for i, char in enumerate(s):
            # Update the end to be the maximum of current end and
            # the last occurrence of current character
            end = max(end, last_occurrence[char])

            # If we've reached the end of current partition
            if i == end:
                partitions.append(end - start + 1)
                start = i + 1

        return partitions


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Basic case
    result = solution.partitionLabels([1, 2, 3])  # type: ignore
    expected = [1, 1, 1]
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Empty input
    result = solution.partitionLabels([])  # type: ignore
    expected: list[Any] = []
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Single element
    result = solution.partitionLabels([1])  # type: ignore
    expected = [1]
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 763. Partition Labels")
