/**
 * # Difficulty: Easy
 * 
 * # 136. Single Number
 * 
 * Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
 * 
 * You must implement a solution with a linear runtime complexity and use only constant extra space.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[4,1,2,1,2]</dd>
 * <dt>Output:</dt>
 * <dd>4 (single number)</dd>
 * <dt>Explanation:</dt>
 * <dd>The single number 4 appears once in [2,2,1,4,1] (all others appear twice)</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * 
 * ### METADATA:
 * **Techniques**: Bit Manipulation, XOR Properties
 * **Data Structures**: Array
 * **Patterns**: Mathematical Property Exploitation
 * **Time Complexity**: O(n) - Single pass through array
 * **Space Complexity**: O(1) - Only accumulator variable
 * 
 * 
 * ### INTUITION:
 * The XOR operation has special properties that make this problem elegant:
 * - XOR of two identical numbers equals 0: `a ^ a = 0`
 * - XOR with 0 returns the number itself: `a ^ 0 = a`
 * - XOR is commutative and associative
 * 
 * When we XOR all numbers together, pairs cancel out to 0, leaving only the single number.
 * 
 * 
 * ### APPROACH:
 * 1. **Initialize accumulator**: Start with result = 0
 * 2. **XOR all elements**: Iterate through array, XORing each number with result
 * 3. **Pairs cancel**: Duplicate numbers cancel to 0 due to XOR properties
 * 4. **Return result**: Final value is the single number
 * 
 * 
 * ### WHY THIS WORKS:
 * - XOR is both commutative and associative (order doesn't matter)
 * - Every paired number cancels: `(a ^ a) = 0`
 * - The single number XORed with 0 returns itself: `single ^ 0 = single`
 * - Final result: `0 ^ single = single`
 * 
 * 
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums = [4,1,2,1,2]
 * 
 * Step 1: result = 0
 * Step 2: result = 0 ^ 4 = 4 (binary: 0100)
 * Step 3: result = 4 ^ 1 = 5 (binary: 0101)
 * Step 4: result = 5 ^ 2 = 7 (binary: 0111)
 * Step 5: result = 7 ^ 1 = 6 (binary: 0110)
 * Step 6: result = 6 ^ 2 = 4 (binary: 0100)
 * 
 * Pairs cancelled: (1^1)=0, (2^2)=0
 * Remaining: 4
 * 
 * Output: 4 (single number)
 * ```
 * 
 * 
 * ### TIME COMPLEXITY:
 * O(n) - Single pass through array
 * 
 * 
 * ### SPACE COMPLEXITY:
 * O(1) - Only uses one variable for accumulation
 * 
 * 
 * ### EDGE CASES:
 * - Single element array: [x] → returns x
 * - Negative numbers: XOR works with signed integers
 * - Large arrays: Linear time scales well
 * - Minimum input: At least one element guaranteed
 * 
 * </details>
 */

class Solution {
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  demonstrate_solution();
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;