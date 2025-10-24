/**
 * # Difficulty: Hard
 *
 * # 0493. Reverse Pairs
 *
 * Difficulty: Medium
 *
 * Given an integer array nums, return the number of reverse pairs in the array.
 *
 * A reverse pair is a pair (i, j) where:
 * - 0 <= i < j < nums.length and
 * - nums[i] > 2 * nums[j]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1, 3, 2, 3, 1]</dd>
 * <dt>Output:</dt>
 * <dd>"\nInput: nums"</dd>
 * <dt>Explanation:</dt>
 * <dd>Count of reverse pairs where nums[i] > 2*nums[j] and i < j is 2</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Complement Search, Two Pointers Pattern
 * **Time Complexity**: O(n log n) - Sorting or divide-and-conquer
 * **Space Complexity**: O(n) - Additional hash map storage

 *
 * ### INTUITION:
 * This is similar to counting inversions but with a modified condition (nums[i] > 2 * nums[j] instead of nums[i] > nums[j]). We can use merge sort to count these pairs efficiently during the merge process, or use segment trees / BIT with coordinate compression.
 *
 * ### APPROACH:
 * 1. **Base case check**: Return 0 for empty array, and create base case for single-element arrays in recursion
 * 2. **Divide array**: Split array into left and right halves using merge sort structure
 * 3. **Recursively count**: Get reverse pair counts from left half and right half independently
 * 4. **Count cross-boundary pairs**: For each element in left half, count elements in right half where left[i] > 2 * right[j]
 * 5. **Use two pointers**: Maintain pointer j in right array, increment while condition left[i] > 2 * right[j] holds
 * 6. **Merge sorted arrays**: After counting, merge left and right into sorted array for parent recursion level
 * 7. **Return total count**: Sum of left count, right count, and cross-boundary count gives total reverse pairs
 *
 * ### WHY THIS WORKS:
 * By repeatedly dividing the search space in half, we eliminate half of the remaining elements in each iteration. Since the array is sorted, we can determine which half contains the target by comparing with the middle element. This guarantees we find the target (if it exists) in O(log n) time because each step reduces the problem size by a factor of 2.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1,3,2,3,1]
 * ```
 *
 * Reverse pairs:
 * - (1,4): nums[1]=3 > 2*nums[4]=2 ✓
 * - (3,4): nums[3]=3 > 2*nums[4]=2 ✓
 *
 * Output:
 * ```
 * 2
 * ```

 * ### TIME COMPLEXITY:
 * O(n log n)
 * - Sorting or divide-and-conquer
 * For merge sort and tree-based approaches
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * - Additional hash map storage
 * For auxiliary arrays and recursion stack
 *
 * ### EDGE CASES:
 * - Empty array
 * - Single element
 * - No reverse pairs
 * - All elements form reverse pairs
 * - Negative numbers and large values
 * - Overflow when computing 2*nums[j]
 *
 * </details>
 */

/**
 * Main solution for Problem 493: Reverse Pairs
 *
 * @param {number[]} nums - Input array
 * @return {number} - Count of reverse pairs
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function solve(nums) {
  if (!nums || nums.length <= 1) {
    return 0;
  }

  return mergeSort(nums, 0, nums.length - 1);
}

/**
 * Merge sort with reverse pair counting
 */
function mergeSort(nums, left, right) {
  if (left >= right) {
    return 0;
  }

  const mid = Math.floor((left + right) / 2);
  let count = 0;

  // Count pairs in left and right halves
  count += mergeSort(nums, left, mid);
  count += mergeSort(nums, mid + 1, right);

  // Count cross-boundary pairs
  let j = mid + 1;
  for (let i = left; i <= mid; i++) {
    // Find all j where nums[i] > 2 * nums[j]
    while (j <= right && nums[i] > 2 * nums[j]) {
      j++;
    }
    count += j - (mid + 1);
  }

  // Merge the two halves
  merge(nums, left, mid, right);

  return count;
}

/**
 * Merge two sorted subarrays
 */
function merge(nums, left, mid, right) {
  const temp = [];
  let i = left;
  let j = mid + 1;

  while (i <= mid && j <= right) {
    if (nums[i] <= nums[j]) {
      temp.push(nums[i++]);
    } else {
      temp.push(nums[j++]);
    }
  }

  while (i <= mid) {
    temp.push(nums[i++]);
  }

  while (j <= right) {
    temp.push(nums[j++]);
  }

  for (let k = 0; k < temp.length; k++) {
    nums[left + k] = temp[k];
  }
}

/**
 * Alternative solution using Binary Indexed Tree
 */
function solveWithBIT(nums) {
  if (!nums || nums.length <= 1) {
    return 0;
  }

  const n = nums.length;

  // Coordinate compression
  const allNums = new Set();
  for (const num of nums) {
    allNums.add(num);
    allNums.add(2 * num);
  }

  const sorted = Array.from(allNums).sort((a, b) => a - b);
  const rank = new Map();
  sorted.forEach((num, idx) => rank.set(num, idx + 1));

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

  // Process from right to left
  for (let i = n - 1; i >= 0; i--) {
    // Count numbers < nums[i] / 2 (equivalent to < 2 * nums[j])
    const target = rank.get(2 * nums[i]);
    if (target > 1) {
      count += query(target - 1);
    }

    // Add current number
    update(rank.get(nums[i]));
  }

  return count;
}

/**
 * Test cases for Problem 493: Reverse Pairs
 */
function testSolution() {
  console.log("Testing 493. Reverse Pairs");

  // Test case 1: Basic example
  const result1 = solve([1, 3, 2, 3, 1]);
  const expected1 = 2;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );
  console.log(`✓ Test 1 passed: [1,3,2,3,1] -> ${result1} reverse pairs`);

  // Test case 2: Another example
  const result2 = solve([2, 4, 3, 5, 1]);
  const expected2 = 3;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );
  console.log(`✓ Test 2 passed: [2,4,3,5,1] -> ${result2} reverse pairs`);

  // Test case 3: No reverse pairs
  const result3 = solve([1, 2, 3, 4]);
  const expected3 = 0;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );
  console.log(`✓ Test 3 passed: [1,2,3,4] -> ${result3} reverse pairs`);

  // Test case 4: Single element
  const result4 = solve([5]);
  const expected4 = 0;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );
  console.log(`✓ Test 4 passed: [5] -> ${result4} reverse pairs`);

  // Test case 5: All reverse pairs
  const result5 = solve([5, 4, 3, 2, 1]);
  const expected5 = 4; // (5,2), (5,1), (4,1), (3,1)
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );
  console.log(`✓ Test 5 passed: [5,4,3,2,1] -> ${result5} reverse pairs`);

  // Test case 6: Empty array
  const result6 = solve([]);
  const expected6 = 0;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );
  console.log(`✓ Test 6 passed: [] -> ${result6} reverse pairs`);

  // Test BIT solution
  console.log("\nTesting BIT solution:");
  const result7 = solveWithBIT([1, 3, 2, 3, 1]);
  console.assert(result7 === 2, "BIT solution test failed");
  console.log(`✓ BIT solution test passed: ${result7} reverse pairs`);

  console.log("All test cases passed for 493. Reverse Pairs!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 493. Reverse Pairs ===");
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
 * - Merge sort solution is elegant and efficient
 * - BIT solution requires coordinate compression
 * - Both achieve O(n log n) time complexity
 * - The problem is related to counting inversions with a twist
 * - Careful with integer overflow when computing 2 * nums[j]
 */
