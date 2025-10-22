/**
 * # 125. Valid Palindrome
 *
 * # Difficulty: Easy
 *
 * A phrase is a palindrome if, after converting all uppercase letters into lowercase
 * letters and removing all `non-alphanumeric` characters, it reads the same forward
 * and backward. Alphanumeric characters include letters and numbers.
 *
 * Given a string s, return true if it is a palindrome, or false otherwise.
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal, Two Pointers
 * **Data Structures**: Hash Set, String, Tree
 * **Patterns**: Two Pointers Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
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
 * ```
 * Input: "A man, a plan, a canal: Panama"
 *
 * Step 1: left=0 (A), right=30 (a)
 * A.lower() == a.lower() → True, continue
 *
 * Step 2: left=1 ( ), right=29 (m)
 * Skip space: left=2 (m), right=29 (m)
 * m.lower() == m.lower() → True, continue
 *
 * Step 3: left=3 (a), right=28 (a)
 * a.lower() == a.lower() → True, continue
 *
 * ... continue until pointers meet ...
 *
 * All comparisons match → return True
 * ```
 *
 * ### TIME COMPLEXITY:
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

class Solution {
  isPalindrome(s: string): boolean {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");

    let left = 0;
    let right = cleaned.length - 1;

    while (left < right) {
      if (cleaned[left] !== cleaned[right]) {
        return false;
      }
      left++;
      right--;
    }

    return true;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.isPalindrome("A man, a plan, a canal: Panama") === true ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.isPalindrome("race a car") === false ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.isPalindrome(" ") === true ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
