"""
### INTUITION:
The key insight is that build graph of richer relationships. Use DFS with memoization. For each person, recursively find quietest among all richer people. Cache results to avoid recomputation.

### APPROACH:
1. **Build graph**: Create adjacency list where graph[b].append(a) for [a,b] in richer
2. **Initialize answer**: Set answer = [-1] * n
3. **Define DFS**: Implement dfs(node) to find quietest person in richer-or-equal set
4. **Check memo**: If answer[node] != -1, return answer[node]
5. **Initialize with self**: Set answer[node] = node
6. **Explore richer people**: For each person in graph[node], compare quiet values
7. **Update if quieter**: If quiet[dfs(neighbor)] < quiet[answer[node]], update answer[node]
8. **Return result**: Return answer array

### WHY THIS WORKS:
- This ensures that build graph: richer[i] -> quieter[i] edge
- This ensures that dFS/BFS from each person, find quietest in reachable set
- This ensures that memoization: cache answer[x] to avoid recomputation
- This ensures that answer[x] = person with minimum quiet value reachable from x
- This ensures that o(n^2) worst case, O(n + e) with memoization, O(n + e) space

### EXAMPLE WALKTHROUGH:
Input:
```
richer = [[1,0],[2,1],[3,1],[3,7],[4,3],[5,3],[6,3]], quiet = [3,2,5,4,6,1,7,0]
```

Step 1: Build graph (richer relationships)
0 ← 1 ← 2
1 ← 3 ← 4,5,6
7 ← 3
Step 2: DFS to find quietest richer person
For person 0: check all richer (1,2,3,4,5,6,7)
Find quietest among them

Output:
```
[5,5,2,5,4,5,6,7]
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

"""

from collections import defaultdict

from typing import Any, List, Optional, Dict, Tuple


class Solution:
    def loudAndRich(self, richer: List[List[int]], quiet: List[int]) -> List[int]:
        """
        Solves the Loud and Rich problem using DFS approach.

        Args:
            richer: List of pairs [ai, bi] where ai is richer than bi
            quiet: List where quiet[i] is the quietness value of person i

        Returns:
            List where answer[i] is the least quiet person among all people who are
            at least as rich as person i
        """
        n = len(quiet)

        # Build adjacency graph: person -> list of people who are less rich
        graph: dict[Any, list[Any]] = defaultdict(list)
        for rich, poor in richer:
            graph[rich].append(poor)

        # Initialize answer array with -1 to mark as unprocessed
        answer = [-1] * n

        def dfs(person: int) -> int:
            """
            Depth-first search to find the least quiet person among all people
            who are at least as rich as the given person.

            Args:
                person: Current person being processed

            Returns:
                Index of the least quiet person
            """
            # If already processed, return cached result
            if answer[person] != -1:
                return answer[person]

            # Initialize with current person as least quiet
            min_quiet_person = person

            # Check all people who are less rich
            for poorer in graph[person]:
                # Recursively find least quiet person among poorer people
                candidate = dfs(poorer)
                # Update if we find someone quieter
                if quiet[candidate] < quiet[min_quiet_person]:
                    min_quiet_person = candidate

            # Cache and return result
            answer[person] = min_quiet_person
            return min_quiet_person

        # Process each person
        for person in range(n):
            if answer[person] == -1:
                dfs(person)

        return answer


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.loudAndRich([[1, 0], [2, 1], [3, 1], [3, 7], [4, 3], [5, 3], [6, 3]], [3, 2, 5, 4, 6, 1, 7, 0])
    expected = [5, 5, 2, 5, 4, 5, 6, 7]
    assert result == expected, f"Expected expected, got result"

    # Test case 2: No richer relationships
    result = solution.loudAndRich([], [0, 1, 2])
    expected = [0, 1, 2]
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Linear wealth hierarchy
    result = solution.loudAndRich([[1, 0], [2, 1]], [2, 1, 0])
    expected = [2, 2, 2]
    assert result == expected, f"Expected expected, got result"

    # Test case 4: Single person
    result = solution.loudAndRich([], [5])
    expected = [0]
    assert result == expected, f"Expected expected, got result"

    # Test case 5: Everyone richer than one person
    result = solution.loudAndRich([[0, 1], [2, 1]], [1, 0, 2])
    expected = [0, 1, 2]
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 851. Loud And Rich")
