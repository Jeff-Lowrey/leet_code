/**
### INTUITION:
This is a classic two-pointers problem. Since the array is sorted, duplicates are adjacent. We use one pointer to iterate through the array and another to track the position where the next unique element should be placed.

### APPROACH:
1. **Two pointers**: Use `i` to iterate and `j` to track unique position
2. **Skip duplicates**: Only advance `j` when we find a new unique element
3. **In-place modification**: Copy unique elements to positions 0, 1, 2, etc.
4. **Return count**: Return the number of unique elements

### WHY THIS WORKS:
- This ensures that sorted array means duplicates are adjacent
- This ensures that two pointers allow in-place removal without extra space
- This ensures that `j` tracks the "write" position for next unique element
- This ensures that `i` scans through all elements

### EXAMPLE WALKTHROUGH:
Input:
```
[1,1,2]
```

i=0, j=0: nums[0]=1 (first element, place at j=0)
i=1, j=1: nums[1]=1 == nums[0], skip
i=2, j=1: nums[2]=2 != nums[0], place at j=1
Result: [1,2,_], return k=2

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
O(n)**
- Single pass through input
Single pass through the array

### SPACE COMPLEXITY:
O(1)**
- Constant extra space
Only using constant extra space

### EDGE CASES:
- **Empty array**: Return 0 (no elements)
- **Single element**: Return 1 (already unique)
- **All elements same**: Return 1 (only one unique value)
- **No duplicates**: Return n (all unique already)
- **Consecutive duplicates**: Two-pointer removes them in-place

*/

/**
 * Main solution for Problem 026: Remove Duplicates From Sorted Array
 *
 * @param {number[]} nums - Sorted array of integers
 * @return {number} - Number of unique elements
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
  // Edge case: empty array
  if (!nums || nums.length === 0) {
    return 0;
  }

  // Slow pointer tracks position for next unique element
  let slow = 0;

  // Fast pointer scans through array
  for (let fast = 1; fast < nums.length; fast++) {
    // Found a new unique element
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }

  // Return count of unique elements (slow is 0-indexed, so add 1)
  return slow + 1;
}

/**
 * Test cases for Problem 026: Remove Duplicates From Sorted Array
 */
function testSolution() {
  console.log("Testing 026. Remove Duplicates From Sorted Array");

  // Test case 1: Example from problem
  const nums1 = [1, 1, 2];
  const result1 = solve(nums1);
  const expected1 = 2;
  const expectedArray1 = [1, 2];
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );
  console.assert(
    nums1.slice(0, result1).toString() === expectedArray1.toString(),
    `Test 1 failed: array should be ${expectedArray1}, got ${nums1.slice(0, result1)}`,
  );
  console.log(
    `Test 1 passed: removeDuplicates([1,1,2]) = ${result1}, nums = [${nums1.slice(0, result1)}]`,
  );

  // Test case 2: Multiple duplicates
  const nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
  const result2 = solve(nums2);
  const expected2 = 5;
  const expectedArray2 = [0, 1, 2, 3, 4];
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );
  console.assert(
    nums2.slice(0, result2).toString() === expectedArray2.toString(),
    `Test 2 failed: array should be ${expectedArray2}, got ${nums2.slice(0, result2)}`,
  );
  console.log(
    `Test 2 passed: removeDuplicates([0,0,1,1,1,2,2,3,3,4]) = ${result2}, nums = [${nums2.slice(0, result2)}]`,
  );

  // Test case 3: All same elements
  const nums3 = [1, 1, 1, 1];
  const result3 = solve(nums3);
  const expected3 = 1;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );
  console.log(`Test 3 passed: removeDuplicates([1,1,1,1]) = ${result3}`);

  // Test case 4: No duplicates
  const nums4 = [1, 2, 3, 4, 5];
  const result4 = solve(nums4);
  const expected4 = 5;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );
  console.log(`Test 4 passed: removeDuplicates([1,2,3,4,5]) = ${result4}`);

  // Test case 5: Single element
  const nums5 = [1];
  const result5 = solve(nums5);
  const expected5 = 1;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );
  console.log(`Test 5 passed: removeDuplicates([1]) = ${result5}`);

  console.log(
    "All test cases passed for 026. Remove Duplicates From Sorted Array!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 026. Remove Duplicates From Sorted Array ===");
  console.log("Category: Two Pointers");
  console.log("Difficulty: Easy");
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
 * - This solution focuses on two pointers concepts
 * - The slow-fast pointer pattern is a common technique for in-place array modifications
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
