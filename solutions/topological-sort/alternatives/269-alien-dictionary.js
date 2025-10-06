/**
 * 269. Alien Dictionary
 * Medium
 *
 * Alien Dictionary - Topological Sort Implementation Time Complexity: O(C) where C is the total length of all words combined Space Complexity: O(1) since there can be at most 26 characters in the graph @param {string[]} words - List of words sorted in the alien dictionary @return {string} - The alien dictionary order of characters
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
 * Alien Dictionary - Topological Sort Implementation
 * Time Complexity: O(C) where C is the total length of all words combined
 * Space Complexity: O(1) since there can be at most 26 characters in the graph
 * 
 * @param {string[]} words - List of words sorted in the alien dictionary
 * @return {string} - The alien dictionary order of characters
 */
function alienOrder(words) {
    // Edge case: empty input
    if (!words || words.length === 0) return "";
    
    // Build adjacency list and in-degree count
    const adj = new Map();
    const inDegree = new Map();
    
    // Initialize maps with all unique characters
    for (const word of words) {
        for (const char of word) {
            if (!adj.has(char)) {
                adj.set(char, new Set());
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
                if (!adj.get(char1).has(char2)) {
                    adj.get(char1).add(char2);
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
    
    while (queue.length > 0) {
        const char = queue.shift();
        result.push(char);
        
        // Process neighbors
        for (const neighbor of adj.get(char)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    // Check if we have a valid ordering
    if (result.length !== inDegree.size) {
        return ""; // Cycle detected
    }
    
    return result.join('');
}

// Test cases
const test1 = ["wrt", "wrf", "er", "ett", "rftt"];
console.log(alienOrder(test1)); // Expected: "wertf"

const test2 = ["z", "x"];
console.log(alienOrder(test2)); // Expected: "zx"

const test3 = ["z", "x", "z"];
console.log(alienOrder(test3)); // Expected: ""

module.exports = alienOrder;