/**
 * 269. Alien Dictionary
 * Medium
 *
 * Alien Dictionary - Finds the order of characters in an alien language Given a sorted dictionary of alien words, determine the order of characters in the alien alphabet @param {string[]} words - Array of words sorted according to alien dictionary @return {string} - The order of characters in the alien alphabet
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Alien Dictionary is to understand the core problem pattern
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
 * Alien Dictionary - Finds the order of characters in an alien language
 * Given a sorted dictionary of alien words, determine the order of characters in the alien alphabet
 * 
 * @param {string[]} words - Array of words sorted according to alien dictionary
 * @return {string} - The order of characters in the alien alphabet
 */

function alienDictionary(words) {
    // Edge cases
    if (!words || words.length === 0) return "";
    if (words.length === 1) return words[0].split('').filter((c, i, arr) => arr.indexOf(c) === i).join('');

    // Create adjacency list to store character relationships
    const graph = new Map();
    const inDegree = new Map();

    // Initialize graph and inDegree maps with all unique characters
    for (const word of words) {
        for (const char of word) {
            if (!graph.has(char)) {
                graph.set(char, new Set());
                inDegree.set(char, 0);
            }
        }
    }

    // Build graph by comparing adjacent words
    for (let i = 0; i < words.length - 1; i++) {
        const word1 = words[i];
        const word2 = words[i + 1];
        
        // Check if word2 is a prefix of word1 (invalid case)
        if (word1.length > word2.length && word1.startsWith(word2)) {
            return "";
        }

        // Find first different character between adjacent words
        const len = Math.min(word1.length, word2.length);
        for (let j = 0; j < len; j++) {
            const char1 = word1[j];
            const char2 = word2[j];
            
            if (char1 !== char2) {
                // Add edge if it doesn't exist
                if (!graph.get(char1).has(char2)) {
                    graph.get(char1).add(char2);
                    inDegree.set(char2, inDegree.get(char2) + 1);
                }
                break;
            }
        }
    }

    // Perform topological sort using BFS
    const queue = [];
    const result = [];

    // Add all nodes with 0 in-degree to queue
    for (const [char, degree] of inDegree) {
        if (degree === 0) {
            queue.push(char);
        }
    }

    // Process queue
    while (queue.length > 0) {
        const char = queue.shift();
        result.push(char);

        // Reduce in-degree of neighbors
        for (const neighbor of graph.get(char)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }

    // Check if we have a valid ordering
    if (result.length !== graph.size) {
        return ""; // Cycle detected
    }

    return result.join('');
}

// Test cases
function runTests() {
    console.log("Test Case 1:");
    console.log(alienDictionary(["wrt", "wrf", "er", "ett", "rftt"]));
    // Expected output: "wertf"

    console.log("\nTest Case 2:");
    console.log(alienDictionary(["z", "x"]));
    // Expected output: "zx"

    console.log("\nTest Case 3:");
    console.log(alienDictionary(["z", "x", "z"]));
    // Expected output: "" (invalid order)

    console.log("\nTest Case 4:");
    console.log(alienDictionary(["abc", "ab"]));
    // Expected output: "" (invalid order)
}

// Export the function for use in other modules
module.exports = alienDictionary;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}