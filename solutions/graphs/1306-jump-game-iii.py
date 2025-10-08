"""
1306. Jump Game III
Medium

Given an array of non-negative integers arr, you are initially positioned at start index.
When you are at index i, you can jump to i + arr[i] or i - arr[i], check if you can reach
any index with value 0.

Example:
Input: arr = [4,2,3,0,3,1,2], start = 5
Output: true
Explanation: Jump sequence: 5 → 4 → 1 → 3 (value is 0)

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This is a graph reachability problem. Each index is a node, and edges exist to indices
i+arr[i] and i-arr[i]. Use DFS or BFS to explore all reachable indices from start.

### APPROACH:
1. **Track visited**: Prevent infinite loops
2. **DFS/BFS**: Explore all reachable indices
3. **Check zero**: Return true if any visited index has value 0
4. **Bounds check**: Only jump to valid indices

### WHY THIS WORKS:
Since we mark visited indices, we explore each node once, avoiding cycles.
If any reachable node has value 0, we return true.

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(n) for visited set and recursion/queue

### EXAMPLE WALKTHROUGH:
```
arr = [4,2,3,0,3,1,2], start = 5
visited = {}

DFS(5): arr[5]=1
  - Jump to 5+1=6: DFS(6)
  - Jump to 5-1=4: DFS(4)

DFS(6): arr[6]=2
  - Jump to 6+2=8: out of bounds
  - Jump to 6-2=4: already visited

DFS(4): arr[4]=3
  - Jump to 4+3=7: out of bounds
  - Jump to 4-3=1: DFS(1)

DFS(1): arr[1]=2
  - Jump to 1+2=3: DFS(3)

DFS(3): arr[3]=0 → return true!
```

### ALTERNATIVE: BFS with queue for level-order exploration

</details>
"""

from collections import deque


class Solution:
    def canReach(self, arr: list[int], start: int) -> bool:
        """
        Approach: DFS with visited tracking
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        n = len(arr)
        visited: set[int] = set()

        def dfs(index: int) -> bool:
            # Base cases
            if index < 0 or index >= n or index in visited:
                return False

            if arr[index] == 0:
                return True

            # Mark as visited
            visited.add(index)

            # Try both jumps
            return dfs(index + arr[index]) or dfs(index - arr[index])

        return dfs(start)

    def canReachBFS(self, arr: list[int], start: int) -> bool:
        """
        Approach: BFS with queue
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        n = len(arr)
        visited = {start}
        queue = deque([start])

        while queue:
            index = queue.popleft()

            if arr[index] == 0:
                return True

            # Try both jumps
            for next_index in [index + arr[index], index - arr[index]]:
                if 0 <= next_index < n and next_index not in visited:
                    visited.add(next_index)
                    queue.append(next_index)

        return False

    def canReachIterative(self, arr: list[int], start: int) -> bool:
        """
        Approach: Iterative DFS with stack
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        n = len(arr)
        visited = set()
        stack = [start]

        while stack:
            index = stack.pop()

            if index < 0 or index >= n or index in visited:
                continue

            if arr[index] == 0:
                return True

            visited.add(index)
            stack.append(index + arr[index])
            stack.append(index - arr[index])

        return False


def test_solution() -> None:
    """Test cases for Problem 1306."""
    solution = Solution()

    # Test case 1: Example from problem
    assert solution.canReach([4, 2, 3, 0, 3, 1, 2], 5) is True
    assert solution.canReachBFS([4, 2, 3, 0, 3, 1, 2], 5) is True
    assert solution.canReachIterative([4, 2, 3, 0, 3, 1, 2], 5) is True
    print("Test case 1 passed: Can reach 0")

    # Test case 2: Cannot reach
    assert solution.canReach([4, 2, 3, 0, 3, 1, 2], 0) is True  # Start at 4, can reach 0
    print("Test case 2 passed: Different start position")

    # Test case 3: Cannot reach 0
    assert solution.canReach([3, 0, 2, 1, 2], 2) is False
    print("Test case 3 passed: Cannot reach 0")

    # Test case 4: Start at 0
    assert solution.canReach([0, 1], 0) is True
    print("Test case 4 passed: Start at 0")

    # Test case 5: Single element with 0
    assert solution.canReach([0], 0) is True
    print("Test case 5 passed: Single element 0")

    # Test case 6: Single element non-zero
    assert solution.canReach([1], 0) is False
    print("Test case 6 passed: Single non-zero element")

    # Test case 7: Cycle without reaching 0
    assert solution.canReach([1, 1, 1, 1], 0) is False
    print("Test case 7 passed: Cycle without 0")

    # Test case 8: Can reach through cycle
    assert solution.canReach([2, 0, 1], 0) is True
    print("Test case 8 passed: Reach through cycle")

    # Test case 9: Large jump
    assert solution.canReach([5, 1, 2, 0, 3], 0) is False  # Jump out of bounds
    print("Test case 9 passed: Large jump out of bounds")

    # Test case 10: Multiple zeros
    assert solution.canReach([0, 1, 0], 1) is True
    print("Test case 10 passed: Multiple zeros")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()
