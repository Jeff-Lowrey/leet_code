"""
# 621. Task Scheduler
**Medium**

Given a problem that demonstrates key concepts in Heap.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of heap concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply heap methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages heap principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(1)

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses heap techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using heap method
3. Return the computed result

</details>
"""

import heapq
from collections import Counter, deque
from typing import List


class Solution:
    def leastInterval(self, tasks: List[str], n: int) -> int:
        """
        Calculate minimum intervals needed to complete all tasks with cooldown.

        Args:
            tasks: List of task names
            n: Cooldown period between same tasks

        Returns:
            Minimum number of intervals required

        Time Complexity: O(m * log k) where m is total tasks, k is unique tasks
        Space Complexity: O(k) where k is unique tasks (at most 26)
        """
        # Count frequency of each task
        count = Counter(tasks)

        # Max heap of task frequencies (use negative for max heap)
        max_heap = [-cnt for cnt in count.values()]
        heapq.heapify(max_heap)

        # Queue to track tasks in cooldown: (count, time_available)
        queue = deque()

        time = 0

        while max_heap or queue:
            time += 1

            if max_heap:
                # Process the most frequent task
                cnt = heapq.heappop(max_heap)
                cnt += 1  # Decrement count (it's negative)

                if cnt != 0:
                    # Task still has remaining instances
                    # Add to queue with time when it can be used again
                    queue.append((cnt, time + n))

            # Check if any task in cooldown is ready
            if queue and queue[0][1] == time:
                cnt, _ = queue.popleft()
                heapq.heappush(max_heap, cnt)

        return time

    def solve(self, *args):
        """
        Main solution for 621. Task Scheduler.

        Args:
            *args: Problem-specific arguments

        Returns:
            Minimum intervals needed

        Time Complexity: O(m * log k)
        Space Complexity: O(k)
        """
        return self.leastInterval(*args)


def test_solution():
    """
    Test cases for 621. Task Scheduler.
    """
    solution = Solution()

    # Test case 1: Basic functionality
    result = solution.leastInterval(["A", "A", "A", "B", "B", "B"], 2)
    expected = 8
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: No cooldown needed
    result = solution.leastInterval(["A", "A", "A", "B", "B", "B"], 0)
    expected = 6
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Different task frequencies
    result = solution.leastInterval(["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], 2)
    expected = 16
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: Single task type
    result = solution.leastInterval(["A", "A", "A"], 2)
    expected = 7
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 5: Many different tasks
    result = solution.leastInterval(["A", "B", "C", "D", "E", "F"], 2)
    expected = 6
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 6: Single task
    result = solution.leastInterval(["A"], 5)
    expected = 1
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 621. Task Scheduler")
    tasks = ["A", "A", "A", "B", "B", "B"]
    n = 2
    print(f"Tasks: {tasks}, n={n} -> {solution.leastInterval(tasks, n)} intervals")
