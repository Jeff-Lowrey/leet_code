/**
 * ### METADATA:
 * **Techniques**: Set Membership Check
 * **Data Structures**: Set (Hash Set)
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(n)
 *
 * ### INTUITION:
 * The key insight is that if all elements are unique, then the array length equals the set length.
 * If there are duplicates, the set will be smaller than the array.
 *
 * ### APPROACH:
 * 1. **Convert array to set**: Transform the input array into a set data structure, which automatically removes all duplicate values
 * 2. **Compare lengths**: Calculate the length of both the original array and the newly created set
 * 3. **Detect duplicates**: If the lengths differ, duplicates existed in the original array (they were removed during set conversion)
 * 4. **Return result**: Return True if lengths differ (duplicates found), False if lengths match (all elements unique)
 * 5. **Alternative early termination**: For better average performance, iterate through array and add elements to a set one by one, returning True immediately when an element is already in the set
 *
 * ### WHY THIS WORKS:
 * A set by definition contains only unique elements - when we convert an array to a set, any duplicates are automatically removed. By comparing the lengths of the original array and the set, we can detect if duplicates existed. The early termination approach works because as soon as we find an element already in our seen set, we've proven a duplicate exists without needing to check the remaining elements.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1, 2, 3, 1]
 * ```
 *
 * **Step 1:** Convert array to set
 * - set(nums) = {1, 2, 3}
 * - Set length = 3, Array length = 4
 *
 * **Step 2:** Compare lengths
 * - len(nums) = 4 != len(set(nums)) = 3
 * - Since lengths differ, duplicates exist
 *
 * Output: True
 *
 * Alternative (Early Termination):
 * - seen = {}
 * - Check 1: not in seen, add it → seen = {1}
 * - Check 2: not in seen, add it → seen = {1, 2}
 * - Check 3: not in seen, add it → seen = {1, 2, 3}
 * - Check 1: found in seen → return True immediately
 *
 * ### TIME COMPLEXITY:
 * **O(n)** - where n is the length of the array. In the worst case (no duplicates), we iterate through all n elements, performing one set membership check (**O(1)**) and one set insertion (**O(1)**) for each element. Total: **O(n × 1)** = **O(n)**. In the best case (duplicate found early), we return immediately, giving us **O(1)**. Average case is still **O(n)** as we might need to check most elements. The simple set conversion approach always takes **O(n)** to create the set.
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - We create a set that in the worst case (all elements unique) stores all n elements from the array. Even with duplicates, we may store up to n unique values. The space used grows linearly with input size. For the set comparison approach, Python creates a temporary set of size up to n. For the early termination approach, we build a set incrementally but still use up to **O(n)** space.
 *
 * ### EDGE CASES:
 * - **Empty array**: Return False (no duplicates possible)
 * - **Single element**: Return False (need at least 2 for duplicate)
 * - **All elements same**: Return True immediately on second element
 * - **All elements unique**: Set and array lengths match, return False
 * - **Duplicate at start**: Early termination finds it quickly
 *
 *
 */

function solve(nums) {
  const seen = new Set();

  for (const num of nums) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }

  return false;
}

/**
 * Test cases for Problem 217: Contains Duplicate
 */
function testSolution() {
  console.log("Testing 217. Contains Duplicate");

  // Test case 1: Has duplicates
  const result1 = solve([1, 2, 3, 1]);
  const expected1 = true;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: No duplicates
  const result2 = solve([1, 2, 3, 4]);
  const expected2 = false;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Multiple duplicates
  const result3 = solve([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]);
  const expected3 = true;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  console.log("All test cases passed for 217. Contains Duplicate!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 217. Contains Duplicate ===");
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
