/**
 * # Difficulty: Medium
 *
 * There are a total of numCourses courses you have to take, labeled from 0 to `numCourses - 1`.
 * You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates
 * that you must take course bi first if you want to take course ai.
 *
 * Return true if you can finish all courses. Otherwise, return false.
 *
 * Example:
 * Input: `numCourses = 2`, prerequisites = [[1,0]]
 * Output: true
 * Explanation: There are a total of 2 courses to take. To take course 1 you should
 * have finished course 0. So it is possible.
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
 * Prerequisites: [[1,0], [2,1], [3,2]]
 * 1. Build graph: 0→1→2→3
 * 2. In-degrees: [0,1,1,1]
 * 3. Start with course 0 (in-degree 0)
 * 4. Take 0 → course 1 now has in-degree 0
 * 5. Take 1 → course 2 now has in-degree 0
 * 6. Continue until all courses taken
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

/**
 * Main solution for Problem 207: Course Schedule
 *
 * @param {number} numCourses - Total number of courses
 * @param {number[][]} prerequisites - Array of prerequisite pairs [a, b] where b must be taken before a
 * @return {boolean} - True if all courses can be completed, false otherwise
 *
 * Time Complexity: O(V + E) where V is numCourses and E is prerequisites.length
 * Space Complexity: O(V + E) for adjacency list and in-degree array
 */
function solve(numCourses, prerequisites) {
  // Build adjacency list and in-degree array
  const graph = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);

  // Build the graph
  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    inDegree[course]++;
  }

  // Initialize queue with courses that have no prerequisites
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  // Process courses using Kahn's algorithm
  let coursesCompleted = 0;

  while (queue.length > 0) {
    const current = queue.shift();
    coursesCompleted++;

    // Reduce in-degree for all neighbors
    for (const neighbor of graph[current]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  // If all courses completed, there's no cycle
  return coursesCompleted === numCourses;
}

/**
 * Test cases for Problem 207: Course Schedule
 */
function testSolution() {
  console.log("Testing 207. Course Schedule");

  // Test case 1: Valid course schedule (no cycle)
  const result1 = solve(2, [[1, 0]]);
  const expected1 = true;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Cycle detected
  const result2 = solve(2, [
    [1, 0],
    [0, 1],
  ]);
  const expected2 = false;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: No prerequisites
  const result3 = solve(3, []);
  const expected3 = true;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Linear dependency chain
  const result4 = solve(4, [
    [1, 0],
    [2, 1],
    [3, 2],
  ]);
  const expected4 = true;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Complex graph with cycle
  const result5 = solve(4, [
    [1, 0],
    [2, 1],
    [3, 2],
    [1, 3],
  ]);
  const expected5 = false;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 207. Course Schedule!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 207. Course Schedule ===");
  console.log("Category: Topological Sort");
  console.log("Difficulty: Medium");
  console.log("");

  // Example demonstration would go here
  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution focuses on topological sort concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
