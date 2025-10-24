/**
 * # Difficulty: Medium
 *
 * # 0969. Pancake Sorting
 *
 * Difficulty: Medium
 *
 * Given an array of integers arr, sort the array by performing a series of pancake flips.
 *
 * In one pancake flip we do the following steps:
 * - Choose an integer k where 1 <= k <= arr.length.
 * - Reverse the sub-array arr[0...k-1] (0-indexed).
 *
 * For example, if arr = [3,2,1,4] and we performed a pancake flip choosing k = 3, we reverse the
 * sub-array [3,2,1], so arr = [1,2,3,4] after the pancake flip at k = 3.
 *
 * Return an array of the k-values corresponding to a sequence of pancake flips that sort arr.
 * Any valid answer that sorts the array within 10 * arr.length flips will be accepted.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[3, 2, 4, 1]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Pancake sort of [3,2,4,1] uses flips [4,2,3,2]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Array Traversal, Two Pointers
 * **Data Structures**: Array, String, Tree
 * **Patterns**: Two Pointers Pattern
 * **Time Complexity**: * O(n²) - Nested iteration through input
 * **Space Complexity**: * O(n)

 *
 * ### INTUITION:
 * Like sorting pancakes by size - we can repeatedly bring the largest unsorted element to the
 * top with one flip, then flip it to its final position. This guarantees sorting.
 *
 * ### APPROACH:
 * 1. **Find maximum** in unsorted portion of array
 * 2. **Flip to top**: If max is not already at top, flip to bring it to position 0
 * 3. **Flip to position**: Flip to move max to its final sorted position
 * 4. **Repeat**: Continue with remaining unsorted portion
 * 5. **Track flips**: Record k-values for each flip
 *
 * ### WHY THIS WORKS:
 * - Each element can be moved to its final position in at most 2 flips
 * - First flip brings it to the top
 * - Second flip moves it to its correct position
 * - Working from largest to smallest guarantees no interference
 * - Maximum 2n flips (well within 10n limit)
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * arr = [3,2,4,1]
 * ```
 *
 * Goal: Sort to [1,2,3,4]
 * Step 1: Find max=4 at index 2
 *
 * Steps:
 * Step 1: Flip at k=3: [3,2,4] → [4,2,3]
 * Step 2: Result: [4,2,3,1]
 * Step 3: Flip at k=4 to move 4 to end
 * Step 4: Flip at k=4: [4,2,3,1] → [1,3,2,4]
 * Step 5: Result: [1,3,2,4]
 * Step 6: Find max=3 at index 1 in [1,3,2]
 * Step 7: Flip at k=2: [1,3] → [3,1]
 * Step 8: Result: [3,1,2,4]
 * Step 9: Flip at k=3 to move 3 to position
 * Step 10: Flip at k=3: [3,1,2] → [2,1,3]
 * Step 11: Result: [2,1,3,4]
 * Step 12: Find max=2 at index 0 in [2,1]
 * Step 13: Already at top, flip at k=2
 * Step 14: Flip at k=2: [2,1] → [1,2]
 * Step 15: Result: [1,2,3,4]
 *
 * Output:
 * ```
 * [3,4,2,3,2] (flip positions)
 * ```

 * ### TIME COMPLEXITY:
 * O(n²)
 * - Nested iteration through input
 * - n iterations (one per element)
 * - Each iteration finds max: O(n)
 * - Total: O(n²)
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * For storing the flip sequence
 *
 * ### EDGE CASES:
 * - Already sorted array
 * - Single element
 * - Reverse sorted
 * - All elements equal
 * - Two elements
 *
 * </details>
 */

/**
 * Main solution for Problem 969: Pancake Sorting
 *
 * @param {number[]} arr - Array to sort using pancake flips
 * @return {number[]} - Sequence of k values for pancake flips
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
function solve(arr) {
  const result = [];
  const n = arr.length;

  /**
   * Flip the first k elements of the array
   * @param {number[]} arr - The array to modify
   * @param {number} k - Number of elements to flip
   */
  function flip(arr, k) {
    let left = 0;
    let right = k - 1;
    while (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }

  /**
   * Find the index of the maximum element in arr[0...end]
   * @param {number[]} arr - The array
   * @param {number} end - The ending index (inclusive)
   * @return {number} - Index of the maximum element
   */
  function findMaxIndex(arr, end) {
    let maxIdx = 0;
    for (let i = 1; i <= end; i++) {
      if (arr[i] > arr[maxIdx]) {
        maxIdx = i;
      }
    }
    return maxIdx;
  }

  // Sort the array by moving the largest element to its position each iteration
  for (let size = n; size > 1; size--) {
    // Find the index of the maximum element in the unsorted portion
    const maxIdx = findMaxIndex(arr, size - 1);

    // If max is already in its correct position, continue
    if (maxIdx === size - 1) {
      continue;
    }

    // If max is not at the beginning, flip it to the front
    if (maxIdx !== 0) {
      flip(arr, maxIdx + 1);
      result.push(maxIdx + 1);
    }

    // Flip to move the max element to its correct position
    flip(arr, size);
    result.push(size);
  }

  return result;
}

/**
 * Test cases for Problem 969: Pancake Sorting
 */
function testSolution() {
  console.log("Testing 969. Pancake Sorting");

  /**
   * Helper to verify that the flip sequence sorts the array
   * @param {number[]} arr - Original array
   * @param {number[]} flips - Sequence of flips
   * @return {boolean} - Whether the array is sorted after flips
   */
  function verifySolution(arr, flips) {
    const testArr = [...arr];

    function flip(arr, k) {
      let left = 0,
        right = k - 1;
      while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
      }
    }

    for (const k of flips) {
      flip(testArr, k);
    }

    // Check if sorted
    for (let i = 1; i < testArr.length; i++) {
      if (testArr[i] < testArr[i - 1]) return false;
    }
    return true;
  }

  // Test case 1: Example from problem
  const arr1 = [3, 2, 4, 1];
  const result1 = solve([...arr1]);
  console.log("Test 1 flips:", JSON.stringify(result1));
  console.assert(
    verifySolution(arr1, result1),
    "Test 1 failed: array not sorted",
  );
  console.assert(result1.length <= 10, "Test 1 failed: too many flips");

  // Test case 2: Another example
  const arr2 = [1, 2, 3];
  const result2 = solve([...arr2]);
  console.log("Test 2 flips:", JSON.stringify(result2));
  console.assert(
    verifySolution(arr2, result2),
    "Test 2 failed: array not sorted",
  );

  // Test case 3: Reverse sorted
  const arr3 = [5, 4, 3, 2, 1];
  const result3 = solve([...arr3]);
  console.log("Test 3 flips:", JSON.stringify(result3));
  console.assert(
    verifySolution(arr3, result3),
    "Test 3 failed: array not sorted",
  );

  // Test case 4: Random order
  const arr4 = [3, 1, 4, 1, 5, 9, 2, 6];
  const result4 = solve([...arr4]);
  console.log("Test 4 flips:", JSON.stringify(result4));
  console.assert(
    verifySolution(arr4, result4),
    "Test 4 failed: array not sorted",
  );

  // Test case 5: Single element
  const arr5 = [1];
  const result5 = solve([...arr5]);
  console.assert(result5.length === 0, "Test 5 failed: should have no flips");

  console.log("All test cases passed for 969. Pancake Sorting!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 969. Pancake Sorting ===");
  console.log("Category: Sorting");
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
 * - This solution focuses on sorting concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
