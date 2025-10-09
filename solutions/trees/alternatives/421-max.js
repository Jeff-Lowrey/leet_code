/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 *
 * **Step 1:** [description]
 *
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 *
 * </details>
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
                maxXOR |= (1 << i); // Set this bit in result
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
    console.log('Testing 421. Maximum XOR of Two Numbers in an Array');

    // Test case 1: Basic functionality
    const result1 = solve([3, 10, 5, 25, 2, 8]);
    const expected1 = 28; // 5 XOR 25 = 28
    console.assert(result1 === expected1,
        `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Two elements
    const result2 = solve([14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70]);
    const expected2 = 127;
    console.assert(result2 === expected2,
        `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Small array
    const result3 = solve([8, 10, 2]);
    const expected3 = 10; // 8 XOR 2 = 10
    console.assert(result3 === expected3,
        `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Powers of 2
    const result4 = solve([1, 2, 4, 8]);
    const expected4 = 12; // 4 XOR 8 = 12
    console.assert(result4 === expected4,
        `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Single element
    const result5 = solve([100]);
    const expected5 = 0;
    console.assert(result5 === expected5,
        `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 421. Maximum XOR of Two Numbers!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 421. Maximum XOR of Two Numbers in an Array ===');
    console.log('Category: Trees/Trie');
    console.log('Difficulty: Medium');
    console.log('');

    console.log('Example: nums = [3, 10, 5, 25, 2, 8]');
    const result = solve([3, 10, 5, 25, 2, 8]);
    console.log('Maximum XOR:', result);
    console.log('(5 XOR 25 = 28)');
    console.log('');

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
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution uses binary Trie for efficient bit-by-bit comparison
 * - Greedy approach works because XOR prioritizes difference in higher bits
 * - Alternative: Bit manipulation with HashSet (O(n) but less intuitive)
 * - Trie approach clearly demonstrates the bit-matching strategy
 * - Works with 32-bit integers (adjust MAX_BITS for different ranges)
 */
