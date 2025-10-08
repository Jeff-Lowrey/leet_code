/**
 * 443. String Compression
 * Medium
 *
 * This problem demonstrates key concepts in String Manipulation.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Compress the array in-place by replacing consecutive identical characters with
 * the character followed by its count (if count > 1). Use two pointers: one to
 * read and one to write.
 *
 * APPROACH:
 * 1. Use a write pointer to track where to write compressed data
 * 2. Use a read pointer to count consecutive characters
 * 3. Write the character and its count (if > 1) to the array
 * 4. Return the length of the compressed array
 *
 * WHY THIS WORKS:
 * By using two pointers, we can modify the array in-place without extra space.
 * The read pointer moves faster, counting consecutive characters, while the
 * write pointer only moves when we need to write compressed data.
 *
 * TIME COMPLEXITY: O(n)
 * - We traverse the array once
 * SPACE COMPLEXITY: O(1)
 * - Only using constant extra space for pointers and counters
 *
 * EXAMPLE WALKTHROUGH:
 * Input: ["a","a","b","b","c","c","c"]
 * Step 1: Read 2 'a's, write 'a','2'
 * Step 2: Read 2 'b's, write 'b','2'
 * Step 3: Read 3 'c's, write 'c','3'
 * Output: Return 6 (array becomes ["a","2","b","2","c","3"])
 *
 * EDGE CASES:
 * - Single character: No compression needed
 * - All unique characters: No counts needed
 * - Count >= 10: Write each digit separately
 */

/**
 * Main solution for Problem 443: String Compression
 *
 * @param {string[]} chars - Array of characters to compress
 * @return {number} - Length of compressed array
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(chars) {
    let write = 0; // Write pointer
    let read = 0;  // Read pointer

    while (read < chars.length) {
        let currentChar = chars[read];
        let count = 0;

        // Count consecutive identical characters
        while (read < chars.length && chars[read] === currentChar) {
            read++;
            count++;
        }

        // Write the character
        chars[write] = currentChar;
        write++;

        // Write the count if greater than 1
        if (count > 1) {
            const countStr = count.toString();
            for (let digit of countStr) {
                chars[write] = digit;
                write++;
            }
        }
    }

    return write;
}

/**
 * Test cases for Problem 443: String Compression
 */
function testSolution() {
    console.log('Testing 443. String Compression');

    // Test case 1: Basic compression
    const test1 = ["a","a","b","b","c","c","c"];
    const result1 = solve(test1);
    const expected1 = 6;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);
    console.assert(test1.slice(0, result1).join('') === "a2b2c3", `Test 1 array check failed`);

    // Test case 2: Single character groups
    const test2 = ["a","b","c"];
    const result2 = solve(test2);
    const expected2 = 3;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Large count (>= 10)
    const test3 = ["a","a","a","a","a","a","a","a","a","a","a","a"];
    const result3 = solve(test3);
    const expected3 = 3; // "a","1","2"
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);
    console.assert(test3.slice(0, result3).join('') === "a12", `Test 3 array check failed`);

    // Test case 4: Single character
    const test4 = ["a"];
    const result4 = solve(test4);
    const expected4 = 1;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Two identical characters
    const test5 = ["a","a"];
    const result5 = solve(test5);
    const expected5 = 2; // "a","2"
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 443. String Compression!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 443. String Compression ===');
    console.log('Category: String Manipulation');
    console.log('Difficulty: Medium');
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
