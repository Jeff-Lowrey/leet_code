/**
 * 648. Replace
 * Medium
 *
 * Replace Words - JavaScript Implementation This implementation provides functionality to replace words in a sentence with their root words from a dictionary of roots. Time Complexity: O(n m) where n is the length of sentence and m is average word length Space Complexity: O(k) where k is the size of the dictionary
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Replace is to understand the core problem pattern
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
 * Replace Words - JavaScript Implementation
 * 
 * This implementation provides functionality to replace words in a sentence
 * with their root words from a dictionary of roots.
 * 
 * Time Complexity: O(n * m) where n is the length of sentence and m is average word length
 * Space Complexity: O(k) where k is the size of the dictionary
 */

/**
 * Replaces words in a sentence with their root words if found in the dictionary
 * @param {string[]} dictionary - Array of root words
 * @param {string} sentence - Input sentence to process
 * @return {string} - Processed sentence with replaced words
 */
function replaceWords(dictionary, sentence) {
    // Input validation
    if (!dictionary || !sentence) {
        return sentence || '';
    }

    // Create a Set from dictionary for O(1) lookup
    const rootSet = new Set(dictionary);
    
    // Split sentence into words
    const words = sentence.split(' ');
    
    // Process each word
    const processedWords = words.map(word => {
        // Try all possible prefixes of the word
        for (let i = 1; i <= word.length; i++) {
            const prefix = word.slice(0, i);
            if (rootSet.has(prefix)) {
                return prefix; // Return the root word if found
            }
        }
        return word; // Return original word if no root found
    });
    
    // Join processed words back into sentence
    return processedWords.join(' ');
}

/**
 * Helper function to test the implementation
 * @param {string[]} dictionary - Test dictionary
 * @param {string} sentence - Test sentence
 */
function testReplaceWords(dictionary, sentence) {
    console.log('Input Dictionary:', dictionary);
    console.log('Input Sentence:', sentence);
    console.log('Output:', replaceWords(dictionary, sentence));
    console.log('---');
}

// Test cases
function runTests() {
    // Test Case 1: Basic replacement
    testReplaceWords(
        ['cat', 'bat', 'rat'],
        'the cattle was rattled by the battery'
    );

    // Test Case 2: Empty dictionary
    testReplaceWords(
        [],
        'hello world'
    );

    // Test Case 3: Empty sentence
    testReplaceWords(
        ['cat', 'bat', 'rat'],
        ''
    );

    // Test Case 4: No replacements needed
    testReplaceWords(
        ['cat', 'bat', 'rat'],
        'hello world'
    );

    // Test Case 5: Multiple possible roots
    testReplaceWords(
        ['a', 'aa', 'aaa'],
        'aaa aaa aaa'
    );
}

// Export the function for use in other modules
module.exports = {
    replaceWords,
    testReplaceWords
};

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}