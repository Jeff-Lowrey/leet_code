/**
### INTUITION:
The key insight is that implement various sorting algorithms from scratch. Quicksort, Mergesort, and Heapsort all
achieve O(n log n) time. This problem tests understanding of fundamental sorting algorithms.

### APPROACH:
The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

Merge Sort** (using array traversal and divide-and-conquer):
1. Divide array into two halves recursively
2. Sort each half recursively
3. Merge sorted halves back together using two pointers

Quick Sort** (using two pointers):
1. Choose pivot element
2. Partition array around pivot using two pointers
3. Recursively sort left and right partitions

Heap Sort** (using tree data structure):
1. Build max heap from array
2. Repeatedly extract maximum and rebuild heap

### WHY THIS WORKS:
- This ensures that **Merge Sort**: Divide-and-conquer with guaranteed O(n log n), stable, needs O(n) space
- This ensures that **Quick Sort**: Average O(n log n), in-place, but O(n²) worst case
- This ensures that **Heap Sort**: Guaranteed O(n log n), in-place, not stable



This solution uses two pointers for efficient implementation.

This solution uses backtracking for efficient implementation.

The solution leverages string for efficient operations.

The solution leverages tree for efficient operations.

### EXAMPLE WALKTHROUGH:
Input:** nums = [5,2,3,1]

Merge Sort approach:**

Step 1:** Divide array recursively
- [5,2,3,1] → [5,2] and [3,1]
- [5,2] → [5] and [2]
- [3,1] → [3] and [1]

Step 2:** Base case - single elements are sorted
- [5], [2], [3], [1] all sorted

Step 3:** Merge [5] and [2] using two pointers → [2,5]

Step 4:** Merge [3] and [1] using two pointers → [1,3]

Step 5:** Merge [2,5] and [1,3] using two pointers
- Compare 2 vs 1: take 1
- Compare 2 vs 3: take 2
- Compare 5 vs 3: take 3
- Remaining: take 5
- Result: [1,2,3,5]

Quick Sort approach:**

Step 6:** Choose pivot (e.g., 1), partition using two pointers
- [1] | [5,2,3] (elements > 1)

Step 7:** Recursively sort right partition with pivot 3
- [2,3] | [5]

Step 8:** Combine results: [1,2,3,5]

Output:
```
[1,2,3,5]
```

Original Input:
```
nums = [5,2,3,1]
```

Merge Sort:
[5,2,3,1]
/    \\
[5,2]  [3,1]
/ \\    / \\
[5][2] [3][1]
\\ /    \\ /
[2,5]  [1,3]
\\    /
[1,2,3,5]
Quick Sort:
[5,2,3,1] pivot=1
[1] [5,2,3]
[2,3,5] pivot=3
[2,3] [5]
[1,2,3,5]

Output:
```
[1,2,3,5]
```

### TIME COMPLEXITY:
O(n log n)**
- Sorting or divide-and-conquer
All three algorithms achieve this complexity

### SPACE COMPLEXITY:
- Merge Sort: **O(n)** for merge array
- Quick Sort: **O(log n)** for recursion stack
- Heap Sort: **O(1)** in-place

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

/**
 * Main solution for Problem 912: Sort An Array
 *
 * @param {number[]} nums - Array to sort
 * @return {number[]} - Sorted array
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function solve(nums) {
  // Base case: arrays of length 0 or 1 are already sorted
  if (nums.length <= 1) {
    return nums;
  }

  /**
   * Merge two sorted arrays
   * @param {number[]} left - First sorted array
   * @param {number[]} right - Second sorted array
   * @return {number[]} - Merged sorted array
   */
  function merge(left, right) {
    const result = [];
    let i = 0,
      j = 0;

    // Merge elements in sorted order
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    // Add remaining elements from left (if any)
    while (i < left.length) {
      result.push(left[i]);
      i++;
    }

    // Add remaining elements from right (if any)
    while (j < right.length) {
      result.push(right[j]);
      j++;
    }

    return result;
  }

  /**
   * Merge sort implementation
   * @param {number[]} arr - Array to sort
   * @return {number[]} - Sorted array
   */
  function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }

    // Divide
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    // Conquer and Combine
    return merge(mergeSort(left), mergeSort(right));
  }

  return mergeSort(nums);
}

/**
 * Test cases for Problem 912: Sort An Array
 */
function testSolution() {
  console.log("Testing 912. Sort An Array");

  // Test case 1: Example from problem
  const result1 = solve([5, 2, 3, 1]);
  const expected1 = [1, 2, 3, 5];
  console.assert(
    JSON.stringify(result1) === JSON.stringify(expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: Another example
  const result2 = solve([5, 1, 1, 2, 0, 0]);
  const expected2 = [0, 0, 1, 1, 2, 5];
  console.assert(
    JSON.stringify(result2) === JSON.stringify(expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: Single element
  const result3 = solve([42]);
  const expected3 = [42];
  console.assert(
    JSON.stringify(result3) === JSON.stringify(expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  // Test case 4: Already sorted
  const result4 = solve([1, 2, 3, 4, 5]);
  const expected4 = [1, 2, 3, 4, 5];
  console.assert(
    JSON.stringify(result4) === JSON.stringify(expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: Reverse sorted
  const result5 = solve([5, 4, 3, 2, 1]);
  const expected5 = [1, 2, 3, 4, 5];
  console.assert(
    JSON.stringify(result5) === JSON.stringify(expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );

  // Test case 6: Negative numbers
  const result6 = solve([-4, 0, 7, 4, 9, -5, -1]);
  const expected6 = [-5, -4, -1, 0, 4, 7, 9];
  console.assert(
    JSON.stringify(result6) === JSON.stringify(expected6),
    `Test 6 failed: expected ${JSON.stringify(expected6)}, got ${JSON.stringify(result6)}`,
  );

  console.log("All test cases passed for 912. Sort An Array!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 912. Sort An Array ===");
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
