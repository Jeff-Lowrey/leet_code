"""
### INTUITION:
The key insight is that sort pairs by end time. Use greedy similar to Activity Selection. Keep previous end, skip pairs that don't start after previous end. Count valid pairs.

### APPROACH:
1. **Sort by end**: Sort pairs by pair[1]
2. **Initialize variables**: Set count = 1, current_end = pairs[0][1]
3. **Iterate from second**: For each pair in pairs[1:]
4. **Check if chainable**: If pair_start > current_end, can extend chain
5. **Extend chain**: Increment count, update current_end = pair_end
6. **Continue processing**: Handle all pairs
7. **Return result**: Return count as maximum chain length

### WHY THIS WORKS:
- Sort pairs by end value (second element)
- Greedy: always pick pair with earliest end that doesn't overlap
- If current.start > last.end, add to chain
- Earliest end leaves maximum room for future pairs
- O(n log n) for sort, O(1) space, same logic as activity selection

### EXAMPLE WALKTHROUGH:
Input:
```
pairs = [[1,2],[2,3],[3,4]]
```

Step 1: Sort by second element
sorted = [[1,2],[2,3],[3,4]]
Step 2: Greedy selection
Select [1,2], end=2
[2,3]: 2 ≥ 2, skip
[3,4]: 3 > 2, select it, length=2

Output:
```
2 (maximum chain length)
```

### TIME COMPLEXITY:
**O(n)**
- Single pass through input

### SPACE COMPLEXITY:
**O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

"""

from typing import List, Optional, Dict, Tuple


class Solution:
    def findLongestChain(self, pairs: List[List[int]]) -> int:
        """
        Find the length of the longest chain that can be formed from the given pairs.
        A pair (a, b) can follow another pair (c, d) if b < c.

        Args:
            pairs: List of pairs where each pair is [a, b]

        Returns:
            int: Length of the longest possible chain
        """
        if not pairs:
            return 0

        # Sort pairs based on the second element
        # This greedy approach ensures we always pick pairs that give us maximum flexibility
        # for the next selection
        pairs.sort(key=lambda x: x[1])

        current_end = float("-inf")  # Track the end of current chain
        chain_length = 0  # Track the length of chain

        # Iterate through sorted pairs
        for start, end in pairs:
            # If current pair can be added to chain (start > previous end)
            if start > current_end:
                chain_length += 1
                current_end = end

        return chain_length


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.findLongestChain([[1, 2], [2, 3], [3, 4]])
    expected = 2
    assert result == expected, f"Expected expected, got result"

    # Test case 2: All can be chained
    result = solution.findLongestChain([[1, 2], [7, 8], [4, 5]])
    expected = 3
    assert result == expected, f"Expected expected, got result"

    # Test case 3: No chain possible (all overlap)
    result = solution.findLongestChain([[1, 5], [2, 3], [3, 4]])
    expected = 1
    assert result == expected, f"Expected expected, got result"

    # Test case 4: Empty input
    result = solution.findLongestChain([])
    expected = 0
    assert result == expected, f"Expected expected, got result"

    # Test case 5: Single pair
    result = solution.findLongestChain([[1, 2]])
    expected = 1
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 646. Maximum Length Of Pair Chain")
