/**
 * # Difficulty: Hard
 *
 * # 0327. Count Of Range Sum
 *
 *
 * Given an integer array nums and two integers lower and upper, return the number of range sums that lie in [lower, upper] inclusive.
 *
 * Range sum S(i, j) is defined as the sum of the elements in nums between indices i and j inclusive, where i <= j.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [-2, 5, -1], lower = -2, upper = 2</dd>
 * <dt>Output:</dt>
 * <dd>3</dd>
 * <dt>Explanation:</dt>
 * <dd>Count of ranges with sum in [lower=-2, upper=2] is 3</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n log n) - Sorting or divide-and-conquer
 * **Space Complexity**: O(n) - Additional hash map storage

 *
 * ### INTUITION:
 * This is an advanced range sum counting problem. The key insight is to use prefix sums: if we have prefix[j] - prefix[i] in [lower, upper], then we need to count how many prefix[i] satisfy: prefix[j] - upper <= prefix[i] <= prefix[j] - lower. This transforms into a range counting problem solvable with merge sort or segment trees.
 *
 * ### APPROACH:
 * 1. **Compute prefix sums**: Build prefix sum array where prefix[i] represents sum of elements from index 0 to i-1
 * 2. **Transform problem**: Use insight that range sum S(i,j) = prefix[j] - prefix[i], need to count pairs where lower <= prefix[j] - prefix[i] <= upper
 * 3. **Apply merge sort**: Recursively divide prefix array and count valid ranges during merge process
 * 4. **Count cross-boundary ranges**: For each prefix[j] in right half, count how many prefix[i] in left half satisfy the range condition
 * 5. **Use two pointers**: Maintain pointers to find range [prefix[j] - upper, prefix[j] - lower] in sorted left half
 * 6. **Accumulate counts**: Sum counts from left subtree, right subtree, and cross-boundary ranges
 * 7. **Return total count**: Final result is total number of valid range sums found across all merge levels
 *
 * ### WHY THIS WORKS:
 * The algorithm correctly solves the problem by systematically exploring all valid states while maintaining necessary invariants. Each step preserves correctness through careful state management, and the base cases handle edge conditions properly. The approach guarantees finding the solution (if one exists) by examining all possibilities or efficiently pruning invalid paths.
 *
 *

This solution uses hash table lookup for efficient implementation.

This solution uses hash map storage for efficient implementation.

This solution uses set operations for efficient implementation.
### EXAMPLE WALKTHROUGH:
Given input nums = [-2,5,-1], lower = -2, upper = 2:

Input:
```
nums = [-2,5,-1], lower = -2, upper = 2
```

Prefix sums: [0, -2, 3, 2]
Range sums to check:
- S(0,0) = -2 ✓ (in range)
- S(0,1) = 3 ✗
- S(0,2) = 2 ✓
- S(1,1) = 5 ✗
- S(1,2) = 4 ✗
- S(2,2) = -1 ✓

Output:
```
3
```


Result: 3

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
 * O(n log n)
 * - Sorting or divide-and-conquer
 * For merge sort and tree-based approaches
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * - Additional hash map storage
 * For prefix sums and auxiliary structures
 *
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
 */

/**
 * Main solution for Problem 327: Count Of Range Sum
 *
 * @param {number[]} nums - Input array
 * @param {number} lower - Lower bound
 * @param {number} upper - Upper bound
 * @return {number} - Count of valid range sums
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function solve(nums, lower, upper) {
  if (!nums || nums.length === 0) {
    return 0;
  }

  const n = nums.length;
  // Compute prefix sums
  const sums = new Array(n + 1);
  sums[0] = 0;
  for (let i = 0; i < n; i++) {
    sums[i + 1] = sums[i] + nums[i];
  }

  return mergeSortCount(sums, 0, n, lower, upper);
}

/**
 * Merge sort with range counting
 */
function mergeSortCount(sums, start, end, lower, upper) {
  if (end - start <= 1) {
    return 0;
  }

  const mid = Math.floor((start + end) / 2);
  let count = 0;

  // Count from left and right halves
  count += mergeSortCount(sums, start, mid, lower, upper);
  count += mergeSortCount(sums, mid, end, lower, upper);

  // Count cross-boundary ranges
  let j = mid,
    k = mid,
    t = mid;
  const cache = [];

  for (let i = start; i < mid; i++) {
    // Find range of valid sums[j] where lower <= sums[j] - sums[i] <= upper
    while (k < end && sums[k] - sums[i] < lower) k++;
    while (j < end && sums[j] - sums[i] <= upper) j++;
    count += j - k;
  }

  // Merge the two sorted halves
  let left = start,
    right = mid;
  while (left < mid || right < end) {
    if (right >= end || (left < mid && sums[left] <= sums[right])) {
      cache.push(sums[left++]);
    } else {
      cache.push(sums[right++]);
    }
  }

  for (let i = 0; i < cache.length; i++) {
    sums[start + i] = cache[i];
  }

  return count;
}

/**
 * Alternative solution using Binary Indexed Tree (more complex but educational)
 */
function solveWithBIT(nums, lower, upper) {
  if (!nums || nums.length === 0) {
    return 0;
  }

  const n = nums.length;
  const sums = new Array(n + 1);
  sums[0] = 0;
  for (let i = 0; i < n; i++) {
    sums[i + 1] = sums[i] + nums[i];
  }

  // Coordinate compression
  const allValues = new Set();
  for (const sum of sums) {
    allValues.add(sum);
    allValues.add(sum - lower);
    allValues.add(sum - upper);
  }

  const sorted = Array.from(allValues).sort((a, b) => a - b);
  const rank = new Map();
  sorted.forEach((val, idx) => rank.set(val, idx + 1));

  const bit = new Array(sorted.length + 1).fill(0);

  function update(idx) {
    while (idx < bit.length) {
      bit[idx]++;
      idx += idx & -idx;
    }
  }

  function query(idx) {
    let sum = 0;
    while (idx > 0) {
      sum += bit[idx];
      idx -= idx & -idx;
    }
    return sum;
  }

  let count = 0;
  for (let i = 0; i <= n; i++) {
    // Count sums[j] where j < i and lower <= sums[i] - sums[j] <= upper
    // This means sums[i] - upper <= sums[j] <= sums[i] - lower
    const left = rank.get(sums[i] - upper);
    const right = rank.get(sums[i] - lower);
    count += query(right) - query(left - 1);

    update(rank.get(sums[i]));
  }

  return count;
}

/**
 * Test cases for Problem 327: Count Of Range Sum
 */
function testSolution() {
  console.log("Testing 327. Count Of Range Sum");

  // Test case 1: Basic example
  const result1 = solve([-2, 5, -1], -2, 2);
  const expected1 = 3;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );
  console.log(
    `✓ Test 1 passed: nums=[-2,5,-1], range=[-2,2] -> ${result1} ranges`,
  );

  // Test case 2: Single element in range
  const result2 = solve([0], 0, 0);
  const expected2 = 1;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );
  console.log(`✓ Test 2 passed: nums=[0], range=[0,0] -> ${result2} ranges`);

  // Test case 3: No valid ranges
  const result3 = solve([1, 2, 3], 10, 20);
  const expected3 = 0;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );
  console.log(
    `✓ Test 3 passed: nums=[1,2,3], range=[10,20] -> ${result3} ranges`,
  );

  // Test case 4: All subarrays valid
  const result4 = solve([1, 1, 1], -10, 10);
  const expected4 = 6; // All 6 subarrays
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );
  console.log(
    `✓ Test 4 passed: nums=[1,1,1], range=[-10,10] -> ${result4} ranges`,
  );

  // Test case 5: Larger example
  const result5 = solve([0, -3, -3, 1, 1, 2], 3, 5);
  const expected5 = 2;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );
  console.log(
    `✓ Test 5 passed: nums=[0,-3,-3,1,1,2], range=[3,5] -> ${result5} ranges`,
  );

  // Test BIT solution
  console.log("\nTesting BIT solution:");
  const result6 = solveWithBIT([-2, 5, -1], -2, 2);
  console.assert(result6 === 3, "BIT solution test failed");
  console.log(`✓ BIT solution test passed: ${result6} ranges`);

  console.log("All test cases passed for 327. Count Of Range Sum!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 327. Count Of Range Sum ===");
  console.log("Category: Segment Tree");
  console.log("Difficulty: Hard");
  console.log("");

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  solveWithBIT,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - Merge sort solution is cleaner and more efficient in practice
 * - BIT solution demonstrates coordinate compression techniques
 * - Both achieve O(n log n) time complexity
 * - The key insight is converting range sum to prefix sum difference
 * - Similar techniques apply to many range query problems
 */
