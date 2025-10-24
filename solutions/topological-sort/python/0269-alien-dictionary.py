"""
# Difficulty: Medium

# 0269. Alien Dictionary

There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you.

You are given a list of strings words from the alien language's dictionary, where the strings in words are sorted lexicographically by the rules of this new language.

Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If there is no solution, return "". If there are multiple solutions, return any of them.

A string s is lexicographically smaller than a string t if at the first letter where they differ, the letter in s comes before the letter in t in the alien language. If the first min(s.length, t.length) letters are the same, then s is smaller if and only if s.length < t.length.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>words = ["wrt","wrf","er","ett","rftt"]</dd>
<dt>Output:</dt>
<dd>"wertf"</dd>
<dt>Explanation:</dt>
<dd>Alien dictionary order from ['wrt','wrf','er','ett','rftt'] is 'wertf'</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Hash Table Pattern, Greedy Algorithm
**Time Complexity**: O(n) - Single pass with O(1) hash lookups
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Build graph from word pairs by comparing adjacent words. Find first different character to establish order. Perform topological sort using DFS or BFS. Detect cycles (impossible ordering).

### APPROACH:
1. **Build graph**: Compare adjacent words to find character ordering
2. **Track indegrees**: Count incoming edges for each character
3. **Initialize queue**: Add characters with indegree 0 to queue
4. **BFS traversal**: While queue not empty, dequeue character
5. **Add to result**: Append character to result
6. **Update neighbors**: For each neighbor, decrement indegree
7. **Add to queue**: If indegree becomes 0, add to queue
8. **Return result**: If all characters processed, return ''.join(result); else return ''

### WHY THIS WORKS:
- Build graph from adjacent word pairs: first differing char creates edge
- Topological sort on character DAG gives alien dictionary order
- If cycle detected (via DFS or indegree), no valid ordering exists
- Invalid case: word1 longer than word2 but word1 prefix of word2
- O(n * k) time: n words, k avg length, O(1) space for alphabet-size graph

### EXAMPLE WALKTHROUGH:
Input:
```
words = ["wrt","wrf","er","ett","rftt"]
```

Step 1: Build graph from word pairs

Steps:
Step 1: "wrt" vs "wrf": t→f
Step 2: "wrf" vs "er": w→e
Step 3: "er" vs "ett": r→t
Step 4: "ett" vs "rftt": e→r
Step 5: Topological sort
Step 6: Order: w→e→r→t→f

Output:
```
"wertf"
```

### TIME COMPLEXITY:
Based on the algorithm implementation


### SPACE COMPLEXITY:
Based on auxiliary data structures used


### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

from collections import defaultdict, deque

from typing import Any, List, Optional, Dict, Tuple


class Solution:
    def alienOrder(self, words: List[str]) -> str:
        """
        Determines the order of characters in an alien alphabet based on given sorted words.
        Uses topological sorting to determine the character order.

        Args:
            words: List of strings sorted according to alien dictionary order

        Returns:
            String representing the order of characters in the alien alphabet,
            or empty string if no valid order exists
        """
        # Edge case: empty input
        if not words:
            return ""

        # Build adjacency list and track all unique characters
        adj: dict[Any, set[Any]] = defaultdict(set)
        chars = set("".join(words))

        # Build graph by comparing adjacent words
        for i in range(len(words) - 1):
            w1, w2 = words[i], words[i + 1]

            # Check for invalid case where a longer word comes before its prefix
            if len(w1) > len(w2) and w1[: len(w2)] == w2:
                return ""

            # Find first differing character and add edge to graph
            for c1, c2 in zip(w1, w2):
                if c1 != c2:
                    adj[c1].add(c2)
                    break

        # Track visited and currently processing nodes for cycle detection
        visited: dict[str, bool] = {}  # False = processing, True = processed
        result: list[Any] = []

        def dfs(char: str) -> bool:
            """
            Performs DFS traversal to detect cycles and build topological order.

            Args:
                char: Current character being processed

            Returns:
                Boolean indicating whether a cycle was detected
            """
            if char in visited:
                return visited[char]  # False indicates cycle

            visited[char] = False  # Mark as processing

            # Visit all neighbors
            for neighbor in adj[char]:
                if not dfs(neighbor):
                    return False

            visited[char] = True  # Mark as processed
            result.append(char)
            return True

        # Perform DFS for each character
        for char in chars:
            if char not in visited:
                if not dfs(char):
                    return ""  # Cycle detected

        # Return characters in reverse order (topological sort)
        return "".join(result[::-1])

    def alienOrder_bfs(self, words: List[str]) -> str:
        """
        Alternative implementation using BFS (Kahn's algorithm).

        Args:
            words: List of strings sorted according to alien dictionary order

        Returns:
            String representing the order of characters in the alien alphabet,
            or empty string if no valid order exists
        """
        # Build adjacency list and in-degree count
        adj: dict[str, set[str]] = defaultdict(set)
        in_degree: dict[Any, int] = defaultdict(int)
        chars = set("".join(words))

        # Initialize in-degree for all characters
        for char in chars:
            in_degree[char] = 0

        # Build graph
        for i in range(len(words) - 1):
            w1, w2 = words[i], words[i + 1]

            # Check invalid case
            if len(w1) > len(w2) and w1[: len(w2)] == w2:
                return ""

            # Add edges and update in-degree
            for c1, c2 in zip(w1, w2):
                if c1 != c2:
                    if c2 not in adj[c1]:
                        adj[c1].add(c2)
                        in_degree[c2] += 1
                    break

        # Initialize queue with nodes having 0 in-degree
        queue = deque([c for c in chars if in_degree[c] == 0])
        result = []

        # Process queue
        while queue:
            char = queue.popleft()
            result.append(char)

            # Update in-degree of neighbors
            for neighbor in adj[char]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)

        # Check if all characters were processed
        return "".join(result) if len(result) == len(chars) else ""


# Example usage


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.alienOrder(["wrt", "wrf", "er", "ett", "rftt"])
    expected = "wertf"
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Invalid (prefix longer than word)
    result = solution.alienOrder(["abc", "ab"])
    expected = ""
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Single word
    result = solution.alienOrder(["z", "x"])
    expected = "zx"
    assert result == expected, f"Expected expected, got result"

    # Test case 4: Empty input
    result = solution.alienOrder([])
    expected = ""
    assert result == expected, f"Expected expected, got result"

    # Test case 5: BFS version
    result = solution.alienOrder_bfs(["wrt", "wrf", "er", "ett", "rftt"])
    expected = "wertf"
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 269. Alien Dictionary")
