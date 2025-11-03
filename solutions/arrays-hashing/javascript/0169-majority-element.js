/**
### INTUITION:
Since the majority element appears more than n/2 times, it will always "survive" any cancellation process. The Boyer-Moore voting algorithm leverages this by maintaining a candidate and count, canceling out different elements.

### APPROACH:
1. **Convert array to set**: Transform the input array into a set data structure, which automatically removes all duplicate values
2. **Compare lengths**: Calculate the length of both the original array and the newly created set
3. **Detect duplicates**: If the lengths differ, duplicates existed in the original array (they were removed during set conversion)
4. **Return result**: Return True if lengths differ (duplicates found), False if lengths match (all elements unique)
5. **Alternative early termination**: For better average performance, iterate through array and add elements to a set one by one, returning True immediately when an element is already in the set

### WHY THIS WORKS:
- Majority element appears > n/2 times
- Non-majority elements can at most cancel out n/2 occurrences
- Majority element will always have positive net count
- Each cancellation removes one majority and one non-majority element

### EXAMPLE WALKTHROUGH:
Input:
```
[2,2,1,1,1,2,2]
```

Steps:
Step 1: num=2, count=0 → candidate=2, count=1
Step 2: num=2, count=1 → count=2 (match)
Step 3: num=1, count=2 → count=1 (different)
Step 4: num=1, count=1 → count=0 (different)
Step 5: num=1, count=0 → candidate=1, count=1
Step 6: num=2, count=1 → count=0 (different)
Step 7: num=2, count=0 → candidate=2, count=1
Step 8: Result: 2 (which is correct, appears 4/7 times)

Output:
```
2
```

### TIME COMPLEXITY:
O(n)** - where n is the length of the array. We make exactly one pass through all n elements. For each element, we perform constant-time operations: checking if count is 0, comparing with candidate, and incrementing/decrementing count. These are all **O(1)** operations, so total time is **O(n × 1)** = **O(n)**. Unlike hash map approaches that also take **O(n)** time, this approach only requires a single pass without any hash operations.

### SPACE COMPLEXITY:
O(1)** - We use only two variables regardless of input size: `candidate` (stores one integer) and `count` (stores one integer). The space used doesn't grow with n. This is optimal space complexity for this problem. The hash map approach would require **O(n)** space to store frequency counts, and the sorting approach would require **O(1)** extra space (assuming in-place sort) but **O(n log n)** time.

### EDGE CASES:
- **Single element**: Return that element (it's the majority)
- **All same elements**: Return that element
- **Exactly n/2 + 1 occurrences**: Still majority element
- **Multiple candidates**: Boyer-Moore finds the true majority
- **Guaranteed majority**: Problem guarantees one exists

</details>

*/

/**
 * Main solution for Problem 169: Majority Element using Boyer-Moore Voting Algorithm
 *
 * @param {number[]} nums - Array of integers
 * @return {number} - The majority element
 *
 * Time Complexity: O(n) - single pass through array
 * Space Complexity: O(1) - constant extra space
 */
function solve(nums) {
  // Boyer-Moore Voting Algorithm
  let candidate = null;
  let count = 0;

  // First pass: find the candidate
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

  // The problem guarantees a majority element exists,
  // so we don't need a second pass to verify
  return candidate;
}

/**
 * Alternative solution using Map for frequency counting
 *
 * @param {number[]} nums - Array of integers
 * @return {number} - The majority element
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n) for the map
 */
function solveWithMap(nums) {
  const freqMap = new Map();
  const majorityCount = Math.floor(nums.length / 2);

  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);

    // Early return when majority is found
    if (freqMap.get(num) > majorityCount) {
      return num;
    }
  }
}

/**
 * Alternative solution using sorting
 *
 * @param {number[]} nums - Array of integers
 * @return {number} - The majority element
 *
 * Time Complexity: O(n log n) for sorting
 * Space Complexity: O(1) extra space
 */
function solveWithSorting(nums) {
  nums.sort((a, b) => a - b);
  // The majority element will always be at the middle position
  return nums[Math.floor(nums.length / 2)];
}

/**
 * Test cases for Problem 169: Majority Element
 */
function testSolution() {
  console.log("Testing 169. Majority Element");

  // Test case 1: Basic case with clear majority
  const result1 = solve([3, 2, 3]);
  const expected1 = 3;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Majority element pattern
  const result2 = solve([2, 2, 1, 1, 1, 2, 2]);
  const expected2 = 2;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Single element
  const result3 = solve([1]);
  const expected3 = 1;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: All same elements
  const result4 = solve([5, 5, 5, 5]);
  const expected4 = 5;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Minimal majority
  const result5 = solve([6, 5, 5]);
  const expected5 = 5;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  // Test alternative approaches
  // Map approach
  const result6 = solveWithMap([3, 2, 3]);
  const expected6 = 3;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );

  // Sorting approach
  const result7 = solveWithSorting([2, 2, 1, 1, 1, 2, 2]);
  const expected7 = 2;
  console.assert(
    result7 === expected7,
    `Test 7 failed: expected ${expected7}, got ${result7}`,
  );

  console.log("All test cases passed for 169. Majority Element!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 169. Majority Element ===");
  console.log("Category: Arrays Hashing");
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
  solveWithMap,
  solveWithSorting,
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
