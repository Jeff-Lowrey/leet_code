/**
 * # Difficulty: Medium
 *
 * # 0316. Remove Duplicate Letters
 *
 *
 * Given a string s, remove duplicate letters so that every letter appears once and only once. You must make sure your result is the smallest in lexicographical order among all possible results.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>"bcabc"</dd>
 * <dt>Output:</dt>
 * <dd>"abc"</dd>
 * <dt>Explanation:</dt>
 * <dd>After removing duplicate letters while maintaining lexicographical order, result is 'abc'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Set, Array, String
 * **Patterns**: Hash Table Pattern, Greedy Algorithm
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
The key insight is that use monotonic increasing stack. For each character, while stack top > current character, pop if we can remove it (count > 0 and appears later). This ensures lexicographically smallest result.

### APPROACH:
 * 1. **Count occurrences**: Create counter for each character's frequency
 * 2. **Initialize stack and visited**: stack = [], visited = set()
 * 3. **Iterate through string**: For each char in s
 * 4. **Decrement count**: counter[char] -= 1
 * 5. **Skip if visited**: If char in visited, continue
 * 6. **Maintain order**: While stack and stack[-1] > char and counter[stack[-1]] > 0, pop and remove from visited
 * 7. **Add current**: Append char to stack, add to visited
 * 8. **Return result**: Return ''.join(stack)
 *
 * ### WHY THIS WORKS:
 * - Monotonic stack builds lexicographically smallest result
 * - Track remaining count of each char: safe to remove if appears later
 * - Pop larger chars from stack if count > 0 (can add back later)
 * - Visited set prevents duplicate characters in result
 * - Greedy approach works: always try to place smaller char earlier
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * s = "bcabc"
 * ```
 *
 * Step 1: Count frequencies and track remaining
 * freq = {'b':2, 'c':2, 'a':1}
 * Step 2: Build result with monotonic stack
 * Add 'b': stack=['b']
 * Add 'c': stack=['b','c']
 * Add 'a': pop 'c' (a<c, c appears later), pop 'b' (a<b, b appears later)
 * stack=['a']
 * Add 'b': stack=['a','b']
 * Add 'c': stack=['a','b','c']
 *
 * Output:
 * ```
 * "abc"
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 *
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
 */

class Solution {
  /**
   * Remove duplicate letters to create smallest lexicographical order string.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1) - limited to 26 characters
   */
  removeDuplicateLetters(s: string): string {
    // Count last occurrence of each character
    const lastOccurrence: Map<string, number> = new Map();
    for (let i = 0; i < s.length; i++) {
      lastOccurrence.set(s[i], i);
    }

    const stack: string[] = [];
    const inStack: Set<string> = new Set();

    for (let i = 0; i < s.length; i++) {
      const char = s[i];

      // Skip if character already in result
      if (inStack.has(char)) {
        continue;
      }

      // Remove larger characters that appear later
      while (
        stack.length > 0 &&
        stack[stack.length - 1] > char &&
        lastOccurrence.get(stack[stack.length - 1])! > i
      ) {
        const removed = stack.pop()!;
        inStack.delete(removed);
      }

      stack.push(char);
      inStack.add(char);
    }

    return stack.join("");
  }

  /**
   * Alternative using character count.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  removeDuplicateLettersCount(s: string): string {
    const count: Map<string, number> = new Map();

    // Count occurrences
    for (const char of s) {
      count.set(char, (count.get(char) || 0) + 1);
    }

    const stack: string[] = [];
    const inStack: Set<string> = new Set();

    for (const char of s) {
      // Decrement count
      count.set(char, count.get(char)! - 1);

      // Skip if already in result
      if (inStack.has(char)) {
        continue;
      }

      // Remove larger characters that still appear later
      while (
        stack.length > 0 &&
        stack[stack.length - 1] > char &&
        count.get(stack[stack.length - 1])! > 0
      ) {
        const removed = stack.pop()!;
        inStack.delete(removed);
      }

      stack.push(char);
      inStack.add(char);
    }

    return stack.join("");
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1: Basic example
  console.log(`Test 1: ${solution.removeDuplicateLetters("bcabc") === "abc" ? "PASS" : "FAIL"}`);

  // Test case 2: Multiple duplicates
  console.log(`Test 2: ${solution.removeDuplicateLetters("cbacdcbc") === "acdb" ? "PASS" : "FAIL"}`);

  // Test case 3: No duplicates
  console.log(`Test 3: ${solution.removeDuplicateLetters("abcd") === "abcd" ? "PASS" : "FAIL"}`);

  // Test case 4: All same character
  console.log(`Test 4: ${solution.removeDuplicateLetters("aaaa") === "a" ? "PASS" : "FAIL"}`);

  // Test case 5: Reverse alphabetical
  console.log(`Test 5: ${solution.removeDuplicateLetters("dcba") === "abcd" ? "PASS" : "FAIL"}`);

  // Test case 6: Complex pattern
  console.log(`Test 6: ${solution.removeDuplicateLetters("ecbacba") === "eacb" ? "PASS" : "FAIL"}`);

  // Test case 7: Single character
  console.log(`Test 7: ${solution.removeDuplicateLetters("a") === "a" ? "PASS" : "FAIL"}`);

  // Test case 8: Count-based approach
  console.log(`Test 8: ${solution.removeDuplicateLettersCount("bcabc") === "abc" ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
