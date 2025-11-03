/**
 * # Difficulty: Easy
 *
 * # 0680. Valid Palindrome II
 *
 *
 * Given a string s, return true if the s can be palindrome after deleting at most one character from it.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>"aba"
 * "abca"</dd>
 * <dt>Output:</dt>
 * <dd>* True</dd>
 * <dt>Explanation:</dt>
 * <dd>String 'aba' is a valid palindrome (can delete 0 characters)</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Array Traversal, Two Pointers
 * **Data Structures**: String, Tree
 * **Patterns**: Two Pointers Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space

 *
 * ### INTUITION:
The key insight is that we can use a two-pointer approach to check if a string is a palindrome. When we find a mismatch, we have two options: skip the left character or skip the right character. If either option results in a valid palindrome for the remaining substring, then the original string can be made a palindrome by deleting at most one character.

### APPROACH:
1. **Two pointers**: Start from both ends of the string
2. **Match characters**: Move pointers inward while characters match
3. **Handle mismatch**: When mismatch found, try two options:
   - Skip left character and check remaining substring
   - Skip right character and check remaining substring
4. **Return result**: True if either option results in palindrome

### WHY THIS WORKS:
- This ensures that if string is already palindrome, we return true immediately
- This ensures that when first mismatch occurs, exactly one deletion can potentially fix it
- This ensures that we only need to check the remaining substring after skipping one character
- This ensures that two-pointer palindrome check is efficient and straightforward

### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * "aba"
 * "abca"
 * ```
 *
 * left=0, right=2: s[0]='a' == s[2]='a' ✓
 * left=1, right=1: pointers meet, palindrome found
 * Result: True (already palindrome)
 * left=0, right=3: s[0]='a' == s[3]='a' ✓
 * left=1, right=2: s[1]='b' != s[2]='c' ✗
 *
 * Steps:
 * Step 1: Try skip left (delete 'b'): check "aca" → palindrome ✓
 * Step 2: Result: True
 * 
 * Output:
 * ```
 * True
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 * In worst case, we check the string twice (once normally, once after skip)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 * Only using constant extra space for pointers
 *
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
 */

/**
 * Main solution for Problem 680: Valid Palindrome Ii
 *
 * @param {string} s - Input string
 * @return {boolean} - True if valid palindrome after deleting at most one char
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      // Try skipping left character or right character
      return (
        isPalindrome(s, left + 1, right) || isPalindrome(s, left, right - 1)
      );
    }
    left++;
    right--;
  }

  return true;
}

/**
 * Helper function to check if substring is a palindrome
 *
 * @param {string} s - Input string
 * @param {number} left - Left pointer
 * @param {number} right - Right pointer
 * @return {boolean} - True if substring is palindrome
 */
function isPalindrome(s, left, right) {
  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

/**
 * Test cases for Problem 680: Valid Palindrome Ii
 */
function testSolution() {
  console.log("Testing 680. Valid Palindrome Ii");

  // Test case 1: Can delete one character
  const result1 = solve("aba");
  const expected1 = true;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Need to delete one character
  const result2 = solve("abca");
  const expected2 = true;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Cannot be palindrome
  const result3 = solve("abc");
  const expected3 = false;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Already a palindrome
  const result4 = solve("racecar");
  const expected4 = true;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Two characters
  const result5 = solve("ab");
  const expected5 = true;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 680. Valid Palindrome Ii!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 680. Valid Palindrome Ii ===");
  console.log("Category: String Manipulation");
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
 * - This solution focuses on string manipulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
