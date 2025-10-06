/**
 * 217. Contains Duplicate
 * Medium
 *
 * Contains Duplicate - Problem 217 Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct. @param {number[]} nums - Array of integers to check for duplicates @return {boolean} - True if duplicates exist, false otherwise
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Contains Duplicate is to understand the core problem pattern
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
 * Contains Duplicate - Problem 217
 * 
 * Given an integer array nums, return true if any value appears at least twice in the array, 
 * and return false if every element is distinct.
 * 
 * @param {number[]} nums - Array of integers to check for duplicates
 * @return {boolean} - True if duplicates exist, false otherwise
 */

/**
 * Solution 1: Using Set
 * Time Complexity: O(n) where n is the length of the input array
 * Space Complexity: O(n) to store the Set
 */
const containsDuplicate = function(nums) {
    // Edge case: empty array or single element
    if (!nums || nums.length <= 1) return false;
    
    // Create a Set from the array and compare lengths
    // If Set length is less than array length, duplicates exist
    return new Set(nums).size < nums.length;
};

/**
 * Solution 2: Using Hash Map
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const containsDuplicateMap = function(nums) {
    // Edge case: empty array or single element
    if (!nums || nums.length <= 1) return false;
    
    const seen = new Map();
    
    for (let num of nums) {
        if (seen.has(num)) return true;
        seen.set(num, true);
    }
    
    return false;
};

/**
 * Solution 3: Using Sort (not recommended for large arrays due to time complexity)
 * Time Complexity: O(n log n)
 * Space Complexity: O(1) or O(n) depending on sorting implementation
 */
const containsDuplicateSort = function(nums) {
    // Edge case: empty array or single element
    if (!nums || nums.length <= 1) return false;
    
    // Sort the array
    nums.sort((a, b) => a - b);
    
    // Check adjacent elements
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i-1]) return true;
    }
    
    return false;
};

// Test cases
const testCases = [
    [1, 2, 3, 1],           // true
    [1, 2, 3, 4],          // false
    [1, 1, 1, 3, 3, 4, 3, 2, 4, 2],  // true
    [],                     // false
    [1],                    // false
];

// Run tests
console.log("Testing containsDuplicate (Set solution):");
testCases.forEach(test => {
    console.log(`Input: [${test}]`);
    console.log(`Output: ${containsDuplicate(test)}\n`);
});

console.log("Testing containsDuplicateMap (Map solution):");
testCases.forEach(test => {
    console.log(`Input: [${test}]`);
    console.log(`Output: ${containsDuplicateMap(test)}\n`);
});

console.log("Testing containsDuplicateSort (Sort solution):");
testCases.forEach(test => {
    console.log(`Input: [${test}]`);
    console.log(`Output: ${containsDuplicateSort(test.slice())}\n`);
});

// Export the functions for use in other modules
module.exports = {
    containsDuplicate,
    containsDuplicateMap,
    containsDuplicateSort
};