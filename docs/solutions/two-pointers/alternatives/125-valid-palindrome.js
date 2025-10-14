/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 * **Step 1:** [description]
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **Pointers meet:** Handle when left == right
 * - **Empty input:** Check for null or empty arrays
 * - **Single element:** One pointer scenario
 * - **All duplicates:** Pointer movement with same values
 * - **Boundary crossing:** Prevent left > right
 *
 * </details>
 */

/**
 * Main solution for Problem 125: Valid Palindrome
 *
 * @param {string} s - String to check for palindrome
 * @return {boolean} - True if valid palindrome, false otherwise
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(s) {
    return isPalindrome(s);
}

/**
 * Check if string is a valid palindrome (alphanumeric, case-insensitive)
 * @param {string} s - Input string
 * @return {boolean} - True if palindrome, false otherwise
 */
function isPalindrome(s) {
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        // Skip non-alphanumeric characters from left
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }

        // Skip non-alphanumeric characters from right
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }

        // Compare characters (case-insensitive)
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}

/**
 * Helper function to check if character is alphanumeric
 * @param {string} char - Character to check
 * @return {boolean} - True if alphanumeric, false otherwise
 */
function isAlphanumeric(char) {
    return /^[a-zA-Z0-9]$/.test(char);
}

/**
 * Alternative implementation using string cleaning
 * @param {string} s - Input string
 * @return {boolean} - True if palindrome, false otherwise
 */
function isPalindromeAlternative(s) {
    // Clean string: keep only alphanumeric, convert to lowercase
    const cleaned = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

    // Check if cleaned string equals its reverse
    return cleaned === cleaned.split('').reverse().join('');
}

/**
 * Test cases for Problem 125: Valid Palindrome
 */
function testSolution() {
    console.log('Testing 125. Valid Palindrome');

    // Test case 1: Valid palindrome with spaces and punctuation
    const result1 = solve("A man, a plan, a canal: Panama");
    console.assert(result1 === true, 'Test 1 failed: should be valid palindrome');

    // Test case 2: Not a palindrome
    const result2 = solve("race a car");
    console.assert(result2 === false, 'Test 2 failed: should not be palindrome');

    // Test case 3: Empty string (considered palindrome)
    const result3 = solve("");
    console.assert(result3 === true, 'Test 3 failed: empty string should be palindrome');

    // Test case 4: Single character
    const result4 = solve("a");
    console.assert(result4 === true, 'Test 4 failed: single character should be palindrome');

    // Test case 5: Only non-alphanumeric
    const result5 = solve(".,");
    console.assert(result5 === true, 'Test 5 failed: only punctuation should be palindrome');

    // Test case 6: Mixed case
    const result6 = solve("Madam");
    console.assert(result6 === true, 'Test 6 failed: mixed case palindrome');

    // Test case 7: Numbers and letters
    const result7 = solve("0P");
    console.assert(result7 === false, 'Test 7 failed: 0P is not palindrome');

    // Test alternative implementation
    console.assert(isPalindromeAlternative("A man, a plan, a canal: Panama") === true, 'Alternative test failed');

    console.log('All test cases passed for 125. Valid Palindrome!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 125. Valid Palindrome ===');
    console.log('Category: Two Pointers');
    console.log('Difficulty: Easy');
    console.log('');

    // Example demonstration
    const examples = [
        "A man, a plan, a canal: Panama",
        "race a car",
        "Madam",
        "",
        ".,"
    ];

    examples.forEach((example, index) => {
        const result = solve(example);
        console.log(`Example ${index + 1}: "${example}" -> ${result}`);
    });
    console.log('');

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    isPalindrome,
    isPalindromeAlternative,
    isAlphanumeric,
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution uses the classic two-pointers technique for O(1) space
 * - Alternative string cleaning approach uses O(n) space but may be more readable
 * - The two-pointers approach is more efficient and demonstrates the pattern well
 * - Alphanumeric regex check could be optimized with ASCII value checks
 * - Critical for understanding palindrome validation and two-pointers pattern
 * - The approach generalizes to other string comparison problems
 */
