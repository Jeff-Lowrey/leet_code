/**
 * ### METADATA:\n**Techniques**: Boyer-Moore Voting Algorithm\n**Data Structures**: Counter Variable\n**Time Complexity**: O(n)\n**Space Complexity**: O(1)\n\n### INTUITION:
 * Since the majority element appears more than n/2 times, it will always "survive" any cancellation process. The Boyer-Moore voting algorithm leverages this by maintaining a candidate and count, canceling out different elements.
 *
 * ### APPROACH:
 * 1. **Convert array to set**: Transform the input array into a set data structure, which automatically removes all duplicate values
 * 2. **Compare lengths**: Calculate the length of both the original array and the newly created set
 * 3. **Detect duplicates**: If the lengths differ, duplicates existed in the original array (they were removed during set conversion)
 * 4. **Return result**: Return True if lengths differ (duplicates found), False if lengths match (all elements unique)
 * 5. **Alternative early termination**: For better average performance, iterate through array and add elements to a set one by one, returning True immediately when an element is already in the set
 *
 * ### WHY THIS WORKS:
 * - Majority element appears > n/2 times
 * - Non-majority elements can at most cancel out n/2 occurrences
 * - Majority element will always have positive net count
 * - Each cancellation removes one majority and one non-majority element
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [2,2,1,1,1,2,2]
 * ```
 *
 * Steps:
 * Step 1: num=2, count=0 → candidate=2, count=1
 * Step 2: num=2, count=1 → count=2 (match)
 * Step 3: num=1, count=2 → count=1 (different)
 * Step 4: num=1, count=1 → count=0 (different)
 * Step 5: num=1, count=0 → candidate=1, count=1
 * Step 6: num=2, count=1 → count=0 (different)
 * Step 7: num=2, count=0 → candidate=2, count=1
 * Step 8: Result: 2 (which is correct, appears 4/7 times)
 *
 * Output:
 * ```
 * 2
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)** - where n is the length of the array. We perform a single pass through all n elements, executing constant-time operations for each: checking if count is 0 (**O(1)**), comparing the current number to the candidate (**O(1)**), and incrementing/decrementing the count (**O(1)**). Total: **O(n × 1)** = **O(n)**. This is optimal since we must examine every element at least once to determine the majority.
 *
 * ### SPACE COMPLEXITY:
 * O(1)** - constant extra space. We use only two variables regardless of input size: `candidate` (stores one integer) and `count` (stores one integer). The space used doesn't grow with n. This is optimal space complexity for this problem. The hash map approach would require **O(n)** space to store frequency counts, and the sorting approach would require **O(1)** extra space (assuming in-place sort) but **O(n log n)** time.
 *
 * ### EDGE CASES:
 * - **Single element**: Return that element (it's the majority)
 * - **All same elements**: Return that element
 * - **Exactly n/2 + 1 occurrences**: Still majority element
 * - **Multiple candidates**: Boyer-Moore finds the true majority
 * - **Guaranteed majority**: Problem guarantees one exists
 *
 * */

class Solution {
  /**
   * Find majority element using Boyer-Moore voting algorithm.
   *
   * Time Complexity: O(n) - single pass through array
   * Space Complexity: O(1) - constant extra space
   */
  majorityElement(nums: number[]): number {
    let candidate: number | null = null;
    let count = 0;

    // Boyer-Moore Voting Algorithm
    for (const num of nums) {
      if (count === 0) {
        candidate = num;
        count = 1;
      } else if (num === candidate) {
        count++;
      } else {
        count--;
      }
    }

    // Problem guarantees nums is non-empty with a majority element
    return candidate!;
  }

  /**
   * Alternative solution using hash map for counting.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n) for hash map
   */
  majorityElementHashMap(nums: number[]): number {
    const counts = new Map<number, number>();
    const majorityCount = Math.floor(nums.length / 2);

    for (const num of nums) {
      counts.set(num, (counts.get(num) || 0) + 1);
    }

    for (const [num, count] of counts.entries()) {
      if (count > majorityCount) {
        return num;
      }
    }

    // Problem guarantees a majority element exists
    throw new Error("No majority element found");
  }

  /**
   * Alternative solution using sorting.
   *
   * Time Complexity: O(n log n) for sorting
   * Space Complexity: O(1) extra space
   */
  majorityElementSorting(nums: number[]): number {
    // Sort the array (modifies input)
    nums.sort((a, b) => a - b);
    // The majority element will always be at the middle position
    return nums[Math.floor(nums.length / 2)];
  }

  /**
   * Alternative randomized solution.
   *
   * Time Complexity: Expected O(n)
   * Space Complexity: O(1)
   */
  majorityElementRandomized(nums: number[]): number {
    while (true) {
      // Pick a random element
      const candidate = nums[Math.floor(Math.random() * nums.length)];

      // Count its occurrences
      const count = nums.filter((num) => num === candidate).length;

      // Check if it's the majority
      if (count > Math.floor(nums.length / 2)) {
        return candidate;
      }
    }
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1: Basic case with clear majority
  const result1 = solution.majorityElement([3, 2, 3]);
  const expected1 = 3;
  console.log(`Test 1: ${result1 === expected1 ? "PASS" : "FAIL"}`);
  console.log(`  Expected: ${expected1}, Got: ${result1}`);

  // Test case 2: Majority element at the beginning
  const result2 = solution.majorityElement([2, 2, 1, 1, 1, 2, 2]);
  const expected2 = 2;
  console.log(`Test 2: ${result2 === expected2 ? "PASS" : "FAIL"}`);
  console.log(`  Expected: ${expected2}, Got: ${result2}`);

  // Test case 3: Single element
  const result3 = solution.majorityElement([1]);
  const expected3 = 1;
  console.log(`Test 3: ${result3 === expected3 ? "PASS" : "FAIL"}`);
  console.log(`  Expected: ${expected3}, Got: ${result3}`);

  // Test case 4: All same elements
  const result4 = solution.majorityElement([5, 5, 5, 5]);
  const expected4 = 5;
  console.log(`Test 4: ${result4 === expected4 ? "PASS" : "FAIL"}`);
  console.log(`  Expected: ${expected4}, Got: ${result4}`);

  // Test case 5: Large array
  const result5 = solution.majorityElement([6, 5, 5]);
  const expected5 = 5;
  console.log(`Test 5: ${result5 === expected5 ? "PASS" : "FAIL"}`);
  console.log(`  Expected: ${expected5}, Got: ${result5}`);

  // Test alternative approaches
  // HashMap approach
  const result6 = solution.majorityElementHashMap([3, 2, 3]);
  const expected6 = 3;
  console.log(`Test 6 (HashMap): ${result6 === expected6 ? "PASS" : "FAIL"}`);
  console.log(`  Expected: ${expected6}, Got: ${result6}`);

  // Sorting approach
  const result7 = solution.majorityElementSorting([...[ 2, 2, 1, 1, 1, 2, 2]]);
  const expected7 = 2;
  console.log(`Test 7 (Sorting): ${result7 === expected7 ? "PASS" : "FAIL"}`);
  console.log(`  Expected: ${expected7}, Got: ${result7}`);

  console.log("\n=== 169. Majority Element ===");
  console.log(`majorityElement([3,2,3]) -> ${solution.majorityElement([3, 2, 3])}`);
  console.log(
    `majorityElement([2,2,1,1,1,2,2]) -> ${solution.majorityElement([2, 2, 1, 1, 1, 2, 2])}`,
  );
  console.log(`majorityElement([1]) -> ${solution.majorityElement([1])}`);
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
