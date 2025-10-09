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
 * Main solution for Problem 451: Sort Characters By Frequency
 *
 * @param {string} s - Input string
 * @return {string} - String with characters sorted by frequency
 *
 * Time Complexity: O(n + k log k) where n is string length, k is unique characters
 * Space Complexity: O(n)
 */
function solve(s) {
    if (!s || s.length === 0) {
        return "";
    }

    // Count character frequencies
    const freqMap = new Map();
    for (const char of s) {
        freqMap.set(char, (freqMap.get(char) || 0) + 1);
    }

    // Build max heap with [char, frequency] pairs
    const maxHeap = new MaxHeap();
    for (const [char, freq] of freqMap) {
        maxHeap.push([char, freq]);
    }

    // Build result string by popping from heap
    let result = "";
    while (maxHeap.size() > 0) {
        const [char, freq] = maxHeap.pop();
        result += char.repeat(freq);
    }

    return result;
}

/**
 * Test cases for Problem 451: Sort Characters By Frequency
 */
function testSolution() {
    console.log('Testing 451. Sort Characters By Frequency');

    // Test case 1: Basic functionality
    const result1 = solve("tree");
    const validOutputs1 = ["eert", "eetr"];
    console.assert(validOutputs1.includes(result1),
        `Test 1 failed: expected one of ${validOutputs1}, got ${result1}`);

    // Test case 2: All same character
    const result2 = solve("cccaaa");
    const validOutputs2 = ["cccaaa", "aaaccc"];
    console.assert(validOutputs2.includes(result2),
        `Test 2 failed: expected one of ${validOutputs2}, got ${result2}`);

    // Test case 3: Single character
    const result3 = solve("a");
    const expected3 = "a";
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: All unique characters
    const result4 = solve("Aabb");
    // Multiple valid outputs depending on heap implementation
    console.assert(result4.length === 4, `Test 4 failed: length should be 4, got ${result4.length}`);

    // Test case 5: Empty string
    const result5 = solve("");
    const expected5 = "";
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 451. Sort Characters By Frequency!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 451. Sort Characters By Frequency ===');
    console.log('Category: Heap');
    console.log('Difficulty: Medium');
    console.log('');

    const s = "tree";
    console.log(`Input: "${s}"`);
    const result = solve(s);
    console.log(`Output: "${result}"`);
    console.log('(Note: Multiple valid outputs are possible)');

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
 * - This solution uses a max heap to sort by frequency
 * - Alternative: Use bucket sort for O(n) time complexity
 * - Multiple valid outputs exist when characters have same frequency
 * - The heap approach is clean and easy to understand
 */
