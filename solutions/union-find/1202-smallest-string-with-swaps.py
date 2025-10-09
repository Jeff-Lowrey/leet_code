"""
# Difficulty: Medium

You are given a string s, and an array of pairs where pairs[i] = [a, b] indicates 2 indices
(0-indexed) that can be swapped. You can swap indices multiple times. Return the lexicographically
smallest string that s can be transformed to after using the swaps.

Example:
Input: s = "dcab", pairs = [[0,3],[1,2]]
Output: "bacd"
Explanation: Swap s[0] and s[3] → "bcad", then swap s[1] and s[2] → "bacd"

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

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

Input:
```
[example input]
```

**Step 1:** [description]

**Step 2:** [description]

### TIME COMPLEXITY:
O(n log n + m α(n)) where m is pairs count

### SPACE COMPLEXITY:
O(n)

### EDGE CASES:
- **[Edge case 1]:** [how it's handled]
- **[Edge case 2]:** [how it's handled]

</details>
"""

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
        components = defaultdict(list)
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
