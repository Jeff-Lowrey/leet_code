/**
 * # Difficulty: Medium
 *
 * # 0421. Maximum XOR of Two Numbers in an Array
 *
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Greedy Algorithm
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space

 *
 * ### INTUITION:
 * [This problem requires understanding of trees concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply trees methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- This ensures that the solution leverages trees principles
- This ensures that time complexity is optimized for the given constraints
- This ensures that space complexity is minimized where possible

### EXAMPLE WALKTHROUGH:
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

class TrieNode {
  constructor() {
    this.children = new Map(); // 0 or 1
  }
}

/**
 * Main solution for Problem 421: Maximum XOR of Two Numbers in an Array
 *
 * @param {number[]} nums - Array of integers
 * @return {number} - Maximum XOR value
 *
 * Time Complexity: O(n) where n = nums.length (32 bits is constant)
 * Space Complexity: O(n) for Trie storage
 */
function solve(nums) {
  if (nums.length < 2) return 0;

  const root = new TrieNode();
  const MAX_BITS = 31; // We work with 32-bit integers

  // Insert a number into the Trie
  function insert(num) {
    let node = root;
    for (let i = MAX_BITS; i >= 0; i--) {
      const bit = (num >> i) & 1;
      if (!node.children.has(bit)) {
        node.children.set(bit, new TrieNode());
      }
      node = node.children.get(bit);
    }
  }

  // Find maximum XOR for a given number
  function findMaxXOR(num) {
    let node = root;
    let maxXOR = 0;

    for (let i = MAX_BITS; i >= 0; i--) {
      const bit = (num >> i) & 1;
      // Try to go opposite direction for maximum XOR
      const toggledBit = 1 - bit;

      if (node.children.has(toggledBit)) {
        maxXOR |= 1 << i; // Set this bit in result
        node = node.children.get(toggledBit);
      } else {
        node = node.children.get(bit);
      }
    }

    return maxXOR;
  }

  // Build Trie with all numbers
  for (const num of nums) {
    insert(num);
  }

  // Find maximum XOR
  let maxResult = 0;
  for (const num of nums) {
    maxResult = Math.max(maxResult, findMaxXOR(num));
  }

  return maxResult;
}

/**
 * Test cases for Problem 421: Maximum XOR of Two Numbers in an Array
 */
function testSolution() {
  console.log("Testing 421. Maximum XOR of Two Numbers in an Array");

  // Test case 1: Basic functionality
  const result1 = solve([3, 10, 5, 25, 2, 8]);
  const expected1 = 28; // 5 XOR 25 = 28
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Two elements
  const result2 = solve([14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70]);
  const expected2 = 127;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Small array
  const result3 = solve([8, 10, 2]);
  const expected3 = 10; // 8 XOR 2 = 10
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Powers of 2
  const result4 = solve([1, 2, 4, 8]);
  const expected4 = 12; // 4 XOR 8 = 12
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Single element
  const result5 = solve([100]);
  const expected5 = 0;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 421. Maximum XOR of Two Numbers!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 421. Maximum XOR of Two Numbers in an Array ===");
  console.log("Category: Trees/Trie");
  console.log("Difficulty: Medium");
  console.log("");

  console.log("Example: nums = [3, 10, 5, 25, 2, 8]");
  const result = solve([3, 10, 5, 25, 2, 8]);
  console.log("Maximum XOR:", result);
  console.log("(5 XOR 25 = 28)");
  console.log("");

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
 * - This solution uses binary Trie for efficient bit-by-bit comparison
 * - Greedy approach works because XOR prioritizes difference in higher bits
 * - Alternative: Bit manipulation with HashSet (O(n) but less intuitive)
 * - Trie approach clearly demonstrates the bit-matching strategy
 * - Works with 32-bit integers (adjust MAX_BITS for different ranges)
 */
