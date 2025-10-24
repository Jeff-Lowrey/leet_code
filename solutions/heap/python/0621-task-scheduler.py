"""
# Difficulty: Medium

# 0621. Task Scheduler

Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

However, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks.

Return the least number of units of times that the CPU will take to finish all the given tasks.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[(["A", "A", "A", "B", "B", "B"]</dd>
<dt>Output:</dt>
<dd>"\nTasks: {tasks}"</dd>
<dt>Explanation:</dt>
<dd>Minimum intervals to schedule tasks 'AAABBB' with n=2 is 8</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Array, String, Queue
**Patterns**: Two Pointers Pattern, Hash Table Pattern
**Time Complexity**: O(n × m)
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Schedule most frequent tasks first to minimize idle time. Use max-heap to always pick the task with highest frequency. Track cooldown with a queue.

### APPROACH:
1. **Count frequencies**: Use Counter to get task frequencies
2. **Max-heap**: Store negative frequencies (Python has min-heap)
3. **Simulation**: For each time unit:
   - Pick most frequent available task
   - Decrease its count and add to cooldown queue
   - Process cooldown queue to return tasks to heap
4. **Math formula**: Can also calculate directly using formula

### WHY THIS WORKS:
- Most frequent tasks create the most idle time
- By scheduling them first with optimal spacing, we minimize total idle time
- Cooldown queue ensures we respect the n interval

### EXAMPLE WALKTHROUGH:
Input:
```
tasks = ["A","A","A","B","B","B"], n = 2
```

Frequencies: A=3, B=3
Timeline:
Time 0: A (A left: 2, cooldown until time 3)
Time 1: B (B left: 2, cooldown until time 4)
Time 2: idle (nothing available)
Time 3: A (A left: 1, cooldown until time 6)
Time 4: B (B left: 1, cooldown until time 7)
Time 5: idle
Time 6: A (A done)
Time 7: B (B done)
Total: 8 units

### TIME COMPLEXITY:
O(n × m)
Where n = cooldown, m = number of tasks (simulation approach)
Math approach: O(m) where m = number of tasks

### SPACE COMPLEXITY:
O(1)
At most 26 different tasks (letters)

### EDGE CASES:
- n = 0 (no cooldown, return len(tasks))
- All tasks same
- All tasks different
- n very large

</details>
"""

from collections import deque, Counter

import heapq
from typing import Any


class Interval:
    """Interval with start and end."""

    def __init__(self, start: Any = 0, end: Any = 0) -> None:
        self.start = start
        self.end = end


class Solution:
    def leastInterval(self, tasks: list[str], n: int) -> int:
        """
        Calculate minimum time using simulation with heap and queue.

        Args:
            tasks: List of task characters
            n: Cooldown period between same tasks

        Returns:
            Minimum time units needed

        Time Complexity: O(n × m) where m = len(tasks)
        Space Complexity: O(1) - at most 26 tasks
        """
        if n == 0:
            return len(tasks)

        # Count task frequencies
        freq = Counter(tasks)

        # Max-heap (negate for max-heap using min-heap)
        heap = [-count for count in freq.values()]
        heapq.heapify(heap)

        # Queue to track cooldown: (count, available_time)
        cooldown: deque[tuple[int, int]] = deque()

        time = 0

        while heap or cooldown:
            time += 1

            if heap:
                # Pick most frequent task
                count = heapq.heappop(heap)
                count += 1  # Decrement (was negative)

                if count != 0:
                    # Task still has instances, add to cooldown
                    cooldown.append((count, time + n))

            # Check if any task finished cooldown
            if cooldown and cooldown[0][1] == time:
                count, _ = cooldown.popleft()
                heapq.heappush(heap, count)

        return time

    def leastIntervalMath(self, tasks: list[str], n: int) -> int:
        """
        Calculate minimum time using mathematical formula.

        Args:
            tasks: List of task characters
            n: Cooldown period

        Returns:
            Minimum time units needed

        Time Complexity: O(m) where m = len(tasks)
        Space Complexity: O(1)
        """
        if n == 0:
            return len(tasks)

        # Count frequencies
        freq = Counter(tasks)
        max_freq = max(freq.values())

        # Count how many tasks have max frequency
        max_freq_count = sum(1 for count in freq.values() if count == max_freq)

        # Formula: (max_freq - 1) * (n + 1) + max_freq_count
        # This creates max_freq-1 "frames" of size n+1, plus final tasks
        intervals = (max_freq - 1) * (n + 1) + max_freq_count

        # If we have enough tasks to fill all slots, return len(tasks)
        return max(len(tasks), intervals)

    def leastIntervalVerbose(self, tasks: list[str], n: int) -> int:
        """
        Simulation with detailed tracking.

        Time Complexity: O(n × m)
        Space Complexity: O(1)
        """
        if n == 0:
            return len(tasks)

        freq = Counter(tasks)
        heap = [(-count, task) for task, count in freq.items()]
        heapq.heapify(heap)

        time = 0
        schedule: list[Any] = []

        while heap or len(schedule) > 0:
            time += 1

            # Check for tasks that finished cooldown
            available: list[Any] = []
            remaining: list[Any] = []
            for item in schedule:
                count, task, ready_time = item
                if ready_time <= time:
                    available.append((count, task))
                else:
                    remaining.append(item)
            schedule = remaining

            # Add available tasks back to heap
            for item in available:
                heapq.heappush(heap, item)

            if heap:
                # Execute most frequent task
                count, task = heapq.heappop(heap)
                count += 1  # Decrement (was negative)

                if count != 0:
                    # Add back to schedule with cooldown
                    schedule.append((count, task, time + n))
            # else: idle time

        return time


def test_solution() -> None:
    """Test cases for Problem 621."""
    solution = Solution()

    # Test case 1: Basic example
    assert solution.leastInterval(["A", "A", "A", "B", "B", "B"], 2) == 8
    print("Test case 1 passed")

    # Test case 2: No cooldown
    assert solution.leastInterval(["A", "A", "A", "B", "B", "B"], 0) == 6
    print("Test case 2 passed")

    # Test case 3: All same tasks
    assert solution.leastInterval(["A", "A", "A", "A"], 2) == 10
    print("Test case 3 passed")

    # Test case 4: All different tasks
    assert solution.leastInterval(["A", "B", "C", "D"], 2) == 4
    print("Test case 4 passed")

    # Test case 5: Complex example
    assert solution.leastInterval(["A", "A", "A", "B", "B", "B"], 50) == 104
    print("Test case 5 passed")

    # Test case 6: More tasks than idle slots
    result6 = solution.leastInterval(["A", "A", "A", "B", "B", "B", "C", "C", "C", "D", "D", "E"], 2)
    assert result6 == 12
    print("Test case 6 passed")

    # Test math formula approach
    assert solution.leastIntervalMath(["A", "A", "A", "B", "B", "B"], 2) == 8
    print("Test case 7 passed: Math formula")

    # Test verbose approach
    assert solution.leastIntervalVerbose(["A", "A", "A", "B", "B", "B"], 2) == 8
    print("Test case 8 passed: Verbose")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("\n=== 621. Task Scheduler ===")

    test_cases = [
        (["A", "A", "A", "B", "B", "B"], 2),
        (["A", "A", "A", "B", "B", "B"], 0),
        (["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], 2),
    ]

    for tasks, n in test_cases:
        result = solution.leastInterval(tasks, n)
        math_result = solution.leastIntervalMath(tasks, n)
        print(f"\nTasks: {tasks}")
        print(f"Cooldown: n")
        print(f"Simulation result: result")
        print(f"Math formula result: {math_result}")

    # Show scheduling example
    print("\n\nExample scheduling for ['A','A','A','B','B','B'], n=2:")
    print("Optimal: A -> B -> idle -> A -> B -> idle -> A -> B")
    print("Total: 8 time units")
