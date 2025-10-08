/**
 * 692. Top K Frequent Words
 * Medium
 *
 * This problem demonstrates key concepts in Heap.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * We need to find k most frequent words, with lexicographical ordering as tiebreaker.
 * A min heap of size k allows us to efficiently track the top k elements.
 *
 * APPROACH:
 * 1. **Count Frequencies**: Use hash map to count word frequencies
 * 2. **Build Min Heap**: Maintain heap of size k with custom comparator
 * 3. **Heap Comparator**: Compare by frequency (ascending), then by word (descending)
 * 4. **Extract Results**: Pop all from heap and reverse for correct order
 *
 * WHY THIS WORKS:
 * - Min heap keeps the k most frequent words
 * - Custom comparator ensures correct ordering
 * - Heap size k means O(log k) operations
 * - By using min heap, we can efficiently discard less frequent words
 *
 * TIME COMPLEXITY: O(n log k) where n is number of words
 * SPACE COMPLEXITY: O(n) for frequency map
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: words = ["i","love","leetcode","i","love","coding"], k = 2
 * Step 1: Count: {i: 2, love: 2, leetcode: 1, coding: 1}
 * Step 2: Build heap of top k: ["i", "love"]
 * Step 3: Sort by frequency desc, then lexicographically
 * Output: ["i", "love"]
 * ```
 *
 * EDGE CASES:
 * - Single word
 * - All words have same frequency
 * - k equals number of unique words
 * - Words with same frequency (lexicographical order)
 */

/**
 * MinHeap implementation with custom comparator for [word, frequency] pairs
 * Comparison: First by frequency (ascending), then by word (descending for lexicographical)
 */
class MinHeap {
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

    // Custom comparator: returns true if a should be higher priority (smaller) than b
    compare(a, b) {
        // If frequencies are different, smaller frequency has higher priority (min heap)
        if (a[1] !== b[1]) {
            return a[1] < b[1];
        }
        // If frequencies are same, lexicographically larger word has higher priority
        // (so it gets removed first, keeping lexicographically smaller words)
        return a[0] > b[0];
    }

    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (!this.compare(this.heap[index], this.heap[parentIndex])) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    bubbleDown(index) {
        while (true) {
            let smallest = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;

            if (leftChild < this.heap.length && this.compare(this.heap[leftChild], this.heap[smallest])) {
                smallest = leftChild;
            }
            if (rightChild < this.heap.length && this.compare(this.heap[rightChild], this.heap[smallest])) {
                smallest = rightChild;
            }
            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}

/**
 * Main solution for Problem 692: Top K Frequent Words
 *
 * @param {string[]} words - Array of words
 * @param {number} k - Number of top frequent words to return
 * @return {string[]} - Top k frequent words in order
 *
 * Time Complexity: O(n log k)
 * Space Complexity: O(n)
 */
function solve(words, k) {
    if (!words || words.length === 0 || k === 0) {
        return [];
    }

    // Count word frequencies
    const freqMap = new Map();
    for (const word of words) {
        freqMap.set(word, (freqMap.get(word) || 0) + 1);
    }

    // Build min heap of size k
    const minHeap = new MinHeap();
    for (const [word, freq] of freqMap) {
        minHeap.push([word, freq]);
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }

    // Extract results and reverse (min heap gives us reverse order)
    const result = [];
    while (minHeap.size() > 0) {
        result.push(minHeap.pop()[0]);
    }

    return result.reverse();
}

/**
 * Test cases for Problem 692: Top K Frequent Words
 */
function testSolution() {
    console.log('Testing 692. Top K Frequent Words');

    // Test case 1: Basic functionality
    const result1 = solve(["i", "love", "leetcode", "i", "love", "coding"], 2);
    const expected1 = ["i", "love"];
    console.assert(JSON.stringify(result1) === JSON.stringify(expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: Lexicographical ordering
    const result2 = solve(["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], 4);
    const expected2 = ["the", "is", "sunny", "day"];
    console.assert(JSON.stringify(result2) === JSON.stringify(expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: Single word
    const result3 = solve(["a", "a", "a"], 1);
    const expected3 = ["a"];
    console.assert(JSON.stringify(result3) === JSON.stringify(expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: All unique words
    const result4 = solve(["a", "b", "c"], 2);
    const expected4 = ["a", "b"];
    console.assert(JSON.stringify(result4) === JSON.stringify(expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: k equals unique word count
    const result5 = solve(["i", "love", "coding"], 3);
    const expected5 = ["coding", "i", "love"];
    console.assert(JSON.stringify(result5) === JSON.stringify(expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    console.log('All test cases passed for 692. Top K Frequent Words!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 692. Top K Frequent Words ===');
    console.log('Category: Heap');
    console.log('Difficulty: Medium');
    console.log('');

    const words = ["i", "love", "leetcode", "i", "love", "coding"];
    const k = 2;
    console.log(`Input: words = [${words}], k = ${k}`);
    const result = solve(words, k);
    console.log(`Output: [${result}]`);

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
 * - This solution uses a min heap with custom comparator
 * - The comparator handles both frequency and lexicographical ordering
 * - Min heap of size k is more efficient than sorting all words
 * - Alternative: Use bucket sort for O(n) time if frequencies are bounded
 */
