/**
 * ### INTUITION:
 * The key insight is that use a hash map to collect people by their required group size. When a group
 * reaches its target size, add it to the result and start a new group for that size.
 *
 * ### APPROACH:
 * 1. **Convert array to set**: Transform the input array into a set data structure, which automatically removes all duplicate values
 * 2. **Compare lengths**: Calculate the length of both the original array and the newly created set
 * 3. **Detect duplicates**: If the lengths differ, duplicates existed in the original array (they were removed during set conversion)
 * 4. **Return result**: Return True if lengths differ (duplicates found), False if lengths match (all elements unique)
 * 5. **Alternative early termination**: For better average performance, iterate through array and add elements to a set one by one, returning True immediately when an element is already in the set
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
 *
 * ### TIME COMPLEXITY:
 * O(n)** - where n is the number of people in the groupSizes array. We make a single pass through the array (**O(n)**), and for each person we perform constant-time operations: hash map lookup/insertion (**O(1)**), appending to a list (**O(1)** amortized), and potentially moving a completed group to the result (**O(group_size)** but bounded by n total across all groups). Total: **O(n)** since each person is processed exactly once and added to exactly one result group.
 *
 * ### SPACE COMPLEXITY:
 * O(n)** - where n is the number of people. We use a hash map that stores at most n people across all group_size buckets (each person appears exactly once in the map). The result list also stores all n people organized into groups. Additional space includes temporary group lists in the hash map. Total: **O(n)** for hash map + **O(n)** for result = **O(n)**. This is optimal since we must return all n people in the output.
 *
 * ### EDGE CASES:
 * - **All same group size**: Create multiple groups of that size
 * - **All different sizes**: Each person in separate group
 * - **Single person**: Return [[0]]
 * - **Multiple valid solutions**: Any valid grouping is acceptable
 *
 * *
 * 
 *
 * */

class Solution {
  /**
   * Group people by their required group size.
   *
   * @param {number[]} groupSizes
   * @return {number[][]}
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  groupThePeople(groupSizes) {
    // Map: group_size -> list of people needing that size
    const groups = new Map();
    const result = [];

    for (let person = 0; person < groupSizes.length; person++) {
      const size = groupSizes[person];

      // Initialize array for this size if needed
      if (!groups.has(size)) {
        groups.set(size, []);
      }

      // Add person to their size's group
      groups.get(size).push(person);

      // If group is complete, add to result and reset
      if (groups.get(size).length === size) {
        result.push(groups.get(size));
        groups.set(size, []);
      }
    }

    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests() {
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
