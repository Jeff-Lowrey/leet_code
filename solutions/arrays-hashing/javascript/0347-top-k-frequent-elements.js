/**
 * ### INTUITION:
 * The key insight is to use bucket sort based on frequency. Since the maximum frequency any element can have is n (all elements the same), we can create n+1 buckets where bucket[i] contains all numbers that appear exactly i times. First count frequencies with a hash map, then place numbers into frequency buckets, finally collect k elements from highest frequency buckets first. This achieves O(n) time by avoiding sorting.
 *
 * ### APPROACH:
 * 1. **Count frequencies**: Build hash map of number → frequency for all elements in nums
 * 2. **Create frequency buckets**: Initialize array of n+1 buckets, where bucket[freq] holds all numbers with that frequency
 * 3. **Fill buckets**: For each (number, frequency) pair from hash map, add number to bucket[frequency]
 * 4. **Collect top k**: Traverse buckets from highest frequency (n) down to lowest, collecting elements until we have k total
 * 5. **Return result**: Slice to ensure exactly k elements returned (handle case where last bucket has more than needed)
 *
 * ### WHY THIS WORKS:
 * - This ensures that bucket sort by frequency achieves O(n) time vs heap's O(n log k)
 * - This ensures that frequency can't exceed n, so we need at most n+1 buckets (index 0 to n)
 * - This ensures that hash map counts frequencies in O(n), bucketing also O(n)
 * - This ensures that collecting from buckets high to low gets k elements without full sort
 * - This ensures that trade space O(n) for buckets to gain linear time complexity
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1,1,1,2,2,3], k = 2
 * ```
 *
 * Step 1: Count frequencies using Counter
 * freq_map = {1: 3, 2: 2, 3: 1}
 * Step 2: Build max heap with negative frequencies
 * heap = [(-3, 1), (-2, 2), (-1, 3)]
 * Step 3: Extract k most frequent elements
 * Alternative (Bucket Sort):
 *
 * Steps:
 * Step 1: - Pop: (-3, 1) → result = [1]
 * Step 2: - Pop: (-2, 2) → result = [1, 2]
 * Step 3: Create buckets by frequency
 * Step 4: buckets[3] = [1]
 * Step 5: buckets[2] = [2]
 * Step 6: buckets[1] = [3]
 * Step 7: Collect from highest frequency buckets
 * Step 8: - From bucket 3: add 1
 * Step 9: - From bucket 2: add 2
 *
 * Output:
 * ```
 * [1, 2]
 * [1, 2]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)** - where n is the length of the nums array. We perform three linear passes: (1) count frequencies in hash map **O(n)**, (2) place numbers into frequency buckets **O(unique elements)** ≤ **O(n)**, (3) collect k elements from buckets **O(n)** in worst case. Total: **O(n)** + **O(n)** + **O(n)** = **O(3n)** = **O(n)**. This is better than heap-based solutions which would be **O(n log k)** or sorting-based solutions which would be **O(n log n)**.
 *
 * ### SPACE COMPLEXITY:
 * O(n)** - We use a frequency hash map that stores at most n unique elements (**O(n)**), plus a buckets array of size n+1 where each bucket can hold numbers (**O(n)** total across all buckets in worst case), plus the result array of size k (**O(k)** ≤ **O(n)**). Total space: **O(n)** + **O(n)** + **O(k)** = **O(n)**. The dominant factors are the hash map and buckets array, both **O(n)**.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 *
 * *
 * 
 *
 * */

/**
 * Main solution for Problem 347: Top K Frequent Elements
 *
 * @param {number[]} nums - Array of integers
 * @param {number} k - Number of top frequent elements to return
 * @return {number[]} - Array of k most frequent elements
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(nums, k) {
  // Handle edge cases
  if (!nums || nums.length === 0 || k <= 0) {
    return [];
  }

  if (k >= nums.length) {
    return [...new Set(nums)];
  }

  // Step 1: Count frequency of each number using Map
  const freqMap = new Map();
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // Step 2: Create buckets indexed by frequency
  // Maximum frequency possible is nums.length
  const buckets = Array(nums.length + 1)
    .fill(null)
    .map(() => []);

  for (const [num, freq] of freqMap) {
    buckets[freq].push(num);
  }

  // Step 3: Collect k most frequent elements
  // Traverse from highest frequency to lowest
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }

  // Return exactly k elements
  return result.slice(0, k);
}

/**
 * Test cases for Problem 347: Top K Frequent Elements
 */
function testSolution() {
  console.log("Testing 347. Top K Frequent Elements");

  // Test case 1: Basic functionality
  const result1 = solve([1, 1, 1, 2, 2, 3], 2);
  const expected1 = [1, 2]; // Order may vary but should contain these elements
  console.assert(
    result1.length === 2 && result1.includes(1) && result1.includes(2),
    `Test 1 failed: expected [1,2], got [${result1}]`,
  );

  // Test case 2: Single element
  const result2 = solve([1], 1);
  const expected2 = [1];
  console.assert(
    JSON.stringify(result2) === JSON.stringify(expected2),
    `Test 2 failed: expected [1], got [${result2}]`,
  );

  // Test case 3: All elements have same frequency
  const result3 = solve([1, 2, 3], 2);
  console.assert(
    result3.length === 2,
    `Test 3 failed: expected length 2, got ${result3.length}`,
  );

  // Test case 4: Edge case - empty array
  const result4 = solve([], 1);
  const expected4 = [];
  console.assert(
    JSON.stringify(result4) === JSON.stringify(expected4),
    `Test 4 failed: expected [], got [${result4}]`,
  );

  // Test case 5: k larger than unique elements
  const result5 = solve([1, 1, 2, 2, 3], 5);
  console.assert(
    result5.length === 3 &&
      result5.includes(1) &&
      result5.includes(2) &&
      result5.includes(3),
    `Test 5 failed: expected all unique elements, got [${result5}]`,
  );

  console.log("All test cases passed for 347. Top K Frequent Elements!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 347. Top K Frequent Elements ===");
  console.log("Category: Arrays Hashing");
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
 * - This solution focuses on arrays hashing concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
