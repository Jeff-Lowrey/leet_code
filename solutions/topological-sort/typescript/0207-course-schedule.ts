/**
 * # 207. Course Schedule
 * 
 * # Difficulty: Medium
 * 
 * There are a total of numCourses courses you have to take, labeled from 0 to `numCourses - 1`.
 * You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates
 * that you must take course bi first if you want to take course ai.
 * 
 * Return true if you can finish all courses. Otherwise, return false.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>numCourses = 2`, prerequisites = [[1,0]]</dd>
 * <dt>Output:</dt>
 * <dd>true</dd>
 * <dt>Explanation:</dt>
 * <dd>Course schedule [0,1] means 0 depends on 1; can finish if no cycles</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Hash Table Pattern, Greedy Algorithm
 * **Time Complexity**: O(V + E)
 * **Space Complexity**: O(V + E)
 * 
 * ### INTUITION:
 * This is a cycle detection problem in a directed graph. If there's a cycle in the prerequisite dependencies, it's impossible to complete all courses. Topological sorting can detect cycles while finding a valid course order.
 * 
 * ### APPROACH:
 * 1. **Build adjacency list**: Create a graph where each prerequisite points to the courses that depend on it
 * 2. **Calculate in-degrees**: Count incoming edges for each course (number of prerequisites)
 * 3. **Initialize queue**: Add all courses with in-degree 0 (no prerequisites) to the queue
 * 4. **Process courses**: Dequeue a course, increment courses_taken counter
 * 5. **Update dependencies**: For each course that depends on the current course, decrement its in-degree
 * 6. **Add newly available courses**: If a course's in-degree becomes 0, add it to the queue (all prerequisites met)
 * 7. **Check completion**: Return true if courses_taken equals numCourses (all courses processed), false otherwise (cycle detected)
 * 
 * ### WHY THIS WORKS:
 * In a DAG (Directed Acyclic Graph), there's always at least one vertex with in-degree 0. By repeatedly removing such vertices, we can process all vertices if and only if there's no cycle.
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * numCourses = 4, prerequisites = [[1,0],[2,1],[3,2]]
 * ```
 *
 * Steps:
 * Step 1: Build graph → 0→1→2→3
 * Step 2: Calculate in-degrees → [0,1,1,1]
 * Step 3: Start with course 0 (in-degree 0) → add to queue
 * Step 4: Take course 0 → course 1 now has in-degree 0 → add to queue
 * Step 5: Take course 1 → course 2 now has in-degree 0 → add to queue
 * Step 6: Take course 2 → course 3 now has in-degree 0 → add to queue
 * Step 7: Take course 3 → all courses taken → return true
 *
 * Output:
 * ```
 * true
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(V + E)
 * 
 * ### SPACE COMPLEXITY:
 * O(V + E)
 * 
 * ### EDGE CASES:
 * - **No prerequisites**: All courses can be taken, return true
 * - **Self-loop**: Course depends on itself, cycle detected, return false
 * - **Circular dependency**: Cycle detection returns false
 * - **Linear chain**: No cycles, courses taken in topological order
 * - **Disconnected components**: Process each component separately
 * 
 * </details>
 */

class Solution {
  /**
   * Approach: Topological Sort using BFS (Kahn's Algorithm)
   *         Time Complexity: O(V + E)
   *         Space Complexity: O(V + E)
   */
  canFinish(numCourses: number, prerequisites: number[][]): boolean {
    // Implementation
    graph: dict.get(Any, list[Any)] = defaultdict(list)
    indegree = [0] * numCourses
    for course, prereq in prerequisites:
    graph.get(prereq).append(course)
    indegree.get(course) += 1
    queue = deque([i for i in range(numCourses) if indegree.set(i, = 0])
  }

  /**
   * Approach: DFS with cycle detection
   *         Time Complexity: O(V + E)
   *         Space Complexity: O(V + E)
   */
  canFinishDFS(numCourses: number, prerequisites: number[][]): boolean {
    // Implementation
    graph: dict.get(int, list[int)] = defaultdict(list)
    for course, prereq in prerequisites:
    graph.get(course).append(prereq)
    state = [0] * numCourses
    def has_cycle(course: Any) -> Any:
    if state.set(course, = 1:  # Currently visiting
    return true
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  # Test Course Schedule I
  solution = Solution()
  console.log("Course Schedule I:")
  test_cases = [(2, [[1, 0]]), (2, [[1, 0], [0, 1]]), (4, [[1, 0], [2, 0], [3, 1], [3, 2]])]
  for num_courses, prerequisites in test_cases:
  result = solution.canFinish(num_courses, prerequisites)
  console.log(`Courses: {num_courses}, Prerequisites: {prerequisites}`)
  console.log(`Can finish: result\n`)
  # Test Course Schedule II
  solution2 = SolutionScheduleII()
  console.log("Course Schedule II:")
  for num_courses, prerequisites in test_cases:
  order_result: list.set(int, solution2.findOrder(num_courses, prerequisites)
  console.log(`Courses: {num_courses}, Prerequisites: {prerequisites}`)
  console.log(`Order: {order_result}\n`)
  # Test Alien Dictionary
  solution_alien = SolutionAlienDictionary()
  console.log("Alien Dictionary:")
  alien_cases = [["wrt", "wrf", "er", "ett", "rftt"], ["z", "x"], ["z", "x", "z"], ["abc", "ab"]]
  for words in alien_cases:
  alien_result: str = solution_alien.alienOrder(words)
  console.log(`Words: {words}`)
  console.log(`Order: '{alien_result}'\n`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;