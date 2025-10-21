"""
# 1202. Smallest String With Swaps

# Difficulty: Medium

You are given a string s, and an array of pairs where pairs[i] = [a, b] indicates 2 indices
(0-indexed) that can be swapped. You can swap indices multiple times. Return the lexicographically
smallest string that s can be transformed to after using the swaps.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>s = "dcab", pairs = [[0,3],[1,2]]</dd>
<dt>Output:</dt>
<dd>bacd"</dd>
<dt>Explanation:</dt>
<dd>Smallest string after swapping characters in connected components</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Hash Table Pattern, Backtracking
**Time Complexity**: O(n log n + m α(n)) where m is pairs count
**Space Complexity**: O(n) - Additional hash map storage

### INTUITION:
Pairs form connected components via union-find. Within each component, indices can be
rearranged freely. Sort characters in each component and assign to sorted indices.

### APPROACH:
1. **Union-Find**: Group indices into connected components
2. **Collect**: For each component, gather indices and characters
3. **Sort**: Sort both indices and characters
4. **Assign**: Place sorted characters at sorted indices

### WHY THIS WORKS:
If indices are transitively swappable, they form a connected component where any
permutation is achievable. Lexicographically smallest = sort characters ascending.

### EXAMPLE WALKTHROUGH:
```
Input: s = "dcab", pairs = [[0,3],[1,2]]
Step 1: Union-find to group connected indices
  Groups: {0,3}, {1,2}

Step 2: Sort characters within each group
  Group {0,3}: 'd','b' → 'b','d'
  Group {1,2}: 'c','a' → 'a','c'

Output: "bacd"
```

### TIME COMPLEXITY:
O(n log n + m α(n)) where m is pairs count

### SPACE COMPLEXITY:
O(n)

### EDGE CASES:
- **No pairs given**: Return original string unchanged
- **Single character string**: Return as-is (no swaps possible)
- **All indices connected**: Sort entire string lexicographically
- **Multiple disconnected components**: Sort each component independently
- **Duplicate characters**: Sorting naturally handles duplicates correctly

</details>
"""

from collections import defaultdict
from typing import Any
import re


class UnionFind:
    """Union-Find (Disjoint Set Union) data structure."""

    def __init__(self, n: int) -> None:
        """Initialize with n elements."""
        self.parent = list(range(n))
        self.rank = [0] * n

    @property
    def components(self) -> int:
        """Return number of connected components."""
        return len(set(self.find(i) for i in range(len(self.parent))))

    def find(self, x: int) -> int:
        """Find root of element x with path compression."""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x: int, y: int) -> bool:
        """Union two sets. Returns True if they were in different sets."""
        px, py = self.find(x), self.find(y)
        if px == py:
            return False

        if self.rank[px] < self.rank[py]:
            self.parent[px] = py
        elif self.rank[px] > self.rank[py]:
            self.parent[py] = px
        else:
            self.parent[py] = px
            self.rank[px] += 1

        return True

    def connected(self, x: int, y: int) -> bool:
        """Check if two elements are in the same set."""
        return self.find(x) == self.find(y)


class Solution:
    def smallestStringWithSwaps(self, s: str, pairs: list[list[int]]) -> str:
        """
        Approach: Union-Find with sorting
        Time Complexity: O(n log n + m α(n))
        Space Complexity: O(n)
        """
        n = len(s)
        uf = UnionFind(n)

        # Build union-find structure
        for a, b in pairs:
            uf.union(a, b)

        # Group indices by component
        components: dict[Any, list[Any]] = defaultdict(list)
        for i in range(n):
            components[uf.find(i)].append(i)

        # Build result
        result = list(s)
        for indices in components.values():
            # Get characters at these indices
            chars = [s[i] for i in indices]
            # Sort both
            indices.sort()
            chars.sort()
            # Assign sorted characters to sorted indices
            for i, char in zip(indices, chars, strict=False):
                result[i] = char

        return "".join(result)


def test_solution() -> None:
    """Test cases for Problem 1202."""
    solution = Solution()

    # Test case 1: Example from problem
    assert solution.smallestStringWithSwaps("dcab", [[0, 3], [1, 2]]) == "bacd"
    print("Test case 1 passed")

    # Test case 2: All connected
    assert solution.smallestStringWithSwaps("dcab", [[0, 3], [1, 2], [0, 2]]) == "abcd"
    print("Test case 2 passed")

    # Test case 3: No pairs
    assert solution.smallestStringWithSwaps("abc", []) == "abc"
    print("Test case 3 passed")

    # Test case 4: Single character
    assert solution.smallestStringWithSwaps("a", []) == "a"
    print("Test case 4 passed")

    # Test case 5: Already sorted
    assert solution.smallestStringWithSwaps("abc", [[0, 1], [1, 2]]) == "abc"
    print("Test case 5 passed")

    # Test case 6: Reverse order
    assert solution.smallestStringWithSwaps("cba", [[0, 1], [1, 2]]) == "abc"
    print("Test case 6 passed")

    # Test case 7: Multiple components
    assert solution.smallestStringWithSwaps("dcab", [[0, 3]]) == "bcad"
    print("Test case 7 passed")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()
