/**

 *
 * This problem demonstrates key concepts in String Manipulation.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Check if a string can be a palindrome after deleting at most one character.
 * Use two pointers from both ends. When we find a mismatch, try skipping
 * either the left or right character and check if the remaining is a palindrome.
 *
 * APPROACH:



 *    a) Skip left character and check if rest is palindrome
 *    b) Skip right character and check if rest is palindrome

 *
 * WHY THIS WORKS:
 * If we can delete at most one character, when we find a mismatch, one of
 * the two characters must be the one to delete. We test both possibilities.
 *
 * TIME COMPLEXITY: O(n)
 * - We traverse the string at most twice (once for main check, once for validation)
 * SPACE COMPLEXITY: O(1)
 * - Only using pointers, no extra data structures
 *
 * EXAMPLE WALKTHROUGH:
 * Input: "abca"
 * Step 1: Compare 'a' and 'a' - match, continue
 * Step 2: Compare 'b' and 'c' - mismatch
 * Step 3: Try skipping 'b': "aca" is palindrome - true
 * Output: true
 *
 * EDGE CASES:
 * - Already a palindrome: Return true
 * - Single character: Return true
 * - Empty string: Return true
 * - Two different characters: Return true (delete one)
 */

/**
 * Main solution for Problem 680: Valid Palindrome Ii
 *
 * @param {string} s - Input string
 * @return {boolean} - True if valid palindrome after deleting at most one char
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(s) {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        if (s[left] !== s[right]) {
            // Try skipping left character or right character
            return isPalindrome(s, left + 1, right) || isPalindrome(s, left, right - 1);
        }
        left++;
        right--;
    }

    return true;
}

/**
 * Helper function to check if substring is a palindrome
 *
 * @param {string} s - Input string
 * @param {number} left - Left pointer
 * @param {number} right - Right pointer
 * @return {boolean} - True if substring is palindrome
 */
function isPalindrome(s, left, right) {
    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

/**
 * Test cases for Problem 680: Valid Palindrome Ii
 */
function testSolution() {
    console.log('Testing 680. Valid Palindrome Ii');

    // Test case 1: Can delete one character
    const result1 = solve("aba");
    const expected1 = true;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Need to delete one character
    const result2 = solve("abca");
    const expected2 = true;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Cannot be palindrome
    const result3 = solve("abc");
    const expected3 = false;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Already a palindrome
    const result4 = solve("racecar");
    const expected4 = true;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Two characters
    const result5 = solve("ab");
    const expected5 = true;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 680. Valid Palindrome Ii!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 680. Valid Palindrome Ii ===');
    console.log('Category: String Manipulation');
    console.log('Difficulty: Easy');
    console.log('');

    // Example demonstration would go here
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
 * - This solution focuses on string manipulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
