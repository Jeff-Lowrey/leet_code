/**
 * ### METADATA:\n**Techniques**: Set-based Sequence Detection, Greedy Algorithm\n**Data Structures**: Set (Hash Set)\n**Time Complexity**: O(n)\n**Space Complexity**: O(n)\n\n### INTUITION:
 * Convert array to a set for O(1) lookups. Only start counting consecutive sequences from numbers where num-1 doesn't exist (the start of a sequence). This avoids redundant counting and achieves O(n) time since each number is visited at most twice.
 *
 * ### APPROACH:
 * 1. **Convert to set**: Create num_set from nums array for O(1) lookup time
 * 2. **Initialize longest streak**: Set longest_streak = 0 to track maximum consecutive sequence length
 * 3. **Iterate through set**: Loop through each number in num_set
 * 4. **Check sequence start**: For each num, verify if (num - 1) exists in set; skip if it does (not a sequence start)
 * 5. **Count consecutive numbers**: When num is a sequence start, initialize current_num = num and current_streak = 1
 * 6. **Extend sequence**: Use while loop to check if (current_num + 1) exists in set, incrementing current_num and current_streak
 * 7. **Update maximum**: Compare current_streak with longest_streak and update longest_streak if current is larger
 * 8. **Return result**: After processing all numbers, return longest_streak
 *
 * ### WHY THIS WORKS:
 * - This ensures that set conversion enables O(1) lookups, crucial for checking num-1 and num+1 efficiently
 * - This ensures that only starting from sequence beginnings (where num-1 doesn't exist) prevents redundant counting
 * - This ensures that each number visited at most twice: once in outer loop, once in inner while loop
 * - This ensures that this achieves O(n) time despite apparent nested loops - the key insight
 * - This ensures that set takes O(n) space but enables the linear time solution
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [100, 4, 200, 1, 3, 2]
 * ```
 *
 * Step 1: Convert to set
 * num_set = {100, 4, 200, 1, 3, 2}
 * Step 2: Check num=1 (no num-1=0 in set, so it's a sequence start)
 * current_num = 1, current_streak = 1
 *
 * Steps:
 * Step 1: 1+1=2 in set → current_streak = 2
 * Step 2: 2+1=3 in set → current_streak = 3
 * Step 3: 3+1=4 in set → current_streak = 4
 * Step 4: 4+1=5 not in set → stop
 * Step 5: longest_streak = 4
 * Step 6: Check num=2 (num-1=1 exists, skip)
 * Step 7: Check num=3 (num-1=2 exists, skip)
 * Step 8: Check num=4 (num-1=3 exists, skip)
 * Step 9: Check num=100 (no num-1=99, sequence start)
 * Step 10: current_streak = 1, no 101 in set
 * Step 11: Check num=200 (no num-1=199, sequence start)
 * Step 12: current_streak = 1, no 201 in set
 *
 * Output:
 * ```
 * 4 (sequence [1,2,3,4])
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)** - where n is the number of elements in the array. Although we have nested loops, each number is visited at most twice: once in the outer loop to check if it's a sequence start (checking if num-1 exists), and potentially once more as part of counting a sequence (in the inner while loop). The key insight is that the while loop only executes for numbers that are sequence starts, and each number can only be part of one sequence. Total operations: at most 2n lookups and iterations, giving us **O(2n)** = **O(n)**.
 *
 * ### SPACE COMPLEXITY:
 * O(n)** - where n is the number of elements in the array. We store all n unique numbers in the Set data structure. In the worst case where all numbers are unique, the Set contains n elements. Even with duplicates, we still need **O(n)** space to store the unique values. This is the dominant space usage, making our space complexity **O(n)**.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 *
 * */

class Solution {
  /**
   * Find the length of the longest consecutive sequence in an unsorted array.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  longestConsecutive(nums: number[]): number {
    if (!nums || nums.length === 0) {
      return 0;
    }

    // Convert list to set for O(1) lookup
    const numSet = new Set(nums);
    let longestStreak = 0;

    // Iterate through each number in the set
    for (const num of numSet) {
      // Only start counting sequences from the smallest number in the sequence
      // If num-1 exists, this isn't the start of a sequence
      if (!numSet.has(num - 1)) {
        let currentNum = num;
        let currentStreak = 1;

        // Count consecutive numbers
        while (numSet.has(currentNum + 1)) {
          currentNum++;
          currentStreak++;
        }

        // Update longest streak if current streak is longer
        longestStreak = Math.max(longestStreak, currentStreak);
      }
    }

    return longestStreak;
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1: Example from problem
  const result1 = solution.longestConsecutive([100, 4, 200, 1, 3, 2]);
  const expected1 = 4;
  console.log(`Test 1: ${result1 === expected1 ? "PASS" : "FAIL"}`);
  console.log(`  Input: [100, 4, 200, 1, 3, 2]`);
  console.log(`  Expected: ${expected1}, Got: ${result1}`);

  // Test case 2: Empty input
  const result2 = solution.longestConsecutive([]);
  const expected2 = 0;
  console.log(`Test 2: ${result2 === expected2 ? "PASS" : "FAIL"}`);
  console.log(`  Input: []`);
  console.log(`  Expected: ${expected2}, Got: ${result2}`);

  // Test case 3: Single element
  const result3 = solution.longestConsecutive([1]);
  const expected3 = 1;
  console.log(`Test 3: ${result3 === expected3 ? "PASS" : "FAIL"}`);
  console.log(`  Input: [1]`);
  console.log(`  Expected: ${expected3}, Got: ${result3}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
