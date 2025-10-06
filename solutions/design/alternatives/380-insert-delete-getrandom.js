/**
 * 380. Insert Delete GetRandom O(1)
 * Medium
 *
 * This problem demonstrates key concepts in Design.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Design a data structure that supports insert, delete, and getRandom in O(1) average time.
 * The challenge is combining fast lookup (hash map) with fast random access (array).
 * We need both O(1) random access and O(1) deletion, which requires a clever approach.
 *
 * APPROACH:
 * 1. **Array + HashMap Combination**: Use array for O(1) random access, map for O(1) lookup
 * 2. **Index Mapping**: Map stores value -> index in array for fast lookup
 * 3. **Swap-and-Pop Delete**: When deleting, swap with last element, then pop
 * 4. **Random Access**: Generate random index within array bounds
 *
 * WHY THIS WORKS:
 * - Array provides O(1) random access via indexing
 * - HashMap provides O(1) lookup to check existence and get index
 * - Swap-and-pop deletion avoids O(n) array shifting
 * - All operations maintain the invariant: map[value] = index in array
 *
 * TIME COMPLEXITY: O(1) average for all operations
 * SPACE COMPLEXITY: O(n) for storing n elements
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * RandomizedSet rs = new RandomizedSet()
 * insert(1) -> nums: [1], map: {1: 0}, return true
 * insert(2) -> nums: [1,2], map: {1: 0, 2: 1}, return true
 * remove(1) -> swap with last: nums: [2], map: {2: 0}, return true
 * insert(3) -> nums: [2,3], map: {2: 0, 3: 1}, return true
 * getRandom() -> random index 0 or 1, return nums[randomIndex]
 * ```
 *
 * EDGE CASES:
 * - Insert duplicate value (return false)
 * - Remove non-existent value (return false)
 * - getRandom on single element set
 * - Operations on empty set (only getRandom should not be called)
 */

/**
 * RandomizedSet class - Supports insert, delete, and getRandom in O(1) time
 *
 * Uses array for O(1) random access and HashMap for O(1) lookup:
 * - nums: array storing the actual values
 * - valueToIndex: map from value to its index in nums array
 */
class RandomizedSet {
    /**
     * Initialize the RandomizedSet data structure.
     */
    constructor() {
        this.nums = [];           // Array for O(1) random access
        this.valueToIndex = new Map(); // Map: value -> index in nums
    }

    /**
     * Inserts a value to the set. Returns true if set did not contain the value.
     * @param {number} val - Value to insert
     * @return {boolean} - True if inserted, false if already present
     *
     * Time Complexity: O(1) average
     * Space Complexity: O(1)
     */
    insert(val) {
        if (this.valueToIndex.has(val)) {
            return false; // Value already exists
        }

        // Add value to end of array and update map
        this.valueToIndex.set(val, this.nums.length);
        this.nums.push(val);
        return true;
    }

    /**
     * Removes a value from the set. Returns true if set contained the value.
     * @param {number} val - Value to remove
     * @return {boolean} - True if removed, false if not present
     *
     * Time Complexity: O(1) average
     * Space Complexity: O(1)
     */
    remove(val) {
        if (!this.valueToIndex.has(val)) {
            return false; // Value doesn't exist
        }

        // Get index of element to remove
        const indexToRemove = this.valueToIndex.get(val);
        const lastElement = this.nums[this.nums.length - 1];
        const lastIndex = this.nums.length - 1;

        // Swap element to remove with last element
        this.nums[indexToRemove] = lastElement;
        this.valueToIndex.set(lastElement, indexToRemove);

        // Remove last element and its mapping
        this.nums.pop();
        this.valueToIndex.delete(val);

        return true;
    }

    /**
     * Get a random element from the set.
     * @return {number} - Random element from the set
     *
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    getRandom() {
        const randomIndex = Math.floor(Math.random() * this.nums.length);
        return this.nums[randomIndex];
    }
}

/**
 * Factory function for creating RandomizedSet instances
 * @return {RandomizedSet}
 */
function solve() {
    return new RandomizedSet();
}

/**
 * Test cases for Problem 380: Insert Delete GetRandom O(1)
 */
function testSolution() {
    console.log('Testing 380. Insert Delete GetRandom O(1)');

    // Test case 1: Basic insert and remove
    const rs1 = new RandomizedSet();
    console.assert(rs1.insert(1) === true, 'Test 1a failed: insert new value should return true');
    console.assert(rs1.insert(1) === false, 'Test 1b failed: insert duplicate should return false');
    console.assert(rs1.remove(1) === true, 'Test 1c failed: remove existing value should return true');
    console.assert(rs1.remove(1) === false, 'Test 1d failed: remove non-existent should return false');

    // Test case 2: Multiple elements and getRandom
    const rs2 = new RandomizedSet();
    rs2.insert(1);
    rs2.insert(2);
    rs2.insert(3);

    // Test that getRandom returns valid elements
    const validValues = new Set([1, 2, 3]);
    for (let i = 0; i < 10; i++) {
        const randomVal = rs2.getRandom();
        console.assert(validValues.has(randomVal), `Test 2a failed: getRandom returned invalid value ${randomVal}`);
    }

    // Test case 3: Remove middle element (tests swap-and-pop logic)
    const rs3 = new RandomizedSet();
    rs3.insert(0);
    rs3.insert(1);
    rs3.insert(2);
    console.assert(rs3.remove(1) === true, 'Test 3a failed: remove middle element');

    // Should only contain 0 and 2 now
    const remainingValues = new Set([0, 2]);
    for (let i = 0; i < 10; i++) {
        const randomVal = rs3.getRandom();
        console.assert(remainingValues.has(randomVal), `Test 3b failed: after removal, invalid value ${randomVal}`);
    }

    // Test case 4: Single element operations
    const rs4 = new RandomizedSet();
    rs4.insert(42);
    console.assert(rs4.getRandom() === 42, 'Test 4a failed: single element getRandom');
    console.assert(rs4.remove(42) === true, 'Test 4b failed: remove single element');

    // Test case 5: Complex sequence matching LeetCode example
    const rs5 = new RandomizedSet();
    console.assert(rs5.insert(1) === true, 'Test 5a failed');
    console.assert(rs5.remove(2) === false, 'Test 5b failed');
    console.assert(rs5.insert(2) === true, 'Test 5c failed');
    // getRandom should return 1 or 2
    const val1 = rs5.getRandom();
    console.assert(val1 === 1 || val1 === 2, 'Test 5d failed');
    console.assert(rs5.remove(1) === true, 'Test 5e failed');
    console.assert(rs5.insert(2) === false, 'Test 5f failed');
    console.assert(rs5.getRandom() === 2, 'Test 5g failed');

    console.log('All test cases passed for 380. Insert Delete GetRandom O(1)!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 380. Insert Delete GetRandom O(1) ===');
    console.log('Category: Design');
    console.log('Difficulty: Medium');
    console.log('');

    // Example demonstration
    const randomizedSet = new RandomizedSet();
    console.log('Operations: insert(1), remove(2), insert(2), getRandom(), remove(1), insert(2), getRandom()');

    console.log('insert(1):', randomizedSet.insert(1)); // true
    console.log('remove(2):', randomizedSet.remove(2)); // false (not present)
    console.log('insert(2):', randomizedSet.insert(2)); // true
    console.log('getRandom():', randomizedSet.getRandom()); // 1 or 2 randomly
    console.log('remove(1):', randomizedSet.remove(1)); // true
    console.log('insert(2):', randomizedSet.insert(2)); // false (already present)
    console.log('getRandom():', randomizedSet.getRandom()); // 2 (only element left)
    console.log('');

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    RandomizedSet,
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution combines array (O(1) random access) with HashMap (O(1) lookup)
 * - Swap-and-pop deletion technique avoids expensive array shifting
 * - The invariant valueToIndex[val] = index ensures consistency
 * - Critical for system design interviews involving caches and data structures
 * - Can be extended to handle duplicates (problem 381) with slight modifications
 * - The approach demonstrates elegant combination of multiple data structures
 */
