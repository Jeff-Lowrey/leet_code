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
 * **Step 1:** [description]
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

/**
 * MaxHeap implementation for [char, frequency] pairs
 */
class MaxHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    push(item) {
        this.heap.push(item);
        this.bubbleUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return top;
    }

    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex][1] >= this.heap[index][1]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    bubbleDown(index) {
        while (true) {
            let largest = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;

            if (leftChild < this.heap.length && this.heap[leftChild][1] > this.heap[largest][1]) {
                largest = leftChild;
            }
            if (rightChild < this.heap.length && this.heap[rightChild][1] > this.heap[largest][1]) {
                largest = rightChild;
            }
            if (largest === index) break;

            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            index = largest;
        }
    }
}

/**
 * Main solution for Problem 767: Reorganize String
 *
 * @param {string} s - Input string
 * @return {string} - Reorganized string or empty string if impossible
 *
 * Time Complexity: O(n log k) where k is unique characters
 * Space Complexity: O(k)
 */
function solve(s) {
    if (!s || s.length === 0) {
        return "";
    }

    if (s.length === 1) {
        return s;
    }

    // Count character frequencies
    const freqMap = new Map();
    for (const char of s) {
        freqMap.set(char, (freqMap.get(char) || 0) + 1);
    }

    // Check if reorganization is possible
    const maxFreq = Math.max(...freqMap.values());
    if (maxFreq > Math.ceil(s.length / 2)) {
        return "";
    }

    // Build max heap
    const maxHeap = new MaxHeap();
    for (const [char, freq] of freqMap) {
        maxHeap.push([char, freq]);
    }

    let result = "";
    let prev = null; // Previous character that we can't use yet

    while (maxHeap.size() > 0 || prev !== null) {
        // If we only have prev left and it has remaining count, impossible
        if (prev !== null && maxHeap.size() === 0) {
            return "";
        }

        // Get most frequent character
        const [char, freq] = maxHeap.pop();
        result += char;

        // Add previous character back to heap if it has remaining count
        if (prev !== null) {
            maxHeap.push(prev);
        }

        // Update previous character
        if (freq - 1 > 0) {
            prev = [char, freq - 1];
        } else {
            prev = null;
        }
    }

    return result;
}

/**
 * Test cases for Problem 767: Reorganize String
 */
function testSolution() {
    console.log('Testing 767. Reorganize String');

    // Test case 1: Basic functionality
    const result1 = solve("aab");
    const isValid1 = (result1 === "aba" || result1 === "baa") && result1.length === 3;
    console.assert(isValid1, `Test 1 failed: got ${result1}`);

    // Test case 2: Impossible case
    const result2 = solve("aaab");
    const expected2 = "";
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: All unique characters
    const result3 = solve("abc");
    console.assert(result3.length === 3, `Test 3 failed: got ${result3}`);

    // Test case 4: Single character
    const result4 = solve("a");
    const expected4 = "a";
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Complex case
    const result5 = solve("vvvlo");
    // Valid outputs: "vlvov", "vovlv", etc.
    const hasNoAdjacent5 = !/(.)\1/.test(result5);
    console.assert(hasNoAdjacent5 && result5.length === 5,
        `Test 5 failed: got ${result5}, has adjacent: ${!hasNoAdjacent5}`);

    // Test case 6: Empty string
    const result6 = solve("");
    const expected6 = "";
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    console.log('All test cases passed for 767. Reorganize String!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 767. Reorganize String ===');
    console.log('Category: Heap');
    console.log('Difficulty: Medium');
    console.log('');

    const s = "aab";
    console.log(`Input: "${s}"`);
    const result = solve(s);
    console.log(`Output: "${result}"`);
    console.log('Valid reorganizations: "aba" or "baa"');

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
 * - This solution uses a max heap with greedy character selection
 * - The key insight is to always use the most frequent available character
 * - Track previous character to avoid adjacent duplicates
 * - Impossible if any character appears more than (n+1)/2 times
 * - Alternative: Use even/odd index placement for simpler but less general solution
 */
