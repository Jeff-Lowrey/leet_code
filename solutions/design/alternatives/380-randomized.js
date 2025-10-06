/**
 * 380. Randomized
 * Medium
 *
 * RandomizedSet Class Implementation This class implements a data structure that supports: - Inserting elements (no duplicates allowed) - Removing elements - Getting a random element All operations should work in O(1) average time complexity
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Randomized is to understand the core problem pattern
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
 * RandomizedSet Class Implementation
 * 
 * This class implements a data structure that supports:
 * - Inserting elements (no duplicates allowed)
 * - Removing elements
 * - Getting a random element
 * All operations should work in O(1) average time complexity
 */
class RandomizedSet {
    /**
     * Initialize your data structure here.
     * Using both a Map and Array for O(1) operations
     */
    constructor() {
        // Map to store value -> index mapping for O(1) lookup
        this.valueMap = new Map();
        // Array to store actual values for O(1) random access
        this.values = [];
    }
    
    /**
     * Inserts a value to the set.
     * Returns true if the set did not already contain the specified element.
     * @param {number} val
     * @return {boolean}
     */
    insert(val) {
        // Check if value already exists
        if (this.valueMap.has(val)) {
            return false;
        }
        
        // Add value to array and store its index in map
        this.valueMap.set(val, this.values.length);
        this.values.push(val);
        return true;
    }
    
    /**
     * Removes a value from the set.
     * Returns true if the set contained the specified element.
     * @param {number} val
     * @return {boolean}
     */
    remove(val) {
        // Check if value exists
        if (!this.valueMap.has(val)) {
            return false;
        }
        
        // Get index of value to remove
        const index = this.valueMap.get(val);
        const lastValue = this.values[this.values.length - 1];
        
        // Move last element to the position of element to remove
        this.values[index] = lastValue;
        this.valueMap.set(lastValue, index);
        
        // Remove the value
        this.values.pop();
        this.valueMap.delete(val);
        
        return true;
    }
    
    /**
     * Get a random element from the set.
     * @return {number}
     */
    getRandom() {
        // Generate random index and return corresponding value
        const randomIndex = Math.floor(Math.random() * this.values.length);
        return this.values[randomIndex];
    }
}

/**
 * Example usage:
 * const obj = new RandomizedSet()
 * const param_1 = obj.insert(1)
 * const param_2 = obj.remove(2)
 * const param_3 = obj.getRandom()
 */

// Export the class for use in other modules
module.exports = RandomizedSet;

// Test cases
if (require.main === module) {
    // Create new instance
    const randomizedSet = new RandomizedSet();
    
    // Test insertions
    console.log(randomizedSet.insert(1)); // true
    console.log(randomizedSet.insert(2)); // true
    console.log(randomizedSet.insert(1)); // false (already exists)
    
    // Test random element
    console.log(randomizedSet.getRandom()); // 1 or 2 randomly
    
    // Test removal
    console.log(randomizedSet.remove(1)); // true
    console.log(randomizedSet.remove(3)); // false (doesn't exist)
    
    // Test final state
    console.log(randomizedSet.getRandom()); // 2 (only remaining element)
}