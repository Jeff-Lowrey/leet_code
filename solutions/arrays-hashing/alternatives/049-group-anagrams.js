/**

 *
 * Given an array of strings strs, group the anagrams together. You can return the
 * answer in any order.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Group strings by their "anagram signature" - a canonical representation that's the same
 * for all anagrams. Two common signatures: sorted characters or character frequency count.
 *
 * APPROACH:



 *
 * WHY THIS WORKS:
 * - All anagrams have the same signature (sorted characters)
 * - Map automatically groups strings with identical signatures
 * - Different anagrams will have different signatures
 *
 * TIME COMPLEXITY: O(n × k log k) where n = number of strings, k = max string length
 * SPACE COMPLEXITY: O(n × k) for storing the grouped strings
 *
 * EXAMPLE WALKTHROUGH:
 * Input: ["eat","tea","tan","ate","nat","bat"]
 *
 * Using sorted string as key:
 * "eat" → key "aet" → group 1
 * "tea" → key "aet" → group 1
 * "tan" → key "ant" → group 2
 * "ate" → key "aet" → group 1
 * "nat" → key "ant" → group 2
 * "bat" → key "abt" → group 3
 *
 * Final groups: [["eat","tea","ate"], ["tan","nat"], ["bat"]]
 *
 * EDGE CASES:
 * - Empty string array: return empty array
 * - Single string: return array with single group
 * - All strings are anagrams: return single group
 */

/**
 * Main solution for Problem 49: Group Anagrams
 *
 * @param {string[]} strs - Array of strings to group
 * @return {string[][]} - Array of grouped anagrams
 *
 * Time Complexity: O(n × k log k) where n = number of strings, k = max string length
 * Space Complexity: O(n × k) for storing the groups
 */
function solve(strs) {
    const anagramMap = new Map();

    for (const str of strs) {
        // Create signature by sorting characters
        const signature = str.split('').sort().join('');

        // Group strings with same signature
        if (!anagramMap.has(signature)) {
            anagramMap.set(signature, []);
        }
        anagramMap.get(signature).push(str);
    }

    // Return all groups as array
    return Array.from(anagramMap.values());
}

/**
 * Alternative solution using character count as signature (more efficient)
 *
 * @param {string[]} strs - Array of strings to group
 * @return {string[][]} - Array of grouped anagrams
 *
 * Time Complexity: O(n × k) where n = number of strings, k = max string length
 * Space Complexity: O(n × k) for storing the groups
 */
function solveWithCharCount(strs) {
    const anagramMap = new Map();

    for (const str of strs) {
        // Create character count signature
        const charCount = new Array(26).fill(0);
        for (const char of str) {
            charCount[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        // Use character count array as signature
        const signature = charCount.join(',');

        // Group strings with same signature
        if (!anagramMap.has(signature)) {
            anagramMap.set(signature, []);
        }
        anagramMap.get(signature).push(str);
    }

    // Return all groups as array
    return Array.from(anagramMap.values());
}

/**
 * Test cases for Problem 49: Group Anagrams
 */
function testSolution() {
    console.log('Testing 49. Group Anagrams');

    // Test case 1: Basic example
    const result1 = solve(["eat","tea","tan","ate","nat","bat"]);
    // Sort for comparison since order doesn't matter
    const sorted1 = result1.map(group => group.sort()).sort();
    const expected1 = [["ate","eat","tea"], ["bat"], ["nat","tan"]].map(group => group.sort()).sort();
    console.assert(JSON.stringify(sorted1) === JSON.stringify(expected1),
        `Test 1 failed: expected groups with same anagrams`);

    // Test case 2: Single string
    const result2 = solve(["a"]);
    const expected2 = [["a"]];
    console.assert(JSON.stringify(result2) === JSON.stringify(expected2),
        `Test 2 failed: expected [["a"]], got ${JSON.stringify(result2)}`);

    // Test case 3: Empty string
    const result3 = solve([""]);
    const expected3 = [[""]];
    console.assert(JSON.stringify(result3) === JSON.stringify(expected3),
        `Test 3 failed: expected [[""]], got ${JSON.stringify(result3)}`);

    // Test case 4: No anagrams
    const result4 = solve(["abc","def","ghi"]);
    console.assert(result4.length === 3 && result4.every(group => group.length === 1),
        `Test 4 failed: expected 3 groups of size 1 each`);

    // Test case 5: All same anagrams
    const result5 = solve(["abc","bac","cab"]);
    console.assert(result5.length === 1 && result5[0].length === 3,
        `Test 5 failed: expected 1 group with 3 strings`);

    // Test alternative approach
    const result6 = solveWithCharCount(["eat","tea","tan","ate","nat","bat"]);
    const sorted6 = result6.map(group => group.sort()).sort();
    console.assert(JSON.stringify(sorted6) === JSON.stringify(expected1),
        `Test 6 failed: character count approach should give same result`);

    console.log('All test cases passed for 49. Group Anagrams!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 49. Group Anagrams ===');
    console.log('Category: Arrays Hashing');
    console.log('Difficulty: Medium');
    console.log('');

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    solve,
    solveWithCharCount,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - Sorting approach is simpler to implement but O(k log k) per string
 * - Character counting approach is O(k) per string but more complex
 * - Both approaches work well for typical input sizes
 * - Consider input constraints when choosing between approaches
 */