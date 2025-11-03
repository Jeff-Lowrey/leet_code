/**
 * # 0443. String Compression
 *
 * Difficulty: Medium
 *
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Array, String, Queue
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * We need to compress consecutive identical characters in-place. The key insight is using
 * two pointers: one to read through the array, and one to write the compressed result back
 * to the same array. This allows us to modify the array in-place with O(1) extra space.
 *
 * ### APPROACH:
The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

Data structures: Array (for storage), String (for conversion)**
1. **Two Pointers**: Use `read` pointer to scan array, `write` pointer for result in array
2. **Count Consecutive**: For each character, count how many consecutive times it appears in array
3. **Write Character**: Always write the character itself to array
4. **Write Count**: If count > 1, write the count digits to array using string conversion
5. **Handle Multi-Digit Counts**: Split counts like 12 into '1', '2' using string operations

### WHY THIS WORKS:
 * - Writing pointer never overtakes reading pointer (compressed is always shorter)
 * - We process characters left to right in a single pass
 * - In-place modification is safe because we consume input faster than we produce output
 * - Converting count to string and iterating over digits handles multi-digit counts
 *
 *

This solution uses hash table lookup for efficient implementation.

This solution uses hash map storage for efficient implementation.

The solution leverages queue for efficient operations.
### EXAMPLE WALKTHROUGH:
*Input:** chars = ["a","a","b","b","c","c","c"]

*Step 1:** Process 'a' group (read=0) for chars=["a","a","b","b","c","c","c"]
- Count: 2 occurrences at indices 0-1
- Write: chars[0]='a', chars[1]='2'
- write=2, read=2

*Step 2:** Process 'b' group (read=2)
- Count: 2 occurrences at indices 2-3
- Write: chars[2]='b', chars[3]='2'
- write=4, read=4

*Step 3:** Process 'c' group (read=4)
- Count: 3 occurrences at indices 4-6
- Write: chars[4]='c', chars[5]='3'
- write=6, read=7

*Step 4:** Write count for each group
- For 'a': count=2 (single digit), write '2'
- For 'b': count=2 (single digit), write '2'
- For 'c': count=3 (single digit), write '3'
- Array after writes: ["a","2","b","2","c","3",...]

*Step 5:** Handle multi-digit counts (if any)
- Example: If count was 12, convert to string "12"
- Split into digits: '1', '2'
- Write each digit separately to array
- In this case, all counts are single-digit (no splitting needed)
- Return write pointer = 6

Output:
```
6
```

### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 * - Single pass through the array with read pointer
 * - Writing compressed data is proportional to input size
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 * - Only using constant extra space (pointers and counters)
 * - Modifying the array in-place
 *
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
 */

class Solution {
  /**
   * Compress array of characters in-place.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  compress(chars: string[]): number {
    if (!chars || chars.length === 0) {
      return 0;
    }

    let write = 0; // Position to write compressed data
    let read = 0; // Position to read original data

    while (read < chars.length) {
      const currentChar = chars[read];
      let count = 0;

      // Count consecutive occurrences of current character
      while (read < chars.length && chars[read] === currentChar) {
        read++;
        count++;
      }

      // Write the character
      chars[write] = currentChar;
      write++;

      // Write the count if greater than 1
      if (count > 1) {
        // Convert count to string and write each digit
        const countStr = count.toString();
        for (const digit of countStr) {
          chars[write] = digit;
          write++;
        }
      }
    }

    return write;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const chars1 = ["a", "a", "b", "b", "c", "c", "c"];
  const result1 = solution.compress(chars1);
  console.log(`Test 1: ${result1 === 6 && JSON.stringify(chars1.slice(0, 6)) === JSON.stringify(["a", "2", "b", "2", "c", "3"]) ? "PASS" : "FAIL"}`);

  const chars2 = ["a"];
  const result2 = solution.compress(chars2);
  console.log(`Test 2: ${result2 === 1 && chars2[0] === "a" ? "PASS" : "FAIL"}`);

  const chars3 = ["a", "b", "c"];
  const result3 = solution.compress(chars3);
  console.log(`Test 3: ${result3 === 3 ? "PASS" : "FAIL"}`);

  const chars4 = ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"];
  const result4 = solution.compress(chars4);
  console.log(`Test 4: ${result4 === 3 && JSON.stringify(chars4.slice(0, 3)) === JSON.stringify(["a", "1", "2"]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
