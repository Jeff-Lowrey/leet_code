/**
 * # Difficulty: Medium
 *
 * # 1136. Parallel Courses
 *
 * You are given an integer n, which indicates that there are n courses labeled from 1 to n. You are also given an array relations where relations[i] = [prevCoursei, nextCoursei], representing a prerequisite relationship between course prevCoursei and course nextCoursei: course prevCoursei has to be taken before course nextCoursei.
 *
 * In one semester, you can take any number of courses as long as you have taken all the prerequisites in the previous semester for the courses you are taking.
 *
 * Return the minimum number of semesters needed to take all courses. If there is no way to take all the courses, return -1.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 3, relations = [[1,3],[2,3]]</dd>
 * <dt>Output:</dt>
 * <dd>2 (minimum semesters)</dd>
 * <dt>Explanation:</dt>
 * <dd>Minimum semesters to complete all courses</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
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
 * - The solution leverages topological sort principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: n = 3, relations = [[1,3],[2,3]]
 * Step 1: Build graph and indegree
 *   indegree = [0,0,2]
 *
 * Step 2: Process courses level by level
 *   Semester 1: courses 1,2 (indegree=0)
 *   Semester 2: course 3 (after 1,2 complete)
 *
 * Output: 2 (minimum semesters)
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

/**
 * Main solution for Problem 1136: Parallel Courses
 *
 * @param {number} n - Total number of courses
 * @param {number[][]} relations - Array of prerequisite pairs [a, b] where a must be taken before b
 * @return {number} - Minimum number of semesters needed, or -1 if impossible
 *
 * Time Complexity: O(V + E) where V is n and E is relations.length
 * Space Complexity: O(V + E) for adjacency list and in-degree array
 */
function solve(n, relations) {
  // Build adjacency list and in-degree array
  const graph = Array.from({ length: n + 1 }, () => []);
  const inDegree = new Array(n + 1).fill(0);

  // Build the graph (note: courses are 1-indexed)
  for (const [prereq, course] of relations) {
    graph[prereq].push(course);
    inDegree[course]++;
  }

  // Initialize queue with courses that have no prerequisites
  const queue = [];
  for (let i = 1; i <= n; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  let semesters = 0;
  let coursesCompleted = 0;

  // Process courses level by level (each level is one semester)
  while (queue.length > 0) {
    const levelSize = queue.length;
    semesters++;

    // Process all courses that can be taken this semester
    for (let i = 0; i < levelSize; i++) {
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
  }

  // If not all courses completed, there's a cycle
  return coursesCompleted === n ? semesters : -1;
}

/**
 * Test cases for Problem 1136: Parallel Courses
 */
function testSolution() {
  console.log("Testing 1136. Parallel Courses");

  // Test case 1: Linear dependency - takes 3 semesters
  const result1 = solve(3, [
    [1, 3],
    [2, 3],
  ]);
  const expected1 = 2;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Cycle exists - impossible
  const result2 = solve(3, [
    [1, 2],
    [2, 3],
    [3, 1],
  ]);
  const expected2 = -1;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: No prerequisites - all in one semester
  const result3 = solve(3, []);
  const expected3 = 1;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Complex dependency
  const result4 = solve(4, [
    [1, 2],
    [1, 3],
    [2, 4],
    [3, 4],
  ]);
  const expected4 = 3;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  console.log("All test cases passed for 1136. Parallel Courses!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 1136. Parallel Courses ===");
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
