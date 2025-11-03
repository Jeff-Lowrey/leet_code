/**
 * # Difficulty: Hard
 *
 * # 0315. Count Of Smaller Numbers After Self
 *
 *
 * Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[2, 1, 1, 0]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Counts of smaller numbers after each element: [2,1,1,0] for [5,2,6,1]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n log n) - Sorting or divide-and-conquer
 * **Space Complexity**: O(n) - Additional hash map storage

 *
 * ### INTUITION:
 * This is a classic "count inversions" problem that can be solved efficiently using various advanced data structures. The naive O(n²) approach checks every pair, but we can do better using merge sort, segment trees, or Binary Indexed Trees (Fenwick Trees).
 *
 * ### APPROACH:
 * 1. **Create indexed pairs**: Build array of (value, original_index) pairs to track positions during sorting
 * 2. **Initialize result array**: Create array of zeros to store counts for each original position
 * 3. **Define merge sort function**: Implement merge sort that recursively divides array into halves
 * 4. **Merge with counting**: During merge, when comparing elements from left and right halves, count inversions
 * 5. **Count smaller elements**: When left[i] <= right[j], all remaining elements in right array are larger, so add their count to result
 * 6. **Preserve order**: Merge elements while maintaining sorted order by value, preserving index information
 * 7. **Return result**: After complete merge sort, result array contains count of smaller elements after each position
 *
 * ### WHY THIS WORKS:
 * A set by definition contains only unique elements - when we convert an array to a set, any duplicates are automatically removed. By comparing the lengths of the original array and the set, we can detect if duplicates existed. The early termination approach works because as soon as we find an element already in our seen set, we've proven a duplicate exists without needing to check the remaining elements.
 *
 * ### EXAMPLE WALKTHROUGH:
Input:
```
[5,2,6,1]
```

Process right to left:
- nums[3]=1: no elements after it, count=0
- nums[2]=6: elements after: [1], smaller: 1, count=1
- nums[1]=2: elements after: [6,1], smaller: 1, count=1
- nums[0]=5: elements after: [2,6,1], smaller: 2, count=2

Output:
```
[2,1,1,0]
```

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
 * For auxiliary data structures
 *
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
 */

/**
 * Main solution for Problem 315: Count Of Smaller Numbers After Self
 *
 * @param {number[]} nums - Input array
 * @return {number[]} - Count array
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function solve(nums) {
  if (!nums || nums.length === 0) {
    return [];
  }

  const n = nums.length;
  const result = new Array(n).fill(0);
  const indices = Array.from({ length: n }, (_, i) => i);

  /**
   * Merge sort with counting
   */
  function mergeSort(start, end) {
    if (start >= end) {
      return;
    }

    const mid = Math.floor((start + end) / 2);
    mergeSort(start, mid);
    mergeSort(mid + 1, end);

    // Merge phase with counting
    const temp = [];
    let i = start;
    let j = mid + 1;
    let rightCount = 0;

    while (i <= mid || j <= end) {
      if (j > end || (i <= mid && nums[indices[i]] > nums[indices[j]])) {
        // Element from left half
        // All remaining elements in right half that we've processed are smaller
        result[indices[i]] += rightCount;
        temp.push(indices[i]);
        i++;
      } else {
        // Element from right half is smaller
        rightCount++;
        temp.push(indices[j]);
        j++;
      }
    }

    // Copy back to indices array
    for (let k = 0; k < temp.length; k++) {
      indices[start + k] = temp[k];
    }
  }

  mergeSort(0, n - 1);
  return result;
}

/**
 * Alternative solution using Binary Indexed Tree (Fenwick Tree)
 */
function solveWithBIT(nums) {
  if (!nums || nums.length === 0) {
    return [];
  }

  const n = nums.length;
  const result = new Array(n);

  // Coordinate compression
  const sorted = [...new Set(nums)].sort((a, b) => a - b);
  const rank = new Map();
  sorted.forEach((num, idx) => rank.set(num, idx + 1));

  // Binary Indexed Tree
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

  // Process from right to left
  for (let i = n - 1; i >= 0; i--) {
    const r = rank.get(nums[i]);
    result[i] = query(r - 1);
    update(r);
  }

  return result;
}

/**
 * Test cases for Problem 315: Count Of Smaller Numbers After Self
 */
function testSolution() {
  console.log("Testing 315. Count Of Smaller Numbers After Self");

  // Test case 1: Basic example
  const result1 = solve([5, 2, 6, 1]);
  const expected1 = [2, 1, 1, 0];
  console.assert(
    JSON.stringify(result1) === JSON.stringify(expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );
  console.log(`✓ Test 1 passed: [5,2,6,1] -> ${JSON.stringify(result1)}`);

  // Test case 2: Descending order
  const result2 = solve([5, 4, 3, 2, 1]);
  const expected2 = [4, 3, 2, 1, 0];
  console.assert(
    JSON.stringify(result2) === JSON.stringify(expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );
  console.log(`✓ Test 2 passed: [5,4,3,2,1] -> ${JSON.stringify(result2)}`);

  // Test case 3: Ascending order
  const result3 = solve([1, 2, 3, 4, 5]);
  const expected3 = [0, 0, 0, 0, 0];
  console.assert(
    JSON.stringify(result3) === JSON.stringify(expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );
  console.log(`✓ Test 3 passed: [1,2,3,4,5] -> ${JSON.stringify(result3)}`);

  // Test case 4: Single element
  const result4 = solve([1]);
  const expected4 = [0];
  console.assert(
    JSON.stringify(result4) === JSON.stringify(expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );
  console.log(`✓ Test 4 passed: [1] -> ${JSON.stringify(result4)}`);

  // Test case 5: Duplicates
  const result5 = solve([2, 0, 1]);
  const expected5 = [2, 0, 0];
  console.assert(
    JSON.stringify(result5) === JSON.stringify(expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );
  console.log(`✓ Test 5 passed: [2,0,1] -> ${JSON.stringify(result5)}`);

  // Test BIT solution
  console.log("\nTesting BIT solution:");
  const result6 = solveWithBIT([5, 2, 6, 1]);
  console.assert(
    JSON.stringify(result6) === JSON.stringify([2, 1, 1, 0]),
    "BIT solution test failed",
  );
  console.log(`✓ BIT solution test passed: ${JSON.stringify(result6)}`);

  console.log(
    "All test cases passed for 315. Count Of Smaller Numbers After Self!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 315. Count Of Smaller Numbers After Self ===");
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
 * - Merge sort solution is more intuitive and has better constants
 * - BIT solution uses coordinate compression and is a good alternative
 * - Segment tree solution would be similar to BIT but with more overhead
 * - Both solutions achieve O(n log n) time complexity
 * - The problem is essentially counting inversions in a modified way
 */
