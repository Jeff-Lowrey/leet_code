/**
 * # Difficulty: Medium
 *
 * # 421. Maximum XOR of Two Numbers in an Array
 *
 * Difficulty: Medium
 *
 * Given an integer array nums, return the maximum result of nums[i] XOR nums[j], where 0 <= i <= j < n.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[3,10,5,25,2,8]</dd>
 * <dt>Output:</dt>
 * <dd>28 (5 XOR 25)</dd>
 * <dt>Explanation:</dt>
 * <dd>The maximum XOR of two numbers is 28, formed by 5 XOR 25 = 28</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Two Pointers Pattern, Greedy Algorithm
 * **Time Complexity**: O(n) - Single pass with O(1) hash lookups
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Build Trie of all numbers. For each number, traverse Trie greedily choosing opposite bit when possible (to maximize XOR). This finds best XOR partner for each number in O(32n).
 *
 * ### APPROACH:
 * 1. **Build trie**: Insert all numbers into trie as binary representations
 * 2. **Initialize max_xor**: Set max_xor = 0
 * 3. **For each number**: Traverse trie trying to take opposite bit at each level
 * 4. **Maximize XOR**: If opposite bit exists, take it; else take same bit
 * 5. **Calculate XOR**: Build XOR value from chosen path
 * 6. **Update maximum**: max_xor = max(max_xor, current_xor)
 * 7. **Return result**: Return max_xor
 *
 * ### WHY THIS WORKS:
 * - Trie with bit-level representation: each node has 0/1 children
 * - For each number, try to take opposite bit path (maximize XOR)
 * - If opposite bit exists, go there (XOR will be 1); else take same bit
 * - Build trie with all numbers, then query each number for max XOR
 * - O(n * 32) time: n numbers, 32 bits each, O(n * 32) space for trie
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [3,10,5,25,2,8]
 * ```
 *
 * Step 1: Build trie of binary representations
 * 3 = 00011
 * 10 = 01010
 * ...
 * Step 2: For each number, find max XOR
 * For 3: try to maximize XOR
 * Result: 3 XOR 25 = 00011 XOR 11001 = 11010 = 26
 *
 * Output:
 * ```
 * 28 (5 XOR 25)
 * ```

### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

class Solution {
  /**
   * Find the maximum XOR value between any two numbers in the array using Trie.
   *
   * Time Complexity: O(n * 32) where n is length of nums
   * Space Complexity: O(n * 32) for the trie
   */
  findMaximumXOR(nums: number[]): number {
    if (!nums || nums.length < 2) {
      return 0;
    }

    // Build Trie
    const trie: { [key: number]: any } = {};
    for (const num of nums) {
      let node = trie;
      // Process each number bit by bit from left to right (31 to 0)
      for (let i = 31; i >= 0; i--) {
        const bit = (num >> i) & 1;
        if (!(bit in node)) {
          node[bit] = {};
        }
        node = node[bit];
      }
    }

    // Find maximum XOR
    let maxXor = 0;
    for (const num of nums) {
      let node = trie;
      let currentXor = 0;
      // Try to go opposite direction for each bit when possible
      for (let i = 31; i >= 0; i--) {
        const bit = (num >> i) & 1;
        // Try to go opposite direction to maximize XOR
        const opposite = 1 - bit;
        if (opposite in node) {
          currentXor = (currentXor << 1) | 1;
          node = node[opposite];
        } else {
          currentXor <<= 1;
          node = node[bit];
        }
      }
      maxXor = Math.max(maxXor, currentXor);
    }

    return maxXor;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.findMaximumXOR([3, 10, 5, 25, 2, 8]) === 28 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.findMaximumXOR([14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70]) === 127 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.findMaximumXOR([1]) === 0 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
