/**
 * # 1282. Group the People Given the Group Size They Belong To
 *
 * Difficulty: Medium
 *
 * # Difficulty: Medium
 *
 * There are n people that are split into some unknown number of groups. Each person
 * is labeled with a unique ID from 0 to n - 1.
 *
 * You are given an integer array groupSizes, where groupSizes[i] is the size of the
 * group that person i is in. For example, if groupSizes[1] = 3, then person 1 must
 * be in a group of size 3.
 *
 * Return a list of groups such that each person i is in a group of size groupSizes[i].
 *
 * Each person should appear in exactly one group, and every person must be in a group.
 * If there are multiple answers, return any of them. It is guaranteed that there will
 * be at least one valid solution for the given input.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>groupSizes = [3,3,3,3,3,1,3]</dd>
 * <dt>Output:</dt>
 * <dd>[[5],[0,1,2],[3,4,6]]</dd>
 * <dt>Explanation:</dt>
 * <dd>Person 5 is in a group of size 1. Persons 0,1,2 form a group of size 3. Persons 3,4,6 form another group of size 3.</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Hash Table Grouping, Greedy Algorithm
 * **Data Structures**: Hash Map, Array
 * **Patterns**: Grouping Pattern, Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass through the array
 * **Space Complexity**: O(n) - Store groups in hash map
 *
 * ### INTUITION:
 * Use a hash map to collect people by their required group size. When a group
 * reaches its target size, add it to the result and start a new group for that size.
 *
 * ### APPROACH:
 * 1. **Create hash map**: Map group_size -> list of people needing that size
 * 2. **Iterate through people**: Add each person to their size's group
 * 3. **Check group completion**: When a group reaches its size, move it to result
 * 4. **Clear completed groups**: Reset the list for that size to start a new group
 *
 * ### WHY THIS WORKS:
 * - Greedy approach: forming groups as soon as they're complete is optimal
 * - Hash map groups people by their required group size efficiently
 * - No need to track which groups people belong to - just fill groups greedily
 * - Always produces a valid solution since input guarantees one exists
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * groupSizes = [3,3,3,3,3,1,3]
 * ```
 *
 * Step 1: Initialize groups map
 * groups = {}
 * Step 2: Process each person
 * Person 0 (size 3): groups[3] = [0]
 * Person 1 (size 3): groups[3] = [0, 1]
 *
 * Steps:
 * Step 1: Person 2 (size 3): groups[3] = [0, 1, 2] → Full! Add [0,1,2] to result
 * Step 2: Person 3 (size 3): groups[3] = [3]
 * Step 3: Person 4 (size 3): groups[3] = [3, 4]
 * Step 4: Person 5 (size 1): groups[1] = [5] → Full! Add [5] to result
 * Step 5: Person 6 (size 3): groups[3] = [3, 4, 6] → Full! Add [3,4,6] to result
 *
 * Output:
 * ```
 * [[0,1,2], [5], [3,4,6]]
 * ```

### TIME COMPLEXITY:
 * O(n) - Single pass through input array
 *
 * ### SPACE COMPLEXITY:
 * O(n) - Store all people in groups hash map
 *
 * ### EDGE CASES:
 * - **All same group size**: Create multiple groups of that size
 * - **All different sizes**: Each person in separate group
 * - **Single person**: Return [[0]]
 * - **Multiple valid solutions**: Any valid grouping is acceptable
 *
 * </details>
 */

class Solution {
  /**
   * Group people by their required group size.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  groupThePeople(groupSizes: number[]): number[][] {
    // Map: group_size -> list of people needing that size
    const groups = new Map<number, number[]>();
    const result: number[][] = [];

    for (let person = 0; person < groupSizes.length; person++) {
      const size = groupSizes[person];

      // Initialize array for this size if needed
      if (!groups.has(size)) {
        groups.set(size, []);
      }

      // Add person to their size's group
      groups.get(size)!.push(person);

      // If group is complete, add to result and reset
      if (groups.get(size)!.length === size) {
        result.push(groups.get(size)!);
        groups.set(size, []);
      }
    }

    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${JSON.stringify(solution.groupThePeople([3, 3, 3, 3, 3, 1, 3]))}`);
  // Expected: [[0,1,2],[3,4,6],[5]] or similar

  console.log(`Test 2: ${JSON.stringify(solution.groupThePeople([2, 1, 3, 3, 3, 2]))}`);
  // Expected: [[0,5],[1],[2,3,4]] or similar

  console.log(`Test 3: ${JSON.stringify(solution.groupThePeople([1]))}`);
  // Expected: [[0]]

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
