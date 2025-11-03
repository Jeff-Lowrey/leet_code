/**
### INTUITION:
The key insight is that schedule most frequent tasks first to minimize idle time. Use max-heap to always pick the task with highest frequency. Track cooldown with a queue.

### APPROACH:
Data structures: Array (tasks input), Queue (cooldown tracking), Heap (max-heap for frequency), Hash Map (Counter for frequencies)**
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

This solution uses hash table lookup for efficient implementation.

This solution uses hash map storage for efficient implementation.

This solution uses array traversal for efficient implementation.

The solution leverages string for efficient operations.

### EXAMPLE WALKTHROUGH:
Input:
```
tasks = ["A","A","A","B","B","B"], n = 2
```

Step 1:** Count frequencies
- Use Counter to get task frequencies
- Frequencies: {A: 3, B: 3}
- Both tasks appear 3 times each

Step 2:** Max-heap setup
- Store negative frequencies for max-heap: [-3, -3]
- Heap allows us to always pick most frequent available task

Step 3:** Simulation for each time unit
- **Time 0**: Pick A (freq=3), A remaining=2, add to cooldown queue (available at time 3)
- **Time 1**: Pick B (freq=3), B remaining=2, add to cooldown queue (available at time 4)
- **Time 2**: No tasks available (both in cooldown) → idle
- **Time 3**: A returns from cooldown (freq=2), pick A, A remaining=1, cooldown until time 6
- **Time 4**: B returns from cooldown (freq=2), pick B, B remaining=1, cooldown until time 7
- **Time 5**: No tasks available → idle
- **Time 6**: A returns from cooldown (freq=1), pick A, A done
- **Time 7**: B returns from cooldown (freq=1), pick B, B done
- Total time units: 8

Step 4:** Math formula alternative
- Max frequency: 3
- Formula: (maxFreq - 1) × (n + 1) + countOfMaxFreqTasks
- Calculation: (3 - 1) × (2 + 1) + 2 = 2 × 3 + 2 = 8
- Result matches simulation

Output:
```
8
```

### TIME COMPLEXITY:
O(n × m)**
Where n = cooldown, m = number of tasks (simulation approach)
Math approach: **O(m)** where m = number of tasks

### SPACE COMPLEXITY:
O(1)**
- Constant extra space
At most 26 different tasks (letters)

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

class Solution {
  /**
   * Calculate minimum time using simulation with heap and queue.
   *
   *         Args:
   *             tasks: List of task characters
   *             n: Cooldown period between same tasks
   *
   *         Returns:
   *             Minimum time units needed
   *
   *         Time Complexity: O(n × m) where m = len(tasks)
   *         Space Complexity: O(1) - at most 26 tasks
   */
  leastInterval(tasks: string[], n: number): number {
    // Implementation
    if n == 0:
    return tasks.length
    freq = Counter(tasks)
    heap = [-count for count in freq.values()]
    heapq.heapify(heap)
  }

  /**
   * Calculate minimum time using mathematical formula.
   *
   *         Args:
   *             tasks: List of task characters
   *             n: Cooldown period
   *
   *         Returns:
   *             Minimum time units needed
   *
   *         Time Complexity: O(m) where m = len(tasks)
   *         Space Complexity: O(1)
   */
  leastIntervalMath(tasks: string[], n: number): number {
    // Implementation
    if n == 0:
    return tasks.length
    freq = Counter(tasks)
    max_freq = max(freq.values())
    max_freq_count = sum(1 for count in freq.values() if count == max_freq)
  }

  /**
   * Simulation with detailed tracking.
   *
   *         Time Complexity: O(n × m)
   *         Space Complexity: O(1)
   */
  leastIntervalVerbose(tasks: string[], n: number): number {
    // Implementation
    if n == 0:
    return tasks.length
    freq = Counter(tasks)
    heap = [(-count, task) for task, count in freq.items()]
    heapq.heapify(heap)
    time = 0
    schedule: list.set(Any, []
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  test_solution()
  # Example usage
  solution = Solution()
  console.log("\n=== 621. Task Scheduler ===")
  test_cases = [
  (["A", "A", "A", "B", "B", "B"], 2),
  (["A", "A", "A", "B", "B", "B"], 0),
  (["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], 2),
  ]
  for tasks, n in test_cases:
  result = solution.leastInterval(tasks, n)
  math_result = solution.leastIntervalMath(tasks, n)
  console.log(`\nTasks: {tasks}`)
  console.log(`Cooldown: n`)
  console.log(`Simulation result: result`)
  console.log(`Math formula result: {math_result}`)
  # Show scheduling example
  console.log("\n\nExample scheduling for ['A','A','A','B','B','B'], n=2:")
  console.log("Optimal: A -> B -> idle -> A -> B -> idle -> A -> B")
  console.log("Total: 8 time units")
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;