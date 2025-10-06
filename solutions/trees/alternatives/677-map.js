/**
 * 677. Map
 * Medium
 *
 * MapSum class implements a map-like data structure with prefix sum functionality Design a map that allows you to insert key-value pairs and find sum of values for all keys that share a common prefix
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Map is to understand the core problem pattern
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
 * MapSum class implements a map-like data structure with prefix sum functionality
 * Design a map that allows you to insert key-value pairs and find sum of values 
 * for all keys that share a common prefix
 */
class MapSum {
    /**
     * Initialize your data structure here.
     */
    constructor() {
        // Main storage object for key-value pairs
        this.map = new Map();
        // Trie structure for prefix calculations
        this.trie = {};
    }
    
    /**
     * Inserts or updates a key-value pair into the map
     * @param {string} key - The key to insert
     * @param {number} val - The value to associate with the key
     */
    insert(key, val) {
        // Get the old value if it exists
        const oldVal = this.map.get(key) || 0;
        // Update the map with new value
        this.map.set(key, val);
        
        // Update trie structure
        let node = this.trie;
        
        // Traverse through each character of the key
        for (let char of key) {
            // Create new node if it doesn't exist
            if (!node[char]) {
                node[char] = {
                    sum: 0
                };
            }
            // Update sum by adding new value and removing old value
            node[char].sum += val - oldVal;
            node = node[char];
        }
    }
    
    /**
     * Returns the sum of all values of keys that share the given prefix
     * @param {string} prefix - The prefix to search for
     * @return {number} - Sum of values for all keys with given prefix
     */
    sum(prefix) {
        let node = this.trie;
        
        // Traverse through the prefix in trie
        for (let char of prefix) {
            // If prefix not found, return 0
            if (!node[char]) {
                return 0;
            }
            node = node[char];
        }
        
        // Return sum stored at the last node of prefix
        return node.sum;
    }
}

/**
 * Example usage:
 * const mapSum = new MapSum();
 * mapSum.insert("apple", 3);
 * mapSum.sum("ap");    // returns 3
 * mapSum.insert("app", 2);
 * mapSum.sum("ap");    // returns 5
 */

// Export the class for use in other files
module.exports = MapSum;

// Test cases
function runTests() {
    const mapSum = new MapSum();
    
    console.log("Running test cases...");
    
    // Test case 1
    mapSum.insert("apple", 3);
    console.log("Test 1:", mapSum.sum("ap") === 3 ? "PASS" : "FAIL");
    
    // Test case 2
    mapSum.insert("app", 2);
    console.log("Test 2:", mapSum.sum("ap") === 5 ? "PASS" : "FAIL");
    
    // Test case 3
    mapSum.insert("apple", 2);  // updating existing key
    console.log("Test 3:", mapSum.sum("ap") === 4 ? "PASS" : "FAIL");
    
    // Test case 4
    console.log("Test 4:", mapSum.sum("b") === 0 ? "PASS" : "FAIL");
}

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}