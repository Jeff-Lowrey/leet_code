/**
 * 347. Top K Frequent Elements
 * Medium
 *
 * Top K Frequent Elements Implementation This solution finds the k most frequent elements in an array using a combination of hash map for counting and sorting for selection. Time Complexity: O(n log n) where n is the length of the input array Space Complexity: O(n) for storing the frequency map
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Top K Frequent Elements is to understand the core problem pattern
 * and apply the most efficient algorithmic approach.
 *
 * ### APPROACH:
 * 1. Analyze the problem requirements
 * 2. Choose the optimal data structure
 * 3. Implement the solution step by step
 * 4. Handle edge cases appropriately
 *
 * ### WHY THIS WORKS:
 * This approach works because it leverages the fundamental properties of the problem
 * to achieve an efficient solution.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For a typical input, the algorithm processes the data systematically
 * to produce the expected output.
 *
 * </details>
 */

/**
 * Top K Frequent Elements Implementation
 * 
 * This solution finds the k most frequent elements in an array using a combination
 * of hash map for counting and sorting for selection.
 * 
 * Time Complexity: O(n log n) where n is the length of the input array
 * Space Complexity: O(n) for storing the frequency map
 */

/**
 * @param {number[]} nums - Input array of numbers
 * @param {number} k - Number of top frequent elements to return
 * @return {number[]} - Array containing k most frequent elements
 */
function topKFrequent(nums, k) {
    // Handle edge cases
    if (!nums || nums.length === 0) return [];
    if (k <= 0) return [];
    if (k > nums.length) k = nums.length;

    // Create frequency map
    const frequencyMap = new Map();
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    // Convert map to array of [number, frequency] pairs and sort by frequency
    const sortedFrequencies = Array.from(frequencyMap.entries())
        .sort((a, b) => b[1] - a[1]);

    // Extract top k numbers
    return sortedFrequencies.slice(0, k).map(pair => pair[0]);
}

/**
 * Alternative implementation using bucket sort approach
 * Time Complexity: O(n) where n is the length of the input array
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function topKFrequentBucket(nums, k) {
    // Handle edge cases
    if (!nums || nums.length === 0) return [];
    if (k <= 0) return [];
    if (k > nums.length) k = nums.length;

    // Create frequency map
    const frequencyMap = new Map();
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    }

    // Create buckets (index represents frequency)
    const buckets = Array.from({ length: nums.length + 1 }, () => []);
    for (const [num, freq] of frequencyMap) {
        buckets[freq].push(num);
    }

    // Collect k most frequent elements
    const result = [];
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        result.push(...buckets[i]);
    }

    return result.slice(0, k);
}

// Test cases
const testCases = [
    {
        nums: [1, 1, 1, 2, 2, 3],
        k: 2,
        expected: [1, 2]
    },
    {
        nums: [1],
        k: 1,
        expected: [1]
    },
    {
        nums: [1, 2, 3, 4],
        k: 3,
        expected: [1, 2, 3]
    }
];

// Run tests
function runTests() {
    console.log("Running tests...");
    testCases.forEach((test, index) => {
        const result1 = topKFrequent(test.nums, test.k);
        const result2 = topKFrequentBucket(test.nums, test.k);
        
        console.log(`Test ${index + 1}:`);
        console.log(`Input: nums = [${test.nums}], k = ${test.k}`);
        console.log(`Expected: [${test.expected}]`);
        console.log(`Regular Solution Output: [${result1}]`);
        console.log(`Bucket Solution Output: [${result2}]`);
        console.log('---');
    });
}

// Export functions for external use
module.exports = {
    topKFrequent,
    topKFrequentBucket
};

// Uncomment to run tests
// runTests();