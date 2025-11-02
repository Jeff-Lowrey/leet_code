/**
 * Difficulty: Medium
 *
 * Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer (similar to C/C++'s `atoi` function).
 *
 * The algorithm for `myAtoi(string s)` is as follows:
 *
 * 1. Read in and ignore any leading whitespace.
 * 2. Check if the next character is '-' or '+'. Read this character if it is either.
 * 3. Read in next characters until the next non-digit character or end of input. The rest of the string is ignored.
 * 4. Convert these digits into an integer. If no digits were read, the integer is 0.
 * 5. If the integer is out of the 32-bit signed integer range [-2^31, 2^31 - 1], clamp it to the range.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>s = "42"</dd>
 * <dt>Output:</dt>
 * <dd>42</dd>
 * <dt>Explanation:</dt>
 * <dd>The underlined characters are what is read in, the caret is the current reader position: "42" → 42</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: String Parsing, State Machine, Bounds Checking
 * **Data Structures**: String
 * **Patterns**: String Processing, Input Validation
 * **Time Complexity**: O(n) - Single pass through the string
 * **Space Complexity**: O(1) - Only using constant extra space
 *
 * ### INTUITION:
 * Process the string character by character following a strict sequence: skip whitespace, read optional sign, accumulate digits until non-digit found, handle overflow by clamping to 32-bit integer range.
 *
 * ### APPROACH:
 * We use a state machine approach to parse the string step by step. First, we skip any leading whitespace characters. Next, we check for an optional sign character ('+' or '-') and record whether the result should be negative.
 *
 * Then, we iterate through the remaining characters, processing only digits. For each digit character, we multiply our current result by 10 and add the digit value. Before each multiplication, we check if the operation would cause overflow beyond the 32-bit signed integer range (INT_MIN = -2^31, INT_MAX = 2^31 - 1). If overflow would occur, we immediately return the clamped value.
 *
 * We stop processing as soon as we encounter a non-digit character or reach the end of the string. If no digits were processed, we return 0.
 *
 * ### WHY THIS WORKS:
 * - Sequential processing handles all required steps in correct order
 * - Early termination on non-digit prevents invalid parsing
 * - Overflow detection before multiplication prevents integer overflow
 * - Clamping ensures result stays within valid 32-bit range
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * s = "   -42"
 * ```
 *
 * **Step 1:** Skip whitespace: index moves from 0 to 3
 *
 * **Step 2:** Read sign: '-' found, set negative flag
 *
 * **Step 3:** Process digit '4': result = 0 * 10 + 4 = 4
 *
 * **Step 4:** Process digit '2': result = 4 * 10 + 2 = 42
 *
 * **Step 5:** Apply sign: result = -42
 *
 * Output:
 * ```
 * -42
 * ```
 *
 * ### TIME COMPLEXITY:
 * **O(n)** - We iterate through the string once, where n is the length of the string. Each character is processed at most once.
 *
 * ### SPACE COMPLEXITY:
 * **O(1)** - We only use a fixed number of variables (result, sign, index) regardless of input size.
 *
 * ### EDGE CASES:
 * - **Only whitespace:** "   " → 0
 * - **No digits after sign:** "+-12" → 0 (stops at second sign)
 * - **Overflow positive:** "2147483648" → 2147483647 (INT_MAX)
 * - **Overflow negative:** "-2147483649" → -2147483648 (INT_MIN)
 * - **Words with numbers:** "words and 987" → 0 (stops at 'w')
 * - **Empty string:** "" → 0
 *
 * </details>
 */

class Solution {
  /**
   * Main solution method
   * @param {string} s - String to convert to integer
   * @return {number} - 32-bit signed integer result
   *
   * Approach: State machine with sequential processing
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  myAtoi(s) {
    if (!s) {
      return 0;
    }

    // Constants for 32-bit signed integer range
    const INT_MAX = Math.pow(2, 31) - 1;
    const INT_MIN = -Math.pow(2, 31);

    // Initialize variables
    let index = 0;
    const n = s.length;
    let sign = 1;
    let result = 0;

    // Step 1: Skip leading whitespace
    while (index < n && s[index] === " ") {
      index++;
    }

    // Step 2: Check for sign
    if (index < n && (s[index] === "+" || s[index] === "-")) {
      sign = s[index] === "-" ? -1 : 1;
      index++;
    }

    // Step 3: Read digits and build number
    while (index < n && s[index] >= "0" && s[index] <= "9") {
      const digit = parseInt(s[index]);

      // Check for overflow before multiplication
      if (result > Math.floor((INT_MAX - digit) / 10)) {
        return sign === 1 ? INT_MAX : INT_MIN;
      }

      result = result * 10 + digit;
      index++;
    }

    // Step 4: Apply sign and return
    return sign * result;
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

// Run tests
function runTests() {
  const solution = new Solution();

  // Test case 1: Basic positive number
  console.log("Test Case 1:");
  const s1 = "42";
  const expected1 = 42;
  const result1 = solution.myAtoi(s1);
  console.log(`Input: "${s1}"`);
  console.log(`Output: ${result1}`);
  console.log(`Expected: ${expected1}`);
  console.log(`Pass: ${result1 === expected1}`);
  console.log();

  // Test case 2: Negative with whitespace
  console.log("Test Case 2:");
  const s2 = "   -42";
  const expected2 = -42;
  const result2 = solution.myAtoi(s2);
  console.log(`Input: "${s2}"`);
  console.log(`Output: ${result2}`);
  console.log(`Expected: ${expected2}`);
  console.log(`Pass: ${result2 === expected2}`);
  console.log();

  // Test case 3: With words after
  console.log("Test Case 3:");
  const s3 = "4193 with words";
  const expected3 = 4193;
  const result3 = solution.myAtoi(s3);
  console.log(`Input: "${s3}"`);
  console.log(`Output: ${result3}`);
  console.log(`Expected: ${expected3}`);
  console.log(`Pass: ${result3 === expected3}`);
  console.log();

  // Test case 4: Overflow positive
  console.log("Test Case 4 (Edge Case):");
  const s4 = "91283472332";
  const expected4 = 2147483647; // INT_MAX
  const result4 = solution.myAtoi(s4);
  console.log(`Input: "${s4}"`);
  console.log(`Output: ${result4}`);
  console.log(`Expected: ${expected4}`);
  console.log(`Pass: ${result4 === expected4}`);
  console.log();

  // Test case 5: Words before numbers
  console.log("Test Case 5:");
  const s5 = "words and 987";
  const expected5 = 0;
  const result5 = solution.myAtoi(s5);
  console.log(`Input: "${s5}"`);
  console.log(`Output: ${result5}`);
  console.log(`Expected: ${expected5}`);
  console.log(`Pass: ${result5 === expected5}`);
  console.log();
}

// Run tests if executed directly
if (typeof require !== "undefined" && require.main === module) {
  runTests();
}
