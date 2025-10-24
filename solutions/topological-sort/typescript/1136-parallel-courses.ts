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
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Hash Table Pattern, Graph Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 * 
 * ### INTUITION:
 * Build graph and calculate in-degrees. Use BFS starting from nodes with in-degree 0. Process courses level by level (semester by semester). Track maximum semester count needed.
 * 
 * ### APPROACH:
 * 1. **Build graph and indegrees**: Create adjacency list and indegree array
 * 2. **Initialize queue**: Add all courses with indegree 0 to queue
 * 3. **Initialize semester**: Set semester = 0
 * 4. **Process by level**: While queue not empty, process all courses at current level
 * 5. **Increment semester**: semester += 1 for each level
 * 6. **Update neighbors**: For each neighbor, decrement indegree, add to queue if 0
 * 7. **Check completion**: If processed < n courses, cycle exists, return -1
 * 8. **Return result**: Return semester
 * 
 * ### WHY THIS WORKS:
 * - Topological sort with BFS, track depth (semester number)
 * - All courses at same level can be taken in parallel (same semester)
 * - Increment semester when level completes
 * - If can't complete all courses, return -1 (cycle)
 * - O(V + E) time, O(V + E) space
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * n = 3, relations = [[1,3],[2,3]]
 * ```
 *
 * Step 1: Build graph and indegree
 * indegree = [0,0,2]
 * Step 2: Process courses level by level
 * Semester 1: courses 1,2 (indegree=0)
 * Semester 2: course 3 (after 1,2 complete)
 *
 * Output:
 * ```
 * 2 (minimum semesters)
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 * 
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 * 
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 * 
 * </details>
 */

class Solution {
  /**
   * Determines the minimum number of semesters needed to complete all courses.
   *
   *         Args:
   *             n: Number of courses (labeled from 1 to n)
   *             relations: List of prerequisite pairs [x,y] where x must be taken before y
   *
   *         Returns:
   *             Minimum number of semesters needed, or -1 if impossible
   */
  minimumSemesters(n: number, relations: any): number {
    // Implementation
    graph: dict.get(Any, list[Any)] = defaultdict(list)
    in_degree = [0] * (n + 1)  # +1 because courses are 1-indexed
    for prev, next in relations:
    graph.get(prev).append(next)
    in_degree.get(next) += 1
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
  console.log(`Solution for 1136. Parallel Courses`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;