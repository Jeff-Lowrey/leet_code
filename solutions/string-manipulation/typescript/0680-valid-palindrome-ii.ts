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
 * <dd>true</dd>
 * <dt>Explanation:</dt>
 * <dd>String 'aba' is a valid palindrome (can delete 0 characters)</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
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

class Solution {
  /**
   * Check if string can be palindrome after deleting at most one character.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  validPalindrome(s: string): boolean {
    const isPalindrome = (left: number, right: number): boolean => {
      while (left < right) {
        if (s[left] !== s[right]) {
          return false;
        }
        left++;
        right--;
      }
      return true;
    };

    let left = 0;
    let right = s.length - 1;

    while (left < right) {
      if (s[left] !== s[right]) {
        // Try skipping either left or right character
        return isPalindrome(left + 1, right) || isPalindrome(left, right - 1);
      }
      left++;
      right--;
    }

    // No mismatches found, already a palindrome
    return true;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.validPalindrome("aba") === true ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.validPalindrome("abca") === true ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.validPalindrome("abc") === false ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.validPalindrome("racecar") === true ? "PASS" : "FAIL"}`);
  console.log(`Test 5: ${solution.validPalindrome("deeee") === true ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
