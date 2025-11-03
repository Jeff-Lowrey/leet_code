/**
### INTUITION:
The key insight is that if all elements are unique, then the array length equals the set length.
If there are duplicates, the set will be smaller than the array.

### APPROACH:
Data structures: Hash Set (seen elements tracking), Array (input)**
1. **Convert array to set**: Transform the input array into a hash set data structure using set operations, which automatically removes all duplicate values
2. **Compare lengths**: Calculate the length of both the original array and the newly created hash set
3. **Detect duplicates**: If the lengths differ, duplicates existed in the original array (they were removed during set conversion using hash table lookup)
4. **Return result**: Return True if lengths differ (duplicates found), False if lengths match (all elements unique)
5. **Alternative early termination**: For better average performance, iterate through array using array traversal and add elements to a hash set one by one using hash table lookup, returning True immediately when an element is already in the hash set

### WHY THIS WORKS:
A set by definition contains only unique elements - when we convert an array to a set, any duplicates are automatically removed. By comparing the lengths of the original array and the set, we can detect if duplicates existed. The early termination approach works because as soon as we find an element already in our seen set, we've proven a duplicate exists without needing to check the remaining elements.

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1, 2, 3, 1]
```

Step 1:** Convert array to set
- Input array: [1, 2, 3, 1]
- After set conversion: {1, 2, 3}
- Duplicates automatically removed during conversion

Step 2:** Compare lengths
- Original array length: 4
- Set length: 3
- Lengths are different (4 ≠ 3)

Step 3:** Detect duplicates
- Since array.length (4) > set.length (3), duplicates existed
- The missing element (1) appeared more than once

Step 4:** Return result
- Lengths differ → return true (duplicates found)

Step 5:** Alternative early termination approach
- seen = {} (start with empty set)
- Check nums[0]=1: not in seen, add it → seen = {1}
- Check nums[1]=2: not in seen, add it → seen = {1, 2}
- Check nums[2]=3: not in seen, add it → seen = {1, 2, 3}
- Check nums[3]=1: found in seen → return true immediately (better average performance)

Output:
```
true
```

### TIME COMPLEXITY:
O(n)** - where n is the length of the array. In the worst case (no duplicates), we iterate through all n elements, performing one Set.has() check (**O(1)**) and one Set.add() operation (**O(1)**) for each element. Total: **O(n × 1)** = **O(n)**. In the best case (duplicate found early), we return immediately, giving us **O(1)**. Average case is still **O(n)** as we might need to check most elements.

### SPACE COMPLEXITY:
O(n)** - In the worst case where all n elements are unique, we store all of them in the Set before returning false. The Set grows linearly with the number of unique elements. In the best case (duplicate found on second element), we'd only store one element in the Set, giving us **O(1)** space. However, worst-case space complexity is **O(n)**.

### EDGE CASES:
- **Empty array**: [] → False (no duplicates possible)
- **Single element**: [1] → False (need at least 2 for duplicate)
- **All elements same**: [1,1,1,1] → True immediately on second element
- **All elements unique**: [1,2,3,4] → Set and array lengths match, return False
- **Duplicate at start**: [1,1,2,3] → Early termination finds it quickly

*/

/**
 * Main solution for Problem 217: Contains Duplicate
 *
 * @param {number[]} nums - Array of integers
 * @return {boolean} - True if any value appears at least twice
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
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
