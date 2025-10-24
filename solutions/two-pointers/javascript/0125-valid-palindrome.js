/**
 * # 125. Valid Palindrome
 *
 * Difficulty: Medium
 *
 * # Difficulty: Easy
 *
 * A phrase is a palindrome if, after converting all uppercase letters into lowercase
 * letters and removing all `non-alphanumeric` characters, it reads the same forward
 * and backward. Alphanumeric characters include letters and numbers.
 *
 * Given a string s, return true if it is a palindrome, or false otherwise.
 *
 * Example:
 * Input: s = "A man, a plan, a canal: Panama"
 * Output: true
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>s = "A man, a plan, a canal: Panama"</dd>
 * <dt>Output:</dt>
 * <dd>true</dd>
 * <dt>Explanation:</dt>
 * <dd>String 'A man, a plan, a canal: Panama' is a valid palindrome</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Array Traversal, Two Pointers
 * **Data Structures**: String, Tree
 * **Patterns**: Two Pointers Pattern
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(1) - Constant extra space

 *
 * ### INTUITION:
 * Use two pointers from both ends of the string, skipping non-alphanumeric characters and comparing characters case-insensitively. This avoids creating a cleaned string, saving space.
 *
 * ### APPROACH:
 * 1. **Initialize two pointers**: Set left pointer at start (0) and right pointer at end (len(s) - 1)
 * 2. **Skip non-alphanumeric from left**: Move left pointer forward while current character is not alphanumeric
 * 3. **Skip non-alphanumeric from right**: Move right pointer backward while current character is not alphanumeric
 * 4. **Compare characters**: Convert both characters to lowercase and compare them
 * 5. **Return false if mismatch**: If characters don't match, string is not a palindrome - return False
 * 6. **Move pointers inward**: If characters match, increment left and decrement right pointers
 * 7. **Return true when pointers meet**: If loop completes without finding mismatch, string is a palindrome - return True
 *
 * ### WHY THIS WORKS:
 * - Two pointers naturally check palindrome property (symmetric comparison)
 * - Skipping non-alphanumeric characters handles the cleaning requirement
 * - Case-insensitive comparison handles uppercase/lowercase requirement
 * - O(1) space since we don't create a new string
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * "A man, a plan, a canal: Panama"
 * ```
 *
 * Step 1: left=0 (A), right=30 (a)
 *
 * Steps:
 * Step 1: A.lower() == a.lower() → True, continue
 * Step 2: left=1 ( ), right=29 (m)
 * Step 3: Skip space: left=2 (m), right=29 (m)
 * Step 4: m.lower() == m.lower() → True, continue
 * Step 5: left=3 (a), right=28 (a)
 * Step 6: a.lower() == a.lower() → True, continue
 * Step 7: ... continue until pointers meet ...
 * Step 8: All comparisons match → return True

### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - **Empty string**: Return True (empty is palindrome)
 * - **Single character**: Return True (single char is palindrome)
 * - **Only non-alphanumeric**: Return True after filtering
 * - **Mixed case**: Convert to lowercase for comparison
 * - **No letters/digits**: Return True (vacuously true)
 *
 * </details>
 */

/**
 * Main solution for Problem 125: Valid Palindrome
 *
 * @param {string} s - String to check for palindrome
 * @return {boolean} - True if valid palindrome, false otherwise
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(s) {
  return isPalindrome(s);
}

/**
 * Check if string is a valid palindrome (alphanumeric, case-insensitive)
 * @param {string} s - Input string
 * @return {boolean} - True if palindrome, false otherwise
 */
function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Skip non-alphanumeric characters from left
    while (left < right && !isAlphanumeric(s[left])) {
      left++;
    }

    // Skip non-alphanumeric characters from right
    while (left < right && !isAlphanumeric(s[right])) {
      right--;
    }

    // Compare characters (case-insensitive)
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

/**
 * Helper function to check if character is alphanumeric
 * @param {string} char - Character to check
 * @return {boolean} - True if alphanumeric, false otherwise
 */
function isAlphanumeric(char) {
  return /^[a-zA-Z0-9]$/.test(char);
}

/**
 * Alternative implementation using string cleaning
 * @param {string} s - Input string
 * @return {boolean} - True if palindrome, false otherwise
 */
function isPalindromeAlternative(s) {
  // Clean string: keep only alphanumeric, convert to lowercase
  const cleaned = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  // Check if cleaned string equals its reverse
  return cleaned === cleaned.split("").reverse().join("");
}

/**
 * Test cases for Problem 125: Valid Palindrome
 */
function testSolution() {
  console.log("Testing 125. Valid Palindrome");

  // Test case 1: Valid palindrome with spaces and punctuation
  const result1 = solve("A man, a plan, a canal: Panama");
  console.assert(result1 === true, "Test 1 failed: should be valid palindrome");

  // Test case 2: Not a palindrome
  const result2 = solve("race a car");
  console.assert(result2 === false, "Test 2 failed: should not be palindrome");

  // Test case 3: Empty string (considered palindrome)
  const result3 = solve("");
  console.assert(
    result3 === true,
    "Test 3 failed: empty string should be palindrome",
  );

  // Test case 4: Single character
  const result4 = solve("a");
  console.assert(
    result4 === true,
    "Test 4 failed: single character should be palindrome",
  );

  // Test case 5: Only non-alphanumeric
  const result5 = solve(".,");
  console.assert(
    result5 === true,
    "Test 5 failed: only punctuation should be palindrome",
  );

  // Test case 6: Mixed case
  const result6 = solve("Madam");
  console.assert(result6 === true, "Test 6 failed: mixed case palindrome");

  // Test case 7: Numbers and letters
  const result7 = solve("0P");
  console.assert(result7 === false, "Test 7 failed: 0P is not palindrome");

  // Test alternative implementation
  console.assert(
    isPalindromeAlternative("A man, a plan, a canal: Panama") === true,
    "Alternative test failed",
  );

  console.log("All test cases passed for 125. Valid Palindrome!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 125. Valid Palindrome ===");
  console.log("Category: Two Pointers");
  console.log("Difficulty: Easy");
  console.log("");

  // Example demonstration
  const examples = [
    "A man, a plan, a canal: Panama",
    "race a car",
    "Madam",
    "",
    ".,",
  ];

  examples.forEach((example, index) => {
    const result = solve(example);
    console.log(`Example ${index + 1}: "${example}" -> ${result}`);
  });
  console.log("");

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  isPalindrome,
  isPalindromeAlternative,
  isAlphanumeric,
  solve,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution uses the classic two-pointers technique for O(1) space
 * - Alternative string cleaning approach uses O(n) space but may be more readable
 * - The two-pointers approach is more efficient and demonstrates the pattern well
 * - Alphanumeric regex check could be optimized with ASCII value checks
 * - Critical for understanding palindrome validation and two-pointers pattern
 * - The approach generalizes to other string comparison problems
 */
