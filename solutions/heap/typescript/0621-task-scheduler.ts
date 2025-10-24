/**
 * # Difficulty: Medium
 * 
 * # 621. Task Scheduler
 * 
 * Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.
 * 
 * However, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks.
 * 
 * Return the least number of units of times that the CPU will take to finish all the given tasks.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[(["A", "A", "A", "B", "B", "B"]</dd>
 * <dt>Output:</dt>
 * <dd>"\nTasks: {tasks}"</dd>
 * <dt>Explanation:</dt>
 * <dd>Minimum intervals to schedule tasks 'AAABBB' with n=2 is 8</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Array, String, Queue
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n × m)
 * **Space Complexity**: O(1) - Constant extra space
 * 
 * ### INTUITION:
 * Schedule most frequent tasks first to minimize idle time. Use max-heap to always pick the task with highest frequency. Track cooldown with a queue.
 * 
 * ### APPROACH:
 * 1. **Count frequencies**: Use Counter to get task frequencies
 * 2. **Max-heap**: Store negative frequencies (Python has min-heap)
 * 3. **Simulation**: For each time unit:
 *    - Pick most frequent available task
 *    - Decrease its count and add to cooldown queue
 *    - Process cooldown queue to return tasks to heap
 * 4. **Math formula**: Can also calculate directly using formula
 * 
 * ### WHY THIS WORKS:
 * - Most frequent tasks create the most idle time
 * - By scheduling them first with optimal spacing, we minimize total idle time
 * - Cooldown queue ensures we respect the n interval
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * tasks = ["A","A","A","B","B","B"], n = 2
 * ```
 *
 * Frequencies: A=3, B=3
 * Timeline:
 * Time 0: A (A left: 2, cooldown until time 3)
 * Time 1: B (B left: 2, cooldown until time 4)
 * Time 2: idle (nothing available)
 * Time 3: A (A left: 1, cooldown until time 6)
 * Time 4: B (B left: 1, cooldown until time 7)
 * Time 5: idle
 * Time 6: A (A done)
 * Time 7: B (B done)
 * Total: 8 units

### TIME COMPLEXITY:
 * O(n × m)
 * Where n = cooldown, m = number of tasks (simulation approach)
 * Math approach: O(m) where m = number of tasks
 * 
 * ### SPACE COMPLEXITY:
 * O(1)
 * At most 26 different tasks (letters)
 * 
 * ### EDGE CASES:
 * - n = 0 (no cooldown, return len(tasks))
 * - All tasks same
 * - All tasks different
 * - n very large
 * 
 * </details>
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