"""
# Difficulty: Medium

# 0444. Sequence Reconstruction

Check whether the original sequence org can be uniquely reconstructed from the sequences in seqs. The org sequence is a permutation of the integers from 1 to n, with 1 ≤ n ≤ 10^4. Reconstruction means building a shortest common supersequence of the sequences in seqs (i.e., a shortest sequence so that all sequences in seqs are subsequences of it). Determine whether there is only one sequence that can be reconstructed from seqs and it is the org sequence.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[1, 2, 3]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>Sequence reconstruction validates if org is only supersequence</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Hash Table Pattern, Backtracking
**Time Complexity**: O(V + E)
**Space Complexity**: O(V + E)

### INTUITION:
This is a topological sort problem where we need to check if there's a unique topological ordering that matches the given original sequence. The key insight is that for a unique reconstruction, at each step of topological sort, there should be exactly one node with in-degree 0.

### APPROACH:
1. **Build graph**: Create adjacency list and in-degree count from seqs
2. **Validate sequences**: Ensure all pairs in seqs appear consecutively in org
3. **Check uniqueness**: Use topological sort with the constraint that at each step, only one node has in-degree 0
4. **Verify order**: The topological order must match org exactly

### WHY THIS WORKS:
- Topological sort gives us the dependency order
- Unique reconstruction means at each step, only one choice exists
- If multiple nodes have in-degree 0 simultaneously, multiple valid orders exist
- We need to verify that the unique order matches the original sequence

This solution uses hash table lookup for efficient implementation.

This solution uses hash map storage for efficient implementation.

This solution uses set operations for efficient implementation.
### EXAMPLE WALKTHROUGH:
Given input [1, 2, 3]:

Input:
```
[1, 2, 3]
```

Input:
```
org = [1,2,3], seqs = [[1,2],[1,3],[2,3]]
```

Build graph from seqs:
Topological sort:

Steps:
Step 1: 1 -> [2, 3]
Step 2: 2 -> [3]
Step 3: 3 -> []
Step 4: In-degrees: {1: 0, 2: 1, 3: 2}
Step 5: Only node 1 has in-degree 0 → process 1, reduce in-degrees of 2,3
Step 6: Only node 2 has in-degree 0 → process 2, reduce in-degree of 3
Step 7: Only node 3 has in-degree 0 → process 3
Step 8: Result: [1,2,3] matches org → True

Output:
```
[1,2,3] matches org → True
```

### TIME COMPLEXITY:
O(V + E)
Where V is number of nodes (n) and E is total number of edges from seqs

### SPACE COMPLEXITY:
O(V + E)
For the graph representation and auxiliary data structures

### EDGE CASES:
- **Unique topological order**: Only one valid sequence exists
- **Multiple valid orders**: Return false (ambiguous)
- **Cycle in graph**: No topological order exists, return false
- **Sequence doesn't match order**: Return false
- **Single course**: Trivially valid, return true

</details>
"""

from typing import Any


class Solution:
    def sequenceReconstruction(self, org: list[int], seqs: list[list[int]]) -> bool:
        """
        Check if org can be uniquely reconstructed from seqs using topological sort.

        Args:
            org: Original sequence (permutation of 1 to n)
            seqs: List of subsequences

        Returns:
            True if org is the unique reconstruction, False otherwise

        Time Complexity: O(V + E) where V=len(org), E=total edges from seqs
        Space Complexity: O(V + E) for graph and auxiliary structures
        """
        n = len(org)
        if n == 0:
            return not seqs or all(not seq for seq in seqs)

        # Check if org is a valid permutation of 1 to n
        if set(org) != set(range(1, n + 1)):
            return False

        # Build graph and in-degree count
        graph: dict[int, list[int]] = {i: [] for i in range(1, n + 1)}
        in_degree = {i: 0 for i in range(1, n + 1)}

        # Validate seqs and build graph
        seen_pairs: set[Any] = set()

        for seq in seqs:
            if not seq:
                continue

            # Check if all numbers in seq are valid (1 to n)
            for num in seq:
                if num < 1 or num > n:
                    return False

            # Add edges for consecutive pairs
            for i in range(len(seq) - 1):
                u, v = seq[i], seq[i + 1]
                if (u, v) not in seen_pairs:
                    graph[u].append(v)
                    in_degree[v] += 1
                    seen_pairs.add((u, v))

        # Check if all consecutive pairs in org appear in seqs
        for i in range(len(org) - 1):
            if (org[i], org[i + 1]) not in seen_pairs:
                return False

        # Perform topological sort with uniqueness check
        queue: list[Any] = []
        result: list[Any] = []

        # Find initial nodes with in-degree 0
        for i in range(1, n + 1):
            if in_degree[i] == 0:
                queue.append(i)

        while queue:
            # For unique reconstruction, exactly one node should have in-degree 0
            if len(queue) != 1:
                return False

            node = queue.pop(0)
            result.append(node)

            # Reduce in-degree of neighbors
            for neighbor in graph[node]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)

        # Check if we processed all nodes and order matches org
        return len(result) == n and result == org

    def sequenceReconstructionAlternative(self, org: list[int], seqs: list[list[int]]) -> bool:
        """
        Alternative approach focusing on checking if org is the only valid order.

        Args:
            org: Original sequence
            seqs: List of subsequences

        Returns:
            True if org is uniquely reconstructible
        """
        n = len(org)
        if n == 0:
            return not seqs or all(not seq for seq in seqs)

        # Create position mapping for org
        pos = {num: i for i, num in enumerate(org)}

        # Validate that all numbers in seqs are in org
        for seq in seqs:
            for num in seq:
                if num not in pos:
                    return False

        # Track which consecutive pairs are covered
        pairs_needed = set((org[i], org[i + 1]) for i in range(n - 1))
        pairs_found: set[Any] = set()

        # Check seqs for validity and coverage
        for seq in seqs:
            for i in range(len(seq) - 1):
                u, v = seq[i], seq[i + 1]

                # Check if this pair maintains the order in org
                if pos[u] >= pos[v]:
                    return False

                pairs_found.add((u, v))

        # Check if all consecutive pairs in org are covered
        return pairs_needed <= pairs_found


def test_solution() -> None:
    """Test cases for Problem 444."""
    solution = Solution()

    # Test case 1: Can be uniquely reconstructed
    org1 = [1, 2, 3]
    seqs1 = [[1, 2], [1, 3], [2, 3]]
    result1 = solution.sequenceReconstruction(org1, seqs1)
    expected1 = True
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Cannot be uniquely reconstructed (ambiguous)
    org2 = [1, 2, 3]
    seqs2 = [[1, 2], [1, 3]]
    result2 = solution.sequenceReconstruction(org2, seqs2)
    expected2 = False  # Both [1,2,3] and [1,3,2] are valid
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Invalid sequence (wrong order)
    org3 = [1, 2, 3]
    seqs3 = [[1, 2], [1, 3], [3, 2]]
    result3 = solution.sequenceReconstruction(org3, seqs3)
    expected3 = False  # [3,2] conflicts with org order
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Single element
    org4 = [1]
    seqs4 = [[1]]
    result4 = solution.sequenceReconstruction(org4, seqs4)
    expected4 = True
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Empty sequences
    org5 = [1]
    seqs5: list[Any] = []
    result5 = solution.sequenceReconstruction(org5, seqs5)
    expected5 = False  # No information to reconstruct
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Missing pairs
    org6 = [1, 2, 3]
    seqs6 = [[1, 2]]
    result6 = solution.sequenceReconstruction(org6, seqs6)
    expected6 = False  # Missing pair (2,3)
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test case 7: Complete coverage with unique order
    org7 = [4, 1, 5, 2, 6, 3]
    seqs7 = [[5, 2, 6, 3], [4, 1, 5, 2]]
    result7 = solution.sequenceReconstruction(org7, seqs7)
    expected7 = True
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test alternative approach
    result8 = solution.sequenceReconstructionAlternative(org1, seqs1)
    assert result8 == expected1, f"Alternative: Expected {expected1}, got {result8}"

    result9 = solution.sequenceReconstructionAlternative(org2, seqs2)
    assert result9 == expected2, f"Alternative: Expected {expected2}, got {result9}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 444. Sequence Reconstruction ===")

    # Example 1: Unique reconstruction possible
    org1 = [1, 2, 3]
    seqs1 = [[1, 2], [1, 3], [2, 3]]
    result1 = solution.sequenceReconstruction(org1, seqs1)
    print(f"sequenceReconstruction({org1}, {seqs1}) -> {result1}")
    print("Explanation: [1,2], [1,3], [2,3] → 1 must come first, then 2, then 3")

    # Example 2: Ambiguous reconstruction
    org2 = [1, 2, 3]
    seqs2 = [[1, 2], [1, 3]]
    result2 = solution.sequenceReconstruction(org2, seqs2)
    print(f"\nsequenceReconstruction({org2}, {seqs2}) -> {result2}")
    print("Explanation: Both [1,2,3] and [1,3,2] are valid reconstructions")

    # Example 3: Invalid reconstruction
    org3 = [1, 2, 3]
    seqs3 = [[1, 2], [1, 3], [3, 2]]
    result3 = solution.sequenceReconstruction(org3, seqs3)
    print(f"\nsequenceReconstruction({org3}, {seqs3}) -> {result3}")
    print("Explanation: [3,2] conflicts with required order in org")

    print(f"\nKey insights:")
    print(f"1. Build dependency graph from consecutive pairs in seqs")
    print(f"2. Use topological sort to check unique ordering")
    print(f"3. At each step, exactly one node should have in-degree 0")
    print(f"4. All consecutive pairs in org must appear in seqs")
    print(f"5. Final topological order must match org exactly")
