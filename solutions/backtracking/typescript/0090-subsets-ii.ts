/**
 * ### METADATA:
 * **Techniques**: Backtracking, Sorting
 * **Data Structures**: Array, List
 * **Time Complexity**: O(2^n × n)
 * **Space Complexity**: O(n)
 *
 * ### INTUITION:
 * The key insight is that sort the array to group duplicates together. During backtracking, add the current subset at each step (not just at leaves). Skip duplicate elements at the same recursion level using the condition i > start and nums[i] == nums[i-1] to avoid duplicate subsets.
 *
 * ### APPROACH:
 * 1. **Sort array**: Sort nums to group duplicate elements together
 * 2. **Initialize result**: Create result list starting with empty subset [[]]
 * 3. **Define backtrack function**: Create recursive function with parameters (start, current)
 * 4. **Add current subset**: Append copy of current to result at each recursive call
 * 5. **Iterate from start**: Loop from start index to end of array
 * 6. **Skip duplicates**: If i > start and nums[i] == nums[i-1], continue to avoid duplicate subsets
 * 7. **Include element**: Add nums[i] to current, call backtrack(i+1, current)
 * 8. **Backtrack**: Remove last element from current to explore other possibilities
 *
 * ### WHY THIS WORKS:
 * - Sort array to group duplicates, enables skipping in backtracking
 * - At each level, if nums[i] == nums[i-1] and i > start, skip (avoid duplicate subsets)
 * - Backtracking tries including/excluding each element
 * - Every path is valid subset, even partial paths
 * - O(2^n * n) time: 2^n subsets, O(n) to copy each
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1,2,2]
 * ```
 *
 * Steps:
 * Step 1: Sort array → [1,2,2]
 * Step 2: Build subsets with backtracking
 * Step 3: Start with [] → add to result
 * Step 4: Try 1: [1] → add to result
 * Step 5: Try 2: [1,2] → add to result
 * Step 6: Try 2: [1,2,2] → add to result
 * Step 7: Skip duplicate 2
 * Step 8: Try first 2: [2] → add to result
 * Step 9: Try second 2: [2,2] → add to result
 * Step 10: Skip duplicate 2 (i=2, start=0, nums[2]==nums[1])
 *
 * Output:
 * ```
 * [[],[1],[1,2],[1,2,2],[2],[2,2]]
 * ```
 *
 * ### TIME COMPLEXITY:
 * **O(2^n × n)** - where n is the number of elements in the input array. We generate all possible subsets (the power set), which contains 2^n subsets (each element can be included or excluded). For each subset, we perform **O(n)** work to copy it to the result list. The sorting step takes **O(n log n)**, but this is dominated by the exponential subset generation. Duplicate skipping reduces the actual number of subsets when duplicates exist, but worst-case complexity remains **O(2^n × n)** when all elements are distinct. Total: **O(n log n)** + **O(2^n × n)** = **O(2^n × n)**.
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - where n is the number of elements in the input array. The recursion call stack can go as deep as n levels (we can include up to n elements in a subset). The current subset list grows from size 0 to size n in the worst case. The result list storing all subsets is not counted toward space complexity as it's required output. Sorting is done in-place. Total auxiliary space: **O(n)** for recursion stack + **O(n)** for current subset = **O(n)**.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 */

class Solution {
  /**
   * Generate all possible unique subsets of the input array.
   *
   * Time Complexity: O(2^n * n)
   * Space Complexity: O(n) for recursion depth
   */
  subsetsWithDup(nums: number[]): number[][] {
    // Sort the array to handle duplicates properly
    nums.sort((a, b) => a - b);
    const result: number[][] = [];

    const backtrack = (start: number, currentSubset: number[]): void => {
      // Add the current subset to result
      result.push([...currentSubset]);

      // Try adding each remaining number to current subset
      for (let i = start; i < nums.length; i++) {
        // Skip duplicates to avoid duplicate subsets
        if (i > start && nums[i] === nums[i - 1]) {
          continue;
        }

        // Include current number in subset
        currentSubset.push(nums[i]);
        // Recursively generate subsets with remaining elements
        backtrack(i + 1, currentSubset);
        // Backtrack by removing the last added element
        currentSubset.pop();
      }
    };

    // Start backtracking with empty subset
    backtrack(0, []);
    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.subsetsWithDup([1, 2, 2]);
  const expected1 = [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]];
  console.log(`Test 1: ${JSON.stringify(result1) === JSON.stringify(expected1) ? "PASS" : "FAIL"}`);

  const result2 = solution.subsetsWithDup([]);
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify([[]]) ? "PASS" : "FAIL"}`);

  const result3 = solution.subsetsWithDup([1]);
  console.log(`Test 3: ${JSON.stringify(result3) === JSON.stringify([[], [1]]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
