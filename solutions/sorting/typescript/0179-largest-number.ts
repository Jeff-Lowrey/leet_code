/**
 * Difficulty: Medium
 *
 * Given a list of non-negative integers `nums`, arrange them such that they form the largest number and return it.
 *
 * Since the result may be very large, so you need to return a string instead of an integer.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [10,2]</dd>
 * <dt>Output:</dt>
 * <dd>"210"</dd>
 * <dt>Explanation:</dt>
 * <dd>"210" is larger than "102", so we arrange [2, 10]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Custom Comparator, String Concatenation, Greedy Algorithm
 * **Data Structures**: Array, String
 * **Patterns**: Greedy, Custom Sorting
 * **Time Complexity**: O(n log n) - Dominated by sorting operation
 * **Space Complexity**: O(n) - Space for string conversions and result
 *
 * ### INTUITION:
 * To form the largest number, we need a custom comparison: for two numbers a and b, compare the strings formed by concatenating them in different orders (ab vs ba). If ab > ba lexicographically, then a should come before b in the final arrangement.
 *
 * ### APPROACH:
 * We convert all numbers to strings to simplify concatenation and comparison. The key insight is that we need a custom sort comparator that decides which of two numbers should come first.
 *
 * For any two number strings a and b, we compare a+b with b+a (string concatenation). If a+b is lexicographically greater than b+a, then a should come before b in our final result. This comparison ensures that the locally optimal choice (best ordering of any two elements) produces the globally optimal result.
 *
 * After sorting with this custom comparator, we concatenate all strings. We handle the special edge case where all numbers are zeros, which should return "0" instead of "000...".
 *
 * ### WHY THIS WORKS:
 * - Custom comparator ensures optimal local ordering between any two elements
 * - Transitive property holds for concatenation comparison (if a should precede b, and b should precede c, then a should precede c)
 * - Greedy choice (best local order) produces best global result due to transitivity
 * - String comparison naturally handles different lengths correctly
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [3, 30, 34, 5, 9]
 * ```
 *
 * **Step 1:** Convert to strings: ["3", "30", "34", "5", "9"]
 *
 * **Step 2:** Compare pairs: "3"+"30"="330" vs "30"+"3"="303" → "3" before "30"
 *
 * **Step 3:** Compare pairs: "3"+"34"="334" vs "34"+"3"="343" → "34" before "3"
 *
 * **Step 4:** Sort using custom comparator: ["9", "5", "34", "3", "30"]
 *
 * **Step 5:** Concatenate: "9534330"
 *
 * Output:
 * ```
 * "9534330"
 * ```
 *
 * ### TIME COMPLEXITY:
 * **O(n log n)** - The sorting operation dominates, where n is the number of elements. Each comparison takes O(k) where k is the average length of the numbers, but this is typically constant for practical inputs.
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - We create a list of n string representations plus the final concatenated result string. The sorting may use O(log n) additional space for the call stack.
 *
 * ### EDGE CASES:
 * - **All zeros:** [0, 0, 0] → "0" (not "000")
 * - **Single element:** [1] → "1"
 * - **Same digits different lengths:** [3, 30, 300] → "330300"
 * - **Large numbers:** Works correctly due to string comparison
 * - **Mixed sizes:** [121, 12] → "12121" (12+121="12121" > 121+12="12112")
 *
 * </details>
 */

class Solution {
  /**
   * Main solution method
   *
   * Approach: Custom sort comparator with string concatenation
   * Time Complexity: O(n log n)
   * Space Complexity: O(n)
   */
  largestNumber(nums: number[]): string {
    // Convert all numbers to strings
    const numStrs = nums.map(String);

    // Sort with custom comparator
    // Compare a+b vs b+a to determine order
    numStrs.sort((a, b) => {
      const order1 = a + b;
      const order2 = b + a;
      // Sort in descending order (larger concatenation first)
      return order2.localeCompare(order1);
    });

    // Handle edge case: all zeros
    if (numStrs[0] === "0") {
      return "0";
    }

    // Concatenate sorted strings
    return numStrs.join("");
  }
}

// Test cases
function runTests(): void {
  const solution = new Solution();

  // Test case 1: Example from problem
  console.log("Test Case 1:");
  const nums1 = [10, 2];
  const expected1 = "210";
  const result1 = solution.largestNumber(nums1);
  console.log(`Input: ${JSON.stringify(nums1)}`);
  console.log(`Output: ${result1}`);
  console.log(`Expected: ${expected1}`);
  console.log(`Pass: ${result1 === expected1}`);
  console.log();

  // Test case 2: More complex example
  console.log("Test Case 2:");
  const nums2 = [3, 30, 34, 5, 9];
  const expected2 = "9534330";
  const result2 = solution.largestNumber(nums2);
  console.log(`Input: ${JSON.stringify(nums2)}`);
  console.log(`Output: ${result2}`);
  console.log(`Expected: ${expected2}`);
  console.log(`Pass: ${result2 === expected2}`);
  console.log();

  // Test case 3: All zeros edge case
  console.log("Test Case 3 (Edge Case):");
  const nums3 = [0, 0, 0];
  const expected3 = "0";
  const result3 = solution.largestNumber(nums3);
  console.log(`Input: ${JSON.stringify(nums3)}`);
  console.log(`Output: ${result3}`);
  console.log(`Expected: ${expected3}`);
  console.log(`Pass: ${result3 === expected3}`);
  console.log();

  // Test case 4: Single element
  console.log("Test Case 4:");
  const nums4 = [1];
  const expected4 = "1";
  const result4 = solution.largestNumber(nums4);
  console.log(`Input: ${JSON.stringify(nums4)}`);
  console.log(`Output: ${result4}`);
  console.log(`Expected: ${expected4}`);
  console.log(`Pass: ${result4 === expected4}`);
  console.log();
}

// Run tests if executed directly
if (require.main === module) {
  runTests();
}

export default Solution;
