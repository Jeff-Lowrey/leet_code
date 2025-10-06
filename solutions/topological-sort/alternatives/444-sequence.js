/**
 * 444. Sequence
 * Medium
 *
 * Sequence Reconstruction Determines if a sequence can be uniquely reconstructed from its subsequences. @param {number[]} org - The original sequence @param {number[][]} seqs - Array of subsequences @return {boolean} - Returns true if sequence can be uniquely reconstructed
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Sequence is to understand the core problem pattern
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
 * Sequence Reconstruction
 * Determines if a sequence can be uniquely reconstructed from its subsequences.
 * 
 * @param {number[]} org - The original sequence
 * @param {number[][]} seqs - Array of subsequences
 * @return {boolean} - Returns true if sequence can be uniquely reconstructed
 */
function sequenceReconstruction(org, seqs) {
    // Handle edge cases
    if (!org || !seqs) return false;
    if (seqs.length === 0) return org.length === 0;

    // Create a map to store graph edges
    const graph = new Map();
    // Create a map to store in-degree of each node
    const inDegree = new Map();

    // Initialize the graph and in-degree maps
    for (const seq of seqs) {
        for (const num of seq) {
            if (!graph.has(num)) {
                graph.set(num, new Set());
                inDegree.set(num, 0);
            }
        }
    }

    // Build the graph and calculate in-degrees
    for (const seq of seqs) {
        for (let i = 0; i < seq.length - 1; i++) {
            const curr = seq[i];
            const next = seq[i + 1];
            
            // Add edge if it doesn't exist
            if (!graph.get(curr).has(next)) {
                graph.get(curr).add(next);
                inDegree.set(next, inDegree.get(next) + 1);
            }
        }
    }

    // If org contains numbers not in sequences
    for (const num of org) {
        if (!graph.has(num)) return false;
    }

    // Topological sort using BFS
    const queue = [];
    
    // Add all nodes with in-degree 0 to queue
    for (const [num, degree] of inDegree) {
        if (degree === 0) {
            queue.push(num);
        }
    }

    let index = 0;
    
    // Process the queue
    while (queue.length === 1 && index < org.length) {
        const curr = queue.shift();
        
        // Check if current number matches original sequence
        if (curr !== org[index]) {
            return false;
        }
        
        // Process neighbors
        for (const next of graph.get(curr)) {
            inDegree.set(next, inDegree.get(next) - 1);
            if (inDegree.get(next) === 0) {
                queue.push(next);
            }
        }
        
        index++;
    }

    // Check if we processed all numbers in original sequence
    return index === org.length && index === graph.size;
}

// Test cases
const testCases = [
    {
        org: [1, 2, 3],
        seqs: [[1, 2], [1, 3], [2, 3]],
        expected: true
    },
    {
        org: [1, 2, 3],
        seqs: [[1, 2]],
        expected: false
    },
    {
        org: [1, 2, 3],
        seqs: [[1, 2], [1, 3], [2, 3], [3, 2]],
        expected: false
    }
];

// Run test cases
testCases.forEach((test, index) => {
    const result = sequenceReconstruction(test.org, test.seqs);
    console.log(`Test case ${index + 1}:`);
    console.log(`Original sequence: [${test.org}]`);
    console.log(`Subsequences: ${JSON.stringify(test.seqs)}`);
    console.log(`Expected: ${test.expected}, Got: ${result}`);
    console.log(`Result: ${result === test.expected ? 'PASS' : 'FAIL'}\n`);
});

module.exports = sequenceReconstruction;