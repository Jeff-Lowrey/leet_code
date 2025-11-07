/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * [This problem requires understanding of topological sort concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply topological sort methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - This ensures that the solution leverages topological sort principles
 * - This ensures that time complexity is optimized for the given constraints
 * - This ensures that space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
 * ```
 *
 * Step 1: Build graph
 *
 * Steps:
 * Step 1: 0 → [1,2], 1 → [3], 2 → [3]
 * Step 2: indegree = [0,1,1,2]
 * Step 3: Topological sort
 * Step 4: Take 0: update indegree, order=[0]
 * Step 5: Take 1,2: update indegree, order=[0,1,2]
 * Step 6: Take 3: order=[0,1,2,3]
 *
 * Output:
 * ```
 * [0,1,2,3]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)**
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - [Explanation of why this complexity]. The algorithm [describe the operation] which takes **O(n)** space.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 *
 * *
 */

/**
 * Main solution for Problem 210: Course Schedule II
 *
 * @param {number} numCourses - Total number of courses
 * @param {number[][]} prerequisites - Array of prerequisite pairs [a, b] where b must be taken before a
 * @return {number[]} - Ordering of courses or empty array if impossible
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
  const order = [];

  while (queue.length > 0) {
    const current = queue.shift();
    order.push(current);

    // Reduce in-degree for all neighbors
    for (const neighbor of graph[current]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  // If all courses are in order, return it; otherwise return empty array
  return order.length === numCourses ? order : [];
}

/**
 * Test cases for Problem 210: Course Schedule II
 */
function testSolution() {
  console.log("Testing 210. Course Schedule II");

  // Helper to check if result is valid
  const isValidOrder = (numCourses, prerequisites, order) => {
    if (order.length !== numCourses) return false;
    const position = new Map();
    order.forEach((course, idx) => position.set(course, idx));
    for (const [course, prereq] of prerequisites) {
      if (position.get(prereq) >= position.get(course)) return false;
    }
    return true;
  };

  // Test case 1: Basic linear dependency
  const result1 = solve(2, [[1, 0]]);
  console.assert(
    isValidOrder(2, [[1, 0]], result1),
    `Test 1 failed: invalid order ${result1}`,
  );

  // Test case 2: Cycle should return empty array
  const result2 = solve(2, [
    [1, 0],
    [0, 1],
  ]);
  console.assert(
    result2.length === 0,
    `Test 2 failed: expected [], got ${result2}`,
  );

  // Test case 3: No prerequisites
  const result3 = solve(3, []);
  console.assert(
    result3.length === 3,
    `Test 3 failed: expected length 3, got ${result3.length}`,
  );

  // Test case 4: Complex valid graph
  const result4 = solve(4, [
    [1, 0],
    [2, 0],
    [3, 1],
    [3, 2],
  ]);
  console.assert(
    isValidOrder(
      4,
      [
        [1, 0],
        [2, 0],
        [3, 1],
        [3, 2],
      ],
      result4,
    ),
    `Test 4 failed: invalid order ${result4}`,
  );

  console.log("All test cases passed for 210. Course Schedule II!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 210. Course Schedule Ii ===");
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
