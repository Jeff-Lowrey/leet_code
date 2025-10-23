/**
 * # 443. String Compression
 *
 * # Difficulty: Medium
 *
 * Given an array of characters chars, compress it using the following algorithm:
 *
 * Begin with an empty string s. For each group of consecutive repeating characters in chars:
 * - If the group's length is 1, append the character to s.
 * - Otherwise, append the character followed by the group's length.
 *
 * The compressed string s should not be returned separately, but instead, be stored in the
 * input character array chars. Note that group lengths that are 10 or longer will be split
 * into multiple characters in chars.
 *
 * After you are done modifying the input array, return the new length of the array.
 *
 * You must write an algorithm that uses only constant extra space.
 *
 * Example:
 * Input: chars = ["a","a","b","b","c","c","c"]
 * Output: Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>chars = ["a","a","b","b","c","c","c"]</dd>
 * <dt>Output:</dt>
 * <dd>Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]</dd>
 * <dt>Explanation:</dt>
 * <dd>Compressed string ['a','a','b','b','c','c','c'] becomes ['a','2','b','2','c','3'] with length 6</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal
 * **Data Structures**: Array, String
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(1) - Constant extra space

 *
 * ### INTUITION:
 * We need to compress consecutive identical characters in-place. The key insight is using
 * two pointers: one to read through the array, and one to write the compressed result back
 * to the same array. This allows us to modify the array in-place with O(1) extra space.
 *
 * ### APPROACH:
 * 1. **Two Pointers**: Use `read` pointer to scan array, `write` pointer for result
 * 2. **Count Consecutive**: For each character, count how many consecutive times it appears
 * 3. **Write Character**: Always write the character itself
 * 4. **Write Count**: If count > 1, write the count digits
 * 5. **Handle Multi-Digit Counts**: Split counts like 12 into '1', '2'
 *
 * ### WHY THIS WORKS:
 * - Writing pointer never overtakes reading pointer (compressed is always shorter)
 * - We process characters left to right in a single pass
 * - In-place modification is safe because we consume input faster than we produce output
 * - Converting count to string and iterating over digits handles multi-digit counts
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: ["a","a","b","b","c","c","c"]
 *
 * Read pointer scans:
 * 1. chars[0-1]: 'a' appears 2 times
 *    Write: chars[0]='a', chars[1]='2'
 *    write=2
 *
 * 2. chars[2-3]: 'b' appears 2 times
 *    Write: chars[2]='b', chars[3]='2'
 *    write=4
 *
 * 3. chars[4-6]: 'c' appears 3 times
 *    Write: chars[4]='c', chars[5]='3'
 *    write=6
 *
 * Result: ["a","2","b","2","c","3"] with length 6
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through the array with read pointer
 * - Writing compressed data is proportional to input size
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Only using constant extra space (pointers and counters)
 * - Modifying the array in-place
 *
 * ### EDGE CASES:
 * - Single character: Return 1
 * - All different characters: Return original length
 * - All same characters: Return 1 + len(str(count))
 * - Very long runs (count >= 10): Multi-digit handling
 *
 * </details>
 */

/**
 * Main solution for Problem 443: String Compression
 *
 * @param {string[]} chars - Array of characters to compress
 * @return {number} - Length of compressed array
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(chars) {
  let write = 0; // Write pointer
  let read = 0; // Read pointer

  while (read < chars.length) {
    let currentChar = chars[read];
    let count = 0;

    // Count consecutive identical characters
    while (read < chars.length && chars[read] === currentChar) {
      read++;
      count++;
    }

    // Write the character
    chars[write] = currentChar;
    write++;

    // Write the count if greater than 1
    if (count > 1) {
      const countStr = count.toString();
      for (let digit of countStr) {
        chars[write] = digit;
        write++;
      }
    }
  }

  return write;
}

/**
 * Test cases for Problem 443: String Compression
 */
function testSolution() {
  console.log("Testing 443. String Compression");

  // Test case 1: Basic compression
  const test1 = ["a", "a", "b", "b", "c", "c", "c"];
  const result1 = solve(test1);
  const expected1 = 6;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );
  console.assert(
    test1.slice(0, result1).join("") === "a2b2c3",
    `Test 1 array check failed`,
  );

  // Test case 2: Single character groups
  const test2 = ["a", "b", "c"];
  const result2 = solve(test2);
  const expected2 = 3;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Large count (>= 10)
  const test3 = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];
  const result3 = solve(test3);
  const expected3 = 3; // "a","1","2"
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );
  console.assert(
    test3.slice(0, result3).join("") === "a12",
    `Test 3 array check failed`,
  );

  // Test case 4: Single character
  const test4 = ["a"];
  const result4 = solve(test4);
  const expected4 = 1;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Two identical characters
  const test5 = ["a", "a"];
  const result5 = solve(test5);
  const expected5 = 2; // "a","2"
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 443. String Compression!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 443. String Compression ===");
  console.log("Category: String Manipulation");
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
 * - This solution focuses on string manipulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
